const w = window.innerWidth;
const h = window.innerHeight;

const canvas = document.getElementById('canvas');

canvas.width = w;
canvas.height = h;

const ctx = canvas.getContext('2d');

ctx.fillStyle = 'yellow';
ctx.strokeStyle = 'red';
ctx.lineWidth = 5;

const x1 = (w / 3);
const x2 = x1 * 2;
const y = h / 2;
const radius = Math.min(w, h) / 4;

ctx.arc(x1, y, radius, 0, 2 * Math.PI);
ctx.fill()
ctx.stroke()

ctx.beginPath();
ctx.arc(x2, y, radius, 0, 2 * Math.PI);
ctx.fill()
ctx.stroke()