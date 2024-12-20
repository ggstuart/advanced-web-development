---
type: slide
title: Drawing on event listeners
classes: [even, p-burger, tiny-code]
---

```js
const parent = document.querySelector('div:has(#demo-events)'); 
const panel = parent.querySelector('.control-panel');
const ctx = parent.querySelector('#demo-events').getContext('2d');
let [x, y, drawing, size, scatter] = [0, 0, false, 15, 30];

for (let hue=0; hue<360; hue += 35) {
    const label = document.createElement('label');
    const colour = document.createElement('input');
    colour.id = `hue-${hue}`;
    label.HTMLfor = colour.id;
    colour.type = "radio";
    colour.name = "colour";
    // colour.checked = true;
    label.style.background = `hsla(${hue}, 80%, 40%, 0.5)`;
    label.addEventListener('click', ev => {
        ctx.fillStyle = `hsla(${hue}, 80%, 40%, 0.1)`;
    });
    // label.click();
    label.append(colour);
    panel.append(label);
}
panel.querySelector('label').click();
ctx.canvas.addEventListener('mousedown', ev => { drawing = true; });
ctx.canvas.addEventListener('mouseup', ev => { drawing = false; });
ctx.canvas.addEventListener('mousemove', ev => {
    if(!drawing) return;
    x = ev.offsetX + (Math.random() - 0.5) * scatter;
    y = ev.offsetY + (Math.random() - 0.5) * scatter;
    ctx.save();
    ctx.translate(x, y);
    ctx.arc(0, 0, size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.restore();
});
```

<div>
    <canvas id="demo-events" width="600" height="600"></canvas>
    <div class="control-panel"></div>
</div>

<script type="module">
    const parent = document.querySelector('div:has(#demo-events)'); 
    const panel = parent.querySelector('.control-panel');
    const ctx = parent.querySelector('#demo-events').getContext('2d');
    let [x, y, drawing, size, scatter] = [0, 0, false, 15, 30];

    for (let hue=0; hue<360; hue += 35) {
        const label = document.createElement('label');
        const colour = document.createElement('input');
        colour.id = `hue-${hue}`;
        label.HTMLfor = colour.id;
        colour.type = "radio";
        colour.name = "colour";
        // colour.checked = true;
        label.style.background = `hsla(${hue}, 80%, 40%, 0.5)`;
        label.addEventListener('click', ev => {
            ctx.fillStyle = `hsla(${hue}, 80%, 40%, 0.1)`;
        });
        // label.click();
        label.append(colour);
        panel.append(label);
    }
    panel.querySelector('label').click();
    ctx.canvas.addEventListener('mousedown', ev => { drawing = true; });
    ctx.canvas.addEventListener('mouseup', ev => { drawing = false; });
    ctx.canvas.addEventListener('mousemove', ev => {
        if(!drawing) return;
        x = ev.offsetX + (Math.random() - 0.5) * scatter;
        y = ev.offsetY + (Math.random() - 0.5) * scatter;
        ctx.save();
        ctx.translate(x, y);
        ctx.arc(0, 0, size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.restore();
    });
</script>

<style>
    div:has(>#demo-events) {
        display: grid;
        grid-template-columns: min-content min-content;
        place-content: center;
        /* border: 2px solid black; */
        box-shadow: 0 0 5px 0 black;
        place-self: center;
        #demo-events {
            box-shadow: none;
            border-right: 1px solid black;
        }
        .control-panel {
            display: grid;
            grid-auto-rows: 1fr;
            gap: 2px;
            label {
                aspect-ratio: 1;
                width: 100%;
                display: grid;
                place-items: center;
                &:hover {
                    box-shadow: 0 0 5px 0 black;
                }
                &::after {
                    content: "✅";
                    color: white;
                    opacity: 0;
                    transition: 400ms;
                }
            }
            input[type="radio"] {
                display: none;
            }
            label:has(input:checked) {
                /* border-left: 2px solid black; */
                /* box-shadow: 0 0 3px 0 black; */
                /* scale: 1.1; */
                &::after {
                    opacity: 1;
                }
            }
        }

    }
</style>