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


function testTransmitArrangement(target) {
    /*
    This function: 
    1. sets transmitting to start;
    2. sets target as target Arrangement;
    3. copy the current Arrangement to the origin;
    */
    if (!areNamesIdentical(target, tgArrangement)) {
        tgArrangement = target
        orArrangement = srArrangement.copy()
    } else{
        text("please wait",15,30)
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
    orFractalExample = srFractals[0][0].copy()
}


function getRandomElement(arr) {
    let index = Math.floor(Math.random() * arr.length)
    return index;
}


function customMap(value, start1, stop1, start2, stop2) {

    return customMapWithAcceleration(value, start1, stop1, start2, stop2);
}

function precisionTwoMap(value, start1, stop1, start2, stop2) {
    // Calculate the ratio of the input interval
    let ratio = (value - start1) / (stop1 - start1);
    // Apply the ratio to the output interval and round to desired precision
    return parseFloat((start2 + (stop2 - start2) * ratio).toFixed(2));
}

function customMapWithAcceleration(value, start1, stop1, start2, stop2) {
    // Normalize the value to a 0-1 range
    let normalizedValue = (value - start1) / (stop1 - start1);
    // Apply a non-linear transformation: slower at start, faster at end
    // For example, raise the normalized value to the power of 2
    let acceleratedValue = Math.pow(normalizedValue, 2);
    // Map the accelerated value to the output range
    let mappedValue = start2 + (stop2 - start2) * acceleratedValue;
    // Round to desired precision and return
    return parseFloat(mappedValue.toFixed(2));
}


function checkFractalEqual(stateA, stateB) {
    let settingsEqual = false
    let shapesEqual = false
    for (let i = 0; i < stateA.settings.length; i++) {
        settingsEqual = (stateA.settings[i] == stateB.settings[i])
        for (let j = 0; j < stateA.shapes[i]; j++) {
            shapesEqual = true
            let angle, strokeStart, strokeEnd;
            for (let k = 0; k < 4; k++) {
                if (stateA.shapes[i][j][k] != stateB.shapes[i][j][k]) shapesEqual = false
            }
        }
    }
    if (!settingsEqual) console.log(stateA.settings, stateB.settings)
    if (!shapesEqual) console.log(stateA.shapes, stateB.shapes)
    return settingsEqual && shapesEqual
}

function checkFractalBasicEqual(stateA, stateB) {
    let shapesEqual = true

    for (let i = 0; i < stateA.shapes.length; i++) {

        console.table(stateA.shapes[i])
        console.table(stateB.shapes[i])
        for (let j = 0; j < min(stateA.shapes[i].length, stateA.shapes[i].length); j++) {
            // for (let k = 0; k < 2; k++) {
            // console.log(stateA.shapes[i][j][k])
            // console.log(stateB.shapes[i][j][k])
            // 	// if (stateA.shapes[i][j][k] != stateB.shapes[i][j][k]) {shapesEqual = false}
            // }
        }
    }
    return shapesEqual
}

function checkArrangementEqual(stateA, stateB, tolerance = 0.04) {
    let dataEqual = true
    for (let i = 0; i < CanvasDivision; i++) {
        for (let j = 0; j < CanvasDivision; j++) {
            for (let k = 0; j < 4; j++) {
                let offset = Math.abs(stateA.data[i][j][k] - stateB.data[i][j][k])
                if (offset > tolerance)
                    dataEqual = false
            }
        }
    }
    return dataEqual
}

function isMyNamesInTheKeywords(instance, arr2) {
    const set1 = new Set(instance.name);  // Access the property from the instance

    for (const element of arr2) {
        if (set1.has(element)) {
            return true;
        }
    }
    return false;
}


function extractUniqueKeywords(objectsArray) {
    return [...new Set(objectsArray.flatMap(obj => obj.name))];
}



function findDistinguishableColor(color1, color2) {
    // Helper function to parse color input to RGB array
    function parseColor(color) {
        if (Array.isArray(color)) {
            return color; // Already in [r, g, b] format
        }
        // Assume color is a string "rgb(r, g, b)"
        let result = color.match(/\d+/g);
        return result ? result.map(Number) : null;
    }

    color1 = parseColor(color1);
    color2 = parseColor(color2);

    if (!color1 || !color2 || color1.includes(NaN) || color2.includes(NaN)) {
        console.error('Invalid color inputs:', color1, color2);
        return null; // Return early if color parsing fails
    }

    // Calculate the average of two colors
    const avgColor = [
        (color1[0] + color2[0]) / 2,
        (color1[1] + color2[1]) / 2,
        (color1[2] + color2[2]) / 2
    ];

    // Calculate complementary color
    const complementaryColor = avgColor.map(c => 255 - c);

    // Function to calculate distance between two colors
    function colorDistance(c1, c2) {
        return Math.sqrt(
            (c1[0] - c2[0]) ** 2 +
            (c1[1] - c2[1]) ** 2 +
            (c1[2] - c2[2]) ** 2
        );
    }

    // Check if complementary color is sufficiently different from the original two
    const distance1 = colorDistance(complementaryColor, color1);
    const distance2 = colorDistance(complementaryColor, color2);

    if (distance1 > 100 && distance2 > 100) {
        return `rgb(${complementaryColor[0]}, ${complementaryColor[1]}, ${complementaryColor[2]})`;
    }

    // If the complementary color is not suitable, modify it further
    const adjustedColor = complementaryColor.map(c => (c + 128) % 256);
    return `rgb(${adjustedColor[0]}, ${adjustedColor[1]}, ${adjustedColor[2]})`;
}

// Example usage



// Example usage
//   const color1 = [120, 200, 80];
//   const color2 = [200, 50, 150];
//   const newColor = findDistinguishableColor(color1, color2);
//   console.log('New Distinguishable Color:', newColor);


function areNamesIdentical(instance1, instance2) {
    if (instance1.name && instance2.name) {
        if (instance1.name.length !== instance2.name.length) {
            return false;
        }

        for (let i = 0; i < instance1.name.length; i++) {
            if (instance1.name[i] !== instance2.name[i]) {
                return false;
            }
        }

        return true;
    } else {
        return false
    }

}