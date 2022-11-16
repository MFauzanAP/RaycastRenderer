//	Declare color utilities class
class ColorUtils {

	//	Converts an array to a color of the same magnitude
	static arrayToColor (array) {

		//	Return result color
		return new Color(...array);

	}



	//	Changes the exposure of the given color by a specified amount
	static shade (color, value) {

		//	Clamp shade color from -1 to 1
		value = MathUtils.clamp(value, -1, 1);

		//	Change color exposure based on value
		let result = color.value.map((elem, i) => i < 3 ? (MathUtils.clamp((elem / 255) + value, 0, 1) * 255) : 255);

		//	Multiply each color by the amount
		return ColorUtils.arrayToColor(result);
		
	}

}

//	Declare color class
class Color {

	//	Declare public properties
	#value = [ 0, 0, 0, 255 ];



	//	Define constructor method
	constructor (r = 0, g = 0, b = 0, a = 255) {

		//	Clamp each component to 0 and 255
		const finalR = MathUtils.clamp(r, 0, 255);
		const finalG = MathUtils.clamp(g, 0, 255);
		const finalB = MathUtils.clamp(b, 0, 255);
		const finalA = MathUtils.clamp(a, 0, 255);

		//	Set value of the color
		this.#value = [ finalR, finalG, finalB, finalA ];

	}



	//	Set the value of the color
	set value ([ r, g, b, a ]) {

		//	Declare a variable to hold the final color
		const finalColor = this.#value;

		//	Set each component of the color if provided
		if (r !== undefined) finalColor[0] = MathUtils.clamp(r, 0, 255);
		if (g !== undefined) finalColor[1] = MathUtils.clamp(g, 0, 255);
		if (b !== undefined) finalColor[2] = MathUtils.clamp(b, 0, 255);
		if (a !== undefined) finalColor[3] = MathUtils.clamp(a, 0, 255);

		//	Save the final color
		this.#value = finalColor;

	}

	//	Set the red component of the color
	set r (value) {

		//	Declare a variable to hold the final color
		const finalColor = this.#value;

		//	Set the red component to the clamped value
		finalColor[0] = MathUtils.clamp(value, 0, 255);

		//	Save the final color
		this.#value = finalColor;

	}

	//	Set the green component of the color
	set g (value) {

		//	Declare a variable to hold the final color
		const finalColor = this.#value;

		//	Set the green component to the clamped value
		finalColor[1] = MathUtils.clamp(value, 0, 255);

		//	Save the final color
		this.#value = finalColor;

	}

	//	Set the blue component of the color
	set b (value) {

		//	Declare a variable to hold the final color
		const finalColor = this.#value;

		//	Set the blue component to the clamped value
		finalColor[2] = MathUtils.clamp(value, 0, 255);

		//	Save the final color
		this.#value = finalColor;

	}

	//	Set the alpha component of the color
	set a (value) {

		//	Declare a variable to hold the final color
		const finalColor = this.#value;

		//	Set the alpha component to the clamped value
		finalColor[3] = MathUtils.clamp(value, 0, 255);

		//	Save the final color
		this.#value = finalColor;

	}
	
	
	
	//	Get the value of the color
	get value () {

		//	Return color value
		return this.#value;

	}
	
	//	Get the red component of the color
	get r () {

		//	Return red component of the color
		return this.#value[0];

	}

	//	Get the green component of the color
	get g () {

		//	Return green component of the color
		return this.#value[1];

	}

	//	Get the blue component of the color
	get b () {

		//	Return blue component of the color
		return this.#value[2];

	}

	//	Get the alpha component of the color
	get a () {

		//	Return alpha component of the color
		return this.#value[3];

	}



	//	Copies the given color
	copy () {

		//	Return a copy of the color
		return ColorUtils.arrayToColor(this.#value);

	}


	
	//	Adds 1 or more colors together and returns the result
	add (...colors) {

		//	Declare variable to hold temporary result of each operation
		let result = this.value;

		//	Loop through each color
		colors.forEach((color) => {

			//	Add each element of the 2 colors together
			result = result.map((elem, i) => elem + (color.value[i] || 0));

		});

		//	Return the result
		return ColorUtils.arrayToColor(result);

	}

	//	Adds 1 or more colors to this color
	addTo (...colors) {

		//	Call add function on this color and overwrite
		this.value = this.add(...colors).value;
		return this;

	}

	//	Subtracts 1 or more colors from this color
	subtract (...colors) {

		//	Declare variable to hold temporary result of each operation
		let result = this.value;

		//	Loop through each color
		colors.forEach((color) => {

			//	Add each element of the 2 colors together
			result = result.map((elem, i) => elem - (color.value[i] || 0));

		});

		//	Return the result
		return ColorUtils.arrayToColor(result);

	}

	//	Subtracts 1 or more colors from this color
	subtractFrom (...colors) {

		//	Call subtract function on this color and overwrite
		this.value = this.subtract(...colors).value;
		return this;

	}

	//	Calculates the product of this color with a scalar
	multiply (alpha) {

		//	Loop through each element of this color and multiply it by alpha
		let result = this.value.map((elem, i) => elem * alpha);

		//	Return the result
		return ColorUtils.arrayToColor(result);

	}

	//	Calculates the product of this color with another color
	multiplyColor (color) {

		//	Loop through each element of this color and multiply it by the corresponding
		let result = this.value.map((elem, i) => elem * (color.value[i] || 0));

		//	Return the result
		return ColorUtils.arrayToColor(result);

	}

	//	Multiplies this color by a scalar
	multiplyBy (alpha) {

		//	Call multiply function on this color and overwrite
		this.value = this.multiply(alpha).value;
		return this;

	}

	//	Calculates the factor of this color with a scalar
	divide (alpha) {

		//	If we try to divide by zero then exit
		if (alpha === 0) return this;

		//	Loop through each element of this color and multiply it by alpha
		let result = this.value.map((elem, i) => elem / alpha);

		//	Return the result
		return ColorUtils.arrayToColor(result);

	}

	//	Calculates the factor of this color with another color
	divideColor (color) {

		//	Loop through each element of this color and multiply it by the corresponding
		let result = this.value.map((elem, i) => (color.value[i] || 0) === 0 ? 255 : elem / color.value[i]);

		//	Return the result
		return ColorUtils.arrayToColor(result);

	}

	//	Divides this color by a scalar
	divideBy (alpha) {

		//	Call divide function on this color and overwrite
		this.value = this.divide(alpha).value;
		return this;

	}



	//	Generates a new color from this one shaded by the given value
	shade (value) {

		//	Call the shade function on this color and overwrite
		return ColorUtils.shade(this, value);

	}
	
	//	Sets the shade of this color by a given amount
	shadeBy (value) {

		//	Call the shade function on this color and overwrite
		this.#value = this.shade(value).value;
		return this;

	}

}
