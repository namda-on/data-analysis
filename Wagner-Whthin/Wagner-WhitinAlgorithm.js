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
console.log(
  "------------------------------------------------------------------------------------------"
);
console.log(
  `총 period : ${period} , Ordering Cost : ${orderingCost}, Holding Cost : ${holdingCost}`
);
console.log(`Demand : ${demand}`);

let totalCost = [];
for (let i = 0; i < demand.length; i++) {
  totalCost[i] = [];
  for (let j = i; j < demand.length; j++) {
    totalCost[i][j] = orderingCost;
    for (let t = i; t < j + 1; t++) {
      totalCost[i][j] += holdingCost * (t - i) * demand[t];
    }
  }
}
let optimalK = [0];
let arrayForK = [];
for (let period = 0; period < demand.length; period++) {
  arrayForK[period] = [];
  for (let t = 0; t < period + 1; t++) {
    arrayForK[period].push(optimalK[t] + totalCost[t][period]);
  }
  optimalK.push(Math.min.apply(null, arrayForK[period]));
}

console.log(
  "------------------------------------------------------------------------------------------"
);
console.log(optimalK);

//경로 찾기
console.log(
  "------------------------------------------------------------------------------------------"
);

for (let period = demand.length - 1; period > -1; ) {
  let order = arrayForK[period].indexOf(optimalK[period + 1]);
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
console.log(
  "------------------------------------------------------------------------------------------"
);
console.log(`Total optimal cost : ${optimalK[demand.length]}`);
console.log(
  "------------------------------------------------------------------------------------------"
);
