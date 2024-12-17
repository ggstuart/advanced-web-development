export default function face(ctx, radius, {pupilOffset}) {
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
    eye(ctx, radius * 0.25,{ pupilOffset });

    ctx.translate(2 * radius / 3, 0);
    eye(ctx, radius * 0.25,  {pupilOffset });

    ctx.restore();
}

function mouth(ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI);
    ctx.stroke();
}

function eye(ctx, radius, {pupilOffset = {X: 0, y: 0}}) {
    ctx.save();
    
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.ellipse(0, 0, radius, radius * 1.3, 0, 0, 2 * Math.PI);
    ctx.fill()
    ctx.stroke();

    // constrain the arguments
    pupilOffset.x = Math.max(-1, Math.min(pupilOffset.x, 1));
    pupilOffset.y = Math.max(-1, Math.min(pupilOffset.y, 1));

    // Apply the arguments
    ctx.translate(
        radius * 0.65 * pupilOffset.x,
        radius * 0.65 * pupilOffset.y
    );

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
}