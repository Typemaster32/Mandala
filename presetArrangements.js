/*
There are the basic (simplest) arrangements:
	|grid|square(named as grid);
	|	 |rectangle;
	|
	|circle:|standard circle(named as circle)
		    |spiral
	
*/


function presetArrangementUpwardGrid(){ // This is also the default state.
	let presetArrangement = new Arrangement();
	for (let i = 0; i < CanvasDivision; i++) {
		for (let j = 0; j < CanvasDivision; j++) { 
			presetArrangement.data[i][j][2]=0;
		}
	}
	return presetArrangement
} 


function presetArrangementTowardsCenterGrid(){
	let presetArrangement = new Arrangement();
	for (let i = 0; i < CanvasDivision; i++) {
		for (let j = 0; j < CanvasDivision; j++) { 
			let xoff = presetArrangement.data[i][j][0]-width/2
			let yoff = presetArrangement.data[i][j][1]-height/2
			let centralAngle = atan2(xoff,yoff)
			presetArrangement.data[i][j][2]=centralAngle-PI/2;
		}
	}
	return presetArrangement
}

function presetArrangementRandom(){
	let presetArrangement = new Arrangement();
	for (let i = 0; i < CanvasDivision; i++) {
		for (let j = 0; j < CanvasDivision; j++) { 
			presetArrangement.data[i][j][0]=random(width);
			presetArrangement.data[i][j][1]=random(height);
		}
	}
	return presetArrangement
}

function presetArrangementCricle(){
	let unitAngle = PI*2 / CanvasDivision
	let diagonal = Math.sqrt(width*width+height*height)
	let unitDistance = diagonal / 2;
	let presetArrangement = new Arrangement();
	for (let i = 0; i < CanvasDivision; i++) {
		for (let j = 0; j < CanvasDivision; j++) { 
			let xoff = Math.sin(unitAngle*j)*unitDistance*i
			let yoff = Math.sin(unitAngle*j)*unitDistance
			presetArrangement.data[i][j][0]=width/2+xoff;
			presetArrangement.data[i][j][1]=height/2+yoff;
			
		}
	}
	return presetArrangement
}

function presetArrangementCentralTowardsCricle(){
	let unitAngle = PI*2 / CanvasDivision
	let diagonal = Math.sqrt(width*width+height*height)
	let unitDistance = diagonal / 2;
	let presetArrangement = new Arrangement();
	for (let i = 0; i < CanvasDivision; i++) {
		for (let j = 0; j < CanvasDivision; j++) { 
			let xoff = Math.sin(unitAngle*j)*unitDistance*i
			let yoff = Math.sin(unitAngle*j)*unitDistance
			presetArrangement.data[i][j][0]=width/2+xoff;
			presetArrangement.data[i][j][1]=height/2+yoff;
			presetArrangement.data[i][j][2]=unitAngle*j;
			
		}
	}
	return presetArrangement
}