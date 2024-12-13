const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Prepare the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.append(canvas);

// Set up some data for our scene
let x = canvas.width / 2;
let y = canvas.height / 2;
const size = 50;

// Draw the scene
ctx.translate(x, y);
ctx.fillRect(-size / 2, -size / 2, size, size);