class Arrangement {
	/*
	Arrangement class serves as a 2D array "data" that consists of [x,y,angle,size];
		0. constructor: make an instance with the default state 

		1. transition: in a period of time, change into another

		2. Mutates(calling something from fractal):
			ripple: in a period of time, with a specific sequence, change the "shapes" of each basic element

		3. Moves(changing x,y,angle,borderDistance):
			rotate:
				orbit: in a period of time, change x,y and maybe angle to make the elements rotate towards the center of canvas;
				selfRotate: simply change angle;
			resize: 
				Zoom: in a period of time, change x,y and size to zoom in/out
			whatever

		4. copy: returns an identical copy of "this"
		...
	*/
	constructor() {
		let CanvasDivision = 16;
		/* 
		This is for making the default layout illustration:
		* +-----------------------------------+
		* | . point(0,0)                      |
		* |                                   |
		* |                                   |
		* ║‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾║
		* ║                                   ║
		* ║                                   ║
		* ║                Canvas             ║
		* ║                                   ║
		* ║                                   ║
		* ║___________________________________║
		* |                                   |
		* |            Actual Contents        |
		* |                                   |
		* +-----------------------------------+
		This layout is necessary for the rotating.
		*/
		this.data = [];
		const centerX = width / 2;
		const centerY = height / 2;// Center of the canvas
		const slice = max(width, height) / CanvasDivision // minimal unit of fractals
		for (let i = 0; i < CanvasDivision; i++) {
			const x = (i + 0.5) * slice; // Midpoint of the slice for x
			this.data[i] = [];
			for (let j = 0; j < CanvasDivision; j++) {
				const y = (j + 0.5) * slice; // Midpoint of the slice for y
				const dx = x - centerX; // Distance from center in X
				const dy = y - centerY; // Distance from center in Y
				const angle = Math.atan2(dy, dx) - PI / 2; // Calculate angle in radians
				this.data[i][j] = [x, y, angle, standardBorderDistance];
			}
		}
	}

	transition(originArrangement, targetArrangement, percentage) {
		/*
		Transition is happening with a period of time, which means it should be constantly called and returning gradual values in between.
			1. Inputs: 
				origin is the copy of itself at origin state.
				target is the 2D array in the same format of "this.data"; 
				percentage is the progress from original to the target, a float from 0(start) to 1(complete)
			2. Returns: This modify itself instead of return.
		*/
		// console.log(checkArrangementEqual(originArrangement, targetArrangement))
		if (checkArrangementEqual(srArrangement, targetArrangement)){
			console.log("Arrangement Overlapped")
			 terminate()
			}

		let origin = originArrangement.data
		let target = targetArrangement.data
		for (let i = 0; i < target.length; i++) {
			for (let j = 0; j < target[0].length; j++) {
				this.data[i][j][0] = map(percentage, 0, percentageCap, origin[i][j][0], target[i][j][0], true)
				this.data[i][j][1] = map(percentage, 0, percentageCap, origin[i][j][1], target[i][j][1], true)
				this.data[i][j][2] = map(percentage, 0, percentageCap, origin[i][j][2], target[i][j][2], true)
				this.data[i][j][3] = map(percentage, 0, percentageCap, origin[i][j][3], target[i][j][3], true)
			}
		}
	}

	copy() {
		let copiedInstance = new Arrangement();
		for (let key in this) {
			if (this.hasOwnProperty(key)) {
				copiedInstance[key] = this[key];
			}
		}
		return copiedInstance
	}


	getDataWithCoordinates(x, y) {
		if (x >= 0 && x < this.data.length && y >= 0 && y < this.data[x].length) {
			return this.data[x][y];
		} else {
			return null; // Out of bounds
		}
	}

}
