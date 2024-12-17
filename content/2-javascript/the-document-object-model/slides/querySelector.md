---
title: querySelector and querySelectorAll
type: slide
classes: [p-burger, three-two, both-gap]
---


```html
<ul id="my-list">
    <li>An unordered list with multiple items.</li>
    <li>The target value is <span id="my-element">100</span>.</li>
    <li>We'd like to read this content into JS.</li>
</ul>
```

<blockquote>
<ul id="my-list">
    <li>An unordered list with multiple items.</li>
    <li>The target value is <span id="my-element">100</span>.</li>
    <li>We'd like to read this content into JS.</li>
</ul>
</blockquote>

Using CSS selector syntax makes selecting elements from the DOM very easy.

```js
document.querySelector('#my-element')
// <span id="my-element">100</span>
```

> [`querySelector`] returns *the first element* that matches the query.

```js
document.querySelector('#my-list>:nth-child(3)')
// <li>We'd like to read this content into JS.</li>
```

> More complex queries are easy enough.

```js
for (const li of document.querySelectorAll('#my-list>li')) {
    console.log(li);
}
// <li>An unordered list with multiple items.</li>
// <li>The target value is <span id="my-element">100</span>.</li>
// <li>We'd like to read this content into JS.</li>
```

> [`querySelectorAll`] returns *all elements* that match the query.

Both methods can be used on any element to search through the element's content.

[`queryselector`]: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
[`queryselectorAll`]: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
