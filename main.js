let P0, P1, P2, P01, P12, Pmiddle;
let r = 10;
let t = 0;
let speed = 0.002;
let display = false;
let displayPoint = false;

let vertexArray = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    P0 = createVector(250, 550);
    P1 = createVector(550, 850);
    P2 = createVector(550, 550);
    P01 = createVector(0, 0);
    P12 = createVector(0, 0);
    Pmiddle = createVector(0, 0);
}

function draw() {
    background("black");

    // display = keyIsPressed ? true : false;

    if (keyIsPressed) {
        console.log(keyIsPressed)
        switch (key) {
            case "d":
                display = true;
                break;
            case "p":
                displayPoint = true;
                break;
            default:
                display = false;
                displayPoint = false;
                break;
        }
    } else {
        display = false;
        displayPoint = false;
    };

    c = color(255);
    fill(c);
    stroke(255);
    P01 = linearInterpolation(P0, P1, t);
    P12 = linearInterpolation(P1, P2, t);
    Pmiddle = linearInterpolation(P01, P12, t);
    vertexArray.push(Pmiddle);
    if (display) {
        ellipse(P0.x, P0.y, r);
        ellipse(P1.x, P1.y, r);
        ellipse(P2.x, P2.y, r);
        line(P0.x, P0.y, P1.x, P1.y);
        line(P1.x, P1.y, P2.x, P2.y);
        ellipse(P01.x, P01.y, r);
        ellipse(P12.x, P12.y, r);
        line(P01.x, P01.y, P12.x, P12.y);
        ellipse(Pmiddle.x, Pmiddle.y, r);
    } else if (displayPoint) {
        ellipse(P0.x, P0.y, r);
        ellipse(P1.x, P1.y, r);
        ellipse(P2.x, P2.y, r);
    }


    beginShape();
    noFill();
    vertexArray.forEach((e) => {
        vertex(e.x, e.y);
    });
    endShape();

    // if (t > 1) speed = -speed;
    // if (t < 0) speed = -speed;
    if (t < 1) t += speed;

    // console.log(t);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

const linearInterpolation = (p0, p1, t) => {
    let Px = (1-t) * p0.x + t * p1.x;
    let Py = (1-t) * p0.y + t * p1.y;
    // console.log(Math.floor(Px), Math.floor(Py), Math.floor(t));
    return {x: Px, y: Py};
}

const middleOfLine = (P0, P1) => {
    Px = (P0.x + P1.x) / 2; 
    Py = (P0.y + P1.y) / 2; 
    return {x: Px, y: Py};
}