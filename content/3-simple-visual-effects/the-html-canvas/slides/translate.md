---
type: slide
title: Translate
classes: [three-two, block-burger, translate, small-code]
---

> Translating the canvas origin allows us to rotate around any point.

```js
import {grid} from './grid.js';

const ctx = document.querySelector('#demo-translate').getContext('2d');
grid(ctx, 50, 10);

ctx.fillStyle = "hsl(40 50% 50% / 0.75)";
ctx.strokeStyle = "hsl(40 50% 30%)";
ctx.lineWidth = 1;

for(var y=50; y<ctx.canvas.height; y+=50) {
    for(var x=50; x<ctx.canvas.width; x+=50) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.random() * 2 * Math.PI);
        ctx.beginPath();
        ctx.arc(0, 0, 20, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(20, 0, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();            
    }
}
```

<div><canvas id="demo-translate" width="500" height="500"></canvas></div>

> The code on line 19 always draws the filled circle 20px to the right but line 14 rotates the canvas around the center first.

<script type="module">
    import {grid} from './grid.js';

    const ctx = document.querySelector('#demo-translate').getContext('2d');
    grid(ctx, 50, 10);

    ctx.fillStyle = "hsl(40 50% 50% / 0.75)";
    ctx.strokeStyle = "hsl(40 50% 30%)";
    ctx.lineWidth = 1;

    for(var y=50; y<ctx.canvas.height; y+=50) {
        for(var x=50; x<ctx.canvas.width; x+=50) {

            ctx.save();

            ctx.translate(x, y);
            ctx.rotate(Math.random() * 2 * Math.PI);

            ctx.beginPath();
            ctx.arc(0, 0, 20, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(20, 0, 5, 0, 2 * Math.PI);
            ctx.fill();

            ctx.restore();            
        }
    }
</script>