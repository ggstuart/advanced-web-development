---
type: slide
title: keyframe animations
classes: [three-two, block-burger, p-burger, both-gap]
---

> The [`@keyframes`] at-rule allows you to specify intermediate steps in an arbitrary animation sequence.

<div class="kf-example">
    <div>
        animation-name:<br>wobble;
    </div>
    <div>
        animation-duration:<br>300ms;
    </div>
    <div>
        animation-iteration-count:<br>infinite;
    </div>
    <div>
        animation-direction:<br>alternate;
    </div>
    <div>
        animation-timing-function:<br>ease-in-out;
    </div>
</div>


```css
.kf-example > div {        
    align-content: center;
    margin-inline: 0;
    background-color: yellow;
    border: 2px solid black;
    animation: wobble 300ms alternate infinite ease-in-out;
}
```

```css
@keyframes wobble {
    0% {
        rotate: -10deg;
    }
    100% {
        rotate: 10deg;
    }
}
```


<style>
.kf-example {
    z-index: 3;
    display: grid; 
    grid-template-columns: repeat(5, 1fr); 
    gap: 0.5rem;
    padding: 0.5rem;
    grid-column: span 2;
    > div {        
        align-content: center;
        margin-inline: 0;
        background-color: yellow;
        border: 2px solid black;
        animation: wobble 300ms alternate infinite ease-in-out;

    }
}
@keyframes wobble {
    0% {
        rotate: -10deg;
    }
    100% {
        rotate: 10deg;
    }
}
</style>


> These slides are animated using `@keyframes`.

[`@keyframes`]: https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes
