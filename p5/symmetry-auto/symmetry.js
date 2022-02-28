// Symmetry corresponding to the number of reflections. Change the number for different number of reflections
let symmetry;

let angle;
let saveButton, clearButton, mouseButton, keyboardButton;
let slider;
let bg;
let r, g, b;
let rUp, gUp, bUp;

function setup() {
  colorMode(HSB, 255, 255, 255)
  r = floor(random(255));
  console.log(r);
  g = floor(random(255));
  console.log(g);
  b = floor(random(255));
  console.log(b);
  rUp = colorDirectionInit(r, false);
  gUp = colorDirectionInit(g, false);
  bUp = colorDirectionInit(b, false);
  bg = color(r, g, b);
  createCanvas(710, 710);
  angleMode(DEGREES);
  background(bg);

  symmetry = random(10);
  angle = 360 / symmetry;

  // Creating the save button for the file
  saveButton = createButton('save');
  saveButton.mousePressed(saveFile);

  // Creating the clear screen button
  clearButton = createButton('clear');
  clearButton.mousePressed(clearScreen);

  // Creating the button for Full Screen
  fullscreenButton = createButton('Full Screen');
  fullscreenButton.mousePressed(screenFull);

  // Setting up the slider for the thickness of the brush
  brushSizeSlider = createButton('Brush Size Slider');
  sizeSlider = createSlider(1, 32, 4, 0.1);
}

// Save File Function
function saveFile() {
  save('design.jpg');
}

// Clear Screen function
function clearScreen() {
  background(bg);
}

// Full Screen Function
function screenFull() {
  let fs = fullscreen();
  fullscreen(!fs);
}

function draw() {

  translate(width / 2, height / 2);

  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let mx = mouseX - width / 2;
    let my = mouseY - height / 2;
    let pmx = pmouseX - width / 2;
    let pmy = pmouseY - height / 2;

    if (mouseIsPressed) {
      let sc = changeColors();
      for (let i = 0; i < symmetry; i++) {
        rotate(angle);
        let sw = sizeSlider.value();
        strokeWeight(sw);
        stroke(sc);
        line(mx, my, pmx, pmy);
        push();
        scale(1, -1);
        // stroke(color(random(255), random(255), random(255)));
        line(mx, my, pmx, pmy);
        pop();
      }
    }
  }
}

function colorDirectionInit(color, direction) {
  if (color == 0) return true;
  else if (color == 255) return false;
  else return direction;
}

function modifyColor(color, direction) {
  // r,g,b
  if (color == 0) {
    color = 1;
    direction = true
  } else if (color == 255) {
    color = 254;
    direction = false;
  } else if (direction) {
    color = color + 1;
  } else {
    color = color - 1;
  }
  return [color, direction];
}

function changeColors() {
  [r, rUp] = modifyColor(r, rUp);
  [g, gUp] = modifyColor(g, gUp);
  [b, bUp] = modifyColor(b, bUp);
  console.log(r, g, b);
  return color(r,g,b);
}
