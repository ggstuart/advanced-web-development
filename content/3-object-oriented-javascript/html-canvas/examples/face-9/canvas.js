import face from './face.js'

const w = window.innerWidth;
const h = window.innerHeight;

const canvas = document.getElementById('canvas');

canvas.width = w;
canvas.height = h;

const ctx = canvas.getContext('2d');
const size = Math.min(w, h);
ctx.translate((w - size)/2, (h - size)/2);

const radius = size / 10;
ctx.translate(radius, radius);

for (const x of [0, 1, 2, 3, 4]) { 
    for (const y of [0, 1, 2, 3, 4]) {
        ctx.save();
        ctx.translate(2 * x * radius, 2 * y * radius);
        face(ctx, radius, {
            pupilOffset: { x: (2 - x) / 2, y: (2 - y) / 2 },
            eyeSize: Math.random(),
            eyeGap: Math.random()
        });
        ctx.restore();
    }
}