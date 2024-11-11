import face from './face.js'

const w = window.innerWidth;
const h = window.innerHeight;

const canvas = document.getElementById('canvas');

canvas.width = w;
canvas.height = h;

const ctx = canvas.getContext('2d');

const radius = Math.min(w, h) * 0.45;

ctx.translate(w / 2, h / 2);
face(ctx, radius);