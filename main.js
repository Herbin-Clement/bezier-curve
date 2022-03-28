let Points = [];
let r = 15;
let t = 0;
let dt = 0.002;
let index = -1;

let start = false;
let locked = false;
let animation = true; 


const timeSlider = document.querySelector("#time");
const pointsLinesBox = document.querySelector("#pointsLines");
const pointsBox = document.querySelector("#points");
const startButton = document.querySelector("#start");
const animationButton = document.querySelector("#animation");

startButton.addEventListener("click",() => {
    if (Points.length === 4) {
        startButton.disabled = true;
        start = true;
    }
});

animationButton.addEventListener("click", () => {
    animation = true;
});

pointsBox.addEventListener("click", () => {
    !pointsBox.checked;
    if(pointsBox.checked) pointsLinesBox.checked = false;
});

pointsLinesBox.addEventListener("click", () => {
    !pointsLinesBox.checked;
    if(pointsLinesBox.checked) pointsBox.checked = false;
});

function setup() {
    createCanvas(windowWidth * 80 / 100, windowHeight);
}

function draw() {
    background("black");

    t = float(timeSlider.value);

    if(start && !animation) {
        vertexArray = computeBezierCurve(Points, dt);
        drawBezierCurve(vertexArray);
        if (pointsLinesBox.checked) {
            const data = deCasteljauAlgorithm(Points, t);
            drawPointsAndLines({...data, Points});
        } else if (pointsBox.checked) {
            drawPoints(Points);
        }
    } else if (start && animation) {
        if (t < 1) t += dt;
        timeSlider.value = String(t);
        if (pointsLinesBox.checked) {
            const data = deCasteljauAlgorithm(Points, t);
            drawPointsAndLines({...data, Points});
        } else if (pointsBox.checked) {
            drawPoints(Points);
        }
        visualizeBezierCurveDraw(Points, t, dt);
        if (t > (1 - dt) && t < (1 + dt)) {
            animationButton.disabled = false;
            animation = false;
        }
    } else {
        points(Points, "white", true);
    }
}