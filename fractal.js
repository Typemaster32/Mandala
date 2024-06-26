class Fractal {
	/*
	Fractals is the geometrical pattern of each basic element.
	Fractals ONLY handles shape.
	x,y,angle,borderDistance are handled in
		1. constructor: give it an original shape; The shape, color... are stored here;
			inputs are: x,y:coordinate of anchor(should be the center); borderDistance: the size in pixels for reference, like the (distance between itself and neighbot's anchor points)/2, to avoid overlapping. Depends on the situation.
		2. show: show the current shape with in the format:
			this.shapes = 
			[
				[
					[x1,y1,x2,y2], // if it's a line
					[x1,y1,x2,y2,angle], // if it's an arc
					[x1,y1,x2,y2,startStroke,endStroke] // straight vabrating line
					...
				],
				...
			] //each one of this child array is for having a different style.
			this.settings = 
			[
				{
					stroke: [0, 0, 0, 1],
					strokeWeight: 1,
				},
				...
			];
		3. *transition(showInTransition): 
			
		4. copy
			example => .copy(x,y) => elements to be put in array
			it's like creating a new fractal with the shapes and settings coming from the example.




	*/
	constructor(x, y,angle, borderDistance,name="default", r=0, g=0, b=0,) {
		this.center = createVector(x, y)
		this.angle = angle
		this.d = borderDistance
		this.name = name
		this.settings = [
			{
				stroke: [r, g, b, 255],
				strokeWeight: 2,
			},
			/*
			{
				stroke: [0, 0, 255, 1],
				strokeWeight: 1,
			},
			*/
		];
		this.shapes = [
			[
				[-1, 1, -1, -1],
				[-1, -1, 1, -1],
				[1, -1, 1, 1],
				[1, 1, -1, 1],
			], // a square
			/*
			[
				[-1, 1, -1, -1, PI / 2],
				[-1, -1, 1, -1, PI / 2],
				[1, -1, 1, 1, PI / 2],
				[1, 1, -1, 1, PI / 2],
			], // a circle
			*/
		];
	}

	show() {
		/*
		Make sure this.shapes.length == this.settings.length
		*/
        push();
        translate(this.center.x, this.center.y);
        rotate(this.angle);
        for (let i = 0; i < this.shapes.length; i++) {
            strokeWeight(this.settings[i].strokeWeight);
            // Dynamically use the updated stroke color
            stroke(this.settings[i].stroke[0], this.settings[i].stroke[1], this.settings[i].stroke[2], this.settings[i].stroke[3]);
            for (let j = 0; j < this.shapes[i].length; j++) {
                drawLine(this.shapes[i][j], this.d);
            }
        }
        pop();
	}


    updateColor(r, g, b) {
        for (let setting of this.settings) {
            setting.stroke[0] = r;
            setting.stroke[1] = g;
            setting.stroke[2] = b;
        }
    }

	copy(x=0,y=0,angle=0,borderDistance=1){
		let copiedInstance = new Fractal(x,y,angle,borderDistance)
		copiedInstance.settings = this.settings
		copiedInstance.shapes = this.shapes
		copiedInstance.name = this.name
		return copiedInstance
	}

	transition(origin, target, originPercentage) {
		/* 
		1. Make sure this.shapes.length == this.settings.length == targetShapes.length == targetSettings.length
		2. origin is copied from current at start.
		*/
		let targetSettings=target.settings;
		let targetShapes=target.shapes;
		let originSettings=origin.settings;
		let originShapes=origin.shapes;
		let currentOnly = 0
		let adding = 0
		let losing = 0
		let percentage
		// let percentage = Math.sqrt(originPercentage)
		// percentage = originPercentage/percentageCap
		percentage = percentageCap /2
		percentage = originPercentage*3
		// let equal = checkFractalBasicEqual(this,target)
		// console.log(equal)


		for (let i = 0; i < originShapes.length; i++) {
			// if (originSettings && targetSettings){let mappedR = customMap(percentage, 0, percentageCap, originSettings[i].stroke[0], targetSettings[i].stroke[0],true)
			// let mappedG = customMap(percentage, 0, percentageCap, originSettings[i].stroke[1], targetSettings[i].stroke[1],true)
			// let mappedB = customMap(percentage, 0, percentageCap, originSettings[i].stroke[2], targetSettings[i].stroke[2],true)
			// let mappedA = customMap(percentage, 0, percentageCap, originSettings[i].stroke[3], targetSettings[i].stroke[3],true)
			// let mappedStroke = [mappedR, mappedG, mappedB, mappedA]
			// // let mappedStrokeWeight = customMap(percentage, 0, percentageCap, originSettings[i].strokeWeight, targetSettings[i].strokeWeight)
			// this.settings[i].stroke=mappedStroke}
			// this.settings[i].strokeWeight=mappedStrokeWeight
			// console.log("mappedStroke",mappedStroke)
			// indexer = customMap(originPercentage,0,percentageCap,originShapes[0][0][0],targetShapes[0][0][0])
			if (targetShapes[i].length > originShapes[i].length) { // in this case we need to add lines;
				adding++
				for (let j = 0; j < originShapes[i].length; j++) { // the current lines
					let mappedLine = getLineInTransition(originShapes[i][j], targetShapes[i][j], percentage)
					this.shapes[i][j]=mappedLine
				}
				for (let j = originShapes[i].length; j < targetShapes[i].length; j++) { // the lines to be added (growing from midpoint)
					let dissappearState = getLineToDisappearState(targetShapes[i][j]);
					let mappedLine = getLineInTransition(dissappearState, targetShapes[i][j], percentage)
					this.shapes[i][j]=mappedLine
				}
			} else if (targetShapes[i].length < originShapes[i].length) { // and this is to delete lines;
				losing++
				for (let j = 0; j < targetShapes[i].length; j++) { // the current lines
					let mappedLine = getLineInTransition(originShapes[i][j], targetShapes[i][j], percentage)
					this.shapes[i][j]=mappedLine
				}
				for (let j = targetShapes[i].length; j < originShapes[i].length; j++) { // the lines to be deleted (growing from midpoint)
					let dissappearState = getLineToDisappearState(originShapes[i][j]);
					// console.log(dissappearState)
					let mappedLine = getLineInTransition(originShapes[i][j],dissappearState, percentage)
					this.shapes[i][j]=mappedLine
				}
			} else { // don't need to change number;
				for (let j = 0; j < originShapes[i].length; j++) { // the current lines
					currentOnly ++
					let mappedLine = getLineInTransition(originShapes[i][j], targetShapes[i][j], percentage)
					this.shapes[i][j]=mappedLine
				}
			}
		}
		// console.table(this.shapes[0])
		// console.log(adding,losing,currentOnly)
	}
}