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

// eight around the outside
for (const angle of [0, 1, 2, 3, 4, 5, 6, 7]) {
    ctx.save();
    ctx.rotate(angle * Math.PI / 4);
    ctx.translate(0, -radius * 1.5);
    face(ctx, radius / 2);
    ctx.restore()    
}