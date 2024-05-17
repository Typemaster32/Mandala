
/*
Classical Fractals:
	Rhombus:
		Quadruple

*/

function presetFractalTest(){
	let presetFractal = new Fractal();
	presetFractal.name = ["test"]
	let aa = 0.4
	let bb = 0.4
	let cc = 0.3
	let dd = 0.1
	presetFractal.shapes=
	[
		[
			[-aa,-bb,-aa,bb,],
			[0,-bb,0,bb,],
			[-aa,0,0,0,],//H
			[cc-dd,-bb,cc+dd,-bb,],
			[cc-dd,bb,cc+dd,bb,],
			[cc,-bb,cc,bb,],//I

		]
	]
	return presetFractal;
}

function presetFractalStar() {
    let presetFractal = new Fractal();
    presetFractal.name = ["star","stars","v","angle"];

    // Side length of the star arms
    let outerRadius = 0.5;
    // let innerRadius = outerRadius * Math.sin(18 * Math.PI / 180) / Math.sin(54 * Math.PI / 180);

    let vertices = [];
    for (let i = 0; i < 5; i++) {
        // let radius = i % 2 === 0 ? outerRadius : innerRadius;
        let angle = (i * 2) * Math.PI / 5;
        vertices.push([Math.cos(angle) * outerRadius, Math.sin(angle) * outerRadius]);
    }

    presetFractal.shapes = [
        [
            [vertices[0][0], vertices[0][1], vertices[2][0], vertices[2][1]],
            [vertices[2][0], vertices[2][1], vertices[4][0], vertices[4][1]],
            [vertices[4][0], vertices[4][1], vertices[1][0], vertices[1][1]],
            [vertices[1][0], vertices[1][1], vertices[3][0], vertices[3][1]],
            [vertices[3][0], vertices[3][1], vertices[0][0], vertices[0][1]],
        ]
    ];

    return presetFractal;
}

function presetFractalSpiral() {
    let presetFractal = new Fractal();
    presetFractal.name = ["spiral","twist","twisted","rotate"];

    let spiral = [];
    let turns = 3;
    let steps = 6 * turns;
    let maxRadius = 0.5;
    let previousX = 0;
    let previousY = 0;

    for (let i = 0; i <= steps; i++) {
        let radius = maxRadius * (i / steps);
        let angle = (i / steps) * 2 * Math.PI * turns;
        let x = Math.cos(angle) * radius;
        let y = Math.sin(angle) * radius;
        if (i > 0) {
            spiral.push([previousX, previousY, x, y]);
        }
        previousX = x;
        previousY = y;
    }

    presetFractal.shapes = [spiral];

    return presetFractal;
}

function presetFractalHeart() {
    let presetFractal = new Fractal();
    presetFractal.name = ["heart","love"];

    let scale = 0.5;
    presetFractal.shapes = [
        [
            [0, -0.3 * scale, 0.2 * scale, -0.3 * scale], // Top to right upper arc start
            [0.2 * scale, -0.3 * scale, 0.4 * scale, -0.1 * scale], // Right upper arc
            [0.4 * scale, -0.1 * scale, 0.2 * scale, 0.2 * scale], // Right down arc
            [0.2 * scale, 0.2 * scale, 0, 0.3 * scale], // Right to bottom center
            [0, 0.3 * scale, -0.2 * scale, 0.2 * scale], // Bottom center to left down arc
            [-0.2 * scale, 0.2 * scale, -0.4 * scale, -0.1 * scale], // Left down arc
            [-0.4 * scale, -0.1 * scale, -0.2 * scale, -0.3 * scale], // Left upper arc
            [-0.2 * scale, -0.3 * scale, 0, -0.3 * scale] // Left upper arc end to top
        ]
    ];

    return presetFractal;
}

function presetFractalDiamond() {
    let presetFractal = new Fractal();
    presetFractal.name = ["diamond","sharp"];

    let width = 0.4;
    let height = 0.6;

    presetFractal.shapes = [
        [
            [0, -height, width, 0], // Top to right
            [width, 0, 0, height], // Right to bottom
            [0, height, -width, 0], // Bottom to left
            [-width, 0, 0, -height] // Left to top
        ]
    ];

    return presetFractal;
}

function presetFractalCross() {
    let presetFractal = new Fractal();
    presetFractal.name = ["cross","web"];

    let armLength = 0.3;
    let armWidth = 0.1;

    presetFractal.shapes = [
        [
            [-armWidth, armLength, armWidth, armLength], // Top horizontal line
            [armWidth, armLength, armWidth, -armLength], // Right vertical line
            [armWidth, -armLength, -armWidth, -armLength], // Bottom horizontal line
            [-armWidth, -armLength, -armWidth, armLength] // Left vertical line
        ]
    ];

    return presetFractal;
}

function presetFractalArrow() {
    let presetFractal = new Fractal();
    presetFractal.name = ["arrow","direction"];

    let baseWidth = 0.4;
    let height = 0.5;
    let headWidth = 0.3;

    presetFractal.shapes = [
        [
            [-baseWidth, 0, baseWidth, 0], // Base line
            [baseWidth, 0, headWidth, -height], // Right side to tip
            [headWidth, -height, -headWidth, -height], // Tip to left side of arrowhead
            [-headWidth, -height, -baseWidth, 0] // Left side to base
        ]
    ];

    return presetFractal;
}

function presetFractalVesicaPiscis() {
    let presetFractal = new Fractal();
    presetFractal.name = ["vesica","Piscis","rhombus","kite"];

    let radius = 0.4; // radius of the circles
    let d = radius; // distance between the centers of the two circles

    // Points of intersection of two circles
    let h = Math.sqrt(radius * radius - (d / 2) * (d / 2));
    let p1x = -d / 2;
    let p1y = h;
    let p2x = d / 2;
    let p2y = h;

    // Adjusting for the simple line segments that approximate the arcs
    let p3x = 0;
    let p3y = -radius;
    let p4x = 0;
    let p4y = radius;

    presetFractal.shapes = [
        [
            [p1x, p1y, p2x, p2y], // Upper intersection arc
            [p2x, p2y, p3x, p3y], // Right side of right circle
            [p3x, p3y, p1x, p1y], // Left side of left circle
            [p1x, p1y, p4x, p4y], // Left overlap arc
            [p4x, p4y, p2x, p2y]  // Right overlap arc
        ]
    ];

    return presetFractal;
}



function presetFractalCubicIllusion() {
    let presetFractal = new Fractal();
    presetFractal.name = ["cube","square","cubic"];

    let side = 0.3;  // Define the side length of the cube's face

    // Coordinates for the cube illusion
    let frontTopLeft = [-side, side];
    let frontTopRight = [side, side];
    let frontBottomLeft = [-side, -side];
    let frontBottomRight = [side, -side];
    let backTopLeft = [-side / 2, side / 2];
    let backTopRight = [side / 2, side / 2];
    let backBottomLeft = [-side / 2, -side / 2];
    let backBottomRight = [side / 2, -side / 2];

    presetFractal.shapes = [
        [
            // Front face
            [frontTopLeft[0], frontTopLeft[1], frontTopRight[0], frontTopRight[1]],
            [frontTopRight[0], frontTopRight[1], frontBottomRight[0], frontBottomRight[1]],
            [frontBottomRight[0], frontBottomRight[1], frontBottomLeft[0], frontBottomLeft[1]],
            [frontBottomLeft[0], frontBottomLeft[1], frontTopLeft[0], frontTopLeft[1]],
            // Back face
            [backTopLeft[0], backTopLeft[1], backTopRight[0], backTopRight[1]],
            [backTopRight[0], backTopRight[1], backBottomRight[0], backBottomRight[1]],
            [backBottomRight[0], backBottomRight[1], backBottomLeft[0], backBottomLeft[1]],
            [backBottomLeft[0], backBottomLeft[1], backTopLeft[0], backTopLeft[1]],
            // Connecting lines
            [frontTopLeft[0], frontTopLeft[1], backTopLeft[0], backTopLeft[1]],
            [frontTopRight[0], frontTopRight[1], backTopRight[0], backTopRight[1]],
            [frontBottomRight[0], frontBottomRight[1], backBottomRight[0], backBottomRight[1]],
            [frontBottomLeft[0], frontBottomLeft[1], backBottomLeft[0], backBottomLeft[1]]
        ]
    ];

    return presetFractal;
}

function presetFractalWindmill() {
    let presetFractal = new Fractal();
    presetFractal.name = ["windmill","cross","rotate","angle"];

    presetFractal.shapes = [
        [
            [0, 0.5, 0.25, 0.25], // Top to right top
            [0.25, 0.25, 0, 0], // Right top to right
            [0, 0.5, 0, 0], // Right top to right
            [0.5, 0, 0.25, -0.25], // Right to right bottom
            [0.25, -0.25, 0, 0], // Right bottom to bottom
            [0.5, 0, 0, 0], // Right bottom to bottom
            [0, -0.5, -0.25, -0.25], // Bottom to left bottom
            [-0.25, -0.25, 0, 0], // Left bottom to left
            [0, -0.5, 0, 0], // Left bottom to left
            [-0.5, 0, -0.25, 0.25], // Left to left top
            [-0.25, 0.25, 0, -0.5] // Left top to top
            [-0.5, 0, 0, 0] // Left top to top
        ]
    ];

    return presetFractal;
}

function presetFractalOpticalGrid() {
    let presetFractal = new Fractal();
    presetFractal.name = ["optical","optic"];

    let offset = 0.25; // Offset for creating the grid pattern

    presetFractal.shapes = [
        [
            // Outer square
            [-0.5, 0, 0, 0.5],  // Left to top
            [0, 0.5, 0.5, 0],   // Top to right
            [0.5, 0, 0, -0.5],  // Right to bottom
            [0, -0.5, -0.5, 0], // Bottom to left
            // Inner diagonals to create depth illusion
            [-0.5, 0, 0, -0.5], 
            [0.5, 0, 0, 0.5], 
            [0, 0.5, -0.5, 0], 
            [0, -0.5, 0.5, 0], 
            // Inner square (shifted)
            [-0.25, 0.25, 0.25, 0.25], 
            [0.25, 0.25, 0.25, -0.25], 
            [0.25, -0.25, -0.25, -0.25], 
            [-0.25, -0.25, -0.25, 0.25] 
        ]
    ];

    return presetFractal;
}

function presetFractalFlower() {
    let presetFractal = new Fractal();
    presetFractal.name = ["flower","grass","bush","sunny"];

    let layers = 4;
    let radius = 0.5;
    let angleStep = Math.PI / layers;

    let shapes = [];

    for (let i = 0; i < 2 * Math.PI; i += angleStep) {
        shapes.push([
            [0, 0, Math.cos(i) * radius, Math.sin(i) * radius],
            [0, 0, Math.cos(i + angleStep / 2) * radius / 2, Math.sin(i + angleStep / 2) * radius / 2]
        ]);
    }

    presetFractal.shapes = [shapes.flat()];

    return presetFractal;
}


function presetFractalSpiralWeb() {
    let presetFractal = new Fractal();
    presetFractal.name = ["spiral","web"];

    let turns = 5;
    let steps = 25; // Increase for smoother spiral
    let maxRadius = 0.5;
    let spiral = [];
    let radialLines = [];

    for (let i = 0; i <= steps; i++) {
        let radius = maxRadius * (i / steps);
        let angle = (i / steps) * 2 * Math.PI * turns;
        let x = Math.cos(angle) * radius;
        let y = Math.sin(angle) * radius;

        if (i > 0) {
            spiral.push([spiral[spiral.length - 1][2], spiral[spiral.length - 1][3], x, y]);
        } else {
            spiral.push([0, 0, x, y]); // Start from center
        }
    }

    for (let i = 0; i < 4; i++) { // 4 radial lines
        let angle = Math.PI / 2 * i;
        radialLines.push([0, 0, Math.cos(angle) * maxRadius, Math.sin(angle) * maxRadius]);
    }
    let combined = [...spiral, ...radialLines]
    presetFractal.shapes = [radialLines];

    return presetFractal;
}




function presetFractalPentagon() {
    let presetFractal = new Fractal();
    presetFractal.name = ["pentagon","five","geometry"];

    // Side length of the pentagon
    let sideLength = 0.8;
    let angle = 72 * Math.PI / 180; // Angle between vertices in radians (360 degrees / 5)

    // Calculate vertex coordinates based on regular pentagon geometry
    let vertices = [];
    for (let i = 0; i < 5; i++) {
        // Calculate vertex positions
        let x = Math.cos(i * angle) * sideLength;
        let y = Math.sin(i * angle) * sideLength;
        vertices.push([x, y]);
    }

    // Define the shapes (lines) using the vertices
    presetFractal.shapes = [
        [
            [vertices[0][0], vertices[0][1], vertices[1][0], vertices[1][1]],
            [vertices[1][0], vertices[1][1], vertices[2][0], vertices[2][1]],
            [vertices[2][0], vertices[2][1], vertices[3][0], vertices[3][1]],
            [vertices[3][0], vertices[3][1], vertices[4][0], vertices[4][1]],
            [vertices[4][0], vertices[4][1], vertices[0][0], vertices[0][1]],
        ]
    ];

    return presetFractal;
}


function presetFractalHexagon() {
    let presetFractal = new Fractal();
    presetFractal.name = ["hexagon","six","geometry"];

    // Side length of the hexagon
    let sideLength = 0.8;

    // Calculate offsets based on regular hexagon geometry
    let h = sideLength * Math.sqrt(3) / 2; // Horizontal distance to vertex from center

    presetFractal.shapes = [
        [
            [0, sideLength, h, sideLength / 2],        // Line from right to top-right
            [h, sideLength / 2, h, -sideLength / 2],   // Line from top-right to bottom-right
            [h, -sideLength / 2, 0, -sideLength],      // Line from bottom-right to bottom-left
            [0, -sideLength, -h, -sideLength / 2],     // Line from bottom-left to top-left
            [-h, -sideLength / 2, -h, sideLength / 2], // Line from top-left to bottom-left
            [-h, sideLength / 2, 0, sideLength]        // Line from bottom-left to right
        ]
    ];
    return presetFractal;
}


function presetFractalDoubleSideRainbow(){
	let presetFractal = new Fractal();
	presetFractal.name = ["rainbow","double","wave","sea","ocean","ripple"]
	presetFractal.shapes=
	[
		[
			[0.2,-0.2,0.2,0.2,PI/2],
			[0.4,-0.4,0.4,0.4,PI/2],
			[0.6,-0.6,0.6,0.6,PI/2],
			[0.8,-0.8,0.8,0.8,PI/2], //right side

			[-0.2,-0.2,-0.2,0.2,PI/2],
			[-0.4,-0.4,-0.4,0.4,PI/2],
			[-0.6,-0.6,-0.6,0.6,PI/2],
			[-0.8,-0.8,-0.8,0.8,PI/2], //left side

		]
	]
	return presetFractal;
}

function presetFractalSingleSideRainbow(){
	let presetFractal = new Fractal();
	presetFractal.name = ["rainbow","single","wave","sea","ocean","ripple"]
	let aa = 1.4
	let bb = 0.4
	let cc = 0.3
	let dd = 0.1
	presetFractal.shapes=
	[
		[
			[-0.2,-0.2,-0.2,0.2,PI/2],
			[-0.4,-0.4,-0.4,0.4,PI/2],
			[-0.6,-0.6,-0.6,0.6,PI/2],
			[-0.8,-0.8,-0.8,0.8,PI/2], //left side
		]
	]
	return presetFractal;
}

function presetFractalHi(){
	let presetFractal = new Fractal();
	presetFractal.name = ["morning","afternoon","how","hello","hey","Mandala","good"]
	let aa = 0.4
	let bb = 0.4
	let cc = 0.3
	let dd = 0.1
	presetFractal.shapes=
	[
		[
			[-aa,-bb,-aa,bb,],
			[0,-bb,0,bb,],
			[-aa,0,0,0,],//H
			[cc-dd,-bb,cc+dd,-bb,],
			[cc-dd,bb,cc+dd,bb,],
			[cc,-bb,cc,bb,],//I

		]
	]
	return presetFractal;
}


function presetFractalMoon(){
	let presetFractal = new Fractal();
	presetFractal.name = ["moon","wave","tide"]
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
	presetFractal.name = ["triangle","arrow","direction"]
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
	presetFractal.name = ["triangle","standard","three","geometry","rain","rainy"]
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
	presetFractal.name = ["circle","circles","four","quadruple","ripple"]
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
	presetFractal.name = ["rhombus","strokeweight","classical"]
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
	presetFractal.name = ["test","smile","laugh","happy"]
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

function presetFractalAngry() {
	let presetFractal = new Fractal(0,0,0,standardBorderDistance);//placeholders
	presetFractal.name = ["test","smile","laugh","happy"]
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
	presetFractal.name = ["special","box","diagonal","inclined"]
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
	presetFractal.name = ["special","a","letter","letters"]
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
	presetFractal.name = ["special","question","wonder","curious","stupid","understand"]
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
	presetFractal.name = ["special","casual","random","strange"]
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