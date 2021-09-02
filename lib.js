const linearInterpolation = (p0, p1, t) => {
    p0 = p0.copy();
    p1 = p1.copy();
    p0.mult(1 - t);
    p1.mult(t);
    p0.add(p1);
    return p0;
}

// const BernSteinPolForm = (P, t) => { marche pas truc de vecteur de merde
//     let copyArr = [];
//     P.forEach(e => copyArr.push(e.copy()));
//     p0 = copyArr[0].mult(- Math.pow(t, 3) + Math.pow(t, 2) - 3 * t + 1);
//     p1 = copyArr[1].mult(3 * Math.pow(t, 3) - (6 * Math.pow(t, 2)) + 3 * t);
//     p2 = copyArr[2].mult(-3 * Math.pow(t, 3) + 3 * Math.pow(t, 2));
//     p3 = copyArr[3].mult(Math.pow(t, 3));
//     p0.add(p1);
//     p0.add(p2);
//     p0.add(p3);
//     return p0;
// }

const deCasteljauAlgorithm = (Points, t) => {
    let [P0, P1, P2, P3] = Points;
    let A = linearInterpolation(P0, P1, t);
    let B = linearInterpolation(P1, P2, t);
    let C = linearInterpolation(P2, P3, t);
    let D = linearInterpolation(A, B, t);
    let E = linearInterpolation(B, C, t);
    let P = linearInterpolation(D, E, t);
    return {A, B, C, D, E, P};
} 

const vectLine = (P1, P2, color = "white") => {
    stroke(color);
    strokeWeight(2);
    line(P1.x, P1.y, P2.x, P2.y);
    noStroke();
}

const points = (Points, color = "White", onlyBorder = false) => {

    if(!onlyBorder) fill(color);
    else {
        fill("black")
        stroke(color);
        strokeWeight(3);
    }
    Points.forEach(e => ellipse(e.x, e.y, r));
    if(!onlyBorder) noFill();
    strokeWeight(1);
    fill("white");
}

const detectColide = (Points) => {
    let res = -1;
    console.log(mouseX, mouseY);
    Points.forEach((p, index) => {
        if (mouseX > (p.x - r) && mouseX < (p.x + r)&& mouseY > (p.y - r) && mouseY < (p.y + r)) {
            res = index;
        }
    });
    return res;
}

const isInCanvas = () => {
    return (mouseX > 0 && mouseX < (windowWidth * 80 / 100)  && mouseY > 0 && mouseY < windowHeight);
}

const displayPointsAndLines = ({A, B, C, D, E, P, Points}) => {
    vectLine(A, B, "yellow");
    vectLine(B, C, "yellow");
    vectLine(D, E, "pink");
    vectLine(Points[0], Points[1]);
    vectLine(Points[1], Points[2]);
    vectLine(Points[2], Points[3]);
    points([A, B, C], "red", true);
    points([D, E], "yellow", true);
    points([P], "pink", true);
    points(Points, "white", true);
}

const displayPoints = (Points) => {
    vectLine(Points[0], Points[1]);
    vectLine(Points[2], Points[3]);
    points(Points, "white", true);
}

const computeBezierCurve = (dt) => {
    let array = [];
    let t = 0;
    while (t < 1) {
        const {A, B, C, D, E, P} = deCasteljauAlgorithm(Points, t);
        array.push({A, B, C, D, E, P});
        t += dt;
    }
    return array;
}