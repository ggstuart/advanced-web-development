const w = window.innerWidth;
const h = window.innerHeight;

const canvas = document.getElementById('canvas');

canvas.width = w;
canvas.height = h;

const ctx = canvas.getContext('2d');

ctx.fillStyle = 'yellow';
ctx.strokeStyle = 'red';
ctx.lineWidth = 5;

const margin = 50;

const width = (w - margin * 3) / 2;
const height = h - margin * 2;

const top = margin;
const left1 = margin;
const left2 = width + margin * 2;

ctx.rect(left1, top, width, height);
ctx.rect(left2, top, width, height);
ctx.fill()
ctx.stroke()