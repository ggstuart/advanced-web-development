const w = window.innerWidth;
const h = window.innerHeight;

const canvas = document.getElementById('canvas');

canvas.width = w;
canvas.height = h;

const ctx = canvas.getContext('2d');

ctx.fillStyle = 'yellow';
ctx.strokeStyle = 'red';
ctx.lineWidth = 5;

ctx.moveTo(50, 50);
ctx.lineTo(w - 50, 50);
ctx.lineTo(w - 50, h - 50);
ctx.lineTo(50, h - 50);
ctx.closePath();
ctx.fill();
ctx.stroke();
