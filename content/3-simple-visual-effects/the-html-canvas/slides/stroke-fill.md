---
type: slide
title: stroke and fill
classes: [even, block-burger, v-gap]
---

> Notice the overlap between stroke and fill.


[`stroke()`] will draw the outline of a path using the current [`strokeStyle`] and [`lineWidth`].


[`fill()`] will fill within a path using the current [`fillStyle`].


<div id="demo-stroke">
<canvas width="300" height="175"></canvas>
</div>

<div id="demo-fill">
<canvas width="300" height="175"></canvas>
</div>

<style>
    p {
        margin-block: 0;
    }
</style>

The thickness is evenly spread.

Notice that the overlap is half the lineWidth.

```js
ctx.arc(150, 25, 100, 0, Math.PI);
ctx.closePath();

ctx.strokeStyle = "black";
ctx.lineWidth = 50;
ctx.stroke();

ctx.strokeStyle = "white";
ctx.lineWidth = 2;
ctx.stroke();
```

```js
ctx.arc(150, 20, 100, 0, Math.PI);
ctx.closePath();

ctx.lineWidth = 50;
ctx.strokeStyle = "hsl(0, 100%, 50%)";
ctx.fillStyle = "hsla(60, 100%, 50%, 0.5)";
ctx.stroke();
ctx.fill();
```

<script type="module">
    import {grid} from './grid.js';
    const canvas = document.querySelector('#demo-stroke canvas');
    const ctx = canvas.getContext('2d');
    grid(ctx, 25, 5);
    ctx.arc(150, 25, 100, 0, Math.PI);
    ctx.closePath();

    ctx.strokeStyle = "black";
    ctx.lineWidth = 50;
    ctx.stroke();

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();
</script>

<script type="module">
    import {grid} from './grid.js';
    const canvas = document.querySelector('#demo-fill canvas');
    const ctx = canvas.getContext('2d');
    grid(ctx, 25, 5);

    ctx.arc(150, 20, 100, 0, Math.PI);
    ctx.closePath();

    ctx.lineWidth = 50;
    ctx.strokeStyle = "hsl(0, 100%, 50%)";
    ctx.fillStyle = "hsla(60, 100%, 50%, 0.5)";
    ctx.stroke();
    ctx.fill();
</script>


[`stroke()`]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/stroke
[`fill()`]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fill

[`fillStyle`]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle
[`strokeStyle`]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle

[`lineWidth`]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth