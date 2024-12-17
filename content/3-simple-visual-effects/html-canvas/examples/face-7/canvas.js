import face from './face.js'

const w = window.innerWidth;
const h = window.innerHeight;

const canvas = document.getElementById('canvas');

canvas.width = w;
canvas.height = h;

const ctx = canvas.getContext('2d');

function flower(ctx, radius) {
    const r = radius / 4;

    // One in the middle
    face(ctx, r);
    
    // eight around the outside
    for (const angle of [0, 1, 2, 3, 4, 5, 6, 7]) {
        ctx.save();
        ctx.rotate(angle * Math.PI / 4);
        ctx.translate(0, -r * 1.5);
        face(ctx, r / 2);
        ctx.restore()    
    }
}

function randomFlower(ctx) {
    ctx.save();
    const x = w * Math.random();
    const y = h * Math.random();
    const r = Math.min(w, h) * (0.1 + 0.2 * Math.random());
    ctx.translate(x, y);
    flower(ctx, r);
    ctx.restore()
}

let total = 0;
do {
    total += Math.random();
    randomFlower(ctx);
} while (total < 10);
