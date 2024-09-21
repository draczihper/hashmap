class HashMap {
	constructor(initialCapacity = 1) {
		this.buckets = new Array(initialCapacity);
		for (let i = 0; i < 16; i++) {
			this.buckets[i] = {};
		}
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
        if (!this.buckets[index].hasOwnProperty(key)) {
            this.size++;
        }
        this.buckets[index][key] = value;
    }

	get(key) {
        const index = this.hash(key);
        return this.buckets[index].hasOwnProperty(key) ? this.buckets[index][key] : null;
    }

	has(key) {
        const index = this.hash(key);
        return this.buckets[index].hasOwnProperty(key);
	}
	
	remove(key) {
        const index = this.hash(key);
        if (this.buckets[index].hasOwnProperty(key)) {
            const value = this.buckets[index][key];
            delete this.buckets[index][key];
            this.size--;
            return value;
        }
        return null;
	}
	
	length() {
        return this.size;
    }

    clear() {
		this.buckets = [{}];
		this.size = 0;
	}
	
	keys() {
        const allKeys = [];
        for (let i = 0; i < this.buckets.length; i++) {
            for (let key in this.buckets[i]) {
                if (this.buckets[i].hasOwnProperty(key)) {
                    allKeys.push(key);
                }
            }
        }
        return allKeys;
    }

	values() {
        const allValues = [];
        for (let i = 0; i < this.buckets.length; i++) {
            for (let key in this.buckets[i]) {
                if (this.buckets[i].hasOwnProperty(key)) {
                    allValues.push(this.buckets[i][key]);
                }
            }
        }
        return allValues;
	}
	
	entries() {
        const allEntries = [];
        for (let i = 0; i < this.buckets.length; i++) {
            for (let key in this.buckets[i]) {
                if (this.buckets[i].hasOwnProperty(key)) {
                    allEntries.push([key, this.buckets[i][key]]);
                }
            }
        }
        return allEntries;
	}

	resize() {
		const newCapacity = this.buckets.length * 2;
		const newBuckets = new Array(newCapacity);

		for (let i = 0; i < newCapacity; i++) {
			newBuckets[i] = {};
		}

		for (let i = 0; i < this.buckets.length; i++) {
            const bucket = this.buckets[i];
            for (let key in bucket) {
                if (bucket.hasOwnProperty(key)) {
                    const newIndex = this.hash(key) % newCapacity;
                    newBuckets[newIndex][key] = bucket[key];
                }
            }
        }

        this.buckets = newBuckets;
	}

	bucketCount() {
        return this.buckets.length;
    }
	
}

module.exports = HashMap;