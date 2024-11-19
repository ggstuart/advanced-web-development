---
title: Reading from the DOM
type: slide
classes: [p-burger, even, both-gap]
---

We can access elements in loads of ways.
Once we have an element object, we can read information from it.

```html
<ul>
    <li>An unordered list with multiple items.</li>
    <li>The target value is 
        <span id="my-element">100</span>.
    </li>
    <li>We'd like to read this content into JS.</li>
</ul>
```

<ul>
    <li>An unordered list with multiple items.</li>
    <li>The target value is 
        <span id="my-element">100</span>.
    </li>
    <li>We'd like to read this content into JS.</li>
</ul>

> [getElementById] will find an element with a given `id` attribute.


> Using [querySelector] is more flexible, using CSS selector strings.

```js
const myElement = document.getElementById('my-element');
const targetValue = myElement.textContent; // 100
```

```js
const myElement = document.querySelector('#my-element');
const targetValue = myElement.textContent; // 100
```

Once we have a starting point, we can navigate up the document structure using [parentElement] and access element [children].

```js
const myParent = myElement.parentElement;
console.log(myParent.textContent); 
// The target value is 100.
```


[getElementById]: https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById

[queryselector]: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector

[children]: https://developer.mozilla.org/en-US/docs/Web/API/Element/children
[parentElement]: https://developer.mozilla.org/en-US/docs/Web/API/Node/parentElement