export class Thing {
    constructor(location, angle) { 
        this.location = location;
        this.angle = angle
        this.speed = 100;
        this.steering = 0;
    }

    get xComponent() {
        return Math.cos(this.angle);
    }
    get yComponent() {
        return Math.sin(this.angle);
    }

    handleEdge(canvas) {
        this.location.x += canvas.width;
        this.location.x %= canvas.width;
        this.location.y += canvas.height;
        this.location.y %= canvas.height;
    }

    update(elapsed) { 
        this.steering += (Math.random() - 0.5) * 0.01;
        this.steering = Math.max(-0.1, Math.min(this.steering, 0.1));
        this.angle += this.steering;
        this.location.x += this.xComponent * this.speed * elapsed;
        this.location.y += this.yComponent * this.speed * elapsed;
    }

    draw(ctx) { 
        ctx.save();
        ctx.translate(this.location.x, this.location.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(20, 0);
        ctx.rotate(2 * Math.PI / 3);
        ctx.lineTo(12, 0);
        ctx.rotate(2 * Math.PI / 3);
        ctx.lineTo(12, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();        
    }
}