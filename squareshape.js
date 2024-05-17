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
  