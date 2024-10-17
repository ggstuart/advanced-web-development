---
title: Event handling
type: slide
order: 18
classes: [even, block-burger]
---

> JavaScript implements a *message queue* which contains a list of functions to be processed.

The event loop is a process that handles each message in the queue, a bit like this psuedocode.

```text
while (queue.waitForMessage()) {
  queue.processNextMessage();
}
```

> Event handlers are just functions that take an [Event object](https://developer.mozilla.org/en-US/docs/Web/API/Event) as an argument.

Event objects contain information about the event.

```js
const toggleHighlighted = (ev) => {
    ev.target.classList.toggle("highlighted");
}
```


> To handle an event, the event handler must be registered, usually on an element.

For example, [the Element 'click' event](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event) is triggered when an element is clicked.


```js
myElement.addEventListener('click', toggleHighlighted);
```

> The above pattern is extremely useful for triggering interaction using JavaScript.