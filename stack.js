// LIFO - Last In First Out
/* Usually stacks are sued in:
   - Managing functions invocations
   - Undo / Redo. When you want to go back to previous action. Like when you press control + Z;
   - Routing (The history object) is treated like a stack
 */

/*
    Big O:
    Insertion - O(1)
    Removal - O(1)
    Searching - O(N)
    Access - O(N)
 */

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Stack {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    push(value) {
        const newNode = new Node(value);

        if (!this.size) {
            this.first = newNode;
            this.last = newNode;
        }

        if (this.size >= 1) {
            let currentNode = this.first;
            this.first = newNode;
            this.first.next = currentNode;
        }

        return ++this.size;
    }

    pop() {
        if (!this.size) {
            return null;
        }

        const currentNode = this.first;

        if (this.first === this.last) {
            this.last = null;
        }

        this.first = currentNode.next;
        this.size--;

        return currentNode.value;
    }
}
