
/*
This page contains several Fractals:
	Smile;
	DiagonalBox;
*/
function presetFractalSmile() {
	
	let presetFractal = new Fractal(0,0,0,standardBorderDistance);//placeholders
	presetFractal.shapes=
	[
		[
			[-0.6,-0.2,-0.2,-0.2,PI],
			[0.2,-0.2,0.6,-0.2,PI],
			[0.6,0.2,-0.6,0.2,PI],
			[0.6,0.2,-0.6,0.2]
		]
	]
	return presetFractal;
}

function presetFractalDiagonalBox() {
	let presetFractal = new Fractal();
	presetFractal.shapes=
	[
		[
			[-0.8,-0.8,-0.8,0.8],
			[-0.8,0.8,0.8,0.8],
			[0.8,0.8,0.8,-0.8],
			[0.8,-0.8,-0.8,-0.8],
			[0.8,0.8,-0.8,-0.8],
			[0.8,-0.8,-0.8,0.8]
		]
	]
	return presetFractal;
}


function presetFractalA() {
	let presetFractal = new Fractal();
	presetFractal.shapes=
	[
		[
			[-0.3,0.5,0,-0.5],
			[0.3,0.5,0,-0.5],
			[-0.15,0,0.15,0]
		]
	]
	return presetFractal;
}

function presetFractalQuestionMark() {
	let presetFractal = new Fractal();
	presetFractal.shapes=
	[
		[
			[-0.3,-0.15,0.3,-0.15,PI],
			[0.3,-0.15,0,0.15,PI/2],
			[0,0.15,0,0.3],
			[-0.1,0.5,0.1,0.5,PI],
			[0.1,0.5,-0.1,0.5,PI],
		]
	]
	return presetFractal;
}


function presetFractalCasual() {
	let presetFractal = new Fractal();
	presetFractal.shapes=
	[
		[
			[-0.5,-0.3,-0.8,0.8],
			[-0.4,0.4,0.8,0.8],
			[0.3,0.5,0.8,-0.8],
			[0.2,-0.6,-0.8,-0.8],
			[0.1,0.7,-0.8,-0.8],
			[0,-0.8,-0.8,0.8]
		]
	]
	return presetFractal;
}
