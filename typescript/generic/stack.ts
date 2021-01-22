class Stack<T> {
  private data: T[] = [];

  push(item: T): void {
    this.data.push(item);
  }
  pop(): T {
    return this.data.pop();
  }
}

const numberStack = new Stack<number>();
const stringStack = new Stack<string>();

numberStack.push(1);

stringStack.push("hello");

export default Stack;
