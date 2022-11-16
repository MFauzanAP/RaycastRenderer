//	Global variables
let camera;
let canvas;
let ctx;

//	Constants
const skyColor = new Color(0, 0, 0, 255);

//	Declare objects in the scene
const sceneSpheres = [
	{
		color		: new Color(255, 0, 0, 255),
		center		: new Vector3(0, -0.5, 8),
		radius		: 1,
	},
	{
		color		: new Color(0, 0, 255, 255),
		center		: new Vector3(1, 0.5, 8),
		radius		: 1,
	},
	{
		color		: new Color(0, 255, 0, 255),
		center		: new Vector3(-1, -0.5, 8),
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
	return new Color(...imageData.data.slice(finalIndex, finalIndex + 4));

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
	for (let x = 0; x < canvas.width; x++) {
		for (let y = 0; y < canvas.height; y++) {

			//	Keep track of the closest object
			let minimum = Infinity;

			//	Keep track of the final color of this pixel
			let finalColor = skyColor;

			//	Loop through each object in the scene
			for (let i = 0; i < sceneSpheres.length; i++) {

				//	Get instance of object
				const object = sceneSpheres[i];

				//	Formulate necessary equations to calculate coefficients
				const pixelVector = camera.pixelToViewport(x, y).subtract(camera.position);
				const objectVector = object.center.subtract(camera.position);

				//	Calculate coefficients of the quadratic equation
				const a = VectorUtils.dot(pixelVector, pixelVector);
				const b = 2 * VectorUtils.dot(objectVector, pixelVector);
				const c = VectorUtils.dot(objectVector, objectVector) - Math.pow(object.radius, 2);

				//	Calculate discriminant
				const discriminant = Math.pow(b, 2) - (4 * a * c);

				//	If there is an intersection
				if (discriminant >= 0) {
					
					//	Calculate intersection point
					const t1 = (-b + Math.sqrt(discriminant)) / (2 * a);
					const t2 = (-b - Math.sqrt(discriminant)) / (2 * a);
					const intersectionPoint = camera.position.add(pixelVector.multiply(Math.max(t1, t2)));

					//	Calculate distance between this object and the camera
					const distance = VectorUtils.distance(camera.position, intersectionPoint);

					//	If this point is closer to the camera than the previous closest object
					if (distance < minimum) {

						//	Set a new minimum distance
						minimum = distance;

						//	Set the final color to the color of this object
						finalColor = object.color.shade((Math.random() * 2) - 1);

					}

				}

			}

			//	Color the pixel with the final color
			setPixelAt(finalColor, x, y, outputImage);

		}
	}

	//	Draw image to canvas
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
	console.log(MathUtils.clamp(0.99, -1, 1));
	console.log(new Color(255, 0, 0, 255).shade(0.5));
	raycastRender();

});