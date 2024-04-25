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
const percentageCap = 100;
let standardBorderDistance;
let time;

//------------------Presets
let pfs = []
let pfSmile;
let pfDiagonalBox;
let pfCasual;
let pfA;
let pfQuestionMark;
//--------pf / pa ---------
let pas = []
let paGridUpward;
let paCircle;
let paCircleCentralized;
let paGridCentralized;
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

function setup() {
  createCanvas(windowWidth, windowHeight)
  standardBorderDistance = max(width, height) / (CanvasDivision * 2)
  frameRate(60)
  //------------------Presets
  pfSmile = presetFractalSmile()
  pfDiagonalBox = presetFractalDiagonalBox()
  pfCasual = presetFractalCasual();
  pfA = presetFractalA();
  pfQuestionMark = presetFractalQuestionMark();
  pfs = [pfSmile, pfDiagonalBox, pfA, pfCasual, pfQuestionMark]
  //--------pf / pa ---------
  paGridUpward = presetArrangementUpwardGrid()
  paRandom = presetArrangementRandom()
  paGridCentralized = presetArrangementTowardsCenterGrid()
  paCircle = presetArrangementCricle()
  paCircleCentralized = presetArrangementCentralTowardsCricle();
  pas = [paGridCentralized, paRandom, paCircle,paCircleCentralized,paGridCentralized]
  //------------------Presets
  srFractals = duplicate(paGridUpward, pfSmile)
  srArrangement = new Arrangement()

}
<<<<<<< Updated upstream
=======

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

  if (confidence > 50) {
      if (label === "Shuffle" && !srIsTransmiting) {
          initiate();
      } else if (label === "Stop" && srIsTransmiting && confidence > 80) {
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



>>>>>>> Stashed changes
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



  if (srIsTransmiting) {//resets after stopping transmiting
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

function mousePressed() {
  console.log("-Mouse Pressed")
  if (srIsTransmiting == false) {
    initiate()
  } else {
    console.log("But -  srIsTransmiting is true. Percentage:", srPercentage)
  }
}

