export class Square { 
    constructor(x, y, size, xSpeed, ySpeed) { 
        this.x = x;
        this.y = y;
        this.size = size;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
    }

    update(elapsed) { 
        this.x += this.xSpeed * elapsed;
        this.y += this.ySpeed * elapsed;
    }

    wrap(canvas) {
        this.x += canvas.width;
        this.x %= canvas.width;
        this.y += canvas.height;
        this.y %= canvas.height;
    }

    bounce(canvas) {
        if (this.x < 0 || this.x > canvas.width) {
            this.xSpeed *= -1;
            this.x = this.x < 0 ? 0 : canvas.width;
        }
        if (this.y < 0 || this.y > canvas.height) {
            this.ySpeed *= -1;
            this.y = this.y < 0 ? 0 : canvas.height;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.strokeStyle = "white";
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.rect(
            -this.size / 2,
            -this.size / 2,
            this.size,
            this.size
        );
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
}