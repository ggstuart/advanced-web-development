---
title: Progressive enhancement
type: slide
classes: [even, block-burger, progressive, h-gap]
---

> for example, `border-radius` was gradually introduced over many years.

```css
section {
    background-color: orange;
    border-radius: 5px;
}
```

- Chrome 4 (January 2010)
- Safari 5 (June 2010)
- Firefox 4 (March 2011)
- Edge 12 (July 2015)

>Since older browsers will simply ignore it, designers can consider this a *progressive enhancement* if the design works without the `border-radius` property set. 


```css
section {
    background-color: orange;
}

@supports (border-radius: 5px) {
    section {
        border-radius: 5px;
        margin: 0.5rem;
    }
}
```

Using the `@supports` rule is a neat way to add more complex styles.

In this case, the `margin` would only be added if `border-radius` is supported.


> *"Of course this means that the resulting website will look different in different browsers. Some people will see rounded corners. Others won’t. And that’s okay."*<br> - **Jeremy Keith**, Resilient Web Design
