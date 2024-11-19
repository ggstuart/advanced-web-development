---
title: Events
type: slide
order: 17
classes: [even, p-burger, both-gap, events]
---

In the browser, *events* are triggered based on page lifecycle and user interactions.


> ### Mouse clicking
> Mouse click events track the cursor location.
> - [`click`](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event)
> - [`dblclick`](https://developer.mozilla.org/en-US/docs/Web/API/Element/dblclick_event)
> - [`mousedown`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousedown_event)
> - [`mouseup`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseup_event)
> - [`contextmenu`](https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event)

> ### Key pressing
> Keyboard interactions track which key was involved.
> - [`keydown`](https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event)
> - [`keyup`](https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event)

> ### Mouse moving
> Mouse interactions track where the mouse is located.
> - [`mouseover`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseover_event)
> - [`mouseenter`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseenter_event)
> - [`mouseout`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseout_event)
> - [`mouseleave`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseleave_event)
> - [`mousemove`](https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event)

> ### Screen touching
> Touch interactions are a lot like mouse interactions but more complex
> - [`touchstart`](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchstart_event)
> - [`touchend`](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchend_event)
> - [`touchmove`](https://developer.mozilla.org/en-US/docs/Web/API/Element/touchmove_event)

We can register code to execute when these events trigger and our code will have access to information about the event. 