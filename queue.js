// FIFO - First In First Out

/*
    Where do we can see the queue data structure ?
        - Background Tasks
        - Uploading resources
        - Printing / Task processing
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

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    enqueue(value) {
        const newNode = new Node(value);

        if (!this.size) {
            this.first = newNode;
            this.last = newNode;
        } else {
            const currentNode = this.last;
            this.last = newNode;
            currentNode.next = this.last;
        }

        return ++this.size;
    }

    dequeue() {
        if (!this.first) {
            return null;
        }

        const currentNode = this.first;

        if (this.first === this.last) {
            this.first = null;
            this.last = null;
        } else {
            this.first = currentNode.next;
        }

        this.size--;

        return currentNode.value;
    }
}
