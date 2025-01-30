---
type: slide
title: promise resolution
classes: [even, block-burger, both-gap, resolution]
---

> We need to add callbacks using the `then()` method.
Our *callback* will execute when the promise resolves and will receive the value returned by our promise.

```js
console.log("a");

const myPromise = new Promise(resolve => {
    setTimeout(() => {
        console.log("b");
        resolve("Returned after one second")
    }, 1000);
});

console.log("c");

myPromise.then(result => {
    console.log("d")
    console.log("result:", result);
});

console.log("e")
```

```plaintext
a
c
e
b
d
result: Returned after one second
```

> Notice that our code is not blocked whilst the promise is resolving.
