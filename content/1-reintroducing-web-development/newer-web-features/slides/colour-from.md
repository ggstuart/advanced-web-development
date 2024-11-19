---
type: slide
title: Relative colours
classes: [twin-code, small-code]
---

<div class="relative-colours">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
</div>

> The [color function] also allows colours to be modified in a colour space of your choice.

```html
<div class="relative-colours">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
</div>
```

```CSS
.relative-colours {
    --clr: color(srgb 0.5 0.5 0.5);
    --r: 0;
    --b: 0;
    display: grid; 
    grid-template-columns: 1fr 1fr 1fr;
    span {
        background: color(
            from var(--clr) srgb-linear
            calc(r + var(--r)) g calc(b + var(--b))
        );
    }
    :nth-child(3n)   { --r: +0.5; } /* right column */
    :nth-child(3n-2) { --r: -0.5; } /* left column */
    :nth-child(n+7)  { --b: +0.5; } /* bottom row */
    :nth-child(-n+3) { --b: -0.5; } /* top row */
}
```

<style>
    .relative-colours {
        --clr: color(srgb 0.5 0.5 0.5);
        --r: 0;
        --b: 0;
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr;
        span {
            background: color(
                from var(--clr) srgb-linear
                calc(r + var(--r)) g calc(b + var(--b))
            );
        }
        :nth-child(3n-2) { --r: -0.5; } /* left column */
        :nth-child(3n)   { --r: +0.5; } /* right column */
        :nth-child(-n+3) { --b: -0.5; } /* top row */
        :nth-child(n+7)  { --b: +0.5; } /* bottom row */
    }
</style>


[color function]: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color