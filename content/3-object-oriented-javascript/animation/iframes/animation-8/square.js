export class Square {
    constructor(location, size, speed, colour) {
        this.colour = colour;
        this.location = location;
        this.size = size;
        this.speed = speed;
        this.angle = 0;
    }

    update(elapsed) {
        this.location.x += this.speed.x * elapsed;
        this.location.y += this.speed.y * elapsed;
        this.angle += this.speed.rotation * elapsed;
    }

    handleEdge(canvas) {
        if (this.location.x < 0 || this.location.x > canvas.width) {
            this.speed.x *= -1;
            this.location.x = this.location.x < 0 ? 0 : canvas.width;
        }
        if (this.location.y < 0 || this.location.y > canvas.height) {
            this.speed.y *= -1;
            this.location.y = this.location.y < 0 ? 0 : canvas.height;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.strokeStyle = "white";
        ctx.fillStyle = this.colour;
        ctx.translate(this.location.x, this.location.y);
        ctx.rotate(this.angle);
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