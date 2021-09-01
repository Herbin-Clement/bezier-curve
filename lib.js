const linearInterpolation = (p0, p1, t) => {
    // let Px = (1-t) * p0.x + t * p1.x;
    // let Py = (1-t) * p0.y + t * p1.y;
    p0 = p0.copy();
    p1 = p1.copy();
    p0.mult(1 - t);
    p1.mult(t);
    p0.add(p1);
    return p0;
}

const middleOfLine = (P0, P1) => {
    Px = (P0.x + P1.x) / 2; 
    Py = (P0.y + P1.y) / 2; 
    return {x: Px, y: Py};
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

const vectLine = (P1, P2, color = "White") => {
    fill(color)
    line(P1.x, P1.y, P2.x, P2.y);
    noFill();
}

const displayPoints = (Points, color = "White", onlyBorder = false) => {

    if(!onlyBorder) fill(color);
    else {
        fill("black")
        stroke(color);
        strokeWeight(4);
    }
    Points.forEach(e => ellipse(e.x, e.y, r));
    if(!onlyBorder) noFill();
    strokeWeight(1);
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