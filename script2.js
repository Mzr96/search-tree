"use strict";

const sort = function (list1, list2) {
  const arr = [];
  while (list1.length && list2.length) {
    if (list1[0] >= list2[0]) arr.push(list2.shift());
    if (list1[0] < list2[0]) arr.push(list1.shift());
  }
  return arr.concat(list1).concat(list2);
};

// Merg Sorting
const mergSort = function (list) {
  if (list.length > 2) {
    return sort(
      mergSort(list.slice(0, list.length / 2)),
      mergSort(list.slice(list.length / 2, list.length))
    );
  } else return sort(list.slice(0, 1), list.slice(1, 2));
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.arr = [];
    arr.forEach((item) => {
      if (this.arr.indexOf(item) === -1) this.arr.push(item);
    });
    this.arr = mergSort(this.arr);
    this.root = this._buildTree(this.arr);
  }

  _buildTree(arr) {
    console.log(this);
    if (!arr.length) return null;
    const middle = parseInt((0 + arr.length - 1) / 2);
    const newNode = new Node(arr[middle]);
    newNode.left = this._buildTree(arr.slice(0, middle));
    newNode.right = this._buildTree(arr.slice(middle + 1, arr.length));
    return newNode;
  }

  insert(value) {
    let node = this.root;
    while (node && value !== node.data) {
      if (value > node.data) node = node.right;
      if (value < node.data) node = node.left;
    }
    console.log(node);
  }
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log(tree);
prettyPrint(tree.root);
tree.insert(12);
