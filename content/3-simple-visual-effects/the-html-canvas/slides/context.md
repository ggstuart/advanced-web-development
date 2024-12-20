---
type: slide
title: Canvas Rendering Context (2D)
classes: [even, block-burger, both-gap, small-code]
---

> To draw to a canvas we need to first create a [`CanvasRenderingContext2D`] object using [`getContext`].
We can then use API methods to e.g. draw lines.

```html
<div id="demo-2">
    <canvas width="500" height="500"></canvas>
</div>
```
<div id="demo-2">
    <canvas width="500" height="500"></canvas>
</div>

```js
const canvas = document.querySelector('#demo-2 canvas');
const ctx = canvas.getContext('2d');

ctx.font = "12pt system-ui";
ctx.textAlign = "center";
ctx.fillStyle = "red";
ctx.strokeStyle = "blue";

const coordinates = [
    [50, 50], [150, 450], [250, 250], 
    [350, 450], [450, 50]
];

for(const [x, y] of coordinates) {
    ctx.lineTo(x, y);
    ctx.fillText(`(${x}, ${y})`, x, y);
}

ctx.closePath();
ctx.stroke();
```


<style>
#demo-2 {
    grid-row: span 2;
    > canvas {
        margin: 1rem;
    }
}
</style>

<script type="module">
    import { grid, horizontal, vertical } from './grid.js';

    const canvas = document.querySelector('#demo-2 canvas');
    const ctx = canvas.getContext('2d');

    grid(ctx, 100, 10);

    ctx.font = "12pt system-ui";
    ctx.textAlign = "center";
    ctx.fillStyle = "red";
    ctx.strokeStyle = "blue";

    const coordinates = [
        [50, 50], 
        [150, 450], 
        [250, 250], 
        [350, 450],
        [450, 50]
    ];

    for(const [x, y] of coordinates) {
        ctx.lineTo(x, y);
        ctx.fillText(`(${x}, ${y})`, x, y);
    }

    ctx.closePath();
    ctx.stroke();
</script>

[`CanvasRenderingContext2D`]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D

[`getContext`]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
