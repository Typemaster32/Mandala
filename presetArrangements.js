/*
There are the Classical (simplest) arrangements:
	Grid:
		Upward
		Center Towards
	Circle:
		Sized -> DEFAULT for Rhombus
		Standard
		Spiral
	Random

*/

function presetArrangementTest(){
	let presetArrangement = new Arrangement();
	let longerside = max(width,height)
	presetArrangement.name = "test"
	for (let i = 0; i < CanvasDivision; i++) {
		for (let j = 0; j < CanvasDivision; j++) { 
			presetArrangement.data[i][j][0]=longerside/CanvasDivision * (j+0.5);
			if (i%2 != j%2){
			presetArrangement.data[i][j][1]=-longerside/CanvasDivision * (i+1.25);}
			else{
				presetArrangement.data[i][j][1]=longerside/CanvasDivision * (i+0.25);
			}
			presetArrangement.data[i][j][2]=PI/4;
			presetArrangement.data[i][j][3]=longerside/CanvasDivision*1.41 ;
		}
	}
	return presetArrangement
}

function presetArrangementChessboardGrid(){
	let presetArrangement = new Arrangement();
	let longerside = max(width,height)
	presetArrangement.name = "grid_chessboard"
	for (let i = 0; i < CanvasDivision; i++) {
		for (let j = 0; j < CanvasDivision; j++) { 
			presetArrangement.data[i][j][0]=longerside/CanvasDivision * (j+0.5);
			if (i%2 != j%2){
			presetArrangement.data[i][j][1]=-longerside/CanvasDivision * (i+1.25);}
			else{
				presetArrangement.data[i][j][1]=longerside/CanvasDivision * (i+0.25);
			}
			presetArrangement.data[i][j][2]=PI/4;
			presetArrangement.data[i][j][3]=longerside/CanvasDivision*1.41 ;
		}
	}
	return presetArrangement
}


function presetArrangementFulfillGrid(){
	// good for moon
	let presetArrangement = new Arrangement();
	let longerside = max(width,height)
	presetArrangement.name = "grid_fulfill"
	for (let i = 0; i < CanvasDivision; i++) {
		for (let j = 0; j < CanvasDivision; j++) { 
			presetArrangement.data[i][j][0]=longerside/CanvasDivision * (j+0.5);
			presetArrangement.data[i][j][1]=longerside/CanvasDivision * (i+0.25);
			presetArrangement.data[i][j][2]=PI/4;
			presetArrangement.data[i][j][3]=longerside/CanvasDivision*1.41 ;
		}
	}
	return presetArrangement
}

function presetArrangementLooseDiagonalFrameGrid(){
	let presetArrangement = new Arrangement();
	let longerside = max(width,height)

	presetArrangement.name = "gird_disgonal_loose"
	for (let i = 0; i < CanvasDivision; i++) {
		for (let j = 0; j < CanvasDivision; j++) { 
			presetArrangement.data[i][j][0]=longerside/CanvasDivision * (j+0.33)*1.5;
			presetArrangement.data[i][j][1]=longerside/CanvasDivision * (i+0.3)*1.5;
			presetArrangement.data[i][j][2]=0;
			presetArrangement.data[i][j][3]=longerside/CanvasDivision ;
		}
	}
	return presetArrangement
}

function presetArrangementDenseDiagonalFrameGrid(){
	let presetArrangement = new Arrangement();
	let longerside = max(width,height)
	presetArrangement.name = "gird_disgonal_dense"
	for (let i = 0; i < CanvasDivision; i++) {
		for (let j = 0; j < CanvasDivision; j++) { 
			presetArrangement.data[i][j][0]=longerside/CanvasDivision * (j+0.5);
			presetArrangement.data[i][j][1]=longerside/CanvasDivision * (i+0.25);
			presetArrangement.data[i][j][2]=0;
			presetArrangement.data[i][j][3]=longerside/CanvasDivision ;
		}
	}
	return presetArrangement
}

function presetArrangementUpwardGrid(){ // This is also the default state.
	let presetArrangement = new Arrangement();
	presetArrangement.name = "gird_upward"
	for (let i = 0; i < CanvasDivision; i++) {
		for (let j = 0; j < CanvasDivision; j++) { 
			presetArrangement.data[i][j][2]=0;
		}
	}
	return presetArrangement
} 


function presetArrangementTowardsCenterGrid(){
	let presetArrangement = new Arrangement();
	presetArrangement.name = "gird_towards center"
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

//--------------------------Grid


function presetArrangementStandardCricle(){
	let unitAngle = PI*2 / CanvasDivision
	let diagonal = Math.sqrt(width*width+height*height)
	let unitDistance = diagonal / CanvasDivision;
	let presetArrangement = new Arrangement();
	presetArrangement.name = "circle_standard"
	for (let i = 0; i < CanvasDivision; i++) {
		for (let j = 0; j < CanvasDivision; j++) { 
			let xoff = Math.cos(unitAngle*j)*unitDistance*i
			let yoff = Math.sin(unitAngle*j)*unitDistance*i
			presetArrangement.data[i][j][0]=width/2+xoff;
			presetArrangement.data[i][j][1]=height/2+yoff;
			presetArrangement.data[i][j][2]=unitAngle*j + PI /2;
			presetArrangement.data[i][j][3]=0.4*unitDistance*i;
			// 0.4 = 1 *  math.sqrt(2 * (1 - math.cos(theta)))
			
		}
	}
	return presetArrangement
}

function presetArrangementSizedCricle(){
	/*
	 This asks the shape to have points at +/-0.5 on x/y axis to show the best
	 */
	let unitAngle = PI*2 / CanvasDivision
	let unitDistance = 10;
	let presetArrangement = new Arrangement();
	presetArrangement.name = "circle_sized"
	for (let i = 0; i < CanvasDivision; i++) {
		unitDistance*=1.5
		for (let j = 0; j < CanvasDivision; j++) { 
			let xoff = Math.cos(unitAngle*j)*unitDistance
			let yoff = Math.sin(unitAngle*j)*unitDistance
			presetArrangement.data[i][j][0]=width/2+xoff;
			presetArrangement.data[i][j][1]=height/2+yoff;
			presetArrangement.data[i][j][2]=unitAngle*j + PI /2;
			presetArrangement.data[i][j][3]=0.4*unitDistance;
			// 0.4 = 1 *  math.sqrt(2 * (1 - math.cos(theta)))
			
		}
	}
	return presetArrangement
}




function presetArrangementSpiralSpanCricle(){
	let unitAngle = PI*2 / CanvasDivision
	let diagonal = Math.sqrt(width*width+height*height)
	let unitDistance = diagonal / CanvasDivision;
	let presetArrangement = new Arrangement();
	presetArrangement.name = "circle_spiral_span"
	for (let i = 0; i < CanvasDivision; i++) {
		for (let j = 0; j < CanvasDivision; j++) { 
			let xoff = Math.cos(unitAngle*j)*unitDistance*(i+j/CanvasDivision)
			let yoff = Math.sin(unitAngle*j)*unitDistance*(i+j/CanvasDivision)
			presetArrangement.data[i][j][0]=width/2+xoff;
			presetArrangement.data[i][j][1]=height/2+yoff;
			presetArrangement.data[i][j][2]=unitAngle*j;
			presetArrangement.data[i][j][3]=standardBorderDistance*(i+j/CanvasDivision);
			
		}
	}
	return presetArrangement
}

function presetArrangementSpiralClusterCricle(){
	let unitAngle = PI*2 / CanvasDivision
	let diagonal = Math.sqrt(width*width+height*height)
	let unitDistance = diagonal / CanvasDivision;
	let presetArrangement = new Arrangement();
	presetArrangement.name = "circle_spiral_cluster"
	for (let i = 0; i < CanvasDivision; i++) {
		for (let j = 0; j < CanvasDivision; j++) { 
			let xoff = Math.cos(unitAngle*j)*unitDistance*(i+j/CanvasDivision)*0.2
			let yoff = Math.sin(unitAngle*j)*unitDistance*(i+j/CanvasDivision)*0.2
			presetArrangement.data[i][j][0]=width/2+xoff;
			presetArrangement.data[i][j][1]=height/2+yoff;
			presetArrangement.data[i][j][2]=unitAngle*j;
			presetArrangement.data[i][j][3]=standardBorderDistance*(i+j/CanvasDivision)*0.2;
			
		}
	}
	return presetArrangement
}


function presetArrangementSpiralOverlappingCricle(){
	let unitAngle = PI*2 / CanvasDivision
	let diagonal = Math.sqrt(width*width+height*height)
	let unitDistance = diagonal / CanvasDivision;
	let presetArrangement = new Arrangement();
	presetArrangement.name = "circle_spiral_overlapping"
	for (let i = 0; i < CanvasDivision; i++) {
		for (let j = 0; j < CanvasDivision; j++) { 
			let xoff = Math.cos(unitAngle*j)*unitDistance*(i+j/CanvasDivision)*0.6
			let yoff = Math.sin(unitAngle*j)*unitDistance*(i+j/CanvasDivision)*0.6
			presetArrangement.data[i][j][0]=width/2+xoff;
			presetArrangement.data[i][j][1]=height/2+yoff;
			presetArrangement.data[i][j][2]=unitAngle*j;
			presetArrangement.data[i][j][3]=standardBorderDistance*(i+j/CanvasDivision)*1.1;
			
		}
	}
	return presetArrangement
}

//--------------------------Random

function presetArrangementRandom(){
	let presetArrangement = new Arrangement();
	presetArrangement.name = "random_standard"
	for (let i = 0; i < CanvasDivision; i++) {
		for (let j = 0; j < CanvasDivision; j++) { 
			presetArrangement.data[i][j][0]=random(width);
			presetArrangement.data[i][j][1]=random(height);
		}
	}
	return presetArrangement
}


/*
There are the Special arrangements:
	Random

*/
