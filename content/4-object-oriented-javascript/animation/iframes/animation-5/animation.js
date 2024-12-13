import { Square } from "./square.js";

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Prepare the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.append(canvas);

function randomSquare() { 
    return new Square(
        canvas.width * Math.random(),
        canvas.height * Math.random(),
        10 + 40 * Math.random(),
        0.5 * canvas.width * (Math.random() - 0.5),
        0.5 * canvas.height * (Math.random() - 0.5),
        2 * Math.PI * (Math.random() - 0.5)
    )
}
let squares = Array.from({ length: 100 }, randomSquare);

// Draw the scene
function draw() {
    for (const square of squares) {
        square.draw(ctx);
    }
}

// Update the scene
function update(elapsed) {
    for (const square of squares) {
        square.update(elapsed);
        // square.wrap(canvas);
        square.bounce(canvas);
    }
}

// Complete one frame
let previousTimestamp = 0;
function frame(timestamp) {
    const elapsed = (timestamp - previousTimestamp) / 1000;
    previousTimestamp = timestamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update(elapsed);
    draw();
    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
