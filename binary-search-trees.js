/*
    What is a tree ?
        A data structure that consist of a nodes in a parent / child relationship

    How Binary Search Trees work:
        - Every parent node has at most two children
        - Every node to the left of a parent node is
          always less than the parent
        - Every node to the right  of a parent node
          is always greater than the parent

    Where trees are implemented:
        - HTML DOM
        - Network Routing
        - Abstract Syntax Tree
        - Artificial Intelligence
        - Folders in Operating Systems
        - Computer File Systems

    Tree terminology:
        Root - The top node in a tree.
        Child - A node directly connected to another node
                when moving away from the root.
        Parent - The converse notion of a child.
        Siblings - A group of nodes with the same parent.
        Leaf - A node with no children.
        Edge - The connection between one node and another.

    Big O of BST:
        Insertion - O(log n)
        Searching - O(log n)
     But not guaranteed! We can have tree in one way and then Big O will be O(n)
 */
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new Node(value);

        if (!this.root) {
            this.root = newNode;
            return this;
        }

        let current = this.root;

        while (true) {
            if (value === current.value) {
                return false;
            }
            if (value < current.value) {
                if (!current.left) {
                    current.left = newNode;
                    return this;
                } else {
                    current = current.left;
                }
            } else if (value > current.value) {
                if (!current.right) {
                    current.right = newNode;
                    return this;
                } else {
                    current = current.right;
                }
            }
        }
    }

    find(value) {
        if (!this.root || !value) {
            return false;
        }

        let current = this.root;
        let isFounded = false;

        while (current && !isFounded) {
            if (value < current.value) {
                current = current.left;
            } else if (value > current.value) {
                current = current.right;
            } else {
                isFounded = true;
            }
        }

        return current ? current : false;
    }
}

const tree = new BinarySearchTree();
