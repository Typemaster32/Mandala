/*
Global Variables:
  pf: preset fractal (single, not array)
  pa: preset arrangement
  bd: border distance
  sr: source, stands for the current state
  or: origin, is the origin(clone) of "sr" when start to transmit
  tg: target, is the target when start to transmit
*/
const CanvasDivision = 16;
const percentageCap = 1000;
let standardBorderDistance;
let time;
let keywordAggregation = [];
let active = false;

//------------------Presets--------------------------
let pfsClassical = [];
let pfsSpecial = [];
let pfsAll = [];
let pfTest;
let pfMoon;
let pfArrowTriangle;
let pfQuadrupleCircle;
let pfStrokeWeightRhombus;
let pfsimpleRhombus;
let pfSimpleRhombus; // default
let pfHexagon;
let pfPentagon;
let pfDoubleRainbow;
let pfSingleRainbow;
let pfStar;
let pfHeart;
let pfSpiral;
let pfArrow;
let pfDiamond;
let pfVesica;
let pfIllusion;
let pfFlower;
let pfOpticalIGrid;
let pfSpiralWeb;
let pfWindmill;



//--- Classical / Special
let pfSmile;
let pfDiagonalBox;
let pfCasual;
let pfA;
let pfQuestionMark;
//--------pf / pa ---------
let pasClassical = [];
let pasSpecial = [];
let pfaAll = [];
let paTest;
let paChessboardGrid;
let paFulfillGrid;
let paLooseDiagonalFrameGrid;
let paDenseDiagonalFrameGrid;
let paUpwardGrid;
let paTowardsCenterGrid;
let paHexagon;
let paHexagonVariation;
let paTriangle;
let paTriangleVariation;
let paIStripes;
let paStar;
let paCorner;



//--- Grid / Circle
let paStandardCircle;
let paSizedCircle; // default
let paSpiralSpanCricle;
let paSpiralClusterCricle;
let paSpiralOverlappingCricle;

//--- Circle / Random
let paRandom;

//------------------Presets--------------------------

let srPercentage = 0;
let srIsTransmiting = false;
let srArrangement;
let srFractals = [];
let srFractalExample;
let orArrangement;
let orFractalExample;
let tgArrangement;
let tgFractalExample;

let indexer = 1;

//------------------SoundClassifier
let sound;
let label;
let speech;
let currentColor, targetColor;
let backgroundColor, targetBackgroundColor; // Variables for current and target background colors
let mic, amplitude;

let isValidKeyword = false

function setup() {
  mic = new p5.AudioIn();// Start the audio input.
  mic.start();// Create a new Amplitude analyzer
  amplitude = new p5.Amplitude();// Patch the input to an volume analyzer
  amplitude.setInput(mic);


  createCanvas(windowWidth, windowHeight);
  colorMode(RGB, 255, 255, 255, 1); // Set color mode to RGB
  currentColor = color(255, 255, 255); // Initialize current color as white
  targetColor = currentColor; // Set target color same as current initially
  backgroundColor = color(255); // Initialize the background color
  targetBackgroundColor = backgroundColor; // Initialize target background color same as current

  // Create a Speech Recognition object with callback
  speechRec = new p5.SpeechRec("en-US", gotSpeech);
  speechRec.continuous = true;
  speechRec.interimResults = false;
  speechRec.start();

  // DOM element to display results
  let output = select("#speech");

  standardBorderDistance = max(width, height) / (CanvasDivision * 2);
  frameRate(60);
  //------------------Presets--------------------------
  pfTest = presetFractalTest(); // NOT in routine
  pfHi = presetFractalHi(); // NOT in routine
  pfMoon = presetFractalMoon();
  pfArrowTriangle = presetFractalArrowTriangle();
  pfQuadrupleCircle = presetFractalQuadrupleCircle();
  pfStrokeWeightRhombus = presetFractalStrokeWeightRhombus();
  pfSimpleRhombus = presetFractalSimpleRhombus(); // default
  pfHexagon = presetFractalHexagon();
  pfDoubleRainbow = presetFractalDoubleSideRainbow();
  pfSingleRainbow = presetFractalSingleSideRainbow();
  pfPentagon = presetFractalPentagon();
  pfStar = presetFractalStar();
  pfHeart = presetFractalHeart();
  pfSpiral = presetFractalSpiral();
  pfArrow = presetFractalArrow();
  pfDiamond = presetFractalDiamond();
  pfVesica = presetFractalVesicaPiscis();
  pfIllusion = presetFractalCubicIllusion();
  pfFlower = presetFractalFlower();
  pfOpticalIGrid = presetFractalOpticalGrid();
  pfSpiralWeb = presetFractalSpiralWeb();
  pfWindmill = presetFractalWindmill();

  //--- Classical / Special
  pfSmile = presetFractalSmile(); // NOT in routine
  pfDiagonalBox = presetFractalDiagonalBox();
  pfCasual = presetFractalCasual();
  pfA = presetFractalA();
  pfQuestionMark = presetFractalQuestionMark();
  pfsClassical = [pfMoon, pfArrowTriangle, pfQuadrupleCircle, pfSimpleRhombus];
  pfsSpecial = [pfSmile, pfDiagonalBox, pfA, pfCasual, pfQuestionMark];

  pfsAll = [
    pfMoon,
    pfArrowTriangle,
    pfQuadrupleCircle,
    pfSimpleRhombus,
    pfDiagonalBox,
    pfSmile,
    pfA,
    pfCasual,
    pfQuestionMark,
    pfDoubleRainbow,
    pfSingleRainbow,
    pfHexagon,
    pfPentagon,
    pfStar,
    pfHeart,
    pfSpiral,
    pfDiamond,
    pfVesica,
    pfIllusion,
    pfFlower,
    pfOpticalIGrid,
    pfSpiralWeb,
    pfWindmill,


  ];
  //--------pf / pa ---------
  paTest = presetArrangementTest();
  paChessboardGrid = presetArrangementChessboardGrid();
  paFulfillGrid = presetArrangementFulfillGrid();
  paLooseDiagonalFrameGrid = presetArrangementLooseDiagonalFrameGrid();
  paDenseDiagonalFrameGrid = presetArrangementDenseDiagonalFrameGrid();
  paUpwardGrid = presetArrangementUpwardGrid();
  paTowardsCenterGrid = presetArrangementTowardsCenterGrid();
  //--- Grid / Circle
  paStandardCircle = presetArrangementStandardCricle();
  paSizedCircle = presetArrangementSizedCricle();
  paSpiralSpanCricle = presetArrangementSpiralSpanCricle();
  paSpiralClusterCricle = presetArrangementSpiralClusterCricle();
  paSpiralOverlappingCricle = presetArrangementSpiralOverlappingCricle();
  //--- Circle / Random
  paRandom = presetArrangementRandom();
  //--- New ---
  paHexagon = presetArrangementHexagonalGrid();
  paHexagonVariation = presetArrangementHexagonalGridVariation();
  paTriangle = presetArrangementTriangularGrid();
  paTriangleVariation = presetArrangementTriangularGridVariation();
  paIStripes = presetArrangementIslamicStripes();
  paStar = presetArrangementV();
  paCorner = presetArrangementCornerFixed();
  pasClassical = [
    paChessboardGrid,
    paFulfillGrid,
    paLooseDiagonalFrameGrid,
    paDenseDiagonalFrameGrid,
    paUpwardGrid,
    paTowardsCenterGrid,
    paStandardCircle,
    paSizedCircle,
    paSpiralSpanCricle,
    paSpiralClusterCricle,
    paSpiralOverlappingCricle,
  ];
  pasSpecial = [paRandom];
  pasAll = [
    paChessboardGrid,
    paFulfillGrid,
    paLooseDiagonalFrameGrid,
    paDenseDiagonalFrameGrid,
    paUpwardGrid,
    paTowardsCenterGrid,
    paStandardCircle,
    paSizedCircle,
    paSpiralSpanCricle,
    paSpiralClusterCricle,
    paSpiralOverlappingCricle,
    paRandom,
    paHexagon,
    paHexagonVariation,
    paTriangle,
    paTriangleVariation,
    paIStripes,
    paStar,
    paCorner
  ];
  //------------------Presets--------------------------
  // srFractals = duplicate(paUpwardGrid, pfQuadrupleCircle);
  srFractals = duplicate(paUpwardGrid, pfQuadrupleCircle);

  srArrangement = new Arrangement();
  srArrangement = paSizedCircle.copy()
  orArrangement = paSizedCircle.copy()
  // srArrangement = paStar.copy()
  tgArrangement = paStar.copy()
  // srArrangement = paFulfillGrid.copy();
  keywordAggregation = extractUniqueKeywords([...pasAll, ...pfsAll]);
  setInterval(autoInitiate, 10000)
  setInterval(manualRestart, 20000)
}

// Speech recognized event
function gotSpeech() {
  console.log(speechRec);
  if (speechRec.resultValue) {
    let said = speechRec.resultString;

    let words = said.toLowerCase().split(" ");
    let colorChangeTarget = ""; // Determine which color to change: 'background' or 'square'

    // Initialize flags to check for both "hey" and "mandala"
    let foundHey = false;
    let foundMandala = false;

    // Initialize flags for "goodbye", "thank you", "happy"
    let foundGoodbye = false;
    let foundThankYou = false;
    let foundHappy = false;
    text(words, 0, 0)
    words.forEach((word) => {

      if (word === "hey") {
        foundHey = true; // Set the flag for "hey"
        isValidKeyword = true
      }
      if (word === "mandala") {
        foundMandala = true; // Set the flag for "mandala"
        isValidKeyword = true
      }
      if (foundHey && foundMandala) {
        console.log("Heyyyyyy")
        heyMandala()
        isValidKeyword = true
      }

      // Set flags for goodbye, thank you, happy
      if (word === "goodbye") {
        foundGoodbye = true;
        isValidKeyword = true
      }
      if (word === "thank" && word === "you") {  // Assuming next word check is handled elsewhere
        foundThankYou = true;
        isValidKeyword = true
      }
      if (word === "happy") {
        foundHappy = true;
        isValidKeyword = true
      }

      // Check all three flags
      if (foundGoodbye || foundThankYou || foundHappy) {
        console.log("Goodbye, Thank You!!!");
        byeMandala(); // Function to respond to the combination
        isValidKeyword = true
      }

      if (keywordAggregation.includes(word)) {
        initiateWithKeywords([word]);
        createButtonTest(word)
        isValidKeyword = true
      }
      if (word === "background") {
        colorChangeTarget = "background"; // Next color found changes background color
        createButtonTest(word)
        isValidKeyword = true
      } else if (isColor(word)) {
        createButtonTest(word)
        let newColor = color(word);
        if (colorChangeTarget === "background") {
          targetBackgroundColor = newColor; // Set target background color
          colorChangeTarget = ""; // Reset the target to avoid affecting fractal color unintentionally
        } else {
          targetColor = newColor; // Set target fractal color
          updateFractalsColor(
            newColor.levels[0],
            newColor.levels[1],
            newColor.levels[2]
          ); // Update the fractals' color
        }
        // let buttonColor = findDistinguishableColor(backgroundColor, currentColor);
        // console.log(buttonColor)
        // const buttons = document.querySelectorAll('.custom-button');
        // buttons.forEach(button => {
        //   // console.log("try to change color of buttons")
        //   button.style.backgroundColor = buttonColor;
        // });
      }
      if (
        word === "shuffle" ||
        word === "transform" ||
        word === "transforming" ||
        word === "transition" ||
        word === "jumble" ||
        word === "rearrange" && !srIsTransmiting
      ) {
        isValidKeyword = true
        initiate(); // Toggle layout on keyword detection
        createButtonTest(word)
      }
      if (word === "stop" && srIsTransmiting) {
        isValidKeyword = true
        terminate(); // Toggle layout on keyword detection
        createButtonTest(word)
      }
      if (word === "refresh"||word === "refreshed"||word === "refreshing") {
        location.reload()
      }
    });
  }
  // active = isValidKeyword
}

// Helper function to determine if a word is a recognizable color
// function isColor(strColor) {
//   var s = new Option().style;
//   s.color = strColor;
//   return s.color === strColor;
// }

function isColor(strColor) {
  if (strColor.toLowerCase() === "white") {
    // Explicitly exclude "white" as a valid input
    return false;
  }

  // Create a new option element to test the color
  var s = new Option().style;
  s.color = strColor; // Set the color of the style

  // The browser converts unrecognized color strings to an empty string
  // Therefore, if s.color is not an empty string, the color is valid
  // Also check if the color is still not "white" after setting it
  return s.color !== "" && s.color.toLowerCase() !== "white";
}


// Function to update all fractals' colors
function updateFractalsColor(r, g, b) {
  // Loop through all fractals and update their color
  srFractals.forEach((row) => {
    row.forEach((fractal) => {
      fractal.updateColor(r, g, b); // Update color of each fractal
    });
  });
}

/*
State Management:
[Current]
(copy)|    \
      |     \
[Origin]->[Current]->[Target]
         (percentage)   |
                  \     |
                   \    |
                    \   |
                     [Current]
*/
function draw() {


  currentColor = lerpColor(currentColor, targetColor, 0.1);
  backgroundColor = lerpColor(backgroundColor, targetBackgroundColor, 0.1);
  background(backgroundColor); // Use the interpolated background color for the canvas

  if (active) {
    push()
    fill(255, 0, 0)
    noStroke()
    circle(0, 0, 3)
    pop()
  }


  let volume2 = amplitude.getLevel();
  let volumeIndex = map(volume2, 0, 1, 0, width);

  push()
  fill(255, 0, 0)
  noStroke()
  rect(0, 0, volumeIndex, 15)
  pop()

  if (speechRec.resultString) {
    let textDisplayedOnScreen="";
    if (isValidKeyword){
      textDisplayedOnScreen = "Instruction: " + speechRec.resultString
    }else{
      textDisplayedOnScreen = "Invalid Keywords: " + speechRec.resultString
    }
    text("Instruction: " + speechRec.resultString, 15, 15)
  }
  show(srArrangement, srFractals);
  // text(srFractals[0][0].shapes[0][0],100,100)
  // text(srPercentage,100,120)
  // text(indexer,100,140)
  // text(customMap(srPercentage,0,percentageCap,0.3,0.5),100,200)
  // text(millis(),100,140)

  if (srIsTransmiting) {
    //resets after stopping transmiting
    // console.log(srPercentage)
    srPercentage++;
    srArrangement.transition(orArrangement, tgArrangement, srPercentage); //transmit the arrangement
    for (let i = 0; i < CanvasDivision; i++) {
      for (let j = 0; j < CanvasDivision; j++) {
        srFractals[i][j].transition(
          orFractalExample,
          tgFractalExample,
          srPercentage
        ); //transmit the fractal's shapes and settings
      }
    }

    // text(orFractalExample.shapes[0][0][0],100,160)
    // text(tgFractalExample.shapes[0][0][0],100,180)
  }
  if (srPercentage >= percentageCap) {
    // stop transmiting
    console.log("Time's Up");
    terminate();
  }
}

// function mousePressed() {
//   console.log("-Mouse Pressed");
//   if (srIsTransmiting == false) {
//     initiate();
//   } else {
//     console.log("But -  srIsTransmiting is true. Percentage:", srPercentage);
//   }
// }

function keyPressed() {
  if (key === 's' || key === 'S' || key === 'ENTER') {
    let filename = tgArrangement.name + "---" + tgFractalExample.name
    saveCanvas(filename, 'png')
  } else if (key === 'a' || key === 'A' || key === 'LEFT_ARROW' || key === 'LEFT_ARROW' || key === 'UP_ARROW' || key === 'DOWN_ARROW') {
    if (srIsTransmiting == false) {
      initiate();
    } else {
      console.log("But -  srIsTransmiting is true. Percentage:", srPercentage);
    }
  }
}





function heyMandala() {
  console.log("Hey, Mandala!");
  if (srIsTransmiting == false) {
    srIsTransmiting = true;
    srPercentage = 0;

    console.log("-----------------Transition Started", "Target Arrangement: Upward", "Target Fractal: Hi!");
    testTransmitArrangement(paUpwardGrid);
    testTransmitFractal(pfHi);
  } else {
    console.log("But -  srIsTransmiting is true. Percentage:", srPercentage);
  }
}

function byeMandala() {
  console.log("Bye, Mandala!");
  if (srIsTransmiting == false) {
    srIsTransmiting = true;
    srPercentage = 0;

    console.log("-----------------Transition Started", "Target Arrangement: Upward", "Target Fractal: Smile!");
    testTransmitArrangement(paLooseDiagonalFrameGrid);
    testTransmitFractal(pfSmile);
  } else {
    console.log("But -  srIsTransmiting is true. Percentage:", srPercentage);
  }
}


function manualRestart(){
  console.log("automatically restarting speech listening")
  speechRec.start();
}