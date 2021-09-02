let Points = [];
let r = 15;
let tDisplay = 0.7;
let dt = 0.002;
let start = false;
let index = -1;
let locked = false;
 
let vertexArray = [];

const timeSlider = document.querySelector("#time");
const pointsLinesBox = document.querySelector("#pointsLines");
const pointsBox = document.querySelector("#points");
const startButton = document.querySelector("#start");

startButton.addEventListener("click",() => {
    if (Points.length === 4) {
        startButton.disabled = true;
        start = true;
    }
});

function setup() {
    createCanvas(windowWidth * 80 / 100, windowHeight);
}

function draw() {
    tDisplay = float(timeSlider.value);
    background("black");
    c = color(255);
    fill(c);
    stroke(255);
    if(start) {
        vertexArray = computeBezierCurve(dt);
        // if (t < 1) t += dt;
        // const {A, B, C, D, E, P} = deCasteljauAlgorithm(Points, t);
        // vertexArray.push({A, B, C, D, E, P});
        // vertexArray.forEach(({P}) => {
        //     vertex(P.x, P.y);
        // });
        noFill();
        strokeWeight(5);
        beginShape();
        vertexArray.forEach(({P}) => {
            vertex(P.x, P.y);
        });
        strokeWeight(1);
        endShape();

        if (pointsLinesBox.checked) {
            const data = deCasteljauAlgorithm(Points, tDisplay);
            displayPointsAndLines({...data, Points});
        } else if (pointsBox.checked) {
            displayPoints(Points);
        }
    }
    if (!start) {
        points(Points, "white", true);
    }
 
}

function windowResized() {
	resizeCanvas(windowWidth * 80 / 100, windowHeight);
}

function mouseClicked() {
    
    if (index !== -1) {
    }
    if (!start && isInCanvas()) {
        Points.push(createVector(mouseX, mouseY));
        if (Points.length > 4) Points.shift();
        console.log(Points)
    }
    locked = false;
}

function mousePressed() {
    if (pointsBox.checked || pointsLinesBox.checked) {
        index = detectColide(Points);   
        locked = true;
    }
}

function mouseDragged() {
    if (locked && index !== -1 && isInCanvas()) {
        Points[index].x = mouseX;
        Points[index].y = mouseY;
        t = 0;
        vertexArray = [];
    }
}