/*
   What is a priority queue ?

    A data structure where each element has a priority. It's based on a Binary Heap data structure
    Elements with higher priorities are served before
    elements with lower priorities

    - Write a Min Binary Heap - lower number means higher priority.
    - Each node has a val and priority. Use the priority to build the heap
    - Enqueue method accepts a values and priority, makes a new node, and puts it in the right spot
      based off of its priority.
    - Dequeue method removes root element, returns it, and rearranges heap using priority.
 */

class Node {
    constructor(val, priority) {
        this.val = val;
        this.priority = priority;
    }
}

class PriorityQueue {
    values = [];

    enqueue(value, priority) {
        let newNode = new Node(value, priority)
        this.values.push(newNode);
        this.bubbleUp();

    }

    bubbleUp() {
        let index = this.values.length - 1;
        const addedElement = this.values[index];

        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            const parentElement = this.values[parentIndex];

            if (addedElement.priority >= parentElement.priority) {
                break;
            }

            [this.values[parentIndex], this.values[index]] = [this.values[index], this.values[parentIndex]];
            index = parentIndex;
        }
    }

    dequeue() {
        if (this.values.length > 0) {
            [this.values[0], this.values[this.values.length - 1]] = [this.values[this.values.length - 1], this.values[0]];

            const extractedElement = this.values.pop();

            this.sinkDown()

            return extractedElement;
        }
    }

    sinkDown() {
        let index = 0;
        const element = this.values[index];

        while (true) {
            let swap = null;
            let leftChildElement, rightChildElement;
            const leftChildIndex = Math.floor((2 * index) + 1);
            const rightChildIndex = Math.floor((2 * index) + 2);

            if (leftChildIndex < this.values.length) {
                leftChildElement = this.values[leftChildIndex];

                if (leftChildElement.priority < element.priority) {
                    swap = leftChildIndex;
                }

            }

            if (rightChildIndex < this.values.length) {
                rightChildElement = this.values[rightChildIndex];
                if (swap === null && rightChildElement.priority < element.priority || swap !== null && rightChildElement.priority < leftChildElement.priority) {
                    swap = rightChildIndex;
                }
            }

            if (swap === null) {
                break;
            }

            this.values[index] = this.values[swap];
            this.values[swap] = element;
            index = swap;
        }
    }
}

const ER = new PriorityQueue();
