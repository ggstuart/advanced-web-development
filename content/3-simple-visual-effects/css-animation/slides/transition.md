---
type: slide
title: CSS transitions
classes: [even, block-burger, p-burger, both-gap]
---

The most straight forward way to implement animation in CSS is to use the [`transition`] property.

<div style="display: grid; grid-template-columns: 1fr 1fr; grid-column: span 2;">
<div class="example">
    I will change abruptly on hover.
</div>
<div class="example animated">
    I will animate smoothly.
</div>
</div>


```html
<div class="example">
    I will change abruptly on hover.
</div>

<div class="example animated">
    I will animate smoothly.
</div>
```

```css
.example {
    background-color: yellow;
    &:hover {
        background-color: orange;
    }
}
.animated {
    transition: background-color 800ms;
}
```


<style>
.example {
    background-color: yellow;
    align-content: center;
    margin-inline: 0;
    &:hover {
        background-color: orange;
    }
}
.animated {
    transition: background-color 800ms;
}
</style>

> The `transition` property allows you to specify how an element transitions between two states.
Typically this is between [pseudo-classes], or changes in attributes or classes managed with JavaScript. 

[`transition`]: https://developer.mozilla.org/en-US/docs/Web/CSS/transition
[pseudo-classes]: https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes