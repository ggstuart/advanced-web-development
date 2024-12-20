---
type: slide
title: coordinates
---

> Canvas coordinates increase from left to right and from top to bottom.

<div id="demo-coordinates">
<canvas width="1000" height="500"></canvas>
</div>

> The origin is in the top-left corner

<script type="module">
    import { grid } from './grid.js';

    const canvas = document.querySelector("#demo-coordinates canvas");
    const ctx = canvas.getContext('2d');

    grid(ctx, 100, 10);
    // ctx.strokeStyle = "#999";
    // ctx.lineWidth = 0.5;
    // vertical(ctx, 20);
    // horizontal(ctx, 20);

    // ctx.lineWidth = 2;
    // vertical(ctx, 100, true);
    // horizontal(ctx, 100, true);

</script>

<style>
    #demo-coordinates {
        display: grid;
        place-items: center;
    }
</style>