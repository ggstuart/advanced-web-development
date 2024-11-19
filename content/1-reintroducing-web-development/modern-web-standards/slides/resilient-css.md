---
title: Resilient CSS
type: slide
classes: [block-burger, one-two, h-gap]
---

> The same attitude to errors was inherited by CSS when it emerged.

This can make typing errors very frustrating because no error is raised.

```css
/* this contains a mistake! */
p {
    background-colour: red;
}
```
> But at least the page loads without error.

This has also allowed for new CSS *selectors*, *properties* and *values* to be added over the years.

```css
main {
    border-radius: 2px;
    backdrop-filter: blur(10px);
    display: grid;
}
```

> Older browsers will simply ignore any styles they don't recognise.