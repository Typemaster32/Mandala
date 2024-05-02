
/*
Classical Fractals:
	Rhombus:
		Quadruple

*/

function presetFractalTest(){
	let presetFractal = new Fractal();
	presetFractal.name = ["test"]
	presetFractal.shapes=
	[
		[
			[0,-0.5,0.4,0.3,],
			[0,-0.5,-0.4,0.3,],
			[-0.4,0.3,0.4,0.3,],//layer1
			[0,-0.38,0.23,0.09,],
			[0,-0.38,-0.23,0.09,],
			[0.23,0.09,-0.23,0.09,],//layer2
			[0,-0.28,0.1,-0.075,],
			[0,-0.28,-0.1,-0.075,],
			[0.1,-0.075,-0.1,-0.075,],//layer3
			[0,-0.23,0.04,-0.15,],
			[0,-0.23,-0.04,-0.15,],
			[0.04,-0.15,-0.04,-0.15,],//layer4

		]
	]
	return presetFractal;
}


function presetFractalMoon(){
	let presetFractal = new Fractal();
	presetFractal.name = ["moon"]
	presetFractal.shapes=
	[
		[
			[0,-0.5,0,0.5,PI],
			[0,-0.5,0,0.5,PI/1.5],/* layer1: 0.5; 3->3 */
		]
	]
	return presetFractal;
}

function presetFractalArrowTriangle(){
	let presetFractal = new Fractal();
	presetFractal.name = ["triangle","arrow"]
	presetFractal.shapes=
	[
		[
			[0,-0.5,0.4,0.3,],
			[0,-0.5,-0.4,0.3,],/* Hypotenuse */
			[0,0.5,0.4,0.3,],
			[0,0.5,-0.4,0.3,],/* Hypotenuse */
			[0.4,0.3,-0.4,0.3,],
			[0,-0.5,0,0.5,],
		]
	]
	return presetFractal;
}

function presetFractalStandardTriangle(){
	let presetFractal = new Fractal();
	presetFractal.name = ["triangle","standard"]
	presetFractal.shapes=
	[
		[
			[0,-0.5,0.4,0.3,],
			[0,-0.5,-0.4,0.3,],/* Hypotenuse */
			[0,0.5,0.4,0.3,],
		]
	]
	return presetFractal;
}
function presetFractalQuadrupleCircle(){
	let presetFractal = new Fractal();
	presetFractal.name = ["circle","4"]
	presetFractal.shapes=
	[
		[
			[0,-0.5,0,0.5,PI],
			[0,0.5,0,-0.5,PI],/* layer1: 0.5; 3->3 */
			[0,-0.49,0,0.49,PI],
			[0,0.49,0,-0.49,PI],/* layer1: 0.5; 3->3 */
			[0,-0.48,0,0.48,PI],
			[0,0.48,0,-0.48,PI],/* layer1: 0.5; 3->3 */
			[0,-0.3,0,0.3,PI],
			[0,0.3,0,-0.3,PI],/* layer2: 0.5/1.7; */
			[0,-0.125,0,0.125,PI],
			[0,0.125,0,-0.125,PI],/* layer3: 0.5/4; */
			[0,-0.05,0,0.05,PI],
			[0,0.05,0,-0.05,PI],/* layer2: 0.5/10; */
		]
	]
	return presetFractal;
}


function presetFractalStrokeWeightRhombus(){
	let presetFractal = new Fractal();
	presetFractal.name = ["rhombus","strokeweight"]
	presetFractal.shapes=
	[
		[
			[0,-0.5,0.5,0,3,10],
			[0,-0.5,-0.5,0,3,10],
			[0,0.5,0.5,0,3,10],
			[0,0.5,-0.5,0,3,10],/* layer1: 0.5 */
			[0,-0.3,0.3,0,2,6],
			[0,-0.3,-0.3,0,2,6],
			[0,0.3,0.3,0,2,6],
			[0,0.3,-0.3,0,2,6],/* layer2: 0.3 */
			[0,-0.3,0.2,0,1,4],
			[0,-0.3,-0.2,0,1,4],
			[0,0.2,0.2,0,1,4],
			[0,0.2,-0.2,0,1,4],/* layer3: 0.2 top remaining */
			[0,-0.3,0.1,0,1,2],
			[0,-0.3,-0.1,0,1,2],
			[0,0.2,0.1,0,1,2],
			[0,0.2,-0.1,0,1,2],/* layer1: 0.1 top & buttom remaining */
		]
	]
	return presetFractal;

}

function presetFractalSimpleRhombus(){
	let presetFractal = new Fractal();
	presetFractal.name = ["rhombus","simple"]
	presetFractal.shapes=
	[
		[
			[0,-0.5,0.5,0,],
			[0,-0.5,-0.5,0,],
			[0,0.5,0.5,0,],
			[0,0.5,-0.5,0,],/* layer1: 0.5 */
			[0,-0.3,0.3,0,],
			[0,-0.3,-0.3,0,],
			[0,0.3,0.3,0,],
			[0,0.3,-0.3,0,],/* layer2: 0.3 */
			[0,-0.3,0.2,0,],
			[0,-0.3,-0.2,0,],
			[0,0.2,0.2,0,],
			[0,0.2,-0.2,0,],/* layer3: 0.2 top remaining */
			[0,-0.3,0.1,0,],
			[0,-0.3,-0.1,0,],
			[0,0.2,0.1,0,],
			[0,0.2,-0.1,0,],/* layer1: 0.1 top & buttom remaining */
		]
	]
	return presetFractal;
}


/*
----------------------------------
Special Fractals:
	1. Smile
	2. QuestionMark
	3. Letter A
	4. DiagonalBox
	5. Casual
*/


function presetFractalSmile() {
	let presetFractal = new Fractal(0,0,0,standardBorderDistance);//placeholders
	presetFractal.name = ["special","smile", "happy"]
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
	presetFractal.name = ["special","box"]
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
	presetFractal.name = ["special","A"]
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
	presetFractal.name = ["special","question mark"]
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
	presetFractal.name = ["special","casual"]
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