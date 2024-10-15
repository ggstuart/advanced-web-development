---
title: Strict mode vs. sloppy mode
type: slide
order: 60
classes: [strict, block-burger]
---

> In *sloppy mode* (the default) this mistake would not be picked up.

This mistake would cause you problems because its not clear why `myVariable` is not set to 17.
Perhaps an error would occur somewhere else, perhaps just *weird behaviour*.

```js {linenos=false}
// A dangerous mistake
let myVariable;

myVarible = 17;
```


> Activating [`strict mode`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) ensures this line throws a `ReferenceError`

```text {linenos=false}
Uncaught ReferenceError: myVarible is not defined
```

```js {linenos=false}
// A mistake that will immediately be fixed
"use strict";
let myVariable;

myVarible = 17;
```
> Using **strict mode** is good. Strict mode will *raise more errors* and enforce better habits.