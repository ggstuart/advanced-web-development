---
type: slide
title: The ClassList API
classes: [one-two, both-gap, p-burger]
---

The [classList API] simplifies working with the `class` attribute of elements.

> It can be accessed directly via the [className] property.

```js
let myElement = document.createElement('p');
myElement.className = "warning highlight";

// class="warning highlight"
```

> `classList` can [add()] classes

```js
myNode.classList.add("error");

// class="warning highlight error"
```

> `classList` can [remove()] classes

```js
myNode.classList.remove("warning");

// class="highlight error"
```

> `classList` can [toggle()] classes

```js
myNode.classList.toggle("warning");  // class="warning highlight error"
myNode.classList.toggle("error");    // class="warning highlight"
myNode.classList.toggle("warning");  // class="highlight"
```

> `classList` can [replace()] classes

```js
myNode.classList.replace("highlight", "info");

// class="info"
```


[classList API]: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
[classname]: https://developer.mozilla.org/en-US/docs/Web/API/Element/className

[add()]: https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/add
[remove()]: https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/remove
[toggle()]: https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle
[replace()]: https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/replace