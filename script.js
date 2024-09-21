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

	

}

module.exports = HashMap;