const person = {};

Object.defineProperties(person, {
  //데이터 property
  firstName: {
    value: "jinyong",
    writable: true,
    enumerable: true,
    configurable: true,
  },
  lastName: {
    value: "Park",
  }, // descriptor 객체의 프로퍼티를 누락시키면 undefined, false가 기본값이다.

  //접근자 property
  fullName: {
    get() {
      return `${this.firstName} ${this.lastName}`;
    },
    set(name) {
      [this.firstName, this.lastName] = name.split(" ");
    },
    enumerable: true,
    configurable: true,
  },
});

let descriptor = Object.getOwnPropertyDescriptor(person, "firstName");
console.log(descriptor);

descriptor = Object.getOwnPropertyDescriptor(person, "lastName");
console.log(descriptor);

console.log(Object.keys(person)); // ["firstName", "fullName"] lastName 의 enumerable 의 값이 false이므로 열거되지 않는다.

person.lastName = "kim";
console.log(person.lastName); // 'Park' -> writable 이 false이므로 변경 x

delete person.lastName;
console.log(person.lastName); // configurable 이 false 이므로 삭제할 수 없다.

console.log(person.fullName); // jinyong Park

person.fullName = "riverandeye kang";
console.log(person);
