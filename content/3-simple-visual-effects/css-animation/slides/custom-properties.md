---
type: slide
title: Custom properties
classes: [block-burger, one-three, small-code]
---

> CSS [custom properties] are variables for CSS.
They can be animated, although it may be necessary to declare them using [@property].

<div class="demo custom-properties">
    <div></div>
    <div></div>
</div>


```css
:root {
    --translate1: 0%;
}
@property --translate2 {
    syntax: "<percentage>";
    inherits: true;
    initial-value: 0%;
}

.demo.custom-properties {
    display: grid;
    gap: 1px;
    place-content: center;
    div {
        width: 5rem;
        aspect-ratio: 1;
        background: red;
        animation: move 500ms infinite alternate;
        &:nth-child(1) { translate: var(--translate1); }
        &:nth-child(2) { translate: var(--translate2); }
    }
}

@keyframes move { 
      0% { --translate1: -100%; --translate2: -100% }
    100% { --translate1:  100%; --translate2:  100% }
}
```

[custom properties]: https://developer.mozilla.org/en-US/docs/Web/CSS/--*
[@property]: https://developer.mozilla.org/en-US/docs/Web/CSS/@property



<style>
:root {
    --translate1: 0%;
}
@property --translate2 {
    syntax: "<percentage>";
    inherits: true;
    initial-value: 0%;
}
.demo.custom-properties {
    display: grid;
    gap: 1px;
    place-content: center;
    div {
        width: 5rem;
        aspect-ratio: 1;
        background: red;
        animation: move 500ms infinite alternate;
        &:nth-child(1) { translate: var(--translate1); }
        &:nth-child(2) { translate: var(--translate2); }
    }
}
@keyframes move { 
        0% { --translate1: -100%; --translate2: -100% }
    100% { --translate1:  100%; --translate2:  100% }
}
</style>