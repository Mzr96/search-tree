"use strict";

class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }

  value() {
    return this.value;
  }
}

class LinkedList extends Node {
  append(value) {
    this.nextNode === null
      ? (this.nextNode = new LinkedList(value))
      : this.nextNode.append(value);
  }

  prepend(value) {
    this.nextNode = Object.assign(Object.create(this), this);
    this.value = value;
  }

  size() {
    if (this.nextNode === null) return 1;
    else return 1 + this.nextNode.size();
  }

  head() {
    return this;
  }

  tail() {
    if (this.nextNode === null) return this;
    else return this.nextNode.tail();
  }

  at(index) {
    if (index > 0) return this.nextNode.at(--index);
    else return this;
  }

  pop() {
    const oneBeforeEnd = this.at(this.size() - 2);
    oneBeforeEnd.nextNode = null;
  }

  contains(value) {
    if (this.value === value) return true;
    else if (this.nextNode === null) return false;
    else return this.nextNode.contains(value);
  }

  find(value) {
    if (!this.contains(value)) return null;
    else {
      if (this.value === value) return 0;
      else return 1 + this.nextNode.find(value);
    }
  }

  toString() {
    if (this.nextNode === null) return `( ${this.value} ) -> ${this.nextNode}`;
    else return `( ${this.value} ) -> `.concat(this.nextNode.toString());
  }

  // Extra Credit
  insertAt(value, index) {
    const secondHalf = this.at(index);
    secondHalf.prepend(value);
  }

  // Can't remove first item
  removeAt(index) {
    const removeItem = this.at(index);
    const beforeRemoveItem = this.at(index - 1);
    const afterRemoveItem = Object.assign(
      Object.create(removeItem.nextNode),
      removeItem.nextNode
    );
    beforeRemoveItem.nextNode = afterRemoveItem;
    console.log(beforeRemoveItem);
  }
}

const linkedList = new LinkedList("maziar");
linkedList.append("maria");
linkedList.append("davood");
linkedList.append("shayan");
linkedList.prepend("Steve");
console.log(linkedList);
// console.log(linkedList.head());
// console.log(linkedList.size());
// console.log(linkedList.tail());
// // console.log(linkedList.at(3));
// // linkedList.pop();
// console.log(linkedList.contains("maziar"));
// console.log(linkedList.head());
// console.log(linkedList.find("davood"));
// console.log(linkedList.toString());
linkedList.insertAt("sadra", 4);
console.log(linkedList.toString());
console.log(linkedList);
linkedList.removeAt(4);
console.log(linkedList);
console.log(linkedList.toString());
