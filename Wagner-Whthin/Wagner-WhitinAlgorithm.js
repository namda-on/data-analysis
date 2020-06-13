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

let optimalK = [0];
let totalCost = [];
for (let week = 0; week < demand.length; week++) {
  totalCost[week] = [];
  for (let period = week + 1; period < demand.length + 1; period++) {
    totalCost[week][period - 1] = orderingCost;
    for (let i = week; i < period; i++) {
      totalCost[week][period - 1] += holdingCost * (i - week) * demand[i];
    }
  }
}

let arrayForK = [];
for (let period = 0; period < demand.length; period++) {
  arrayForK[period] = [];
  for (let t = 0; t < period + 1; t++) {
    let K_t_period = totalCost[t][period];
    arrayForK[period].push(optimalK[t] + K_t_period);
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
let finalCost = 0;
for (let period = demand.length - 1; period > -1; ) {
  let order = arrayForK[period].indexOf(optimalK[period + 1]);
  let lotSize = 0;
  for (let k = order; k < period + 1; k++) {
    lotSize = lotSize + demand[k];
  }

  finalCost += optimalK[period + 1];

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
console.log(`Total optimal cost : ${finalCost}`);
console.log(
  "------------------------------------------------------------------------------------------"
);
