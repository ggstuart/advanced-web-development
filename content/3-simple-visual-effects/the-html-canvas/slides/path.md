---
type: slide
title: paths and subpaths
classes: [paths, p-burger, both-gap]
---



```js
ctx.moveTo(200, 80);
ctx.lineTo(200, 50);
// ctx.stroke();
```

<div><canvas id="paths1" width="200" height="120"></canvas></div>

> The context maintains a series of drawing instructions known as a `path`.
> When we call stroke or fill, we are acting on the current path.


```js
ctx.arc(200, 30, 20, 0, 2 * Math.PI);
// ctx.stroke();
```

<div><canvas id="paths2" width="200" height="120"></canvas></div>

> Adding more instructions will extend the path.
> Here the `arc()` method inexplicably adds a line.


```js
ctx.stroke();
ctx.beginPath();
ctx.arc(200, 30, 20, 0, 2 * Math.PI);
// ctx.stroke();
```

<div><canvas id="paths3" width="200" height="120"></canvas></div>

> To avoid this, we can stroke our path and being a new one with `beginPath()`.


```js
ctx.moveTo(180, 130);
ctx.quadraticCurveTo(200, 30, 220, 130);
// ctx.stroke();
```

<div><canvas id="paths4" width="200" height="120"></canvas></div>

> In most cases we can simply create a `subpath` using `moveTo`.

```js
ctx5.moveTo(180, 80);
ctx5.quadraticCurveTo(200, 30, 220, 80);
ctx.stroke();
```

<div><canvas id="paths5" width="200" height="120"></canvas></div>

> Adding multiple sub-paths allows us to create disjointed paths.


<script type="module">
    import {grid, horizontal, vertical} from './grid.js';

    const ctx1 = document.querySelector("#paths1").getContext('2d');
    const ctx2 = document.querySelector("#paths2").getContext('2d');
    const ctx3 = document.querySelector("#paths3").getContext('2d');
    const ctx4 = document.querySelector("#paths4").getContext('2d');
    const ctx5 = document.querySelector("#paths5").getContext('2d');
    for (const ctx of [ctx1, ctx2, ctx3, ctx4, ctx5]) {
        grid(ctx, 50, 5);
        ctx.moveTo(100, 80);
        ctx.lineTo(100, 50);
    }
    ctx2.arc(100, 30, 20, 0, 2 * Math.PI);
    for (const ctx of [ctx3, ctx4, ctx5]) {
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(100, 30, 20, 0, 2 * Math.PI);
    }
    for (const ctx of [ctx4, ctx5]) {
        ctx.moveTo(80, 130);
        ctx.quadraticCurveTo(100, 30, 120, 130);
    }
    ctx5.moveTo(80, 80);
    ctx5.quadraticCurveTo(100, 30, 120, 80);

    for (const ctx of [ctx1, ctx2, ctx3, ctx4, ctx5]) {
        ctx.stroke();
    }
</script>