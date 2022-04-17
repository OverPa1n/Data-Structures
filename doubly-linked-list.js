class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(val) {
        const newNode = new Node(val);

        if (!this.length) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }

        this.length++;

        return this;
    }

    pop() {
        if (!this.head) {
            return void 0;
        }

        let currentNode = this.tail;

        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = currentNode.prev;
            this.tail.next = null;
            currentNode.prev = null;
        }

        this.length--;

        return currentNode;
    }

    shift() {
        if (!this.length) {
            return void 0;
        }

        let currentNode = this.head;

        if (this.length === 1) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = currentNode.next;
            this.head.prev = null;
            currentNode.next = null;
        }

        this.length--;

        return currentNode;
    }

    unshift(value) {
        const newNode = new Node(value);

        if (!this.length) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }

        this.length++;

        return this;
    }

    get(index) {
        if (index < 0 || index >= this.length) {
            return null;
        }

        let currentNode, counter;
        let halfOfList = this.length / 2;

        if (index <= halfOfList) {
            counter = 0;
            currentNode = this.head;

            while (counter !== index) {
                counter++;
                currentNode = this.head.next;
            }
        }

        if (index > halfOfList) {
            counter = this.length - 1;
            currentNode = this.tail;

            while (counter !== index) {
                counter--;
                currentNode = this.tail.prev;
            }

        }

        return currentNode;
    }

    set(value, index) {
        let foundNode = this.get(index);

        if (foundNode) {
            foundNode.val = value;

            return true;
        }

        return false;
    }

    insert(index, value) {
        if (index < 0 || index > this.length) {
            return false;
        }

        if (index === 0) {
            return !!this.unshift(value);
        }

        if (index === this.length) {
            return !!this.push(value);
        }

        const newNode = new Node(value);
        const foundNode = this.get(index - 1);
        const afterFoundNode = foundNode.next;

        if (foundNode) {
            foundNode.next = newNode;
            newNode.next = afterFoundNode;
            newNode.prev = foundNode;
            afterFoundNode.prev = newNode;
        }

        this.length++;

        return true;
    }

    remove(index) {
        if (index < 0 || index >= this.length) {
            return false;
        }

        if (index === 0) {
            return this.shift(index);
        }

        if (index === this.length - 1) {
            return this.pop(index);
        }

        const foundNode = this.get(index);
        const beforeFoundNode = foundNode.prev;
        const afterFoundNode = foundNode.next;

        [beforeFoundNode.next, afterFoundNode.prev] = [foundNode.next, foundNode.prev];
        foundNode.prev = null;
        foundNode.next = null;

        this.length--;

        return foundNode;
    }

    reverse() {
        let currentNode = this.head;

        [this.head, this.tail] = [this.tail, currentNode];

        for (let i = 0; i < this.length; i++) {
            const {prev, next} = currentNode;

            [currentNode.prev, currentNode.next] = [next, prev];
            currentNode = next;
        }

        return this;
    }
}

const list = new DoublyLinkedList();
