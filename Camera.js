//	Declare camera class
class Camera {

	//	Declare static properties
	static nearPlane = 1;
	static farPlane = 1000;

	//	Declare public properties
	position = new Vector3(0, 0, 0);
	fov = 60;
	skyColor = new Vector4(0, 0, 0, 255);

	//	Declare private properties
	#viewport;



	//	Define constructor method
	constructor () {

		//	Calculate ratio between width and height
		const ratio = canvas.width / canvas.height;

		//	Set camera viewport
		this.#viewport = {
			width		: 1.75,
			height		: 1,
			distance	: 1,
		};

	}



	//	Converts a 2d pixel coordinate to a 3d viewport coordinate
	pixelToViewport (x, y) {

		//	Scale x and y coordinate to match the viewport dimensions
		const scaledX = (x - (canvas.width / 2)) * (this.#viewport.width / canvas.width);
		const scaledY = ((canvas.height / 2) - y) * (this.#viewport.height / canvas.height);

		//	Calculate final viewport coordinates relative to the camera position
		const viewportCoord = this.position.add(new Vector3(scaledX, scaledY, this.#viewport.distance));

		//	Return final viewport coordinates
		return viewportCoord;

	}

}
