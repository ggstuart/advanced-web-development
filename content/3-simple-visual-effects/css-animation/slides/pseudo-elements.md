---
type: slide
title: Pseudo-elements
classes: [three-even, p-burger, both-gap]
---

CSS [pseudo-elements] are elements automatically added to the DOM such as the [::marker] associated with list items.


> Start with a normal list.

```html
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
```

<div class="demo">
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
</div>

> Style the markers.

```css
li::marker {
    content: '😁';
}
```

<div class="demo">
<ul class="smiley">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
</div>

> Style the hover state.

```css
li:hover::marker {
    content: '😀';
}
```

<div class="demo">
<ul class="smiley active">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
</div>

<style>
.slide .content .demo ul {
    max-width: max-content;
    margin-inline: auto;
    li {
        padding: 0;
        align-content: center;
        font-size: 1.2em;
    }
}
ul.smiley {
    li::marker {
        content: '😁';
    }
}
ul.active {
    li:hover::marker {
        content: '😀';
    }
}
</style>


[pseudo-elements]: https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements
[::marker]: https://developer.mozilla.org/en-US/docs/Web/CSS/::marker