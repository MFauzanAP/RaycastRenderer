//	Global variables
let camera;
let canvas;
let ctx;

//	Constants
const skyColor = new Vector4(0, 0, 0, 255);

//	Declare objects in the scene
const sceneSpheres = [
	{
		color		: new Vector4(255, 0, 0, 255),
		center		: new Vector3(0, -1, 3),
		radius		: 1,
	},
	{
		color		: new Vector4(0, 0, 255, 255),
		center		: new Vector3(2, 0, 4),
		radius		: 1,
	},
	{
		color		: new Vector4(0, 255, 0, 255),
		center		: new Vector3(-2, 0, 4),
		radius		: 1,
	},
];

//	Function to get a pixels rgb values from an x and y coordinate
const getPixelAt = (x, y, imageData) => {

	//	Calculate index from x and y coordinate
	const yIndex = y * imageData.width * 4;
	const xIndex = x * 4;
	const finalIndex = yIndex + xIndex;

	//	Return pixel at this index
	return new Vector4(...imageData.data.slice(finalIndex, finalIndex + 4));

};

//	Function to set a pixels rgb values from an x and y coordinate
const setPixelAt = (color, x, y, imageData) => {

	//	Calculate index from x and y coordinate
	const yIndex = y * imageData.width * 4;
	const xIndex = x * 4;
	const finalIndex = yIndex + xIndex;

	//	Change pixel values at this index
	for (let i = 0; i < 4; i++) imageData.data[finalIndex + i] = color.value[i];

};

//	Function used to render the final screen using raycasting
const raycastRender = () => {

	//	Prepare initial image
	const outputImage = ctx.getImageData(0, 0, canvas.width, canvas.height);

	//	Loop through each pixel on the screen
	console.log(camera.pixelToViewport(960, 200));
	console.log(camera.pixelToViewport(960, 800));
	// for (let x = 950; x < 970; x++) {
	// 	for (let y = 530; y < 550; y++) {
	for (let x = 0; x < canvas.width; x++) {
		for (let y = 0; y < canvas.height; y++) {

			//	Set color as sky color
			const colorValue = Math.round(Math.random() * 255);
			setPixelAt(skyColor, x, y, outputImage);

			//	Loop through each object in the scene
			for (let i = 0; i < sceneSpheres.length; i++) {

				//	Get instance of object
				const object = sceneSpheres[i];

				//	Formulate necessary equations to calculate coefficients
				const pixelVector = camera.pixelToViewport(x, y).subtract(camera.position);
				const objectVector = object.center.subtract(camera.position);
				// console.log(pixelVector, objectVector);
				// setPixelAt(new Vector4(Math.floor(pixelVector.magnitude / 50) * 50, Math.floor(pixelVector.magnitude / 50) * 50, Math.floor(pixelVector.magnitude / 50) * 50, 255), x, y, outputImage);

				//	Calculate coefficients of the quadratic equation
				const a = VectorUtils.dot(pixelVector, pixelVector);
				const b = 2 * VectorUtils.dot(objectVector, pixelVector);
				const c = VectorUtils.dot(objectVector, objectVector) - Math.pow(object.radius, 2);

				//	Calculate discriminant
				const discriminant = Math.pow(b, 2) - (4 * a * c);
				// console.log(a, b, c, discriminant);
				if (discriminant >= 0) {
					
					const t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
					const t2 = (-b - Math.sqrt(discriminant)) / (2 * a);
					// console.log(t1, t2);
					setPixelAt(object.color, x, y, outputImage);

				}

			}

		}
	}

	//	Draw image to canvas
	console.log(outputImage);
	ctx.putImageData(outputImage, 0, 0);

};

//	When window is loaded
document.addEventListener('DOMContentLoaded', () => {

	//	Set global variables
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	camera = new Camera();

	//	Initialise canvas
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	//	Set up objects
	const vector = new Vector3(1, 2, 3);
	const newVector = vector.add(new Vector3(3, 2, 1), new Vector3(3, 2, 1));
	console.log(vector);
	console.log(newVector);
	console.log(VectorUtils.dot(vector, newVector));
	console.log(newVector.subtract(new Vector3(3, 2, 1), new Vector3(3, 2, 1)));
	raycastRender();

});