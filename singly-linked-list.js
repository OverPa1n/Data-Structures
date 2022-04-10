class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.length = 0;
        this.head = null;
        this.tail = null;
    }

    push(val) {
        const newNode = new Node(val);

        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;
        }

        this.tail.next = newNode;
        this.tail = newNode;
        this.length++;

        return this;
    }

    pop() {
        if (!this.head) {
            return void 0;
        }

        let current = this.head;
        let newTail = current;

        while (current.next) {
            newTail = current;
            current = current.next;
        }

        this.tail = newTail;
        this.tail.next = null;
        this.length--;

        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }

        return current;
    }

    shift() {
        if (!this.head) {
            return void 0;
        }

        let currentHead = this.head;

        this.head = currentHead.next;
        this.length--;

        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }

        return currentHead;
    }

    unshift(val) {
        const newNode = new Node(val);

        if (!this.head) {
            this.head = newNode;
            this.tail = this.head;

        } else {
            newNode.next = this.head;
            this.head = newNode;

        }

        this.length++;

        return this;
    }

    get(index) {
        if (index > this.length || index < 0) {
            return null;
        }

        let counter = 0;
        let currentNode = this.head;

        while (counter !== index) {
            currentNode = currentNode.next;
            counter++;
        }

        return currentNode;
    }

    set(index, value) {
        const findedNode = this.get(index);

        if (!findedNode) {
            return false;
        }

        findedNode.val = value;

        return true;
    }

    insert(index, value) {
        if (index < 0 || index > this.length) {
            return false;
        }

        if (index === this.length) {
            return !!this.push(value);
        }

        if (index === 0) {
            return !!this.unshift(value);
        }

        const newNode = new Node(value);
        const prevNode = this.get(index - 1);
        const currentNode = prevNode.next;
        prevNode.next = newNode;
        newNode.next = currentNode;
        this.length++;

        return true;
    }

    remove(index) {
        if (index < 0 || index >= this.length) {
            return void 0;
        }

        if (index === 0) {
            return this.shift()
        }

        if (index === this.length) {
            return this.pop()
        }

        const prevNode = this.get(index - 1);
        const removedNode = prevNode.next;

        prevNode.next = removedNode.next;
        this.length--;

        return removedNode;
    }

    reverse() {
        let next, prev = null, currentNode = this.head;

        [this.head, this.tail] = [this.tail, this.head];

        for (let i = 0; i < this.length; i++) {
            next = currentNode.next;
            currentNode.next = prev;
            prev = currentNode;
            currentNode = next;
        }

        return this;
    }
}
