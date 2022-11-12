//	Declare vector utilities class
class VectorUtils {

	//	Calculate the magnitude of a vector
	static magnitude (vector) {

		//	Calculate magnitude of the vector
		const sqrMagnitude = VectorUtils.sqrMagnitude(vector);
		const magnitude = Math.sqrt(sqrMagnitude);

		//	Return magnitude of the vector
		return magnitude;

	}

	//	Calculate the squared magnitude of a vector
	static sqrMagnitude (vector) {

		//	Calculate squared magnitude of the vector
		const sqrMagnitude = vector.value.reduce((a, b) => a + Math.pow(b, 2), 0);

		//	Return squared sum of the vector
		return sqrMagnitude;

	}

	//	Normalize a given vector and returns the unit vector representation
	static normalize (vector) {

		//	Divide the vector by the magnitude and return it
		return vector.divide(vector.magnitude);

	}

	//	Converts an array to a vector of the same magnitude
	static arrayToVector (array) {

		//	Create a new vector with the array
		let resultVector;
		if (array.length === 3) resultVector = new Vector3(...array);
		if (array.length === 4) resultVector = new Vector4(...array);

		//	Return result vector
		return resultVector;

	}



	//	Calculates the dot product of two vectors
	static dot (a, b) {

		//	If vectors are not of equal dimension then return undefined
		if (a.dimension !== b.dimension) return undefined;

		//	Declare variable to hold the resulting sum
		let resultSum = 0;

		//	Loop through each component of the vector
		for (let i = 0; i < a.value.length; i++) {

			//	Calculate product of components and add them to the resulting sum
			resultSum += a.value[i] * b.value[i];

		}

		//	Return resulting sum
		return resultSum;

	}

}

//	Declare vector class
class Vector {

	//	Declare public properties
	#value = [];
	#dimension;
	#magnitude;
	#sqrMagnitude;
	#normalized;

	//	Declare private properties
	#updateDimension = true;
	#updateMagnitude = true;
	#updateSqrMagnitude = true;
	#updateNormalized = true;



	//	Define constructor method
	constructor () {}



	//	Set the value of the vector
	set value (newValue) {

		//	If the new value is not a list then dont do anything
		if (!Array.isArray(newValue)) return;

		//	Set the new value of the vector
		this.#value = newValue;

		//	Tell the vector to update its properties next time
		this.#updateDimension = true;
		this.#updateMagnitude = true;
		this.#updateSqrMagnitude = true;
		this.#updateNormalized = true;

	}
	
	
	
	//	Get the value of the vector
	get value () {

		//	Return vector value
		return this.#value;

	}
	
	//	Get the dimension of the vector
	get dimension () {

		//	Check if we should be updating the vector's dimension
		if (this.#updateDimension) this.#dimension = this.value.length;

		//	No need to update the dimension anymore since we already updated it
		this.#updateDimension = false;

		//	Return length of the vector
		return this.#dimension;

	}

	//	Get the magnitude of the vector
	get magnitude () {

		//	Check if we should be updating the vector's magnitude
		if (this.#updateMagnitude) this.#magnitude = VectorUtils.magnitude(this);

		//	No need to update the magnitude anymore since we already updated it
		this.#updateMagnitude = false;

		//	Return magnitude of the vector
		return this.#magnitude;

	}

	//	Get the squared magnitude of the vector
	get sqrMagnitude () {

		//	Check if we should be updating the vector's squared magnitude
		if (this.#updateSqrMagnitude) this.#sqrMagnitude = VectorUtils.sqrMagnitude(this);

		//	No need to update the sqaured magnitude anymore since we already updated it
		this.#updateSqrMagnitude = false;

		//	Return sqaured magnitude of the vector
		return this.#sqrMagnitude;

	}

	//	Get the normalized vector
	get normalized () {

		//	Check if we should be updating the normalized vector
		if (this.#updateNormalized) this.#normalized = VectorUtils.normalize(this);

		//	No need to update the normalized vector anymore since we already updated it
		this.#updateNormalized = false;

		//	Return normalized vector
		return this.#normalized;

	}



	//	Copies the given vector
	copy () {

		//	Return a copy of the vector
		return VectorUtils.arrayToVector(this.#value);

	}


	
	//	Adds 1 or more vectors and returns the result
	add (...vectors) {

		//	Declare variable to hold temporary result of each operation
		let result = this.value;

		//	Loop through each vector
		vectors.forEach((vector) => {

			//	Add each element of the 2 vectors together
			result = result.map((elem, i) => elem + (vector.value[i] || 0));

		});

		//	Return the result
		return VectorUtils.arrayToVector(result);

	}

	//	Adds 1 or more vectors to this vector
	addTo (...vectors) {

		//	Call add function on this vector and overwrite
		this.value = this.add(...vectors).value;
		return this;

	}

	//	Subtracts 1 or more vectors from this vector
	subtract (...vectors) {

		//	Declare variable to hold temporary result of each operation
		let result = this.value;

		//	Loop through each vector
		vectors.forEach((vector) => {

			//	Add each element of the 2 vectors together
			result = result.map((elem, i) => elem - (vector.value[i] || 0));

		});

		//	Return the result
		return VectorUtils.arrayToVector(result);

	}

	//	Subtracts 1 or more vectors from this vector
	subtractFrom (...vectors) {

		//	Call subtract function on this vector and overwrite
		this.value = this.subtract(...vectors).value;
		return this;

	}

	//	Calculates the product of this vector with a scalar
	multiply (alpha) {

		//	Loop through each element of this vector and multiply it by alpha
		let result = this.value.map((elem, i) => elem * alpha);

		//	Return the result
		return VectorUtils.arrayToVector(result);

	}

	//	Multiplies this vector by a scalar
	multiplyBy (alpha) {

		//	Call multiply function on this vector and overwrite
		this.value = this.multiply(alpha).value;
		return this;

	}

	//	Calculates the factor of this vector with a scalar
	divide (alpha) {

		//	If we try to divide by zero then exit
		if (alpha === 0) return this;

		//	Loop through each element of this vector and multiply it by alpha
		let result = this.value.map((elem, i) => elem / alpha);

		//	Return the result
		return VectorUtils.arrayToVector(result);

	}

	//	Divides this vector by a scalar
	divideBy (alpha) {

		//	Call divide function on this vector and overwrite
		this.value = this.divide(alpha).value;
		return this;

	}



	//	Calculate the dot product of this vector and another vector
	dot (vector) {

		//	Calculate dot product and return the result
		return VectorUtils.dot(this, vector);

	}

}

//	Declare vector 2 subclass
class Vector2 extends Vector {

	//	Define constructor method
	constructor (x = 0, y = 0) {

		//	Avoid exceptions
		super();

		//	Set new value of the vector
		this.value = [ x, y ];

	}

}

//	Declare vector 3 subclass
class Vector3 extends Vector {

	//	Define constructor method
	constructor (x = 0, y = 0, z = 0) {

		//	Avoid exceptions
		super();

		//	Set new value of the vector
		this.value = [ x, y, z ];

	}

}

//	Declare vector 4 subclass
class Vector4 extends Vector {

	//	Define constructor method
	constructor (x = 0, y = 0, z = 0, w = 0) {

		//	Avoid exceptions
		super();

		//	Set new value of the vector
		this.value = [ x, y, z, w ];

	}

}
