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

//------------------Presets--------------------------
let pfsClassical = []
let pfsSpecial = []
let pfTest;
let pfMoon;
let pfArrowTriangle;
let pfQuadrupleCircle;
let pfStrokeWeightRhombus;
let pfsimpleRhombus;
let pfSimpleRhombus;// default

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

//------------------Presets--------------------------

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


function preload() {
  sound = ml5.soundClassifier('https://teachablemachine.withgoogle.com/models/6mFq7qMMv/model.json');
}


function setup() {
  createCanvas(windowWidth, windowHeight)
  standardBorderDistance = max(width, height) / (CanvasDivision * 2)
  frameRate(60)
  //------------------Presets--------------------------
  pfTest = presetFractalTest();
  pfMoon = presetFractalMoon();
  pfArrowTriangle = presetFractalArrowTriangle();
  pfQuadrupleCircle = presetFractalQuadrupleCircle();
  pfStrokeWeightRhombus = presetFractalStrokeWeightRhombus();
  pfSimpleRhombus = presetFractalSimpleRhombus();// default
  //--- Classical / Special
  pfSmile = presetFractalSmile()
  pfDiagonalBox = presetFractalDiagonalBox()
  pfCasual = presetFractalCasual();
  pfA = presetFractalA();
  pfQuestionMark = presetFractalQuestionMark();
  pfsClassical = [pfMoon, pfArrowTriangle, pfQuadrupleCircle, pfSimpleRhombus,]
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
  pasClassical = [paChessboardGrid, paFulfillGrid, paLooseDiagonalFrameGrid, paDenseDiagonalFrameGrid, paUpwardGrid, paTowardsCenterGrid, paStandardCircle, paSizedCircle, paSpiralSpanCricle, paSpiralClusterCricle, paSpiralOverlappingCricle]
  pasSpecial = [paRandom]
  //------------------Presets--------------------------
  srFractals = duplicate(paUpwardGrid, pfTest)
  srArrangement = new Arrangement()
  // srArrangement = paSizedCircle.copy()
  srArrangement = paFulfillGrid.copy()
}


function classifyAudio() {
  sound.classify(gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.log(error);
    return;
  }

  let label = results[0].label;
  let confidence = results[0].confidence * 100; // confidence as percentage
  console.log("[label]", label, "[confidence]", confidence);

  if (confidence > 100) {
    if (label === "Shuffle" && !srIsTransmiting) {
      initiate();
    } else if (label === "Stop" && srIsTransmiting) {
      terminate();
    } else if (["Red", "Green", "Blue"].includes(label)) {
      let color = [0, 0, 0];
      switch (label) {
        case "Red":
          color = [255, 0, 0];
          break;
        case "Green":
          color = [0, 255, 0];
          break;
        case "Blue":
          color = [0, 0, 255];
          break;
      }

      if (srIsTransmiting) {
        // Update color of all currently displaying fractals
        updateFractalsColor(color);
      } else {
        // Start a new fractal transmission with the specified color
        initiate(color);
      }
    }
  }
}

function updateFractalsColor(color) {
  // This function will loop through all fractals and update their color.
  for (let row of srFractals) {
    for (let fractal of row) {
      fractal.updateColor(...color);
    }
  }
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
  background("");
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

    // text(orFractalExample.shapes[0][0][0],100,160)
    // text(tgFractalExample.shapes[0][0][0],100,180)
  }
  if (srPercentage >= percentageCap) {// stop transmiting
    console.log("Time's Up")
    terminate()
  }
}

function mousePressed() {
  console.log("-Mouse Pressed")
  if (srIsTransmiting == false) {
    initiate()
  } else {
    console.log("But -  srIsTransmiting is true. Percentage:", srPercentage)
  }
}

