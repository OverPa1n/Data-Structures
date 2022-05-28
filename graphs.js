/*
    Uses for graphs:
    - Social networks
    - Location / Mapping
    - Routing Algorithms
    - Visual Hierarchy
    - File system optimizations
    - Almost everywhere

    Essential graphs terms:
    1) Vertex - A node
    2) Edge - connection between nodes
    3) Weighted/Unweighted - values assigned to distance between vertices
    4) Directed/Undirected - directions assigned to distance between vertices

    Which structure of graph we will use ?
    - Adjacency list

    Graph traversal uses:
    - Peer to peer networking
    - Web crawlers
    - Finding "closest" / matches or recommendations
    - The Shortest path problems:
        - GPS navigation
        - Solving mazes
        - AI (the shortest path to win the game)
 */

class Graph {
    constructor() {
        this.adjacencyList = {}
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    addEdge(vertex1, vertex2) {
        this.adjacencyList[vertex1].push(vertex2)
        this.adjacencyList[vertex2].push(vertex1)
    }

    removeEdge(vertex1, vertex2) {
        this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(vertex => vertex !== vertex2);
        this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(vertex => vertex !== vertex1);
    }

    removeVertex(vertex) {
        while (this.adjacencyList[vertex].length) {
            const adjacentVertex = this.adjacencyList[vertex].pop();

            this.removeEdge(vertex, adjacentVertex);
        }

        delete this.adjacencyList[vertex];
    }

    depthFirstRecursively(startNode) {
        const resultArr = [];
        const visitedNodes = {};
        const adjacencyList = this.adjacencyList;

        (function dfs(vertex) {
                if (!vertex) {
                    return null;
                }

                visitedNodes[vertex] = true;
                resultArr.push(vertex);

                adjacencyList[vertex].forEach(neighbour => {
                        if (!visitedNodes[neighbour]) {
                            return dfs(neighbour)
                        }
                    }
                )
            }
        )(startNode)

        return resultArr;
    }

    depthFirstIterative(startNode) {
        const stack = [];
        const resultArr = [];
        const visitedNodes = {};

        stack.push(startNode);
        visitedNodes[startNode] = true;

        while (stack.length > 0) {
            const vertex = stack.pop();

            resultArr.push(vertex);

            this.adjacencyList[vertex].forEach(neighbour => {
                    if (!visitedNodes[neighbour]) {
                        visitedNodes[neighbour] = true;
                        stack.push(neighbour)
                    }
                }
            )
        }
        return resultArr;
    }

    breadthFirstSearch(startNode) {
        const queue = [];
        const visitedNodes = {};
        const resultArr = [];

        visitedNodes[startNode] = true;
        queue.unshift(startNode);

        while (queue.length > 0) {
            const vertex = queue.shift();
            resultArr.push(vertex);

            this.adjacencyList[vertex].forEach(neighbour => {
                if (!visitedNodes[neighbour]) {
                    visitedNodes[neighbour] = true;
                    queue.push(neighbour);
                }
            })
        }

        return resultArr;
    }
}

const g = new Graph();
