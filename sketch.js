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

//------------------Presets
let pfsClassical = []
let pfsSpecial = []
let pfRhombus;// default
//--- Classical / Special
let pfSmile;
let pfDiagonalBox;
let pfCasual;
let pfA;
let pfQuestionMark;
//--------pf / pa ---------
let pasClassical = []
let pasSpecial = []
let paTest;
let paChessboardGrid;
let paFulfillGrid;
let paLooseDiagonalFrameGrid;
let paDenseDiagonalFrameGrid;
let paUpwardGrid;
let paTowardsCenterGrid;
//--- Grid / Circle
let paStandardCircle;
let paSizedCircle; // default
let paSpiralSpanCricle;
let paSpiralClusterCricle;
let paSpiralOverlappingCricle;

//--- Circle / Random
let paRandom;

//------------------Presets

let srPercentage = 0;
let srIsTransmiting = false;
let srArrangement;
let srFractals = []
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


function setup() {
  createCanvas(windowWidth, windowHeight)
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


  standardBorderDistance = max(width, height) / (CanvasDivision * 2)
  frameRate(60)
  //------------------Presets
  pfRhombus = presetFractalSimpleRhombus();// default
  //--- Classical / Special
  pfSmile = presetFractalSmile()
  pfDiagonalBox = presetFractalDiagonalBox()
  pfCasual = presetFractalCasual();
  pfA = presetFractalA();
  pfQuestionMark = presetFractalQuestionMark();
  pfsClassical = [pfSmile, pfDiagonalBox, pfA, pfCasual, pfQuestionMark,pfRhombus]
  pfsSpecial = [pfSmile, pfDiagonalBox, pfA, pfCasual, pfQuestionMark]
  //--------pf / pa ---------
  paTest = presetArrangementTest();
  paChessboardGrid = presetArrangementChessboardGrid();
  paFulfillGrid = presetArrangementFulfillGrid();
  paLooseDiagonalFrameGrid = presetArrangementLooseDiagonalFrameGrid();
  paDenseDiagonalFrameGrid = presetArrangementDenseDiagonalFrameGrid();
  paUpwardGrid = presetArrangementUpwardGrid()
  paTowardsCenterGrid = presetArrangementTowardsCenterGrid()
  //--- Grid / Circle
  paStandardCircle = presetArrangementStandardCricle()
  paSizedCircle = presetArrangementSizedCricle()
  paSpiralSpanCricle = presetArrangementSpiralSpanCricle();
  paSpiralClusterCricle = presetArrangementSpiralClusterCricle();
  paSpiralOverlappingCricle = presetArrangementSpiralOverlappingCricle();
  //--- Circle / Random
  paRandom = presetArrangementRandom()
  pasClassical = [paTowardsCenterGrid, paRandom, paStandardCircle,paTest,paTowardsCenterGrid,paSizedCircle]
  pasSpecial = [paRandom]
  //------------------Presets
  srFractals = duplicate(paUpwardGrid, pfRhombus)
  srArrangement = new Arrangement()
  // srArrangement = paSizedCircle.copy()
  srArrangement = paTest.copy()
}

// Speech recognized event
function gotSpeech() {
  console.log(speechRec);
  if (speechRec.resultValue) {
    let said = speechRec.resultString;

    let words = said.toLowerCase().split(" ");
    let colorChangeTarget = ""; // Determine which color to change: 'background' or 'square'

    words.forEach((word) => {
      if (word === "background") {
        colorChangeTarget = "background"; // Next color found changes background color
      } else if (isColor(word)) {
        let newColor = color(word);
        if (colorChangeTarget === "background") {
          targetBackgroundColor = newColor; // Set target background color
          colorChangeTarget = ""; // Reset the target to avoid affecting fractal color unintentionally
        } else {
          targetColor = newColor; // Set target fractal color
          updateFractalsColor(newColor.levels[0], newColor.levels[1], newColor.levels[2]); // Update the fractals' color
        }
      }
      if (word === "shuffle" || word === "transform" || word === "jumble" || word === "rearrange" && !srIsTransmiting) {
        initiate(); // Toggle layout on keyword detection
      }
      if (word === "stop" && srIsTransmiting) {
        terminate(); // Toggle layout on keyword detection
      } 
    });
  }
}

// Helper function to determine if a word is a recognizable color
function isColor(strColor) {
  var s = new Option().style;
  s.color = strColor;
  return s.color === strColor;
}

// Function to update all fractals' colors
function updateFractalsColor(r, g, b) {
  // Loop through all fractals and update their color
  srFractals.forEach(row => {
    row.forEach(fractal => {
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
  show(srArrangement, srFractals)
  // text(srFractals[0][0].shapes[0][0],100,100)
  // text(srPercentage,100,120)
  // text(indexer,100,140)
  // text(customMap(srPercentage,0,percentageCap,0.3,0.5),100,200)
  // text(millis(),100,140)


  if (srIsTransmiting) {//resets after stopping transmiting
    // console.log(srPercentage)
    srPercentage++
    srArrangement.transition(orArrangement, tgArrangement, srPercentage)//transmit the arrangement
    for (let i = 0; i < CanvasDivision; i++) {
      for (let j = 0; j < CanvasDivision; j++) {
        srFractals[i][j].transition(orFractalExample, tgFractalExample, srPercentage)//transmit the fractal's shapes and settings
      }
    }
  }
  if (srPercentage >= percentageCap) {// stop transmiting
    console.log("Time's Up")
    terminate()
  }
}

