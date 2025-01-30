---
type: slide
title: Promise creation
classes: [p-burger, both-gap, creation]
---

Creating promises *from scratch* requires a function that accepts and eventually executes a *callback*.

> This promise resolves immediately.

```js
console.log("a");

const myPromise = new Promise(resolve => {
    console.log("b");
    resolve("a return value");
});

console.log("c");
```

```plaintext
a
b
c
```

> This one will wait 1000ms before completing.
Crucially, it doesn't block our code!

```js
console.log("a");

const myPromise = new Promise(resolve => {
    setTimeout(() => {
        console.log("b");
        resolve("Returned after one second")
    }, 1000);
});

console.log("c");
```

```plaintext
a
c
b
```

But... where is the return value?

