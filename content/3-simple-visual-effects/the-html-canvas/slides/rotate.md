---
type: slide
title: Rotate
classes: [three-two, block-burger, rotate]
---

> We can rotate the canvas axes around the origin using the `rotate()` method.

```js
const ctx = document.querySelector('#demo-rotate').getContext('2d');

ctx.fillStyle = "hsl(100 50% 50% / 0.75)";
ctx.strokeStyle = "hsl(100 50% 30%)";
ctx.lineWidth = 2;

for (const angle of [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]) {        
    ctx.save();
    ctx.rotate(angle / 360 * (2 * Math.PI));
    ctx.fillRect(350, -25, 100, 50);
    ctx.strokeRect(350, -25, 100, 50);
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(350, 0);
    ctx.lineTo(0, 0);
    ctx.stroke();
    ctx.restore();
}
```

<div><canvas id="demo-rotate" width="500" height="500"></canvas></div>

<script type="module">
    import {grid} from './grid.js';

    const ctx = document.querySelector('#demo-rotate').getContext('2d');
    grid(ctx, 50, 10);

    ctx.fillStyle = "hsl(100 50% 50% / 0.75)";
    ctx.strokeStyle = "hsl(100 50% 30%)";
    ctx.lineWidth = 2;

    for (const angle of [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]) {        
        ctx.save();
        ctx.rotate(angle / 360 * (2 * Math.PI));
        ctx.fillRect(350, -25, 100, 50);
        ctx.strokeRect(350, -25, 100, 50);
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(350, 0);
        ctx.lineTo(0, 0);
        ctx.stroke();
        ctx.restore();
    }
</script>