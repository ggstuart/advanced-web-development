import { Square } from "./square.js";
import { Thing } from "./thing.js";

function randomValue(min, max) {
    return min + Math.random() * (max - min);
}

export class Scene { 
    
    constructor(canvas, nSquares, nThings) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        // parameters for colour
        this.hueRange = randomValue(60, 300);
        this.minHue = randomValue(0, 360 - this.hueRange);
        this.saturation = randomValue(20, 100);
        this.lightness = randomValue(20, 60);

        // parameters for speed
        this.maxTimeToCross = randomValue(1, 10);

        // parameters for size
        this.minSize = randomValue(0.01, 0.1);
        this.maxSize = randomValue(this.minSize, 0.2);

        this.objects = Array.from({ length: nSquares }, () => {
            return new Square(
                this.randomLocation,
                this.randomSize,
                this.randomSpeed,
                this.randomColour
            )
        }).concat(Array.from({ length: nThings }, () => { 
            return new Thing(
                { x: canvas.width / 2, y: canvas.height / 2 },
                randomValue(-2 * Math.PI, 2 * Math.PI)
            );
        }));
    }

    get edge() {
        return Math.min(this.canvas.width, this.canvas.height);
    }

    get randomSize() {
        return this.edge * randomValue(this.minSize, this.maxSize);
    }

    get randomColour() {
        const hue = this.minHue + randomValue(0, this.hueRange);        
        return `hsl(${hue}, ${this.saturation}%, ${this.lightness}%)`;
    }

    get randomLocation() {
        return {
            x: randomValue(0, this.canvas.width),
            y: randomValue(0, this.canvas.height)
        }
    }

    get randomSpeed() {
        const maxSpeed = this.edge / this.maxTimeToCross;
        return {
            x: randomValue(-maxSpeed, maxSpeed),
            y: randomValue(-maxSpeed, maxSpeed),
            rotation: randomValue(-2 * Math.PI, 2 * Math.PI)
        }
    }

    draw() {
        for (const obj of this.objects) {
            obj.draw(this.ctx);            
        }
    }

    update(elapsed) {
        for (const obj of this.objects) {
            obj.update(elapsed);
            obj.handleEdge(this.canvas);
        }
    }
}