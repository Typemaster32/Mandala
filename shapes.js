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