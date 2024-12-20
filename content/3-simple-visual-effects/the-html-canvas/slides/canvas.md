---
type: slide
title: The canvas element
classes: [two-three, p-burger, block-burger, small-code, v-gap]
---

> The HTML canvas element behaves like an image.
They have intrinsic width and height.


<div id="demo-1">
    <canvas width="100" height="100"></canvas>
    <canvas width="100" height="100"></canvas>
    <canvas width="100" height="100"></canvas>
    <canvas width="100" height="100"></canvas>
    <canvas width="200" height="200"></canvas>
    <canvas width="200" height="200"></canvas>
    <canvas width="200" height="200"></canvas>
    <canvas width="200" height="200"></canvas>
</div>

The circles in the above elements are all drawn with 25px radius.
The canvases have been stretched and squeezed with CSS.

```html
<div id="demo-1">
    <canvas width="100" height="100"></canvas>
    <canvas width="100" height="100"></canvas>
    <canvas width="100" height="100"></canvas>
    <canvas width="100" height="100"></canvas>
    <canvas width="200" height="200"></canvas>
    <canvas width="200" height="200"></canvas>
    <canvas width="200" height="200"></canvas>
    <canvas width="200" height="200"></canvas>
</div>
```

```css
#demo-1 {
    grid-column: span 2;
    display: grid;
    gap: 1rem;
    grid-template-columns: 50px 100px 200px 250px 250px 200px 100px 50px;
    place-content: center;
    > canvas {
        width: 100%;
    }
}
```

<script type="module">
    for(const canvas of document.querySelectorAll(`#demo-1 canvas`)) {
        const ctx = canvas.getContext('2d');
        ctx.arc(canvas.width / 2, canvas.height / 2, 25, 0, Math.PI * 2);
        ctx.stroke();
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.font = "12pt sans-serif";
        ctx.fillText(`${canvas.width}x${canvas.height}`, canvas.width / 2, canvas.height / 2 + 30);
    }
</script>

<style>
#demo-1 {
    grid-column: span 2;
    display: grid;
    gap: 1rem;
    grid-template-columns: 50px 100px 200px 250px 250px 200px 100px 50px;
    place-content: center;
    > canvas {
        width: 100%;
    }
}
</style>