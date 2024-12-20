---
type: slide
title: curves
classes: [even, curves, both-gap]
---

> Quadratic curves take a single control point

> Cubic Bezier curves require two control points

<div><canvas id="curve1"></canvas></div>

<div><canvas id="curve2"></canvas></div>

```js
const start = [100, 150];
const end = [500, 150];
const ctl1 = [300, 25];

ctx.moveTo(...start);
ctx.quadraticCurveTo(...ctl1, ...end);
ctx.stroke();
```

```js
const start = [100, 150];
const end = [500, 150];
const ctl2 = [300, 25];
const ctl3 = [300, 250];

ctx.moveTo(...start);
ctx.bezierCurveTo(...ctl2, ...ctl3, ...end);
ctx.stroke();
```

<script type="module">
    import {grid} from './grid.js';

    const canvas1 = document.querySelector("#curve1");
    const canvas2 = document.querySelector("#curve2");
    canvas1.width = 600;
    canvas1.height = 300;
    canvas2.width = 600;
    canvas2.height = 300;

    const start = [100, 150];
    const end = [500, 150];
    const ctl1 = [300, 25];
    const ctl2 = [300, 25];
    const ctl3 = [300, 250];

    const ctx1 = canvas1.getContext('2d');
    const ctx2 = canvas2.getContext('2d');

    function prepareGrid(ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        grid(ctx, 50, 5);

        ctx.beginPath();

        ctx.fillStyle = "black";
        ctx.arc(...start, 5, 0, 2 * Math.PI);
        ctx.arc(...end, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.restore();
    }

    function drawQuadratic(ctx, active) {
        ctx.save();
        ctx.fillStyle = "red";
        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;
        ctx.arc(...ctl1, active ? 7 : 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
    
        ctx.moveTo(...start);
        ctx.quadraticCurveTo(...ctl1, ...end);
        ctx.stroke();

        ctx.lineWidth = 1;
        ctx.setLineDash([8, 4]);
        ctx.moveTo(...start);
        ctx.lineTo(...ctl1);
        ctx.lineTo(...end);
        ctx.stroke();

        ctx.beginPath();
        ctx.restore();
    }
    function drawBezier(ctx, active2, active3) {
        ctx.save();
        ctx.fillStyle = "blue";
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 3;
        ctx.arc(...ctl2, active2 ? 7 : 5, 0, 2 * Math.PI);
        ctx.arc(...ctl3, active3 ? 7 : 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
    
        ctx.moveTo(...start);
        ctx.bezierCurveTo(...ctl2, ...ctl3, ...end);
        ctx.stroke();

        ctx.lineWidth = 1;
        ctx.setLineDash([8, 4]);
        ctx.moveTo(...start);
        ctx.lineTo(...ctl2);
        ctx.moveTo(...end);
        ctx.lineTo(...ctl3);
        ctx.stroke();


        ctx.beginPath();
        ctx.restore();
}

    let ignoreMove1 = true;  
    let active2 = false;
    let active3 = false;  
    let ignoreMove2 = true;  

    canvas1.addEventListener('mousedown', ev => {
        ignoreMove1 = false;
        setCtl1(ev.offsetX, ev.offsetY);
    })
    canvas1.addEventListener('mouseup', ev => { 
        ignoreMove1 = true;
        setCtl1();
    })
    canvas1.addEventListener('mousemove', ev => {
        if(ignoreMove1) return;
        setCtl1(ev.offsetX, ev.offsetY);
    })
    canvas1.addEventListener('mouseenter', ev => {
        prepareGrid(ctx1);
        drawQuadratic(ctx1, true);
    })
    canvas1.addEventListener('mouseleave', ev => {
        prepareGrid(ctx1);
        drawQuadratic(ctx1, false);
    })

    canvas2.addEventListener('mousemove', ev => {
        if(ignoreMove2) {
            const distanceTo2 = ((ev.offsetX - ctl2[0])**2 + (ev.offsetY - ctl2[1])**2) ** 0.5
            const distanceTo3 = ((ev.offsetX - ctl3[0])**2 + (ev.offsetY - ctl3[1])**2) ** 0.5
            active2 = distanceTo2 < distanceTo3;
            active3 = !active2;
            prepareGrid(ctx2);
            drawBezier(ctx2, active2, active3);

        } else {
            if(active2) setCtl2(ev.offsetX, ev.offsetY);
            if(active3) setCtl3(ev.offsetX, ev.offsetY);
        }
    });

    canvas2.addEventListener('mouseup', ev => { 
        ignoreMove2 = true;
        prepareGrid(ctx2);
        drawBezier(ctx2, active2, active3);
    });
    canvas2.addEventListener('mousedown', ev => { 
        ignoreMove2 = false;
        prepareGrid(ctx2);
        drawBezier(ctx2, active2, active3);
    });

    canvas2.addEventListener('mouseleave', ev => {
        active2 = false;
        active3 = false;
        prepareGrid(ctx2);
        drawBezier(ctx2, false, false);
    })


    function setCtl1(x, y) {
        if(x) ctl1[0] = x;
        if(y) ctl1[1] = y;
        prepareGrid(ctx1);
        drawQuadratic(ctx1, true);
    }

    function setCtl2(x, y) {
        if(x) ctl2[0] = x;
        if(y) ctl2[1] = y;
        prepareGrid(ctx2);
        drawBezier(ctx2, true, false);
    }

    function setCtl3(x, y) {
        if(x) ctl3[0] = x;
        if(y) ctl3[1] = y;
        prepareGrid(ctx2);
        drawBezier(ctx2, false, true);
    }

    prepareGrid(ctx1);
    drawQuadratic(ctx1);
    prepareGrid(ctx2);
    drawBezier(ctx2);

</script>