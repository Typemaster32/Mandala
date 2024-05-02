function drawLine(lineObject, borderDistance, standardStrokeWeight = 1) {
	/*
	1. This function handles all kine of lines, including:
		[x1,y1,x2,y2] "straight line"
		[x1,y1,x2,y2,angle] "arc" --in p5.js, it's (x,y,w,h,angleA,angleB)
		[x1,y1,x2,y2,startSW,endSW] "straight vibrating line"
		[x1,y1,x2,y2,angle,startSW,endSW] "vibrating arc"
	2. if it involves any desired strokeWeight, input "standardStrokeWeight" is needed.
	3. "startSW,endSW" are "factor - 1" instead of direct strokeWeights. For example: -0.5,0.5
	*/
	// console.log(lineObject)
	let [x1, y1, x2, y2, ...rest] = lineObject;
	let centerX, centerY, radius, startAngleRad, endAngleRad, angle;
	// if(x1-x2 <0.0001 && y1-y2<0.0001) return
	x1 *= borderDistance
	y1 *= borderDistance
	x2 *= borderDistance
	y2 *= borderDistance
	// console.log(x1)
	let toleranceDrawline = 0.1
	if (Math.abs(x1 - x2) <= toleranceDrawline && Math.abs(y1 - y2) <= toleranceDrawline) return
	if (lineObject.length === 4) { // Straight line
		line(x1, y1, x2, y2);
	} else if (lineObject.length === 5) { // Arc
		angle = lineObject[4];
		findCircleProperties(x1, y1, x2, y2, angle)
	} else if (lineObject.length === 6) { // Vibrating straight line
		let [startSW, endSW] = [lineObject[4], lineObject[5]];
		let edgeLength = dist(x1, y1, x2, y2);
		let step = 1 / edgeLength;

		for (let t = 0; t <= 1; t += step) {
			let startX = lerp(x1, x2, t);
			let startY = lerp(y1, y2, t);
			let endX = lerp(x1, x2, t + step);
			let endY = lerp(y1, y2, t + step);

			let sw = lerp((startSW + 1) * standardStrokeWeight, (endSW + 1) * standardStrokeWeight, t);
			strokeWeight(sw);
			line(startX, startY, endX, endY);
		}
	} else if (lineObject.length === 7) { // Vibrating arc
		push();
		angle = lineObject[4];
		let [startSW, endSW] = [lineObject[5], lineObject[6]];
		centerX = (x1 + x2) / 2;
		centerY = (y1 + y2) / 2;
		radius = dist(x1, y1, x2, y2) / 2;
		startAngleRad = atan2(y1 - centerY, x1 - centerX);
		endAngleRad = startAngleRad + radians(angle);

		let edgeLength = radians(angle) * radius; // Arc length
		let step = 1 / edgeLength;

		for (let t = 0; t <= 1; t += step) {
			let currentAngle = lerp(startAngleRad, endAngleRad, t);
			let nextAngle = lerp(startAngleRad, endAngleRad, t + step);
			let startX = centerX + radius * cos(currentAngle);
			let startY = centerY + radius * sin(currentAngle);
			let endX = centerX + radius * cos(nextAngle);
			let endY = centerY + radius * sin(nextAngle);

			let sw = lerp((startSW + 1) * standardStrokeWeight, (endSW + 1) * standardStrokeWeight, t);
			strokeWeight(sw);
			line(startX, startY, endX, endY);
		}
		pop();
	}
}

function getLineInTransition(beginState, endState, percentage) {
	/*
	This function get's the state of a lineObject in transmition in between beginState and endState.
	┌────────────────────┬──────────┬────────┬─────────────────────┬──────────────┐
	│        ╔══>        │ straight │ arc    │ vibrating straight  │vibrating arc │
	├────────────────────┼──────────┼────────┼─────────────────────┼──────────────┤
	│      straight      │    4     │4->5->5 │    4->6 (pass sw)   │4->7 (pass sw)│
	├────────────────────┼──────────┼────────┼─────────────────────┼──────────────┤
	│         arc        │ 5->5->4  │   5    │        5->7->6      │5->7          │
	├────────────────────┼──────────┼────────┼─────────────────────┼──────────────┤
	│ vibrating straight │ 4->6     │6->7->5 │          6          │6->7          │
	├────────────────────┼──────────┼────────┼─────────────────────┼──────────────┤
	│   vibrating arc    │ 7->7->4  │7->7->5 │        7->7->6      │7             │
	└────────────────────┴──────────┴────────┴─────────────────────┴──────────────┘
	There are two conditions: largerArray => smallerArray  vs  smallerArray => largerArray
	*/
	// if (beginState.length > endState.length) {
	// 	transitionState = [...beginState];
	// 	for (let i = endState.length; i < beginState.length; i++) {
	// 		transitionState[i] = customMap(percentage, 0, percentageCap, beginState[i], 0)
	// 	}
	// } else if (beginState.length <= endState.length) {
	// 	transitionState = [...beginState];
	// 	for (let i = beginState.length; i < endState.length; i++) {
	// 		transitionState[i] = customMap(percentage, 0, percentageCap, 0, endState[i])
	// 	}
	// }
	let transitionState = [...beginState]
	// console.table(beginState)

	for (let i = 0; i < min(beginState.length, endState.length); i++) {
		transitionState[i] = customMap(percentage, 0, percentageCap, beginState[i], endState[i])
		// console.log(transitionState[i])
	}
	if (beginState.length > endState.length) {
		if (beginState.length == 5) { //5->4
			transitionState[4] = customMap(percentage, 0, percentageCap, beginState[4], 0)
		} else if (beginState.length == 6) { // 6->(7)->5 / 6->4
			if (endState.length == 5) {//6->5
				transitionState[4] = customMap(percentage, 0, percentageCap, 0, endState[4])
				transitionState[5] = customMap(percentage, 0, percentageCap, beginState[4], 1)
				transitionState.push(customMap(percentage, 0, percentageCap, beginState[5], 1))
			} else {//6->4
				transitionState[4] = customMap(percentage, 0, percentageCap, beginState[4], 0)
				transitionState[5] = customMap(percentage, 0, percentageCap, beginState[5], 0)
			}
		} else {// 7->4 / 7->5 / 7>6
			if (endState.length == 4) { // 7->4
				transitionState[4] = customMap(percentage, 0, percentageCap, beginState[4], 0)
				transitionState[5] = customMap(percentage, 0, percentageCap, beginState[5], 1)
				transitionState[6] = customMap(percentage, 0, percentageCap, beginState[6], 1)
			} else if (endState.length == 5) { // 7->5
				transitionState[4] = customMap(percentage, 0, percentageCap, beginState[4], endState[4])
				transitionState[5] = customMap(percentage, 0, percentageCap, beginState[5], 1)
				transitionState[6] = customMap(percentage, 0, percentageCap, beginState[6], 1)
			} else { //7->6
				transitionState[4] = customMap(percentage, 0, percentageCap, beginState[4], 0)
				transitionState[5] = customMap(percentage, 0, percentageCap, beginState[5], endState[4])
				transitionState[6] = customMap(percentage, 0, percentageCap, beginState[6], endState[5])
			}
		}
	} else if (beginState.length < endState.length) {
		if (beginState.length == 4) { // 4->5 / 4->6 / 4->7
			if (endState.length == 5) { // 4->5
				transitionState.push(customMap(percentage, 0, percentageCap, 0, endState[4]))
			} else if (endState.length == 6) { // 4->6
				if (endState[4] != 1)
					transitionState.push(customMap(percentage, 0, percentageCap, 1, endState[4]))
				if (endState[5] != 1)
					transitionState.push(customMap(percentage, 0, percentageCap, 1, endState[5]))
			} else { //4->7
				transitionState.push(customMap(percentage, 0, percentageCap, 0, endState[4]))
				if (endState[5] != 1)
					transitionState.push(customMap(percentage, 0, percentageCap, 1, endState[5]))
				if (endState[6] != 1)
					transitionState.push(customMap(percentage, 0, percentageCap, 1, endState[6]))
			}
		} else if (beginState.length == 5) { // 5->(7)->6 / 5->7
			if (endState.length == 6) {//5->(7)->6
				transitionState[4] = customMap(percentage, 0, percentageCap, beginState[4], 0)
				if (endState[4] != 1)
					transitionState.push(customMap(percentage, 0, percentageCap, 1, endState[4]))
				if (endState[5] != 1)
					transitionState.push(customMap(percentage, 0, percentageCap, 1, endState[5]))
			} else {//5->7
				transitionState[4] = customMap(percentage, 0, percentageCap, beginState[4], endState[4])
				if (endState[5] != 1)
					transitionState.push(customMap(percentage, 0, percentageCap, 1, endState[5]))
				if (endState[6] != 1)
					transitionState.push(customMap(percentage, 0, percentageCap, 1, endState[6]))
			}
		} else {// 6->7
			transitionState[4] = customMap(percentage, 0, percentageCap, 0, endState[4])
			transitionState[5] = customMap(percentage, 0, percentageCap, beginState[4], endState[5])
			transitionState.push(customMap(percentage, 0, percentageCap, beginState[5], endState[6]))

		}
	}


	return transitionState
}

function getLineToDisappearState(lineObject) {
	/*
	This function gives a final state of a line, for it to dissappeare.
	1. For any straights, it's the midpoint;
	2. For any arcs, it's the midpoint on the arc;
	3. It should not have angle, startSW or endSw;
	4. it returns formalized data: [x,y,x,y];
	*/

	let x1 = lineObject[0];
	let y1 = lineObject[1];
	let x2 = lineObject[2];
	let y2 = lineObject[3];

	if (lineObject.length == 5 || lineObject.length == 7) { // situations of an arc
		const angle = lineObject[4]
		const midX = (x1 + x2) / 2;
		const midY = (y1 + y2) / 2;// Calculate distance between (x1, y1) and the midpoint
		const dx = midX - x1;
		const dy = midY - y1;
		const distance = Math.sqrt(dx * dx + dy * dy);// Calculate angle between the line connecting (x1, y1) and the midpoint and the positive x-axis
		const baseAngle = Math.atan2(dy, dx);// Offset the midpoint along this angle by half of the arc's angle
		const offsetX = distance * Math.cos(baseAngle + angle / 2);
		const offsetY = distance * Math.sin(baseAngle + angle / 2);// Calculate the final midpoint on the arc
		const midpointOnArcX = midX + offsetX;
		const midpointOnArcY = midY + offsetY;
		return [midpointOnArcX, midpointOnArcY, midpointOnArcX, midpointOnArcY]
	} else { // straight lines
		let xm = (x1 + x2) / 2;
		let ym = (y1 + y2) / 2;
		return [xm, ym, xm, ym]
	}
}

function duplicate(arrangement, exampleFractal) {
	/*
	This function:
		1. inputs:
			an arrangment;
			an example fractal with desired shapes and settings.(and copy to others); center coordinate does not matter.
		2. returns:
			an array of all the fractals with given x,y,a,bd
	*/

	let fractals = []
	for (let i = 0; i < arrangement.data.length; i++) {
		let thisRow = []
		for (let j = 0; j < arrangement.data[i].length; j++) {
			let x = arrangement.data[i][j][0]
			let y = arrangement.data[i][j][1]
			let angle = arrangement.data[i][j][2]
			let borderDistance = arrangement.data[i][j][3]
			// console.log(arrangement.data[i][j][3])
			let thisCopy = exampleFractal.copy(x, y, angle, borderDistance)
			thisRow.push(thisCopy)
		}
		fractals.push(thisRow)
	}
	return fractals
}

function show(arrangement, fractals) {
	/*
	1. This function shows a frame with an Arrangement and an ARRAY of fractals。
	2. This function gives the x,y,a,bd to each fractal.
	*/
	for (let i = 0; i < arrangement.data.length; i++) {
		for (let j = 0; j < arrangement.data[i].length; j++) {
			fractals[i][j].center.x = arrangement.data[i][j][0]
			fractals[i][j].center.y = arrangement.data[i][j][1]
			fractals[i][j].angle = arrangement.data[i][j][2]
			fractals[i][j].d = arrangement.data[i][j][3]
			fractals[i][j].show()
		}
	}
}





function terminate() {
	/*
	 "terminate" stands for stopping naturally or manually, corresponding to different situations:
		  1. naturally (Arrangement Overlapped)
	 */

	let filename = tgArrangement.name + "---" + tgFractalExample.name
	saveCanvas(filename, 'png')

	srIsTransmiting = false
	srPercentage = 0
	srArrangement = tgArrangement
	console.log("-----------------Transition Terminated")
	orFractalExample = tgFractalExample.copy()
	orArrangement = tgArrangement.copy()
	// srFractals = duplicate(srArrangement, tgFractalExample)	

}


function initiate(color = null) {
	console.log("[initiate]");
	srIsTransmiting = true;
	srPercentage = 0;
	let targetArrangementIndex = 0;

	while (checkArrangementEqual(pasClassical[targetArrangementIndex], srArrangement)) {
		targetArrangementIndex = getRandomElement(pasClassical);
	}
	let targetFractalIndex = getRandomElement(pfsClassical);

	let targetExampleFractal = pfsClassical[targetFractalIndex].copy(); // Assuming there's a method to copy fractal settings
	if (color !== null) {
		console.log("setColor");
		targetExampleFractal.updateColor(...color);  // Ensure color is an array [r, g, b]
	}

	console.log("-----------------Transition Started", "Target Arrangement:", targetArrangementIndex, "Target Fractal:", targetFractalIndex);
	testTransmitArrangement(pasClassical[targetArrangementIndex]);
	testTransmitFractal(targetExampleFractal);
	// console.log(targetExampleFractal.settings[0].stroke);

}


function setColor(exampleFractal, color) {
	console.log("setColor");
	let changedFractal = exampleFractal.copy();
	for (let setting of changedFractal.settings) {
		setting.stroke[0] = color[0]; // Red
		setting.stroke[1] = color[1]; // Green
		setting.stroke[2] = color[2]; // Blue
	}
	return changedFractal;
}

function initiateWithKeywords(keywords) {
	/*
	This function: 
		takes input "keywords" (array)
		uses global variable pas and pfs
		initiates fractalExamples(random one from all qualified) and arrangement(random one from all qualified)
	*/


	console.log("[initiate with keywords]: ", keywords);
	srIsTransmiting = true;
	srPercentage = 0;
	let qualifiedExampleFractals = []
	let qualifiedArrangements = []
	for (const element of pfsClassical) if (isMyNamesInTheKeywords(element, keywords)) qualifiedExampleFractals.push(element)

	for (const element of pfsSpecial) if (isMyNamesInTheKeywords(element, keywords)) qualifiedExampleFractals.push(element)

	for (const element of pasClassical) if (isMyNamesInTheKeywords(element, keywords)) qualifiedArrangements.push(element)

	for (const element of pasSpecial) if (isMyNamesInTheKeywords(element, keywords)) qualifiedArrangements.push(element)

	if (qualifiedExampleFractals.length > 0) {
		let targetFractalIndex = getRandomElement(qualifiedExampleFractals);
		let targetExampleFractal = qualifiedExampleFractals[targetFractalIndex].copy();
		testTransmitFractal(targetExampleFractal);
	} else {
		console.log("No qualified fractals")
	}

	if (qualifiedArrangements.length > 0) {
		let targetArrangementIndex = getRandomElement(qualifiedArrangements);
		testTransmitArrangement(qualifiedArrangements[targetArrangementIndex]);
	} else {
		console.log("No qualified arrangements")
	}
}