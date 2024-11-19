---
title: DOM Manipulation
type: slide
order: 51
classes: [one-two, block-burger, h-gap]
---

> The DOM, or Document Object Model is a data structure representing the entire document.
> The global `document` object presents many methods for inspecting and manipulating the DOM.

We can grab an element and change its content. 

```js
document.getElementById('my-element').textContent = "hello";
```

Here we get all the `<div>` elements and change the content of the first one.

```js
const divs = document.getElementsByTagName('div');
divs[0].textContent = "I replaced the content.";
```

We can also create new elements and insert them into the DOM.

```js
const newDiv = document.createElement('div');
newDiv.textContent = "this is a completely new element.";
document.body.append(newDiv);
```

> Most of what you can imagine can be done using the built-in **document API**.