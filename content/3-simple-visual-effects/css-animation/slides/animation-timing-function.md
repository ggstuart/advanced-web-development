---
type: slide
title: Animation timing functions
classes: [timing-functions, even, block-burger]
---

> In the below animations, there are 40 elements, each element is given a slightly different `animation-delay` using JavaScript.

<div class="demo timing"></div>

```css
div.demo.timing {
    display: grid;
    background: #fff;
    grid-auto-rows: min-content 1fr;
    > p { margin: 0;}
    div {
        display: grid;
        grid-auto-rows: 1fr;
        grid-auto-flow: column;
        > div {
            background: var(--clr-primary-button);
            scale: 1 0.1;
            animation: shrink infinite alternate;
        }
        > div:nth-child(even) {
            background: var(--clr-accent);
        }
    }
}

@keyframes shrink {
    100% {scale: 1 1;}
}
```

<script type="module">
const duration = 1500;
const count = 40;
const newDiv = (tf, i) => {
    const d = document.createElement('div');
    const delay = duration / count * i * 3;
    d.style.animationTimingFunction = tf;
    d.style.animationDuration = `${duration}ms`;
    d.style.animationDelay = `${delay}ms`;
    return d;
}
const container = document.querySelector("div.demo.timing");
for(const timingFunction of ['linear', 'ease-in-out', 'ease-in', 'ease-out']) {
    const div = document.createElement('div');
    const label = document.createElement('p');
    const divs = Array.from({length: count}).fill(timingFunction).map(newDiv);
    label.textContent = timingFunction;
    div.append(...divs);
    container.append(label, div);
}
</script>

<style>
div.demo.timing {
    display: grid;
    background: #fff;
    grid-auto-rows: min-content 1fr;
    > p { margin: 0;}
    div {
        display: grid;
        grid-auto-rows: 1fr;
        grid-auto-flow: column;
        > div {
            background: var(--clr-primary-button);
            scale: 1 0.1;
            animation: shrink infinite alternate;
        }
        > div:nth-child(even) {
            background: var(--clr-accent);
        }
    }
}
@keyframes shrink {
    100% {scale: 1 1;}
}
</style>