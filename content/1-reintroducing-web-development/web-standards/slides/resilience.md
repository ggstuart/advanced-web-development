---
title: Resilient at the core
type: slide
classes: [even, block-burger, both-gap, nice-p]
---

>Browsers are specifically able to ignore unfamiliar elements.

This will be understood as a paragraph and inserted into the DOM accordingly.
```html
<p>
    some text
</p>
```

In this case, the browser will add the text into the DOM, ignoring the unfamiliar tags.
```html
<unknownElement>
    some text
</unknownElement>
```

>This simple rule makes the web resilient to change.
New tags can be introduced and older browsers can ignore them.
This was a pragmatic decision from the beginning.

The `<main>` element was introduced in HTML5 along with many more structural elements.
```html
<main>
    some text
</main>
```

So was the `<canvas>` element, providing a drawing capability.
```html
<canvas>
    Draw on me
</canvas>
```

> *"Be conservative in what you send; be liberal in what you accept."*
<br>**Jon Postel**.

