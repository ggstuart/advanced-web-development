---
type: slide
title: The ClassList API
classes: [one-two-two, both-gap, p-burger, class-list]
---


> The class attribute can be set via [`className`].

```js
let el = document.createElement('p');
el.className = "warning highlight";
```

```html
<p class="warning highlight"></p>
```

The [classList API] simplifies working with the `class` attribute of elements.

> [`add()`]

```js
el.classList.add("error");
```

```html
<p class="warning highlight error"></p>
```

> [`remove()`]

```js
el.classList.remove("warning");
```

```html
<p class="highlight error"></p>
```

> [`toggle()`] returns a boolean

```js
el.classList.toggle("warning");
el.classList.toggle("error");  
el.classList.toggle("warning");
```

```html
<p class="warning highlight error"></p>
<p class="warning highlight"></p>
<p class="highlight"></p>
```

> [`replace()`] returns a boolean

```js
el.classList.replace("highlight", "info");

```
```html
<p class="info"></p>
```

[classList API]: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
[`className`]: https://developer.mozilla.org/en-US/docs/Web/API/Element/className

[`add()`]: https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/add
[`remove()`]: https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/remove
[`toggle()`]: https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle
[`replace()`]: https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/replace