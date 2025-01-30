---
type: slide
title: new
classes: [p-burger, two-three, h-gap]
---

The [`new`] operator allows functions to act as constructors for objects.

> Typically, we capitalise constructor functions and use them to set properties on `this`.

```js
function Coordinate(x, y) {
    this.x = x;
    this.y = y;
}
```

> If we modify the `prototype` of our function, it will be automatically applied to all new instances.

```js
Coordinate.prototype = {
    toString: function () {
        return `(${this.x}, ${this.y})`;
    }
}
```

> Creating an *instance* is now very easy.

```js
const origin = new Coordinate(0, 0);
// Coordinate {x: 0, y: 0}
```


> Now we can create more coordinate instances and each will have access to the correctly bound method.

```js
for (const i of [1, 2, 3, 4]) {
    console.log(new Coordinate(i, 4-i).toString());
}
```

> The output should make sense.

```plaintext {linenos=false}
(1, 3)
(2, 2)
(3, 1)
(4, 0)
```

[`new`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new