---
type: slide
title: clearing the canvas
classes: [three-two, block-burger]
---

> Remove pixels in a rectangle using `clearRect`.

```js
const canvas = document.querySelector('#demo-clear');
const messBtn = document.querySelector('#btn-mess');
const clearBtn = document.querySelector('#btn-clear');
const ctx = canvas.getContext('2d');

messBtn.addEventListener('click', ev => {
    const hue = Math.random() * 360;
    for(let i=0; i<100; i++) {
        ctx.fillStyle = `hsla(${hue}, 90%, 70%, 0.6)`;                
        ctx.save();
        ctx.translate(
            Math.random() * canvas.width, 
            Math.random() * canvas.height
        );
        ctx.rotate(Math.random() * 2 * Math.PI);
        ctx.scale(Math.random(), Math.random());
        ctx.fillRect(-50, -50, 100, 100)
        ctx.restore();
    }
})

clearBtn.addEventListener('click', ev => {
    ctx.clearRect(50, 50, canvas.width - 100, canvas.height - 100);
});
```

<div>
    <canvas id="demo-clear" width="500" height="500"></canvas>
    <button id="btn-mess">Make a mess</button>
    <button id="btn-clear">Clear</button>
</div>

<style>
    div:has(>#demo-clear) {
        background-image: url(https://picsum.photos/1500/1500);
        background-size: cover;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        padding: 1rem;
        > button {
            border: none;
        }
    }
    #demo-clear {
        background: hsla(0, 50%, 50%, 0.2);
        grid-column: span 2;
    }
</style>

<script type="module">
const canvas = document.querySelector('#demo-clear');
const messBtn = document.querySelector('#btn-mess');
const clearBtn = document.querySelector('#btn-clear');
const ctx = canvas.getContext('2d');

messBtn.addEventListener('click', ev => {
    const hue = Math.random() * 360;
    for(let i=0; i<100; i++) {
        ctx.fillStyle = `hsla(${hue}, 90%, 70%, 0.6)`;                
        ctx.save();
        ctx.translate(
            Math.random() * canvas.width, 
            Math.random() * canvas.height
        );
        ctx.rotate(Math.random() * 2 * Math.PI);
        ctx.scale(Math.random(), Math.random());
        ctx.fillRect(-50, -50, 100, 100)
        ctx.restore();
    }
})

clearBtn.addEventListener('click', ev => {
    ctx.clearRect(50, 50, canvas.width - 100, canvas.height - 100);
});
</script>