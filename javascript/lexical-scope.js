//#1
var x = 1;

function foo() {
  var x = 10;
  bar();
}

function bar() {
  console.log(x);
}

foo(); // expect : 1
bar(); // expect : 1
//javascript는 함수를 어디서 정의했는지에 따라 함수의 상위 스코프를 결정한다.

//#2
var x = "global";

function fee() {
  console.log(x); // 2. 함수 내의 스코프에 x가 초기화되어있으므로 undefined 를 출력
  var x = "local"; // 1. 함수가 호출되면서 순차적으로 실행되기 이전에 x를 초기화시키고 시작(호이스팅)
}

fee();
console.log(x);
