class HashMap {
	constructor() {
		this.size = 0;
		this.loadFactor = 0.75;
		this.buckets = new Array(16);
		for (let i = 0; i < 16; i++) {
			this.buckets[i] = {};
		}
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
        const index = this.hash(key);
        if (!this.buckets[index].hasOwnProperty(key)) {
            this.size++;
        }
        this.buckets[index][key] = value;

        if (this.size / this.buckets.length > this.loadFactor) {
            this.resize();
        }
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
        this.buckets = new Array(16);
        for (let i = 0; i < 16; i++) {
            this.buckets[i] = {};
        }
        this.size = 0;
    }

}

module.exports = HashMap;