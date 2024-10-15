---
title: Hello world
type: slide
order: 40
classes: [hello]
---

> Log a message to the console.

```js
console.log("Hello World");
```

> Log a warning to the console.

```js
console.warn("Hello World");
```


> Alert with an annoying popup dialogue.

```js
alert("Hello World");
```

> Add an element in the DOM *with an id attribute* and use Javascript to update the DOM.

```html
<span id="msg"></span>
```


```js
const msg = document.getElementById('msg');
msg.textContent = "Hello World";
```

> Create an element, add some text and insert the element into the page.

```js
const msg = document.createElement('p');
msg.textContent = "Hello World";
document.body.append(p);
```

> Generate a dialogue box, insert it into the page and show it using the dialog API.

```js
const dialog = document.createElement('dialog');
const p = document.createElement('p');
p.textContent = "Hello world";
dialog.append(p);
document.body.append(dialog);
dialog.showModal();
```