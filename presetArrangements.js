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

function presetArrangementTest() {
  let presetArrangement = new Arrangement();
  let longerside = max(width, height);
  presetArrangement.name = ["test"];
  for (let i = 0; i < CanvasDivision; i++) {
    for (let j = 0; j < CanvasDivision; j++) {
      presetArrangement.data[i][j][0] =
        (longerside / CanvasDivision) * (j + 0.5);
      if (i % 2 != j % 2) {
        presetArrangement.data[i][j][1] =
          (-longerside / CanvasDivision) * (i + 1.25);
      } else {
        presetArrangement.data[i][j][1] =
          (longerside / CanvasDivision) * (i + 0.25);
      }
      presetArrangement.data[i][j][2] = PI / 4;
      presetArrangement.data[i][j][3] = (longerside / CanvasDivision) * 1.41;
    }
  }
  return presetArrangement;
}

function presetArrangementIslamicStripes() {
  let presetArrangement = new Arrangement();
  let longerside = max(width, height);
  let divisionSize = longerside / CanvasDivision; // Size of each division in the grid
  presetArrangement.name = ["stripes"];

  // Define stripe width as a fraction of the division size for aesthetic spacing
  let stripeWidth = divisionSize / 10;

  for (let i = 0; i < CanvasDivision; i++) {
    for (let j = 0; j < CanvasDivision; j++) {
      let x = divisionSize * j;
      let y = divisionSize * i;
      let rotation;

      // Alternate the direction of stripes to create an interlocking pattern
      if ((i + j) % 2 === 0) {
        rotation = Math.PI / 4; // 45 degrees, pointing from top-left to bottom-right
      } else {
        rotation = -Math.PI / 4; // -45 degrees, pointing from bottom-left to top-right
      }

      // Define the stripe
      presetArrangement.data[i][j] = [x,y,rotation,divisionSize * Math.sqrt(2) ]
    }
  }
  return presetArrangement;
}
function presetArrangementV() {
  let presetArrangement = new Arrangement();
  let longerside = max(width, height);
  let sideLength = longerside / CanvasDivision; // This determines the size of each unit
  let triangleHeight = sideLength * Math.sqrt(3) / 2; // Height of an equilateral triangle for calculations
  presetArrangement.name = ["v",];

  for (let i = 0; i < CanvasDivision; i++) {
    for (let j = 0; j < CanvasDivision; j++) {
      let x = sideLength * j + (sideLength / 2);
      let y = triangleHeight * i + (triangleHeight / 2);
      let rotation;

      // Determine rotation based on position to simulate star pattern
      if ((i + j) % 2 === 0) {
        rotation = Math.PI / 6; // Rotates to form one direction of star arms
      } else {
        rotation = -Math.PI / 6; // Rotates opposite to interlock with the next
      }

      // Simulate star arm extending from center
      let armLength = sideLength * 2; // Double the length for reaching to adjacent centers

      // Create data entry for arrangement
      presetArrangement.data[i][j] = [x, y, rotation, armLength/3];
    }
  }
  return presetArrangement;
}


function presetArrangementHexagonalGrid() {
  let presetArrangement = new Arrangement();
  let longerside = max(width, height);
  let sideLength = longerside / CanvasDivision; // Side length of each hexagon
  let hexHeight = sideLength * Math.sqrt(3); // Vertical distance between centers
  let centerX = width / 2;
  let centerY = height / 2;
  presetArrangement.name = ["hexagon"];

  for (let i = 0; i < CanvasDivision; i++) {
    for (let j = 0; j < CanvasDivision; j++) {
      let offsetX = (i % 2 === 0) ? 0 : sideLength * 0.5; // Horizontal shift for alternating rows
      let x = sideLength * j + offsetX;
      let y = hexHeight * 0.75 * i;
      let angleToCenter = Math.atan2(centerY - y, centerX - x) + Math.PI / 2;

      presetArrangement.data[i][j][0] = x;
      presetArrangement.data[i][j][1] = y;
      presetArrangement.data[i][j][2] = angleToCenter; // Rotate to point towards the center
      presetArrangement.data[i][j][3] = sideLength; // Diameter is the side length of the hexagon
    }
  }
  return presetArrangement;
}


function presetArrangementHexagonalGridVariation() {
  let presetArrangement = new Arrangement();
  let longerside = max(width, height);
  let sideLength = longerside / CanvasDivision; // Side length of each hexagon
  let hexHeight = sideLength * Math.sqrt(3); // Vertical distance between centers
  let centerX = width / 2;
  let centerY = height / 2;
  presetArrangement.name = ["hexagonal_variation"];

  for (let i = 0; i < CanvasDivision; i++) {
    for (let j = 0; j < CanvasDivision; j++) {
      let offsetX = (i % 2 === 0) ? 0 : sideLength * 0.5; // Horizontal shift for alternating rows
      let x = sideLength * j + offsetX;
      let y = hexHeight * 0.75 * i;
      let angleToCenter = Math.atan2(centerY - y, centerX - x) + Math.PI / 2;

      // Adding a dynamic scale based on position
      let scale = 1 + 0.1 * Math.sin(i * Math.PI / CanvasDivision);
      let rotation = angleToCenter + (Math.PI / 12 * Math.cos(j * Math.PI / CanvasDivision));

      presetArrangement.data[i][j][0] = x;
      presetArrangement.data[i][j][1] = y;
      presetArrangement.data[i][j][2] = rotation; // Rotate to point towards the center with additional variation
      presetArrangement.data[i][j][3] = sideLength * scale; // Scaled diameter based on position
    }
  }
  return presetArrangement;
}



function presetArrangementTriangularGridVariation() {
  let presetArrangement = new Arrangement();
  let longerside = max(width, height);
  let sideLength = longerside / CanvasDivision; // Side length of each triangle
  let triangleHeight = sideLength * Math.sqrt(3) / 2; // Height of an equilateral triangle
  let centerX = width / 2;
  let centerY = height / 2;
  presetArrangement.name = ["triangle, variation"];

  for (let i = 0; i < CanvasDivision; i++) {
    for (let j = 0; j < CanvasDivision; j++) {
      let offsetX = (i % 2 === 0) ? 0 : sideLength / 2; // Horizontal shift for alternating rows
      let x = sideLength * j + offsetX;
      let y = triangleHeight * i;
      let angleToCenter = Math.atan2(centerY - y, centerX - x) - Math.PI / 6;
      let scale = 1 + 0.1 * Math.cos(i * Math.PI / CanvasDivision);

      presetArrangement.data[i][j][0] = x;
      presetArrangement.data[i][j][1] = y;
      presetArrangement.data[i][j][2] = angleToCenter + Math.PI / 12 * Math.sin(j * Math.PI / CanvasDivision); // Adding dynamic rotation
      presetArrangement.data[i][j][3] = sideLength * scale; // Scaled side length
    }
  }
  return presetArrangement;
}


function presetArrangementTriangularGrid() {
  let presetArrangement = new Arrangement();
  let longerside = max(width, height);
  let sideLength = longerside / CanvasDivision; // Side length of each triangle
  let triangleHeight = sideLength * Math.sqrt(3) / 2; // Height of an equilateral triangle
  let centerX = width / 2;
  let centerY = height / 2;
  presetArrangement.name = ["triange","spiral","swirl"];

  for (let i = 0; i < CanvasDivision; i++) {
    for (let j = 0; j < CanvasDivision; j++) {
      let offsetX = (i % 2 === 0) ? 0 : sideLength / 2; // Horizontal shift for alternating rows
      let x = sideLength * j + offsetX;
      let y = triangleHeight * i;
      let angleToCenter = Math.atan2(centerY - y, centerX - x) - Math.PI / 6;

      presetArrangement.data[i][j][0] = x;
      presetArrangement.data[i][j][1] = y;
      presetArrangement.data[i][j][2] = angleToCenter; // Rotate to point towards the center
      presetArrangement.data[i][j][3] = sideLength; // The length of each side of the triangle
    }
  }
  return presetArrangement;
}





function presetArrangementCorner() {
  let presetArrangement = new Arrangement();
  let longerside = max(width, height);
  presetArrangement.name = ["corner"];
  for (let i = 0; i < CanvasDivision; i++) {
    for (let j = 0; j < CanvasDivision; j++) {
      presetArrangement.data[i][j][0] =
        (longerside / CanvasDivision) * (j + 0.5);
      if (i % 2 != j % 2) {
        presetArrangement.data[i][j][1] =
          (-longerside / CanvasDivision) * (i + 1.25);
      } else {
        presetArrangement.data[i][j][1] =
          (longerside / CanvasDivision) * (i + 0.25);
      }
      presetArrangement.data[i][j][2] = PI / 4;
      presetArrangement.data[i][j][3] = (longerside / CanvasDivision) * 1.41;
    }
  }
  return presetArrangement;
}

function presetArrangementChessboardGrid() {
  let presetArrangement = new Arrangement();
  let longerside = max(width, height);
  presetArrangement.name = ["grid","square","chessboard"];
  for (let i = 0; i < CanvasDivision; i++) {
    for (let j = 0; j < CanvasDivision; j++) {
      presetArrangement.data[i][j][0] =
        (longerside / CanvasDivision) * (j + 0.5);
      if (i % 2 != j % 2) {
        presetArrangement.data[i][j][1] =
          (-longerside / CanvasDivision) * (i + 1.25);
      } else {
        presetArrangement.data[i][j][1] =
          (longerside / CanvasDivision) * (i + 0.25);
      }
      presetArrangement.data[i][j][2] = PI / 4;
      presetArrangement.data[i][j][3] = (longerside / CanvasDivision) * 1.41;
    }
  }
  return presetArrangement;
}

function presetArrangementFulfillGrid() {
  // good for moon
  let presetArrangement = new Arrangement();
  let longerside = max(width, height);
  presetArrangement.name = ["spiral", "circular", "fulfill"];
  for (let i = 0; i < CanvasDivision; i++) {
    for (let j = 0; j < CanvasDivision; j++) {
      presetArrangement.data[i][j][0] =
        (longerside / CanvasDivision) * (j + 0.5);
      presetArrangement.data[i][j][1] =
        (longerside / CanvasDivision) * (i + 0.25);
      presetArrangement.data[i][j][2] = PI / 4;
      presetArrangement.data[i][j][3] = (longerside / CanvasDivision) * 1.41;
    }
  }
  return presetArrangement;
}

function presetArrangementLooseDiagonalFrameGrid() {
  let presetArrangement = new Arrangement();
  let longerside = max(width, height);

  presetArrangement.name = ["grid", "diagonal", "loose","frame"];
  for (let i = 0; i < CanvasDivision; i++) {
    for (let j = 0; j < CanvasDivision; j++) {
      presetArrangement.data[i][j][0] =
        (longerside / CanvasDivision) * (j + 0.33) * 1.5;
      presetArrangement.data[i][j][1] =
        (longerside / CanvasDivision) * (i + 0.3) * 1.5;
      presetArrangement.data[i][j][2] = 0;
      presetArrangement.data[i][j][3] = longerside / CanvasDivision;
    }
  }
  return presetArrangement;
}

function presetArrangementDenseDiagonalFrameGrid() {
  let presetArrangement = new Arrangement();
  let longerside = max(width, height);
  presetArrangement.name = ["grid", "diagonal", "dense","dance", "denser","square","chessboard"];
  for (let i = 0; i < CanvasDivision; i++) {
    for (let j = 0; j < CanvasDivision; j++) {
      presetArrangement.data[i][j][0] =
        (longerside / CanvasDivision) * (j + 0.5);
      presetArrangement.data[i][j][1] =
        (longerside / CanvasDivision) * (i + 0.25);
      presetArrangement.data[i][j][2] = 0;
      presetArrangement.data[i][j][3] = longerside / CanvasDivision;
    }
  }
  return presetArrangement;
}

function presetArrangementUpwardGrid() {
  // This is also the default state.
  let presetArrangement = new Arrangement();
  presetArrangement.name = ["gird", "upward","square","chessboard","box"];
  for (let i = 0; i < CanvasDivision; i++) {
    for (let j = 0; j < CanvasDivision; j++) {
      presetArrangement.data[i][j][2] = 0;
    }
  }
  return presetArrangement;
}

function presetArrangementTowardsCenterGrid() {
  let presetArrangement = new Arrangement();
  presetArrangement.name = ["gird", "towards", "center","box","center"];
  for (let i = 0; i < CanvasDivision; i++) {
    for (let j = 0; j < CanvasDivision; j++) {
      let xoff = presetArrangement.data[i][j][0] - width / 2;
      let yoff = presetArrangement.data[i][j][1] - height / 2;
      let centralAngle = atan2(xoff, yoff);
      presetArrangement.data[i][j][2] = centralAngle - PI / 2;
    }
  }
  return presetArrangement;
}

//--------------------------Grid

function presetArrangementStandardCricle() {
  let unitAngle = (PI * 2) / CanvasDivision;
  let diagonal = Math.sqrt(width * width + height * height);
  let unitDistance = diagonal / CanvasDivision;
  let presetArrangement = new Arrangement();
  presetArrangement.name = ["circle", "standard", "expand", "large", "spread"];
  for (let i = 0; i < CanvasDivision; i++) {
    for (let j = 0; j < CanvasDivision; j++) {
      let xoff = Math.cos(unitAngle * j) * unitDistance * i;
      let yoff = Math.sin(unitAngle * j) * unitDistance * i;
      presetArrangement.data[i][j][0] = width / 2 + xoff;
      presetArrangement.data[i][j][1] = height / 2 + yoff;
      presetArrangement.data[i][j][2] = unitAngle * j + PI / 2;
      presetArrangement.data[i][j][3] = 0.4 * unitDistance * i;
      // 0.4 = 1 *  math.sqrt(2 * (1 - math.cos(theta)))
    }
  }
  return presetArrangement;
}

function presetArrangementSizedCricle() {
  /*
	 This asks the shape to have points at +/-0.5 on x/y axis to show the best
	 */
  let unitAngle = (PI * 2) / CanvasDivision;
  let unitDistance = 10;
  let presetArrangement = new Arrangement();
  presetArrangement.name = ["circle", "spherical", "aligned", "beautiful","moving","illusion"];
  for (let i = 0; i < CanvasDivision; i++) {
    unitDistance *= 1.5;
    for (let j = 0; j < CanvasDivision; j++) {
      let xoff = Math.cos(unitAngle * j) * unitDistance;
      let yoff = Math.sin(unitAngle * j) * unitDistance;
      presetArrangement.data[i][j][0] = width / 2 + xoff;
      presetArrangement.data[i][j][1] = height / 2 + yoff;
      presetArrangement.data[i][j][2] = unitAngle * j + PI / 2;
      presetArrangement.data[i][j][3] = 0.4 * unitDistance;
      // 0.4 = 1 *  math.sqrt(2 * (1 - math.cos(theta)))
    }
  }
  return presetArrangement;
}

function presetArrangementSpiralSpanCricle() {
  let unitAngle = (PI * 2) / CanvasDivision;
  let diagonal = Math.sqrt(width * width + height * height);
  let unitDistance = diagonal / CanvasDivision;
  let presetArrangement = new Arrangement();
  presetArrangement.name = ["circle", "spiral", "span"];
  for (let i = 0; i < CanvasDivision; i++) {
    for (let j = 0; j < CanvasDivision; j++) {
      let xoff =
        Math.cos(unitAngle * j) * unitDistance * (i + j / CanvasDivision);
      let yoff =
        Math.sin(unitAngle * j) * unitDistance * (i + j / CanvasDivision);
      presetArrangement.data[i][j][0] = width / 2 + xoff;
      presetArrangement.data[i][j][1] = height / 2 + yoff;
      presetArrangement.data[i][j][2] = unitAngle * j;
      presetArrangement.data[i][j][3] =
        standardBorderDistance * (i + j / CanvasDivision);
    }
  }
  return presetArrangement;
}

function presetArrangementSpiralClusterCricle() {
  let unitAngle = (PI * 2) / CanvasDivision;
  let diagonal = Math.sqrt(width * width + height * height);
  let unitDistance = diagonal / CanvasDivision;
  let presetArrangement = new Arrangement();
  presetArrangement.name = ["circle", "spiral", "cluster", "contract"];
  for (let i = 0; i < CanvasDivision; i++) {
    for (let j = 0; j < CanvasDivision; j++) {
      let xoff =
        Math.cos(unitAngle * j) * unitDistance * (i + j / CanvasDivision) * 0.2;
      let yoff =
        Math.sin(unitAngle * j) * unitDistance * (i + j / CanvasDivision) * 0.2;
      presetArrangement.data[i][j][0] = width / 2 + xoff;
      presetArrangement.data[i][j][1] = height / 2 + yoff;
      presetArrangement.data[i][j][2] = unitAngle * j;
      presetArrangement.data[i][j][3] =
        standardBorderDistance * (i + j / CanvasDivision) * 0.2;
    }
  }
  return presetArrangement;
}

function presetArrangementSpiralOverlappingCricle() {
  let unitAngle = (PI * 2) / CanvasDivision;
  let diagonal = Math.sqrt(width * width + height * height);
  let unitDistance = diagonal / CanvasDivision;
  let presetArrangement = new Arrangement();
  presetArrangement.name = ["circle", "spiral", "overlapping","mix","mixing","mixed","overlap"];
  for (let i = 0; i < CanvasDivision; i++) {
    for (let j = 0; j < CanvasDivision; j++) {
      let xoff =
        Math.cos(unitAngle * j) * unitDistance * (i + j / CanvasDivision) * 0.6;
      let yoff =
        Math.sin(unitAngle * j) * unitDistance * (i + j / CanvasDivision) * 0.6;
      presetArrangement.data[i][j][0] = width / 2 + xoff;
      presetArrangement.data[i][j][1] = height / 2 + yoff;
      presetArrangement.data[i][j][2] = unitAngle * j;
      presetArrangement.data[i][j][3] =
        standardBorderDistance * (i + j / CanvasDivision) * 1.1;
    }
  }
  return presetArrangement;
}

//--------------------------Random

function presetArrangementRandom() {
  let presetArrangement = new Arrangement();
  presetArrangement.name = ["random", "standard"];
  for (let i = 0; i < CanvasDivision; i++) {
    for (let j = 0; j < CanvasDivision; j++) {
      presetArrangement.data[i][j][0] = random(width);
      presetArrangement.data[i][j][1] = random(height);
      presetArrangement.data[i][j][2] = random(standardBorderDistance/2,2*standardBorderDistance);
    }
  }
  return presetArrangement;
}


function presetArrangementCornerFixed() {
	let presetArrangement = new Arrangement();
	let fixedWidth = random(width)
	let fixedHeight = random(height)
	presetArrangement.name = ["random","contract","cluster","fly","flying"];
	for (let i = 0; i < CanvasDivision; i++) {
	  for (let j = 0; j < CanvasDivision; j++) {
		presetArrangement.data[i][j][0] = fixedWidth;
		presetArrangement.data[i][j][1] = fixedHeight
	  }
	}
	return presetArrangement;
  }

/*
There are the Special arrangements:
	Random

*/


