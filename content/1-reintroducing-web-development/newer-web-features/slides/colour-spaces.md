---
type: slide
title: Colour spaces
classes: [twin-code]
---


<div class="colour-spaces">
    <span class="srgb">srgb</span>
    <span class="srgb-linear">srgb-linear</span>
    <span class="display-p3">display-p3</span>
    <span class="a98-rgb">a98-rgb</span>
    <span class="prophoto-rgb">prophoto-rgb</span>
    <span class="rec2020">rec2020</span>
    <span class="xyz">xyz</span>
    <span class="xyz-d50">xyz-d50</span>
    <span class="xyz-d65">xyz-d65</span>
</div>


```html
<div class="colour-spaces">
    <span class="srgb">srgb</span>
    <span class="srgb-linear">srgb-linear</span>
    <span class="display-p3">display-p3</span>
    <span class="a98-rgb">a98-rgb</span>
    <span class="prophoto-rgb">prophoto-rgb</span>
    <span class="rec2020">rec2020</span>
    <span class="xyz">xyz</span>
    <span class="xyz-d50">xyz-d50</span>
    <span class="xyz-d65">xyz-d65</span>
</div>
```

```CSS
.colour-spaces {
    display: grid; 
    grid-template-columns: 1fr 1fr 1fr; 
    grid-template-rows: 1fr 1fr 1fr;
    gap: 2px;
    span { 
        background: linear-gradient(90deg,
            color(var(--space) 1.0 0.0 0.0),
            color(var(--space) 0.0 1.0 0.0),
            color(var(--space) 0.0 0.0 1.0)
        );
        align-content: center;
    }
}
```

> The [color function] allows colours to be specified in any of the new colour spaces.

<style>
    .colour-spaces {
        display: grid; 
        grid-template-columns: 1fr 1fr 1fr; 
        grid-template-rows: 1fr 1fr 1fr;
        gap: 2px;
        span { 
            background: linear-gradient(90deg,
                color(var(--space) 1.0 0.0 0.0),
                color(var(--space) 0.0 1.0 0.0),
                color(var(--space) 0.0 0.0 1.0)
            );
            align-content: center;
        }
    }
    .srgb { --space: srgb; }
    .srgb-linear { --space: srgb-linear; }
    .display-p3 { --space: display-p3; }
    .a98-rgb { --space: a98-rgb; }
    .prophoto-rgb { --space: prophoto-rgb; }
    .rec2020 { --space: rec2020; }
    .xyz { --space: xyz; }
    .xyz-d50 { --space: xyz-d50; }
    .xyz-d65 { --space: xyz-d65; }
</style>



[color function]: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color