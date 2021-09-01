let Points = [];
let r = 15;
let tDisplay = 0.7;
let t = 0;
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
    startButton.disabled = true;
    start = true;
})

console.log(pointsLinesBox);

function setup() {
    createCanvas(windowWidth * 80 / 100, windowHeight);
}

function draw() {
    tDisplay = float(timeSlider.value);
    console.log(tDisplay);
    background("black");
    c = color(255);
    fill(c);
    stroke(255);
    if(start) {
        noFill();
        beginShape();
        // if (t < 1) t += dt;
        // const {A, B, C, D, E, P} = deCasteljauAlgorithm(Points, t);
        // vertexArray.push({A, B, C, D, E, P});
        // vertexArray.forEach(({P}) => {
        //     vertex(P.x, P.y);
        // });
        while(t <= 1) {
            const {A, B, C, D, E, P} = deCasteljauAlgorithm(Points, t);
            vertexArray.push({A, B, C, D, E, P});
            t += dt;
        }
        vertexArray.forEach(({P}) => {
            vertex(P.x, P.y);
        });
        endShape();

        if (pointsLinesBox.checked) {
            const {A, B, C, D, E, P} = deCasteljauAlgorithm(Points, tDisplay);
            vectLine(A, B);
            vectLine(B, C);
            vectLine(D, E);
            vectLine(Points[0], Points[1]);
            vectLine(Points[1], Points[2]);
            vectLine(Points[2], Points[3]);
            displayPoints([A, B, C, D, E, P, ...Points], "white", true);
        } else if (pointsBox.checked) {
            displayPoints(Points, "white", true);
        } else {
            vectLine(Points[0], Points[1]);
            vectLine(Points[2], Points[3]);
            displayPoints(Points, "white", true);
        }
    }

    if (!start) {
        displayPoints(Points, "white", true);
    }
 
}

function windowResized() {
	resizeCanvas(windowWidth * 80 / 100, windowHeight);
}

function mouseClicked() {
    
    if (index !== -1) {
    }
    if (!start) {
        Points.push(createVector(mouseX, mouseY));
        if (Points.length > 4) Points.shift();
        console.log(Points)
    }
    locked = false;
}

function mousePressed() {
    index = detectColide(Points);
    locked = true;
}

function mouseDragged() {
    if (locked && index !== -1) {
        Points[index].x = mouseX;
        Points[index].y = mouseY;
        t = 0;
        vertexArray = [];
    }
}