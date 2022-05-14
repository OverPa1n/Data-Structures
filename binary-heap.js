/*
    What is a BINARY HEAP ?

        Very similar to a binary search tree, but with some different rules!
        In a MaxBinaryHeap, parent nodes are always larger than child nodes.
        In a MinBinaryHeap, parent nodes are always smaller than child nodes.

    Why do we need to know this ?

        Binary heaps are used to implement Priority Queues, which are very
        commonly used data structures. They are also used quite a bit, with
        graph traversal algorithms

   MAX BINARY HEAP:
    - Each parent has at most two child nodes
    - the value of each parent node is always greater than its child nodes
    - In a max Binary Heap the parent is greater than the children, but
      there are no guarantees between sibling nodes
    - A binary heap is as compact as possible. All the children of each node
      are as full as they can be and left children are filled out first

   Big O of Binary Heaps:

   Insertion - O(log n)
   Removal - O(log n)
   Search - O(n)

   Summarize:
    - Binary Heaps are very useful data structures for sorting, and implementing
      other data structures like priority queues
    - Binary Heaps are either MaxBinaryHeaps or MinBinaryHeaps with parents
      either being smaller or larger than their children
    - With just a little bit of math, we can represent heaps using arrays!
 */

class MaxBinaryHeap {
    values = [];

    insert(value) {
        this.values.push(value);

        let index = this.values.length - 1;
        const addedElement = this.values[index];

        while(index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            const parentElement = this.values[parentIndex];

            if (addedElement <= parentElement) {
                break;
            }

            [this.values[parentIndex], this.values[index]] = [this.values[index], this.values[parentIndex]];
            index = parentIndex;
        }
    }

    extractMax() {
        if (this.values.length > 0) {
            [this.values[0],this.values[this.values.length - 1]] = [this.values[this.values.length - 1], this.values[0]];

            const extractedElement = this.values.pop();
            this.sinkDown()
            return extractedElement;
        }
    }

    sinkDown() {
        let index = 0;
        const element = this.values[index];

        while(true) {
            let swap = null;
            let leftChildElement, rightChildElement;
            const leftChildIndex = Math.floor((2 * index) + 1);
            const rightChildIndex = Math.floor((2 * index) + 2);

            if (leftChildIndex < this.values.length) {
                leftChildElement = this.values[leftChildIndex];
            }

            if (leftChildElement > element) {
                swap = leftChildIndex;
            }

            if (rightChildIndex < this.values.length) {
                rightChildElement = this.values[rightChildIndex];
            }

            if (rightChildElement > element) {
                swap = rightChildIndex;
            }

            if (
                swap === null && rightChildElement > element
                || swap !== null && rightChildElement > leftChildElement
            ) {
                swap = rightChildIndex;
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

const maxBinaryHeap = new MaxBinaryHeap();
