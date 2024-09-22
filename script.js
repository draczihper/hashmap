class Node {
	constructor(key, value) {
		this.key = key;
		this.value = value;
		this.next = null;
	}
}


class HashMap {
	constructor(initialCapacity = 1) {
		this.buckets = new Array(initialCapacity);
		this.size = 0;
		this.loadFactor = 0.75;
	}

	hash(key) {
		let hashCode = 0;
		const primeNumber = 31;

		for (let i = 0; i < key.length; i++) {
			hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
		}
		return hashCode;
	}

	set(key, value) {
		if (this.size >= (this.buckets.length * this.loadFactor)) {
			this.resize();
		}
        const index = this.hash(key);
        if (!this.buckets[index]) {
			this.buckets[index] = new Node(key, value);
            this.size++;
		} else {
			let current = this.buckets[index];
			while (current) {
				if (current.key === key) {
					current.value = value;
					return;
				}
				if (!current.next) {
					current.next = new Node(key, value);
					this.size++;
					return;
				}
				current = current.next;
			}
		}
    }

	get(key) {
		const index = this.hash(key);
		let current = this.buckets[index];
		while (current) {
			if (current.key === key) {
				return current.value;
			}
			current = current.next;
		}
		return undefined;
    }

	has(key) {
		const index = this.hash(key);
		let current = this.buckets[index];
		while (current) {
			if (current.key === key) {
				return true;
			}
			current = current.next;
		}
		return false;
	}
	
	remove(key) {
        const index = this.hash(key);
		let current = this.buckets[index];
		let prev = null;
		while (current) {
			if (current.key === key) {
				if (prev) {
					prev.next = current.next;
				} else {
					this.buckets[index] = current.next;
				}
				this.size--;
				return true;
			}
			prev = current;
			current = current.next;
		}
		return false;
	}
	
	length() {
        return this.size;
    }

    clear() {
		this.buckets = new Array(1);
		this.size = 0;
	}
	
	keys() {
        const allKeys = [];
        for (let i = 0; i < this.buckets.length; i++) {
			let current = this.buckets[i];
			while (current) {
				allKeys.push(current.key);
				current = current.next;
			}
            }
        return allKeys;
    }

	values() {
        const allValues = [];
        for (let i = 0; i < this.buckets.length; i++) {
           let current = this.buckets[i]
			while (current) {
			   allValues.push(current.value)
				current = current.next;
		   }
        }
        return allValues;
	}
	
	entries() {
        const allEntries = [];
        for (let i = 0; i < this.buckets.length; i++) {
			let current = this.buckets[i]
			while (current) {
				allEntries.push([current.key, current.value])
				current = current.next;
			}
        }
        return allEntries;
	}

	resize() {
		const newCapacity = this.buckets.length * 2;
		const newBuckets = new Array(newCapacity);

		for (let i = 0; i < this.buckets.length; i++) {
			let current = this.buckets[i]
			while (current) {
				const newIndex = this.hash(current.key) % newCapacity;
				if (!newBuckets[newIndex]) {
					newBuckets[newIndex] = new Node(current.key, current.value);
				} else {
					let newCurrent = newBuckets[newIndex];
					while (newCurrent.next) {
						newCurrent = newCurrent.next;
					}
					newCurrent.next = new Node(current.key, current.value)
				}
				current = current.next;
			}
        }

        this.buckets = newBuckets;
	}

	bucketCount() {
        return this.buckets.length;
	}
	
	collisions() {
		let collisionCount = 0;
		for (let i = 0; i < this.buckets.length; i++) {
			if (this.buckets[i] && this.buckets[i].next) {
				let current = this.buckets[i];
				while (current.next) {
					collisionCount++;
					current = current.next;
				}
			}
		}
		return collisionCount;
	}
	
}

module.exports = HashMap;