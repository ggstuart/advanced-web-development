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

// Draw the scene
function draw() {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillRect(-size / 2, -size / 2, size, size);
    ctx.restore();
}

// Update the scene
function update() {
    x += 1;
    x %= canvas.width;
}

// Complete one frame
function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    draw();
}

setInterval(frame, 1);