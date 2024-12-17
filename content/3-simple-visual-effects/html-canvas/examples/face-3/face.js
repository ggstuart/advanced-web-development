export default function face(ctx, radius) {
    ctx.save();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = radius / 40;
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    mouth(ctx, radius * 0.8);
    ctx.restore();
}

function mouth(ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI);
    ctx.stroke();
}