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
const percentageCap = 15000;
let standardBorderDistance;
let time;

//------------------Presets
let pfSmile;
let pfDiagonalBox;
let pfCasual;
let paGridUpward;
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
  paGridUpward = presetArrangementUpwardGrid()
  paRandom = presetArrangementRandom()
  paGridCentralized = presetArrangementTowardsCenterGrid()
  //------------------Presets
  srFractals = duplicate(paGridUpward, pfSmile)
  srArrangement = new Arrangement()
  console.log(srFractals[0][0].shapes[0])

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



  if (srIsTransmiting) {//resets after stopping transmiting

    srPercentage++
    srArrangement.transition(orArrangement, tgArrangement, srPercentage)//transmit the arrangement
    for (let i=0;i<CanvasDivision;i++){
      for (let j=0;j<CanvasDivision;j++){
        srFractals[i][j].transition(orFractalExample,tgFractalExample,srPercentage)//transmit the fractal's shapes and settings
        // console.log(srFractals[i][j])
        // if(i==15&&j==15)
        // console.log(srPercentage)
      }
    }
  }
  // console.log(srPercentage)
  if (srPercentage >= percentageCap) {// stop transmiting
    srIsTransmiting = false
    srPercentage = 0
    srArrangement = tgArrangement
    // srFractals = duplicate(srArrangement,tgFractalExample)
    console.log("Terminated")
    console.log(srFractals[0][0].shapes[0])
    orFractalExample = tgFractalExample.copy()
    orArrangement = tgArrangement.copy()
    srFractals=duplicate(srArrangement,tgFractalExample)
  }
}

function mousePressed(){
  time = millis();
  console.log("Mouse")
  console.log(srFractals[0][0].shapes[0])
  testTransmitArrangement(paRandom)
  testTransmitFractal(pfDiagonalBox)
}
