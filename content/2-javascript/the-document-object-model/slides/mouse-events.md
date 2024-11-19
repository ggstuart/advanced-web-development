---
title: Mouse events
type: slide
classes: [canvas]
---

HTML canvas elements demonstrate the mouse events nicely.

<canvas id="mouse-events-canvas" width="500" height="150"></canvas>

Try drawing in the box.

```js
const canvas = document.getElementById('mouse-events-canvas');    
const ctx = canvas.getContext("2d");

const drawHandler = (ev) => {
    if(drawing) {
        ctx.lineTo(ev.offsetX, ev.offsetY);
        ctx.stroke();
    }
}

let drawing = false;

canvas.addEventListener('mousemove', drawHandler);
window.addEventListener('mouseup', ev => { drawing = false; });
window.addEventListener('mousedown', ev => {
    drawing = true;
    ctx.beginPath();
});
```

<style>
    .canvas  {
        user-select: none;
        .content {
            grid-template-columns: 1fr 500px 1fr;
            grid-template-rows: min-content 1fr;
            gap: 1rem;
            > p:has(canvas) { margin: 0; }
            canvas {
                display: block;
                box-shadow: inset 0 0 5px black;
                margin-inline: auto;
            }
            .highlight {
                grid-column: span 3;
            }
        }
    }
</style>

<script>
    const canvas = document.getElementById('mouse-events-canvas');    
    const ctx = canvas.getContext("2d");
    const drawHandler = (ev) => {
        if(drawing) {
            ctx.lineTo(ev.offsetX, ev.offsetY);
            ctx.stroke();
        }
    }
    let drawing = false;
    canvas.addEventListener('mousemove', drawHandler);
    window.addEventListener('mouseup', ev => { drawing = false; });
    window.addEventListener('mousedown', ev => {
        drawing = true;
        ctx.beginPath();
    });
</script>