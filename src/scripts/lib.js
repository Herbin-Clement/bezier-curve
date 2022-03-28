const linearInterpolation = (p0, p1, t) => {
    p0 = p0.copy();
    p1 = p1.copy();
    p0.mult(1 - t);
    p1.mult(t);
    p0.add(p1);
    return p0;
}

const deCasteljauAlgorithm = (Points, t) => {
    let [P0, P1, P2, P3] = Points;
    let A = linearInterpolation(P0, P1, t);
    let B = linearInterpolation(P1, P2, t);
    let C = linearInterpolation(P2, P3, t);
    let D = linearInterpolation(A, B, t);
    let E = linearInterpolation(B, C, t);
    let P = linearInterpolation(D, E, t);
    return { A, B, C, D, E, P };
}

const vectLine = (p, P1, P2, color = "white") => {
    p.stroke(color);
    p.strokeWeight(2);
    p.line(P1.x, P1.y, P2.x, P2.y);
    p.noStroke();
}

const points = (p, Points, color = "White", onlyBorder = false, r) => {

    if (!onlyBorder) p.fill(color);
    else {
        p.fill("black")
        p.stroke(color);
        p.strokeWeight(3);
    }
    Points.forEach(e => p.ellipse(e.x, e.y, r));
    if (!onlyBorder) p.noFill();
    p.strokeWeight(1);
    p.fill("white");
}

const detectColide = (p, Points, r) => {
    let res = -1;
    console.log(p.mouseX, p.mouseY);
    Points.forEach((point, index) => {
        if (p.mouseX > (point.x - r) && p.mouseX < (point.x + r) && p.mouseY > (point.y - r) && p.mouseY < (point.y + r)) {
            res = index;
        }
    });
    return res;
}

const isInCanvas = (p) => {
    return (p.mouseX > 0 && p.mouseX < (p.windowWidth * 80 / 100) && p.mouseY > 0 && p.mouseY < p.windowHeight);
}

const drawPointsAndLines = (p, r, { A, B, C, D, E, P, Points }) => {
    vectLine(p, A, B, "yellow");
    vectLine(p, B, C, "yellow");
    vectLine(p, D, E, "pink");
    vectLine(p, Points[0], Points[1]);
    vectLine(p, Points[1], Points[2]);
    vectLine(p, Points[2], Points[3]);
    points(p, [A, B, C], "red", true, r);
    points(p, [D, E], "yellow", true, r);
    points(p, [P], "pink", true, r);
    points(p, Points, "white", true, r);
}

const drawPoints = (p, Points) => {
    vectLine(p, Points[0], Points[1]);
    vectLine(p, Points[2], Points[3]);
    points(p, Points, "white", true);
}

const computeBezierCurve = (Points, dt) => {
    let array = [];
    let t = 0;
    while (t < 1) {
        const { A, B, C, D, E, P } = deCasteljauAlgorithm(Points, t);
        array.push({ A, B, C, D, E, P });
        t += dt;
    }
    return array;
}

const drawBezierCurve = (p, vertexArray) => {
    p.noFill();
    p.strokeWeight(5);
    p.beginShape();
    vertexArray.forEach(({ P }) => {
        p.vertex(P.x, P.y);
    });
    p.strokeWeight(1);
    p.endShape();
}

const visualizeBezierCurveDraw = (p, Points, t_max, dt) => {
    let vertexArray = [];
    let t = 0;
    while(t < t_max) {
        const { A, B, C, D, E, P } = deCasteljauAlgorithm(Points, t);
        vertexArray.push({ A, B, C, D, E, P });
        t += dt;
    }
    p.beginShape();
    p.noFill();
    vertexArray.forEach(({ P }) => {
        p.vertex(P.x, P.y);
    });
    p.endShape();
}

export {
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
};