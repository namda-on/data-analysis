//var
console.log(foo); //undefined

var foo;
console.log(foo); // undefined

foo = 1;
console.log(foo); // 1

//let -1
console.log(boo); //referenceError : boo is not defined

let boo;
console.log(boo); //undefined

boo = 1;
console.log(boo); //1
/*
let 키워드로 선언한 변수는 변수 호이스팅이 발생하지 않는 것처럼 보인다. 
*/

//let -2

let voo = 1;
{
  console.log(voo); //ReferenceError : cannot access 'voo' before initialization
  let voo = 2; // 지역변수
}

/*
  위에서 호이스팅이 발생하지 않는다면 26라인의 출력은 1이여야 한다.
  but let은 호이스팅이 발생하지만 선언과 초기화가 한번에 이뤄지지 않으므로 호이스팅이 발생하지 않는 것 처럼 보인다.
*/
