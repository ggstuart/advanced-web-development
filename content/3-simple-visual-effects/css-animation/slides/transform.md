---
title: Transform functions
type: slide
classes: [p-burger, both-gap, transform]
---

Animations can be extremely efficient if we use [transform functions].
Many different transformations can be applied using the [`transform`] property.
However, many functions now have their own CSS properties.


> [`rotate`] by a given [`angle`].

```css
@keyframes myRotate {
      0% { rotate: -0.3turn; }
    100% { rotate:  0.3turn; }
}
```

<div class="demo transform">
    <div class="rotated"></div>
</div>

> [`translate`] by a given [`length`].

```css
@keyframes myTranslate {
      0% { translate: -30%; } 
    100% { translate:  30%; }
}
```

<div class="demo transform">
    <div class="translated"></div>
</div>

> [`scale`] by a given [`number`] or [`percentage`].

```css
@keyframes myScale     {
      0% { scale: 0.75 1.5; } 
    100% { scale: 1.5 0.75; }
}
```

<div class="demo transform">
    <div class="scaled"></div>
</div>

> [`skew`] by a given [`angle`].

```css
@keyframes mySkew {
      0% { transform: skew(-10deg, -15deg); }
    100% { transform: skew( 10deg,  15deg); }
}
```

<div class="demo transform">
    <div class="skewed"></div>
</div>


<style>
.current .demo.transform {
    div {
        margin-inline: auto;
        width: 3em;
        aspect-ratio: 1;
        background-color: black;
        animation-duration: 1s;
        animation-direction: alternate;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;

        &.rotated { animation-name: myRotate; }
        &.translated { animation-name: myTranslate; }
        &.scaled { animation-name: myScale; }
        &.skewed { animation-name: mySkew; }
    }
}

@keyframes myRotate    { 0% { rotate: -0.3turn; } 100% { rotate: 0.3turn; }}
@keyframes myTranslate { 0% { translate: -30%; } 100% { translate: 30%; }}
@keyframes myScale     { 0% { scale: 0.75 1.5; } 100% { scale: 1.5 0.75; }}
@keyframes mySkew      { 0% { transform: skew(-10deg, -15deg); } 100% { transform: skew(10deg, 15deg); }}

</style>
[transform functions]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Functions#transform_functions
[`rotate`]: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate
[`translate`]: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate
[`scale`]: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale
[`angle`]: https://developer.mozilla.org/en-US/docs/Web/CSS/angle
[`length`]: https://developer.mozilla.org/en-US/docs/Web/CSS/length
[`number`]: https://developer.mozilla.org/en-US/docs/Web/CSS/number
[`percentage`]: https://developer.mozilla.org/en-US/docs/Web/CSS/percentage
[`transform`]: https://developer.mozilla.org/en-US/docs/Web/CSS/transform
[`skew`]: https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/skew