import Stack from "./stack";
function first<T>(arr: T[]): T {
  return arr[0];
}

function toPair<T, U>(a: T, b: U): [T, U] {
  return [a, b];
}

toPair(1, "2");

function getFirst<T extends Stack<U>, U>(container: T): U {
  const firstItem = container.pop();
  container.push(firstItem);
  return firstItem;
}
