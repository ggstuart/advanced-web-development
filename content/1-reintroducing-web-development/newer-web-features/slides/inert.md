---
type: slide
title: The inert attribute
---

By default, `inert` blocks focus and click events. 

```HTML
<section>
    <h3>Normal, active content</h3>
    <button>I am a clickable button</button>
</section>
<section inert>
    <h3>Inert, inactive content</h3>
    <button>I am not clickable</button>
</section>
```

<section>
    <h3>Normal, active content</h3>
    <button>I am a clickable button</button>
</section>
<section inert>
    <h3>Inert, inactive content</h3>
    <button>I am not clickable</button>
</section>

```CSS
[inert] {
    opacity: 0.5;
}
```

> For assistive technologies, this also blocks tabbing and discoverability. The browser may also ignore page search and text selection in the element.
