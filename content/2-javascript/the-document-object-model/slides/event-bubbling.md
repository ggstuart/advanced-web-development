---
type: slide
title: Event bubbling
classes: [even, p-burger, both-gap, bubble]
---

Events have targets.
That is, they are triggered on an element.


```html
<button id="btnA">
    I'm a button
</button>
```

```html
<p id="pA">
    I'm a paragraph containing
    <button id="btnB">a button</button>
</p>
```

> <button id="btnA">I'm a button</button>

> <p id="pA">I'm a paragraph containing <button id="btnB">a button</button></p>

The click event, triggered by the *child* button can *bubble* up the DOM to the parent paragraph.


> The event was triggered by <output id="ev-target">an element</output> (`ev.target`).

> The event listener is listening on <output id="ev-currentTarget">an element</output> (`ev.currentTarget`).

```js
const btnA = document.querySelector('#btnA');
const btnB = document.querySelector('#pA > button');
const evTarget = document.querySelector('#ev-target');
const evCurrentTarget = document.querySelector('#ev-currentTarget');
alertTarget = ev => {
    evTarget.textContent = `${ev.target.tagName.toLowerCase()}#${ev.target.id}`;
    evCurrentTarget.textContent = `${ev.currentTarget.tagName.toLowerCase()}#${ev.currentTarget.id}`;
}
btnA.addEventListener('click', alertTarget);
pA.addEventListener('click', alertTarget);
```

<script>
    const btnA = document.querySelector('#btnA');
    const btnB = document.querySelector('#pA > button');
    const evTarget = document.querySelector('#ev-target');
    const evCurrentTarget = document.querySelector('#ev-currentTarget');
    alertTarget = ev => {
        evTarget.textContent = `${ev.target.tagName.toLowerCase()}#${ev.target.id}`;
        evCurrentTarget.textContent = `${ev.currentTarget.tagName.toLowerCase()}#${ev.currentTarget.id}`;
    }
    btnA.addEventListener('click', alertTarget);
    pA.addEventListener('click', alertTarget);
</script>

<style>
    #ev-target,
    #ev-currentTarget {
        font-weight: bold;
    } 
</style>

[Event bubbling]: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Event_bubbling