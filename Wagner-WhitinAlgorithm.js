var readlineSync = require("readline-sync");

let orderingCost = Number(readlineSync.question("Ordering Cost? :"));
let holdingCost = Number(readlineSync.question("Holding Cost? :"));
let period = Number(readlineSync.question("period? : "));
let demand = [];
for (i = 0; i < period; i++) {
  demand[i] = Number(
    readlineSync.question(`${i + 1} period forecast demand :`)
  );
}
console.log(demand);

let optiamlK = [0];
let inventoryQ = [];

for (let week = 0; week < demand.length; week++) {
  inventoryQ[week] = []; //자바스크립트는 다중배열선언이 안된다.

  for (let period = week + 1; period < demand.length + 1; period++) {
    let something = 0;
    for (let i = week; i < period; i++) {
      something = something + (i - week) * demand[i];
    }

    inventoryQ[week][period - 1] = something;
  }
}

let arrayForK = [];
for (let period = 0; period < demand.length; period++) {
  arrayForK[period] = [];

  for (let t = 0; t < period + 1; t++) {
    let K_t_period = orderingCost + holdingCost * inventoryQ[t][period]; //K_tl
    arrayForK[period].push(optiamlK[t] + K_t_period);
  }
  optiamlK.push(Math.min.apply(null, arrayForK[period]));
}

console.log(arrayForK);
console.log(optiamlK);

//경로 찾기
for (let period = demand.length - 1; period > -1; ) {
  let order = arrayForK[period].indexOf(optiamlK[period + 1]);
  let lotSize = 0;
  for (let k = order; k < period + 1; k++) {
    lotSize = lotSize + demand[k];
  }
  console.log(
    `${order + 1} 주에서 ${
      period + 1
    }주까지의 demand를 cover하여 ${lotSize}를 Order `
  );

  period = order - 1;
}
