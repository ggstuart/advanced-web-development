import { Scene } from "./scene.js";

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Prepare the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.append(canvas);

// Initialise the scene
const scene = new Scene(canvas, 20, 20);

window.scene = scene;

// Complete one frame
let previousTimestamp = 0;
function frame(timestamp) {
    const elapsed = (timestamp - previousTimestamp) / 1000;
    previousTimestamp = timestamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    scene.update(elapsed);
    scene.draw();
    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
