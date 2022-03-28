import {
    linearInterpolation,
    deCasteljauAlgorithm,
    vectLine,
    points,
    detectColide,
    isInCanvas,
    drawPointsAndLines,
    drawPoints,
    computeBezierCurve,
    drawBezierCurve,
    visualizeBezierCurveDraw
} from './lib';

import p5 from 'p5';

const timeSlider = document.querySelector("#time");
const pointsLinesBox = document.querySelector("#pointsLines");
const pointsBox = document.querySelector("#points");
const startButton = document.querySelector("#start");
const animationButton = document.querySelector("#animation");
const container = document.querySelector('body');

const sketch = p => {

    let Points = [];
    let r = 15;
    let t = 0;
    let dt = 0.002;
    let index = -1;

    let start = false;
    let locked = false;
    let animation = true; 
    let vertexArray;



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
    p.setup = function setup() {
        p.createCanvas(p.windowWidth * 80 / 100, p.windowHeight);
    }

    p.draw = function draw() {
        p.background("black");

        t = p.float(timeSlider.value);

        if(start && !animation) {
            vertexArray = computeBezierCurve(Points, dt);
            drawBezierCurve(p, vertexArray);
            if (pointsLinesBox.checked) {
                const data = deCasteljauAlgorithm(Points, t);
                drawPointsAndLines(p, r, {...data, Points});
            } else if (pointsBox.checked) {
                drawPoints(p, Points);
            }
        } else if (start && animation) {
            if (t < 1) t += dt;
            timeSlider.value = String(t);
            if (pointsLinesBox.checked) {
                const data = deCasteljauAlgorithm(Points, t);
                drawPointsAndLines(p, r, {...data, Points});
            } else if (pointsBox.checked) {
                drawPoints(p, Points);
            }
            visualizeBezierCurveDraw(p, Points, t, dt);
            if (t > (1 - dt) && t < (1 + dt)) {
                animationButton.disabled = false;
                animation = false;
            }
        } else {
            points(p, Points, "white", true, r);
        }
    }

    p.windowResized = function windowResized() {
        p.resizeCanvas(windowWidth * 80 / 100, windowHeight);
    }

    p.mouseClicked = function mouseClicked() {
        
        if (index !== -1) {
        }
        if (!start && isInCanvas(p)) {
            Points.push(p.createVector(p.mouseX, p.mouseY));
            if (Points.length > 4) Points.shift();
            console.log(Points)
        }
        locked = false;
    }

    p.mousePressed = function mousePressed() {
        if (pointsBox.checked || pointsLinesBox.checked) {
            index = detectColide(p, Points, r);   
            locked = true;
        }
    }

    p.mouseDragged = function mouseDragged() {
        if (locked && index !== -1 && isInCanvas(p)) {
            Points[index].x = p.mouseX;
            Points[index].y = p.mouseY;
            t = 0;
            vertexArray = [];
        }
    }

}

new p5(sketch, container);

export default sketch;