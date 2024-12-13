---
title: Keyboard events
type: slide
classes: [block-burger, three-one]
---

> Keyboard events are very simple, when you know how.
When a key is pressed, a [`keydown`] event fires.
When a key is released, a [`keyup`] event fires.


```js
const target = document.querySelector('#keyboard_event_target');

function getKey(ev) {
    return `
    ${ev.key != "Alt" && ev.altKey ? "Alt " : ""}
    ${ev.key != "Control" && ev.ctrlKey ? "Ctrl " : ""}
    ${ev.key != "Shift" && ev.shiftKey ? "Shift " : ""}
    ${ev.key}${ev.repeat ? "..." : ""}`;
}

document.body.addEventListener('keydown', (ev) => {
    target.textContent = `${getKey(ev)} pressed`;
});

document.body.addEventListener('keyup', (ev) => {
    target.textContent = `${getKey(ev)} released`;
});
```
<output id="keyboard_event_target">Press a key</output>

> The [`KeyboardEvent`] object passed into the event handler function contains a `key` property, amongst others.

[`keydown`]: https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event
[`keyup`]: https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event
[`KeyboardEvent`]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent


<script>
    const target = document.querySelector('#keyboard_event_target');
    function getKey(ev) {
        return `
        ${ev.key != "Alt" && ev.altKey ? "Alt " : ""}
        ${ev.key != "Control" && ev.ctrlKey ? "Ctrl " : ""}
        ${ev.key != "Shift" && ev.shiftKey ? "Shift " : ""}
        ${ev.key}${ev.repeat ? "..." : ""}`;
    }
    document.body.addEventListener('keydown', (ev) => { target.textContent = `${getKey(ev)} pressed`; });
    document.body.addEventListener('keyup', (ev) => { target.textContent = `${getKey(ev)} released`; });
</script>

<style>
    output#keyboard_event_target {
        font-size: 2em;
    }
</style>