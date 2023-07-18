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

class Node {
  constructor(d) {
    this.data = d;
    this.left = null;
    this.right = null;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  // console.log(node);
  if (node.root.right !== null) {
    prettyPrint(node.root.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.root.data}`);
  if (node.root.left !== null) {
    prettyPrint(node.root.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

class Tree {
  constructor(arr) {
    this.arr = [];
    arr.forEach((item) => {
      if (this.arr.indexOf(item) === -1) this.arr.push(item);
    });
    this.arr = mergSort(this.arr);
    this.root = this.buildTree(this.arr);
  }

  buildTree(arr) {
    if (!arr.length) {
      return null;
    }
    const mid = parseInt((0 + arr.length - 1) / 2);
    const node = new Node(arr[mid]);
    node.left =
      arr.slice(0, mid).length > 0 ? new Tree(arr.slice(0, mid)) : null;
    node.right =
      arr.slice(mid + 1, arr.length).length > 0
        ? new Tree(arr.slice(mid + 1, arr.length))
        : null;
    return node;
  }

  insert(value) {
    // const node = new Tree([value]);
    if (this.root.data > value) {
      if (this.root.left === null) this.root.left = new Tree([value]);
      else this.root.left.insert(value);
    } else if (this.root.data < value) {
      if (this.root.right === null) this.root.right = new Tree([value]);
      else this.root.right.insert(value);
    }
  }

  // Revise Needed
  delete(value) {
    if (this.root.data < value) {
      console.log(this.root.right);
      if (this.root.right.delete(value) === null) this.root.right = null;
      // else this.root.right =
    } else if (this.root.data > value) {
      // console.log(this.root.right);
      if (this.root.left.delete(value) === null) this.root.left = null;
    } else {
      if (this.root.right === null && this.root.left === null) return null;
      if (this.root.left === null && this.root.right) return this.root.right;
      if (this.root.right === null && this.root.left) return this.root.left;
    }
  }

  find(value) {
    if (this.root.data === value) return this.root;
    else if (value > this.root.data) return this.root.right.find(value);
    else return this.root.left.find(value);
  }

  // Traverse tree in breadth-first level order(using iteration)
  leverOrder(cb) {
    let queue = [this.root];
    let result = [];
    while (queue.length) {
      // Dequeue
      const cur = queue.pop();
      result.push(cur.data);
      // Enqueue
      if (cur.left !== null) queue.unshift(cur.left.root);
      if (cur.right !== null) queue.unshift(cur.right.root);
    }

    if (!cb) return result;
    if (cb) {
      result.forEach((num) => cb(num));
    }
  }

  // DLR
  preorder(cb) {
    // If user provide a callback
    if (cb) {
      cb(this.root.data);
      if (this.root.left) this.root.left.preorder();
      if (this.root.right) this.root.right.preorder();
    } else {
      let result = [];
      result = result.concat(this.root.data);
      if (this.root.left) result = result.concat(this.root.left.preorder());
      if (this.root.right) result = result.concat(this.root.right.preorder());
      return result;
    }
  }

  // LDR
  inorder(cb) {
    // If user provide a callback
    if (cb) {
      if (this.root.left) this.root.left.inorder(cb);
      cb(this.root.data);
      if (this.root.right) this.root.right.inorder(cb);
    } else {
      let result = [];
      if (this.root.left) result = result.concat(this.root.left.inorder());
      result = result.concat(this.root.data);
      if (this.root.right) result = result.concat(this.root.right.inorder());
      return result;
    }
  }

  // LRD
  postorder(cb) {
    if (cb) {
      if (this.root.left) this.root.left.postorder();
      if (this.root.right) this.root.right.postorder();
      cb(this.root.data);
    } else {
      let result = [];
      if (this.root.left) result = result.concat(this.root.left.postorder());
      if (this.root.right) result = result.concat(this.root.right.postorder());
      result = result.concat(this.root.data);
      return result;
    }
  }

  static height(node) {
    let height = 0;
    if (!node) return 0;

    if (node.root.right && node.root.left) {
      const heightRight = Tree.height(node.root.right);
      const heightLeft = Tree.height(node.root.left);
      height += 1;
      height += heightRight > heightLeft ? heightRight : heightLeft;
    }

    if (node.root.right && node.root.left === null)
      height = 1 + Tree.height(node.root.right);

    if (node.root.left && node.root.right === null)
      height = 1 + Tree.height(node.root.left);

    return height;
  }

  depth(node) {
    if (this.root.data === node.data) return 0;
    else if (this.root.data > node.data) return 1 + this.root.left.depth(node);
    else if (this.root.data < node.data) return 1 + this.root.right.depth(node);
  }

  static isBalanced(node) {
    if (!node) return true;
    if (
      Math.abs(Tree.height(node.root.left) - Tree.height(node.root.right)) <=
        1 &&
      Tree.isBalanced(node.root.left) &&
      Tree.isBalanced(node.root.right)
    )
      return true;
    else return false;
  }

  rebalance() {
    const arr = this.inorder();
    this.root = this.buildTree(arr);
  }
}

// const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
const tree = new Tree([
  31, 50, 35, 44, 70, 66, 15, 25, 4, 22, 10, 18, 90, 24, 12,
]);
console.log(Tree.isBalanced(tree));
console.log(tree.leverOrder());
console.log(tree.preorder());
console.log(tree.postorder());
console.log(tree.inorder());
prettyPrint(tree);
tree.insert(12);
tree.insert(24);
tree.insert(3332);
tree.insert(3331);
tree.insert(3330);
tree.insert(250);
tree.insert(3359);
tree.insert(299);
tree.insert(3111);
console.log(Tree.isBalanced(tree));
tree.rebalance();
console.log(Tree.isBalanced(tree));
prettyPrint(tree);
console.log(tree.leverOrder());
console.log(tree.preorder());
console.log(tree.postorder());
console.log(tree.inorder());
