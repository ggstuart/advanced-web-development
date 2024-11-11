const w = window.innerWidth;
const h = window.innerHeight;

const canvas = document.getElementById('canvas');

canvas.width = w;
canvas.height = h;

const ctx = canvas.getContext('2d');

ctx.strokeStyle = 'black';
ctx.lineWidth = 5;

// Face
const faceX = w / 2;
const faceY = h / 2;
const faceRadius = Math.min(w, h) / 3;

// Eyes
const eyeY = faceY - faceRadius / 3;
const eyeOffset = faceRadius / 3;
const eyeXRadius = faceRadius / 6;
const eyeYRadius = faceRadius / 5;

// Pupils
const pupilOffsetX = (Math.random() - 0.5) * eyeXRadius
const pupilOffsetY = (Math.random() - 0.5) * eyeYRadius
const pupilXRadius = eyeXRadius * 0.2;
const pupilYRadius = eyeYRadius * 0.2;

// Mouth
const mouthOffset = faceRadius * 0.1;
const mouthRadius = faceRadius * 0.7;

// Draw face
ctx.fillStyle = 'yellow';
ctx.arc(faceX, faceY, faceRadius, 0, 2 * Math.PI);
ctx.fill()
ctx.stroke()

// Draw mouth
ctx.beginPath();
ctx.arc(faceX, faceY + mouthOffset, mouthRadius, 0, Math.PI);
ctx.stroke()

// For each eye
for (const eye of [-1, 1]) {
    const eyeX = faceX + (eye * eyeOffset);

    // draw eye
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.ellipse(
        eyeX, eyeY,
        eyeXRadius, eyeYRadius,
        0, 0, 2 * Math.PI
    );
    ctx.fill();
    ctx.stroke();

    // draw pupil
    ctx.fillStyle = "black";
    const pupilX = eyeX + pupilOffsetX;
    const pupilY = eyeY + pupilOffsetY;
    ctx.beginPath();
    ctx.ellipse(
        pupilX, pupilY,
        pupilXRadius, pupilYRadius,
        0, 0, 2 * Math.PI
    );
    ctx.fill();
}

