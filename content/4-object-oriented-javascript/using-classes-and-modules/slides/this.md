---
type: slide
title: What is this?
classes: [p-burger, even, both-gap]
---

Typically [`this`] refers to the context in which the code is executed.

> In a *normal* script, `this` is usually the [`window`] object.

```js
console.log(this);  // window object
```

> In a javascript *module*, `this` is `undefined`.

```js
console.log(this); // undefined
```

> Here's a function that logs the value of `this`.
> Calling the function produces no surprises.

```js
function whatsThis() {
    console.log(this);
}
whatsThis();  // undefined
```

> However, if we call the function as the property of an object, then the object becomes the context and `this` is set accordingly.
Functions which are properties of objects, are called *methods*.

```js
const obj1 = {
    whatsThis: function () { 
        console.log(this);
    }
}
obj1.whatsThis(); // {whatsThis: ƒ}
```

> Arrow functions don't behave this way, they don't modify `this`

```js
const obj2 = {
    whatsThis: () => {
        console.log(this);
    }
}
obj2.whatsThis();  // undefined
```


[`this`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
[`window`]: https://developer.mozilla.org/en-US/docs/Web/API/Window