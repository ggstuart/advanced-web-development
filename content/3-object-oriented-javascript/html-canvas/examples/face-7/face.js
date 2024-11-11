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

    ctx.translate(-radius / 3, -radius / 3);
    eye(ctx, radius * 0.25);

    ctx.translate(2 * radius / 3, 0);
    eye(ctx, radius * 0.25);

    ctx.restore();
}

function mouth(ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI);
    ctx.stroke();
}

function eye(ctx, radius) {
    ctx.save();

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.ellipse(0, 0, radius, radius * 1.3, 0, 0, 2 * Math.PI);
    ctx.fill()
    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();

}