let DIS_WIDTH = 400;
let HALF_WIDTH = DIS_WIDTH / 2
let DIS_HEIGHT = 400;
let FPS = 24;
let debug = true;
let aesthetics = true;

let points = []
let numPoints = 7
let pointIndex = 0
let depth = 400
let t = 0

function setup() {
  createCanvas(DIS_WIDTH, DIS_HEIGHT);
  background(50)
  frameRate(FPS);

  for (let i = 0; i < numPoints; i++) {
    points.push(createVector(random(DIS_WIDTH), random(DIS_HEIGHT), random(depth)))
  }

}

function draw() {
  // background(20);
  loadPixels();
  // let d = pixelDensity();
  // let fullImage = 4 * (width * d) * (height * d);
  // for (let i = 0; i < fullImage; i += 4) {
  //   let colorr = color(random(255))
  //   pixels[i] = red(colorr);
  //   pixels[i + 1] = green(colorr);
  //   pixels[i + 2] = blue(colorr);
  //   pixels[i + 3] = alpha(colorr);
  // }
  t += 0.1
  let z = 0.5 * depth * sin(t) + (0.5 * depth)

  for (let x = 0; x < DIS_WIDTH; x++) {
    for (let y = 0; y < DIS_HEIGHT; y++) {
      let distances = []
      points.forEach((point) => {
        distances.push(p5.Vector.dist(point, createVector(x, y, z)))
      });
      distances.sort((a, b) =>
        a - b)
      // let colorr = color(map(sin((distances[pointIndex] / Math.max(...distances)) * (PI / 2)), 0, 1, 255, 0))
      // let colorr = color(map(sin((distances[pointIndex] / HALF_WIDTH) * (PI / 2)), 0, 1, 255, 0))
      // let colorr = color(map(distances[pointIndex], 0, 0.4 * HALF_WIDTH, 255, 0))
      let colorr = color(map(Math.exp(-distances[pointIndex] / (0.4 * HALF_WIDTH)), 0, 1, 0, 255))

      set(x, y, colorr)
    }
  }
  updatePixels();

  // fill(134, 192, 240, 130)
  // noStroke()
  // for (let point of points) {
  //   circle(point.x, point.y, 9)
  // }

  console.log('hi');
  // noLoop()
}

loopBool = true;

function keyPressed() {
  if (key == " ") {
    if (loopBool) {
      noLoop();
      loopBool = !loopBool;
    } else {
      loop();
      loopBool = !loopBool;
    }
  } else if (key == 'd') {
    debug = !debug;
  } else if (key == 'a') {
    aesthetics = !aesthetics;
  }
}