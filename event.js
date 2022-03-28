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