---
type: slide
title: Offset-distance and offset-path
classes: [offset]
---

> The [offset-path] CSS property specifies a path for an element to follow.
The [offset-distance] property determines how far along the path the element should be located.

<div id="motion-demo">
  <div id="rounded-rectangle"></div>
  <div></div>
</div>

```css
#motion-demo {
    display: grid;
}
#motion-demo > * {
    grid-row: 1;
    grid-column: 1;
    offset-position: left top;
    width: 50px;
    aspect-ratio: 1;
    background: black;
    &:nth-of-type(1) {
        animation: move 7s infinite linear;
        offset-path: xywh(20% 10% 60% 80% round 100px);
    }
    &:nth-of-type(2) {
        animation: move 11s infinite linear;
        offset-path: ellipse(30% 20% at center center);;
    }
}

@keyframes move {
  100% {
    offset-distance: 100%;
  }
}
```


<style>
#motion-demo {
    display: grid;
}
#motion-demo > * {
    grid-row: 1;
    grid-column: 1;
    offset-position: left top;
    width: 50px;
    aspect-ratio: 1;
    background: black;
    &:nth-of-type(1) {
        animation: move 7s infinite linear;
        offset-path: xywh(20% 10% 60% 80% round 100px);
    }
    &:nth-of-type(2) {
        animation: move 11s infinite linear;
        offset-path: ellipse(30% 20% at center center);;
    }
}

@keyframes move {
  100% {
    offset-distance: 100%;
  }
}
</style>

[offset-position]: https://developer.mozilla.org/en-US/docs/Web/CSS/offset-position
[offset-path]: https://developer.mozilla.org/en-US/docs/Web/CSS/offset-path