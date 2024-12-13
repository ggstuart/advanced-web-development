---
type: slide
title: The Element API
classes: [p-burger, one-two, both-gap]
---

Some examples of using the [element API] to interact with HTML elements.

> We can set certain specific attributes such as the `id` or `src`.
This will depend on the type of element.

```js
const img = document.createElement('img');
img.id = "logo";
img.src = "images/logo.png";
img.alt = "The logo shows badges for HTML, CSS, JavaScript and PHP";
```

> We can access the HTML code for an element as a string

```js
console.log(img.outerHTML);
// '<img id="logo" src="images/logo.png" 
//      alt="The logo shows badges for HTML, CSS, JavaScript and PHP">'
```

> We can set and get arbitrary attributes

```js
const p = document.createElement('p');
p.setAttribute('lang', 'es'); // or use p.lang = 'es'
p.textContent = `¡Hola Mundo!';
```

> We can set the content of an element to a string of HTML using [innerHTML].

```js
const ul = document.createElement('ul');
ul.innerHTML = `<li>Document</li><li>Element</li><li>Node</li>`;
```

> We can access an element's [children], [tagName] and many other basic parameters.

```js
for (const child of ul.children) { // LI
    console.log(child.tagName)     // LI
}                                  // LI
```


[element API]: https://developer.mozilla.org/en-US/docs/Web/API/Element
[innerHTML]: https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
[children]: https://developer.mozilla.org/en-US/docs/Web/API/Element/children
[tagName]: https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName