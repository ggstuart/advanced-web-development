---
title: binding
type: slide
order: 10
classes: [two-three, block-burger, h-gap]
---

> We can call [`bind`] on a function to force the value of `this`.

Consider a function defined on an object.<br>
The function accesses the `x` property via `this`.

```js
const thing = {
  x: 42,
  getX: function () {
    return this.x;
  },
};
console.log(thing.getX()); // 42
```

But if we extract the function, it breaks.<br>
The value of `this` is no longer our object.

```js
const myGetX = thing.getX;
console.log(myGetX()); // undefined or error
```

> `this` is whatever is behind the dot preceding the function call.
If there is no dot, then it's the global context, which in the browser, is `window`.
*In a JavaScript module, the above code raises an error.*

We can call [`bind`] on any function to return a new function in which `this` is explicitly set.

```js
const boundGetX = myGetX.bind(thing);
console.log(boundGetX()); // 42
```

> This may seem strange at first, but it makes sense.

[`bind`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind