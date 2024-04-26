class Rhombus {
	constructor(centerX, centerY, width, height, topExtension) {
	  this.centerX = centerX;
	  this.centerY = centerY;
	  this.width = width;
	  this.height = height;
	  this.topExtension = topExtension;
	  this.maxStroke = 10;
	  this.minStroke = 3;
	}
  
	draw() {
	  const points = [
		createVector(this.centerX, this.centerY - this.height / 2 - this.topExtension), // Top
		createVector(this.centerX + this.width / 2, this.centerY),                     // Right
		createVector(this.centerX, this.centerY + this.height / 2),                    // Bottom
		createVector(this.centerX - this.width / 2, this.centerY)                      // Left
	  ];
  
	  noFill();
  
	  // Draw tapered edges
	  for (let i = 0; i < points.length; i++) {
		let nextIndex = (i + 1) % points.length; // Get the next vertex index, wrapping around
  
		// Calculate stroke weight based on vertical position
		let edgeLength = dist(points[i].x, points[i].y, points[nextIndex].x, points[nextIndex].y);
		let step = 1 / edgeLength; // Smaller step for longer edges
  
		// Draw the edge
		for (let t = 0; t <= 1; t += step) {
		  // Lerp position for the start of the segment
		  let startX = lerp(points[i].x, points[nextIndex].x, t);
		  let startY = lerp(points[i].y, points[nextIndex].y, t);
  
		  // Lerp position for the end of the segment
		  let endX = lerp(points[i].x, points[nextIndex].x, t + step);
		  let endY = lerp(points[i].y, points[nextIndex].y, t + step);
  
		  // Determine stroke weight for this segment
		  let sw;
		  if (i == 0) { // Top edge
			sw = lerp(this.minStroke, this.maxStroke, t);
		  } else if (i == 1) { // Right edge
			sw = lerp(this.minStroke, this.maxStroke, t);
		  } else if (i == 2) { // Bottom edge
			sw = lerp(this.maxStroke, this.minStroke, t);
		  } else if (i == 3) { // Left edge
			sw = lerp(this.maxStroke, this.minStroke, t);
		  }
		  
		  strokeWeight(sw);
		  line(startX, startY, endX, endY);
		}
	  }
	}
  }

  class Square {
    constructor(centerX, centerY, sideLength, rotation) {
      this.centerX = centerX;
      this.centerY = centerY;
      this.sideLength = sideLength;
      this.rotation = rotation; // Rotation angle in radians
      this.maxStroke = 5;
      this.minStroke = 2;
    }
  
    draw() {
      // Apply rotation and translation in the drawing context
      push();
      translate(this.centerX, this.centerY);
      rotate(this.rotation);
      this.drawSingleSquare(this.sideLength);
      this.drawSingleSquare(this.sideLength / 1.7, true);
      this.drawSingleSquare(this.sideLength / 4, true);
      this.drawSingleSquare(this.sideLength / 10, true);
      pop(); // Restore original state without rotation and translation
    }
  
    // Function to draw a square
    drawSingleSquare(sideLength, isInner = false) {
      const yOffset = -sideLength / 2;
  
      // Points for square
      const points = [
        createVector(-sideLength / 2, yOffset), // Top left
        createVector(sideLength / 2, yOffset), // Top right
        createVector(sideLength / 2, sideLength + yOffset), // Bottom right
        createVector(-sideLength / 2, sideLength + yOffset), // Bottom left
      ];
  
      // Color
      noFill();
      let time = millis();
      let r = map(sin(time * 0.0001), -1, 1, 10, 255);
      let g = map(sin(time * 0.0005), -1, 1, 100, 240);
      let b = map(sin(time * 0.0003), -1, 1, 50, 200);
      stroke(r, g, b);
  
      for (let i = 0; i < points.length; i++) {
        let nextIndex = (i + 1) % points.length;
        let edgeLength = dist(points[i].x, points[i].y, points[nextIndex].x, points[nextIndex].y);
        let step = 1 / edgeLength;
  
        for (let t = 0; t <= 1; t += step) {
          let startX = lerp(points[i].x, points[nextIndex].x, t);
          let startY = lerp(points[i].y, points[nextIndex].y, t);
          let endX = lerp(points[i].x, points[nextIndex].x, t + step);
          let endY = lerp(points[i].y, points[nextIndex].y, t + step);
  
          let sw = this.calculateStrokeWeight(i, t, isInner);
          strokeWeight(sw);
          line(startX, startY, endX, endY);
        }
      }
    }
  
    calculateStrokeWeight(edgeIndex, t, isInner) {
      let scale = isInner ? 0.5 : 1;
      let maxStroke = this.maxStroke * scale;
      let minStroke = this.minStroke * scale;
  
      if (edgeIndex == 0 || edgeIndex == 1) { // Top or Right edges
        return lerp(maxStroke, minStroke, t);
      } else { // Bottom or Left edges
        return lerp(maxStroke, minStroke, t);
      }
    }
  }
  

  class Circle {
    constructor(centerX, centerY, diameter, rotation) {
      this.centerX = centerX;
      this.centerY = centerY;
      this.diameter = diameter;
      this.rotation = rotation; // Rotation angle in radians
      this.maxStroke = 10;
      this.minStroke = 3;
    }
  
    draw() {
      // Apply rotation and translation in the drawing context
      push();
      translate(this.centerX, this.centerY);
      rotate(this.rotation);
      this.drawSingleCircle(this.diameter);
      this.drawSingleCircle(this.diameter / 1.7, true);
      this.drawSingleCircle(this.diameter / 4, true);
      this.drawSingleCircle(this.diameter / 10, true);
      pop(); // Restore original state without rotation and translation
    }
  
    // Function to draw a circle
    drawSingleCircle(diameter, isInner = false) {
      // Color
      noFill();
      let time = millis();
      let r = map(sin(time * 0.0001), -1, 1, 10, 255);
      let g = map(sin(time * 0.0005), -1, 1, 100, 240);
      let b = map(sin(time * 0.0003), -1, 1, 50, 200);
      stroke(r, g, b);
  
      let strokeWeightRange = this.calculateStrokeWeightRange(isInner);
      strokeWeight(strokeWeightRange);
      ellipse(0, 0, diameter, diameter);
    }
  
    calculateStrokeWeightRange(isInner) {
      let scale = isInner ? 0.5 : 1;
      return lerp(this.minStroke * scale, this.maxStroke * scale, 0.5);
    }
  }
  
  class Triangle {
	constructor(centerX, centerY, sideLength, rotation) {
	  this.centerX = centerX;
	  this.centerY = centerY;
	  this.sideLength = sideLength;
	  this.rotation = rotation; // Rotation angle in radians
	  this.maxStroke = 10;
	  this.minStroke = 3;
	}
  
	draw() {
	  // Apply rotation and translation in the drawing context
	  push();
	  translate(this.centerX, this.centerY);
	  rotate(this.rotation);
	  this.drawSingleTriangle(this.sideLength);
	  this.drawSingleTriangle(this.sideLength / 1.7, true);
	  this.drawSingleTriangle(this.sideLength / 4, true);
	  this.drawSingleTriangle(this.sideLength / 10, true);
	  pop(); // Restore original state without rotation and translation
	}
  
	// Function to draw a triangle
	drawSingleTriangle(sideLength, isInner = false) {
	  const yOffset = -sqrt(3) * sideLength / 6; // Adjust for vertical centering
  
	  // Points for triangle, using equilateral triangle rules
	  const points = [
		createVector(-sideLength / 2, sideLength * sqrt(3) / 2 + yOffset), // Bottom left
		createVector(sideLength / 2, sideLength * sqrt(3) / 2 + yOffset), // Bottom right
		createVector(0, yOffset) // Top center
	  ];
  
	  // Color
	  noFill();
	  let time = millis();
	  let r = map(sin(time * 0.0001), -1, 1, 10, 255);
	  let g = map(sin(time * 0.0005), -1, 1, 100, 240);
	  let b = map(sin(time * 0.0003), -1, 1, 50, 200);
	  stroke(r, g, b);
  
	  for (let i = 0; i < points.length; i++) {
		let nextIndex = (i + 1) % points.length;
		let edgeLength = dist(points[i].x, points[i].y, points[nextIndex].x, points[nextIndex].y);
		let step = 1 / edgeLength;
  
		for (let t = 0; t <= 1; t += step) {
		  let startX = lerp(points[i].x, points[nextIndex].x, t);
		  let startY = lerp(points[i].y, points[nextIndex].y, t);
		  let endX = lerp(points[i].x, points[nextIndex].x, t + step);
		  let endY = lerp(points[i].y, points[nextIndex].y, t + step);
  
		  let sw = this.calculateStrokeWeight(i, t, isInner);
		  strokeWeight(sw);
		  line(startX, startY, endX, endY);
		}
	  }
	}
  
	calculateStrokeWeight(edgeIndex, t, isInner) {
	  let scale = isInner ? 0.5 : 1;
	  let maxStroke = this.maxStroke * scale;
	  let minStroke = this.minStroke * scale;
  
	  // Distribute stroke weight uniformly
	  return lerp(minStroke, maxStroke, t);
	}
  }
  

