/*
    What is a hash table ?

    Hash tables are used to store key-value pairs.
    They are like arrays, but the keys are not ordered.
    Unlike arrays, hash tables are fast for all of the following operations:
    finding values, adding new values, and removeing values!

    What makes a good hash ?

    1) Fast (i.e constant time)
    2) Doesn't cluster outpust at specific indices, but distributes uniformly
    3) Deterministic (same inputs yields same outpust)

    Big O of Hash tables in average cases

    - Insert: O(1)
    - Deletion: O(1)
    - Access: O(1)
*/

class HashTable {
    constructor(size = 4) {
        this.keyMap = new Array(size)
    }

    hash(key) {
        let total = 0;
        let WEIRD_PRIME = 31;

        for (let i = 0; i < Math.min(key.length, 100); i++) {
            let char = key[i];
            let value = char.charCodeAt(0) - 96;
            total = (total * WEIRD_PRIME + value) % this.keyMap.length;
        }

        return total;
    }

    set(key, value) {
        const index = this.hash(key);

        if (!this.keyMap[index]) {
            this.keyMap[index] = [];
        }

        this.keyMap[index].push([key, value]);
    }

    get(key) {
        const index = this.hash(key);

        if (this.keyMap[index]) {
            for (let i = 0; i < this.keyMap[index].length; i++) {
                if (this.keyMap[index][i][0] === key) {
                    return this.keyMap[index][i][1]
                }
            }
        }
    }

    values() {
        let valuesArr = [];

        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    if (!valuesArr.includes(this.keyMap[i][j][1])) {
                        valuesArr.push(this.keyMap[i][j][1])

                    }
                }

            }
        }

        return valuesArr;
    }

    keys() {
        let valuesArr = [];

        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    if (!valuesArr.includes(this.keyMap[i][j][0])) {
                        valuesArr.push(this.keyMap[i][j][0])

                    }
                }

            }
        }

        return valuesArr;
    }
}

let ht = new HashTable();
