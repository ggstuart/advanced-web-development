const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Prepare the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.append(canvas);

// Set up some data for our scene
let x = canvas.width / 2;
let y = canvas.height / 2;
let size = 50;
let x_speed = 100; // pixels per second

// Draw the scene
function draw() {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillRect(-size / 2, -size / 2, size, size);
    ctx.restore();
}

// Update the scene
function update(elapsed) {
    x += elapsed * x_speed;
    x %= canvas.width;
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