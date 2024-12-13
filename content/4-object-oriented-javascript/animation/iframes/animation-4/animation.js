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
let xSpeed = 0; 

let acceleration = 1000;

const userInput = {
    'ArrowLeft': false,
    'ArrowRight': false,
    get xDirection() {
        return this.ArrowRight - this.ArrowLeft;
    }
}
document.addEventListener('keydown', ev => { userInput[ev.key] = true; });
document.addEventListener('keyup', ev => { userInput[ev.key] = false; })

// Draw the scene
function draw() {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillRect(-size / 2, -size / 2, size, size);
    ctx.restore();
}

// Update the scene
function update(elapsed) {
    xSpeed += acceleration * userInput.xDirection * elapsed;
    x += elapsed * xSpeed + canvas.width;
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
