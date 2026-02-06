---
title: Resilience doesn't always apply
type: slide
classes: [even, nice-p, big-quote, v-gap, declarative]
---

> HTML and CSS are declarative

> JavaScript is imperative

Declarative languages leave room for the resilience we have been talking about.
We describe what we want and leave the browser to figure out how to achieve it.


Imperative languages provide more power at the expense of robustness.
A JavaScript programme can crash out with an error if you miss an important comma.

```css
img.hoverable {
    background-image: url(images/unhovered.png);
}
img.hoverable:hover {
    background-image: url(images/hovered.png);
}
```


```JavaScript
const imgs = document.querySelectorAll("img.hoverable");

for(const img of imgs) {

    img.addEventListener('mouseenter', ev => {
        img.src = "images/hovered.png";
    });

    img.addEventListener('mouseout', ev => {
        img.src = "images/unhovered.png";
    });

}
```

Solutions created in an imperative language can migrate to a declarative language over time. 

When a feature is available in a declarative language, not only is it easier to write, it’s also more robust.

