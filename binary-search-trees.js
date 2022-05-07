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

// Breadth-first-search

    /*
    Breadth-first search - is first approach of implementations of tree traversal.
    It goes through every node on the same level horizontally before move down to the next nodes.

    Steps - Iteratively
        - Create a queue (this can be an array) and a variable to store the values of nodes visited
        - Place the root node in the queue
        - Loop as long as there is anything in the queue:
            - Dequeue a node from the queue and push the value of the node
              into the variable that stores the nodes
            - If there is a left property on the node dequeued - add it to the queue
            - if there is a right property on the node dequeued - add it to the queue
        - Return the variable that stores the values
 */
    BFS() {
        const data = [],
            queue = [];
        let node = this.root;
        queue.push(this.root);

        while (queue.length) {
            node = queue.shift();
            data.push(node.value);

            if (node.left) {
                queue.push(node.left);
            }

            if (node.right) {
                queue.push(node.right);
            }
        }

        return data;
    }

    /*
    Deep-first search - is the second approach of implementations of tree traversal
    It goes through every node vertically on the one side of tree and then goes to another side

    Steps - Recursively
        - Create a variable to store the values of nodes visited
        - Store the root of the BST in a variable called current
        - Write a helper function which accepts a node
            - Push the value of the node to the variable that stores the values
            - If the node has a left property, call the helper function with
                the left property on the node
            - If the node has a right property, call the helper function with
                the right property on the node
        - Invoke the helper function with the current variable
        - Return the array of values
 */

// Pre order
    DFSPreOrder() {
        const data = [];
        const current = this.root;

        function traverse(node) {
            data.push(node.value);

            if (node.left) {
                traverse(node.left);
            }

            if (node.right) {
                traverse(node.right)
            }
        }

        traverse(current);

        return data;
    }

    /*
        Post order

         Steps - Recursively
            - Create a variable to store the values of nodes visited
            - Store the root of the BST in a variable called current
            - Write a helper function which accepts a node
                - if the node has a left property, call the helper function
                  with the left property on the node
                - If the node has a right property, call the helper function
                  with the right property on the node
                - Push the value of the node to the variable that stores the values
            - Invoke the helper function with the current variable
            - Return the array of values
     */

    DFSPostOrder() {
        const data = [];

        function traverse(node) {
            if (node.left) {
                traverse(node.left);
            }

            if (node.right) {
                traverse(node.right);
            }

            data.push(node.value);
        }

        traverse(this.root);

        return data;
    }

    /*
        In order

        Steps - Recursively
            - Create a variable to store the values of nodes visited
            - Store the root of the BST in a variable called current
            - Write a helper function which accepts a node
                - if the node has a left property, call the helper function
                  with the left property on the node
                - Push the value of the node to the variable that stores the value
                - If the node has a right property, call the helper function
                  with the right property on the node
            - Invoke the helper function with the current variable
            - Return the array of values
     */

    BFSInOrder() {
        const data = [];

        function traverse(node) {
            if (node.left) {
                traverse(node.left);
            }

            data.push(node.value);

            if (node.right) {
                traverse(node.right);
            }
        }

        traverse(this.root);

        return data;
    }
}

const tree = new BinarySearchTree();
