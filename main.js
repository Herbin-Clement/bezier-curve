let P0 = {x: 250, y: 250};
let P1 = {x: 550, y: 250};
let P2 = {x: 550, y: 550};
let P01 = {x: 0, y: 0};
let P12 = {x: 0, y: 0};
let Pmiddle = {x: 0, y: 1}
let r = 10;
let t = 0;
let speed = 0.001;

let vertexArray = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background("black");

    c = color(255);
    fill(c);
    stroke(255);
    ellipse(P0.x, P0.y, r);
    ellipse(P1.x, P1.y, r);
    ellipse(P2.x, P2.y, r);
    line(P0.x, P0.y, P1.x, P1.y);
    line(P1.x, P1.y, P2.x, P2.y);

    P01 = linearInterpolation(P0, P1, t);
    P12 = linearInterpolation(P1, P2, t);

    ellipse(P01.x, P01.y, r);
    ellipse(P12.x, P12.y, r);
    line(P01.x, P01.y, P12.x, P12.y);
    Pmiddle = linearInterpolation(P01, P12, t);
    ellipse(Pmiddle.x, Pmiddle.y, r);
    vertexArray.push(Pmiddle);

    beginShape();
    noFill();
    vertexArray.forEach((e) => {
        vertex(e.x, e.y);
    });
    endShape();

    if (t > 1) speed = -speed;
    if (t < 0) speed = -speed;

    t += speed;

    // console.log(t);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

const linearInterpolation = (p0, p1, t) => {
    let Px = (1-t) * p0.x + t * p1.x;
    let Py = (1-t) * p0.y + t * p1.y;
    console.log(Px, Py, t);
    return {x: Px, y: Py};
}

const middleOfLine = (P0, P1) => {
    Px = (P0.x + P1.x) / 2; 
    Py = (P0.y + P1.y) / 2; 
    return {x: Px, y: Py};
}