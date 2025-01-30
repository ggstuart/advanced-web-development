
class Coordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(other) {
        return new Coordinate(
            this.x + other.x,
            this.y + other.y
        )
    }

    addInPlace(other) {
        this.x += other.x;
        this.y += other.y;
    }

    subtract(other) {
        return new Coordinate(
            this.x - other.x,
            this.y - other.y
        )
    }

    mult(value) {
        return new Coordinate(
            this.x * value,
            this.y * value
        )
    }

    static random(shape) {
        return new Coordinate(
            Math.random() * shape.width,
            Math.random() * shape.height
        );
    }

    static randomSpeed(shape, multiplier) {
        return new Coordinate(
            shape.width * (Math.random() - 0.5) * multiplier,
            shape.height * (Math.random() - 0.5) * multiplier
        );
    }
}

class Element {
    constructor(location, speed, size) {       
        this.location = location;
        this.speed = speed;
        this.size = size;
    }

    update(elapsed) {
        const delta = this.speed.mult(elapsed);
        this.location.addInPlace(delta);
    }

    bounce(shape) {
        if (this.right > shape.width) {
            this.right = shape.width;
            this.speed.x *= -1;
        }
        if (this.left < 0) {
            this.left = 0;
            this.speed.x *= -1;
        }
        if (this.bottom > shape.height) {
            this.bottom = shape.height;
            this.speed.y *= -1;
        }
        if (this.top < 0) {
            this.top = 0;
            this.speed.y *= -1;
        }
    }

    get left() {
        return this.location.x - this.size / 2;
    }
    get right() {
        return this.location.x + this.size / 2;
    }
    get top() {
        return this.location.y - this.size / 2;
    }
    get bottom() {
        return this.location.y + this.size / 2;
    }

    set left(newValue) {
        this.location.x = newValue + this.size / 2;
    }
    set right(newValue) {
        this.location.x = newValue - this.size / 2;
    }
    set top(newValue) {
        this.location.y + this.size / 2;
    }
    set bottom(newValue) {
        this.location.y - this.size / 2;
    }


    draw(ctx) {
        ctx.save();
        ctx.translate(this.location.x, this.location.y)
        ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
        ctx.restore();
    }
}

class Scene {
    constructor(canvas, nElements) { 
        this.canvas = canvas;
        this.elements = Array.from(
            { length: nElements },
            () => new Element(
                Coordinate.random(canvas),
                Coordinate.randomSpeed(canvas, 0.5),
                10 + Math.random() * 40
            )
        )
    }

    update(elapsed) {
        for (const element of this.elements) {
            element.update(elapsed);
            element.bounce(this.canvas);
        }
    }

    draw(ctx) {         
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        for (const element of this.elements) {
            element.draw(ctx);
        }
    }
}


const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

document.body.style.display = "grid";
document.body.style.margin = "0";
// document.body.style.backgroundColor = "yellow";

document.body.append(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const scene = new Scene(canvas, 10);
let p;
function frame(ts) { 
    const elapsed = (ts - p || 0) / 1000;
    p = ts;
    scene.update(elapsed);
    scene.draw(ctx);
    requestAnimationFrame(frame);
}
frame(0);