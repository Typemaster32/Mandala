/*
Arc:
    1. The angle is aways within 0 and PI.
        PI means semi circle
        0 means diameter
    2. The arc is always clockwise from start to end
*/

function findCircleProperties(x1, y1, x2, y2, angle) {

    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;

    // Calculate the distance between the two points
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    // console.log(distance)

    if (Math.abs(Math.sin(angle / 2)) <= 0.001) {
        line(x1, y1, x2, y2)
    } else {
        const radius = (distance / 2) / Math.abs(Math.sin(angle / 2));
        // console.log(angle)
        // console.log(radius)

        const midToCenterDist = Math.sqrt(radius * radius - (distance / 2) * (distance / 2));
        // Perpendicular to the chord, direction depends on angle (assumed clockwise direction for positive angle)
        let centerX, centerY;
        centerX = mx - midToCenterDist * (dy / distance);
        centerY = my + midToCenterDist * (dx / distance);

        // Calculate starting and ending angles from the center to each point
        const startAngle = Math.atan2(y1 - centerY, x1 - centerX);
        let endAngle = Math.atan2(y2 - centerY, x2 - centerX);

        // Normalize angles to ensure they are always increasing clockwise
        if (endAngle <= startAngle) {
            endAngle += 2 * Math.PI;
        }
        noFill();
        let diameter = radius * 2
        arc(centerX, centerY, diameter, diameter, startAngle, endAngle)
    }
}


function keyIsPressed() {
    if (keyCode == "Q" || keyCode == "q") {
        console.log("Q")
        testTransmitArrangement(paGridUpward)
    }
    if (keyCode == "W" || keyCode == "w") {
        console.log("W")
        testTransmitFractal(pfDiagonalBox)
    }
}

function testTransmitArrangement(target) {
    /*
    This function: 
    1. sets transmitting to start;
    2. sets target as target Arrangement;
    3. copy the current Arrangement to the origin;
    */
    tgArrangement = target
    if (srIsTransmiting == false || srPercentage == 0) {
        srIsTransmiting = true
        srPercentage = 0

        console.log("testTransmitArrangement")
        orArrangement = srArrangement.copy()
    }

}

function testTransmitFractal(target) {
    /*
    This function: 
    1. sets transmitting to start;
    2. sets a target Fractal Example(x,y,a,d do not matter);
    3. copy the current Fractal Example to the origin;
    */
    tgFractalExample = target
    if (srIsTransmiting == false || srPercentage == 0) {
        srIsTransmiting = true
        srPercentage = 0
        orFractalExample = srFractals[0][0].copy()
        console.log("testTransmitFractal")
    }
}