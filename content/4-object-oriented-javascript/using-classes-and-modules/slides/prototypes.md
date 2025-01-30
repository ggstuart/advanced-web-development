---
type: slide
title: Prototypes
classes: [even, block-burger, both-gap]
---

> Javascript is a **prototype-based** language.
If a property is not found on an object, the object's *prototype* is checked.

```js
const base = {
    speak: function () { 
        console.log(this.msg, this.msg, "!");
    }
};

const dog = { msg: "woof" };
Object.setPrototypeOf(dog, base);

const cow = { msg: "moo" };
Object.setPrototypeOf(cow, base);

dog.speak();    // woof woof!
cow.speak();    // moo moo!
```

```js
const base = {
    speak: function () { 
        console.log(this.msg, this.msg, "!");
    }
};

const dog = Object.create(base, {
    msg: {value: "woof"} 
});
const cow = Object.create(base, {
    msg: {value: "moo"}
});

dog.speak();    // woof woof!
cow.speak();    // moo moo!
```

> Setting and getting the prototype of an object can be done via [`Object.setPrototypeOf`] and [`Object.getPrototypeOf`], but the recommended way is via [`Object.create`].

> In JS, there is a prototype chain.
> Objects inherit functionality from their prototype. A prototype is just an object like anything else.

[`Object.setPrototypeOf`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf
[`Object.getPrototypeOf`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf
[`Object.create`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create