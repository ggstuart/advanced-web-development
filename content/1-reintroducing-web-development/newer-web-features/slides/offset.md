---
type: slide
title: Offset-distance and offset-path
classes: [offset]
---

> The [offset-path] CSS property specifies a path for an element to follow.
The [offset-distance] property determines how far along the path the element should be located.

<div id="motion-demo">
  <img src="images/css3_badge.svg">
  <img src="images/css3_badge.svg">
  <img src="images/css3_badge.svg">
  <img src="images/css3_badge.svg">
</div>

```css
#motion-demo > img {
  width: 100px;
  padding: 10px;
  background: radial-gradient(white, 50px, blue);
  border-radius: 100px;
  &:nth-of-type(1) {
    animation: move 995ms alternate infinite ease-in-out;
    offset-path: ray(45deg);
  }
  &:nth-of-type(2) {
    animation: move 1005ms alternate infinite ease-in-out;
    offset-path: ray(135deg);
  }
  &:nth-of-type(3) {
    animation: move 995ms alternate infinite ease-in-out;
    offset-path: ray(225deg);
  }
  &:nth-of-type(4) {
    animation: move 1005ms alternate infinite ease-in-out;
    offset-path: ray(315deg);
  }
}
@keyframes move {
  0% { offset-distance: 0%; }
  30% { offset-distance: 50%; }
  50% { offset-distance: 40%; }
  100% { offset-distance: 100%; }
}
```


<style>
#motion-demo > img {
  width: 100px;
  padding: 10px;
  background: radial-gradient(white, 50px, blue);
  border-radius: 100px;
  &:nth-of-type(1) {
    animation: move 995ms alternate infinite ease-in-out;
    offset-path: ray(45deg);
  }
  &:nth-of-type(2) {
    animation: move 1005ms alternate infinite ease-in-out;
    offset-path: ray(135deg);
  }
  &:nth-of-type(3) {
    animation: move 995ms alternate infinite ease-in-out;
    offset-path: ray(225deg);
  }
  &:nth-of-type(4) {
    animation: move 1005ms alternate infinite ease-in-out;
    offset-path: ray(315deg);
  }
}
@keyframes move {
  0% { offset-distance: 0%; }
  30% { offset-distance: 50%; }
  50% { offset-distance: 40%; }
  100% { offset-distance: 100%; }
}
</style>

[offset-position]: https://developer.mozilla.org/en-US/docs/Web/CSS/offset-position
[offset-path]: https://developer.mozilla.org/en-US/docs/Web/CSS/offset-path
[offset-distance]: https://developer.mozilla.org/en-US/docs/Web/CSS/offset-distance