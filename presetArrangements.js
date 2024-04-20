/*
There are the basic (simplest) arrangements:
	|grid|square(named as grid);
	|	 |rectangle;
	|
	|circle:|standard circle(named as circle)
		    |spiral
	
*/


function presetArrangementUpwardGrid(){
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