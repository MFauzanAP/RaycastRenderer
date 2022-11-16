//	Declare camera class
class Camera {

	//	Declare public properties
	position;
	fov;
	skyColor = new Color(0, 0, 0, 255);

	//	Declare private properties
	#nearPlane = 1;
	#farPlane = 1000;
	#nearViewport;
	#farViewport;



	//	Define constructor method
	constructor (position = new Vector3(0, 0, 0), fov = 60) {

		//	Calculate ratio between width and height
		const ratio = canvas.width / canvas.height;

		//	Change fov to radians
		const fovRadians = fov * (Math.PI / 180);

		//	Calculate near viewport size and update it
		const nearHeight = 2 * Math.tan(fovRadians / 2) * this.#nearPlane;
		const nearWidth = nearHeight * ratio;
		this.#nearViewport = {
			width		: nearWidth,
			height		: nearHeight,
			distance	: this.#nearPlane,
		};

		//	Calculate far viewport size and update it
		const farHeight = 2 * Math.tan(fovRadians / 2) * this.#farPlane;
		const farWidth = farHeight * ratio;
		this.#farViewport = {
			width		: farWidth,
			height		: farHeight,
			distance	: this.#farPlane,
		};

		//	Set camera position and fov
		this.position = position;
		this.fov = fov;

	}



	//	Converts a 2d pixel coordinate to a 3d viewport coordinate
	pixelToViewport (x, y) {

		//	Scale x and y coordinate to match the viewport dimensions
		const scaledX = (x - (canvas.width / 2)) * (this.#nearViewport.width / canvas.width);
		const scaledY = ((canvas.height / 2) - y) * (this.#nearViewport.height / canvas.height);

		//	Calculate final viewport coordinates relative to the camera position
		const viewportCoord = this.position.add(new Vector3(scaledX, scaledY, this.#nearPlane));

		//	Return final viewport coordinates
		return viewportCoord;

	}

}
