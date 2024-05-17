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
  