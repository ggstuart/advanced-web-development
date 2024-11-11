export default function face(ctx, radius, {pupilOffset, eyeSize=0.5, eyeGap=0.5}) {
    ctx.save();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = radius / 40;
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    mouth(ctx, radius * 0.8);

    // Constrain the eyeSize to [0, 1]
    eyeSize = Math.max(0, Math.min(eyeSize, 1));

    // Apply the eyeSize with additional constraint
    eyeSize = radius * 0.4 * eyeSize;

    // Calculate a reasonable eyeGap from provided value
    const spareSpace = (radius * 2) - (eyeSize * 4);
    eyeGap = (eyeSize * 2) + (spareSpace * 0.35 * eyeGap);

    ctx.translate(-eyeGap / 2, -radius / 3);
    eye(ctx, eyeSize, { pupilOffset });

    ctx.translate(eyeGap, 0);
    eye(ctx, eyeSize, { pupilOffset });

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