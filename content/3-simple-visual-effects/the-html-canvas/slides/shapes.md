---
type: slide
title: Drawing shapes
classes: [even, block-burger, both-gap]
---

> The API provides built-in shortcuts for drawing simple shapes.
> Here, we are adding rectangles to the path.

<div id="demo-rect1">
<canvas width="500" height="200"></canvas>
</div>

<script type="module">
const canvas = document.querySelector('#demo-rect1 canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = "red";
ctx.strokeStyle = "blue";
ctx.lineWidth = 10;

// Just add rectangles to the path
ctx.rect(20, 20, 100, 100);
ctx.rect(380, 80, 100, 100);
ctx.fill();
ctx.stroke();
</script>

<div id="demo-rect2">
<canvas width="500" height="200"></canvas>
</div>

<script type="module">
const canvas = document.querySelector('#demo-rect2 canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = "red";
ctx.strokeStyle = "blue";
ctx.lineWidth = 10;

// Automatically fill and stroke rectangles
ctx.fillRect(20, 20, 100, 100);
ctx.strokeRect(380, 80, 100, 100);

</script>

For [`rect`], we specify the (x, y) coordinates of the top-left corner and the width and height.

We can use the [`fillRect`] and [`strokeRect`] shortcuts to reduce our code even further.

```js
ctx.fillStyle = "red";
ctx.strokeStyle = "blue";
ctx.lineWidth = 10;

// Just add rectangles to the path
ctx.rect(20, 20, 100, 100);
ctx.rect(180, 80, 100, 100);
ctx.fill();
ctx.stroke();
```


```js
ctx.fillStyle = "red";
ctx.strokeStyle = "blue";
ctx.lineWidth = 10;

// Automatically fill and stroke rectangles
ctx.fillRect(20, 20, 100, 100);
ctx.strokeRect(380, 80, 100, 100);
```

[`rect`]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rect
[`fillRect`]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect
[`strokeRect`]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeRect