let Points = [];
let r = 15;
let t = 0;
let dt = 0.002;
let display = false;
let displayPoint = false;
let start = false;
let index = -1;
let locked = false;

let vertexArray = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background("black");
    if (keyIsPressed) {
        switch (key) {
            case "d":
                display = true;
                break;
            case "p":
                displayPoint = true;
                break;
            case "s":
                if (Points.length === 4) {
                    start = true;
                }
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

        if (display) {
            vectLine(A, B);
            vectLine(B, C);
            vectLine(D, E);
            vectLine(Points[0], Points[1]);
            vectLine(Points[1], Points[2]);
            vectLine(Points[2], Points[3]);
            displayPoints([A, B, C, D, E, P, ...Points], "white", true);
        } else if (displayPoint) {
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
	resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
    
    if (index !== -1) {
        console.log(index);
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
    if (locked) {
        Points[index].x = mouseX;
        Points[index].y = mouseY;
        t = 0;
        vertexArray = [];
    }
}
 

