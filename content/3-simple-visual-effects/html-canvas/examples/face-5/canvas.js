import face from './face.js'

const w = window.innerWidth;
const h = window.innerHeight;

const canvas = document.getElementById('canvas');

canvas.width = w;
canvas.height = h;

const ctx = canvas.getContext('2d');

const radius = Math.min(w, h) / 4;

// One in the middle
ctx.translate(w / 2, h / 2);
face(ctx, radius);

// One to the left
ctx.translate(-radius * 1.5, 0);
face(ctx, radius / 2);

// One to the right
ctx.translate(radius * 3, 0);
face(ctx, radius / 2);

// One to the top
ctx.translate(-radius * 1.5, -radius * 1.5);
face(ctx, radius / 2);

// One to the bottom
ctx.translate(0, radius * 3);
face(ctx, radius / 2);

