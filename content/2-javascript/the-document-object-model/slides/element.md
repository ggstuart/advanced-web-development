---
type: slide
title: The Element API
classes: [p-burger, one-two, both-gap]
---

The [element API] allows your JavaScript code to interact with HTML elements.

> We can do things like set the `id` and access the HTML code for an element.

```js
const section = document.createElement('section');
section.id = "welcome";

console.log(section.outerHTML);     // <section id="welcome"></section>
```

> We can set and get arbitrary attributes

```js
section.setAttribute('lang', 'es');

console.log(section.outerHTML)  // <section id="welcome" lang="es"></section>
```

> We can also set the HTML content of an element to a string of HTML code using [innerHTML] and access it's [children].

```js
section.innerHTML = `
<p>
    Hola Mundo.
</p>`;

console.log(section.children[0])    // <p>Hola Mundo</p>
```



[element API]: https://developer.mozilla.org/en-US/docs/Web/API/Element
[innerHTML]: https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
[children]: https://developer.mozilla.org/en-US/docs/Web/API/Element/children