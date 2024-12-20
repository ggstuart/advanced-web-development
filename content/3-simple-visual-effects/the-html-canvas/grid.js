export function horizontal(ctx, increment, text) {
    ctx.save();
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    let y = 0;
    ctx.beginPath();
    while (y < ctx.canvas.height) {
        ctx.moveTo(0, y);
        ctx.lineTo(ctx.canvas.width, y);
        if (text) ctx.fillText(y, 2, y + 2);
        y += increment;
    }
    ctx.stroke();
    ctx.restore();
    ctx.beginPath();
}

export function vertical(ctx, increment, text) {
    ctx.save();
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
    let x = 0;
    ctx.beginPath();
    while (x < ctx.canvas.width) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, ctx.canvas.height);
        if (text) ctx.fillText(x, x + 2, 2);
        x += increment;
    }
    ctx.stroke();
    ctx.restore();
    ctx.beginPath();
}

export function grid(ctx, large, small) {
    ctx.save();
    ctx.strokeStyle = "#ddd";
    ctx.fillStyle = "#666";
    ctx.lineWidth = 2;
    ctx.font = "8pt system-ui";
    vertical(ctx, large, true);
    horizontal(ctx, large, true);
    ctx.lineWidth = 0.5;
    vertical(ctx, small);
    horizontal(ctx, small);
    ctx.restore();
    ctx.beginPath();
}