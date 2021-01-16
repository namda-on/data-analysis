// class Prefixer {
//   constructor(prefix) {
//     this.prefix = prefix;
//   }
//   add(arr) {
//     return arr.map(function (item) {
//       return this.prefix + item; // undefined -> callback 함수가 일반함수이므로 this 는 전역객체 window
//     });
//   }
// }

// const prefixer = new Prefixer("fool-");
// console.log(prefixer.add(["cheetose", "r4bbit"]));

//해결방법 1 that
// class Prefixer {
//   constructor(prefix) {
//     this.prefix = prefix;
//   }
//   add(arr) {
//     const that = this;  // 생성자 함수 내부의 this 는 instance에 바인딩
//     return arr.map(function (item) {
//       return that.prefix + item;
//     });
//   }
// }

// const prefixer = new Prefixer("fool-");
// console.log(prefixer.add(["cheetose", "r4bbit"]));

// //해결방법 2 bind
// class Prefixer {
//   constructor(prefix) {
//     this.prefix = prefix;
//   }
//   add(arr) {
//     return arr.map(
//       function (item) {
//         return this.prefix + item;
//       }.bind(this)
//     );
//   }
// }

// const prefixer = new Prefixer("fool-");
// console.log(prefixer.add(["cheetose", "r4bbit"]));

//해결방법 3 arrow function
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }
  add(arr) {
    return arr.map((item) => this.prefix + item); //lexical this
  }
}

const prefixer = new Prefixer("fool-");
console.log(prefixer.add(["cheetose", "r4bbit"]));

/*
화살표 함수는 함수 자체의 this 바인딩을 갖지 않는다. 따라서 화살표 함수 내부에서 this를 참조하면
상위 스코프의 this를 그대로 참조한다. 이를 lexical this 라 한다.
*/
