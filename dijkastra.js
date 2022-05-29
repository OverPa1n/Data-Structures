/*
    Who was he ?

    Edsger Dijkstra was a Dutch programmer physicist, essayist, and all around smarty-pants.
    He helped to advance the field of computer science from an "art" to an academic discipline.
    Many of his discoveries and algorithms are still commonly used to this day.

    What is it ?

    One of the most famous and widely used algorithms around!
    Finds the shortest path between two vertices on a graph
    Finds the fastest way to get from point A to point B

    Why is it useful ?

    - GPS - finding the fastest route
    - Network Routing - finds open shortest path for data
    - Biology - used to model the spread of viruses among humans
    - Airline tickets - finding the cheapest route to your destination
    - Many other uses!
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

// Weighted graph with Dijkastra algorithm
class WeightedGraph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1].push({
            node: vertex2, weight
        });
        this.adjacencyList[vertex2].push({
            node: vertex1, weight
        });
    }

    Dijkstra(start, finish) {
        const nodes = new PriorityQueue();
        const distances = {};
        const previous = {};
        let path = [];
        //To return at end
        let smallest;

        // Build up initial state
        for (let vertex in this.adjacencyList) {
            if (vertex === start) {
                distances[vertex] = 0;
                nodes.enqueue(vertex, 0);
            } else {
                distances[vertex] = Infinity;
                nodes.enqueue(vertex, Infinity);

            }

            previous[vertex] = null;
        }
        // as long as there is something to visit
        while (nodes.values.length) {
            smallest = nodes.dequeue().val;

            if (smallest === finish) {
                //WE ARE DONE
                //BUILD UP PATH TO RETURN AT END
                while (previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }

                break;
            }

            if (smallest || distances[smallest] !== Infinity) {
                for (let neighbor in this.adjacencyList[smallest]) {
                    //Find neighboring node
                    let nextNode = this.adjacencyList[smallest][neighbor];
                    //Calculate new distance to neighboring node
                    let candidate = distances[smallest] + nextNode.weight;

                    if (candidate < distances[nextNode.node]) {
                        //Updating new smallest distance to neighbor
                        distances[nextNode.node] = candidate;
                        //Updating previous - How we got to neighbor
                        previous[nextNode.node] = smallest;
                        //Enqueue in priority queue with new priority
                        nodes.enqueue(nextNode.node, candidate);
                    }
                }
            }
        }

        return path.concat(smallest).reverse();
    }
}

let g = new WeightedGraph();
