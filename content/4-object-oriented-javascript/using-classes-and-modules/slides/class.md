---
type: slide
title: classes
classes: [even, block-burger, both-gap]
---

> However, there is an easier way using [`classes`].

```js
class Coordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }
}
const origin = new Coordinate(0, 0);
```

```js
class Speaker {
    constructor(msg) {
        this.msg = msg;
    }

    speak() {
        console.log(this.msg, this.msg, "!");
    }
}
dog = new Speaker('woof');
cow = new Speaker('moo');
```

```js
class Thing {
    #x
    constructor(x) {
        this.#x = x;
    }
    get x() {
        return this.#x;
    }
}
```

Out `Thing` class has a *read only* property `x` implemented via the [private property] `#x` and the [getter] `get x()`.

> The class syntax is much neater and easier.

[`classes`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
[private property]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties
[getter]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get