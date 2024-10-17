---
title: Functions
type: slide
order: 13
classes: []
---

> Functions can help to avoid repetition and make code more readable and more maintainable.

```js
function createElementWithContent(tagName, textContent) {
    const element = document.createElement(tagName);
    element.textContent = textContent;
    return element;
}
```

> A newer syntax (ECMAScript 2015) for more compact functions using arrow (=>) notation.

```js
const createElementWithContent = (tagName, textContent) => {
    const element = document.createElement(tagName);
    element.textContent = textContent;
    return element;
}
```

> Simple one-line arrow functions can be very compact.

```js
const doubleIt = value => value * 2;
const addThese = (value1, value2) => value1 + value2;
```

> Functions are essential for event handling and callbacks.