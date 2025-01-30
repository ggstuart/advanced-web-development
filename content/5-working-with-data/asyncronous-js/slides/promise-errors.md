---
type: slide
title: Promise errors
classes: [p-burger, one-two, both-gap]
---

We can pass two callback functions, one for success and one for failure.

> This one resolves immediately.
It will usually reject, but sometimes it will resolve.

```js
const myPromise = new Promise((resolve, reject) => {
    if(Math.random() > 0.75) {
        resolve("success!");
    } else {
        reject("failure!")
    };
});
```

> This one is the same, except it will wait 1000ms before completing.

```js
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => { 
        ok ? resolve("success") : reject("failure"); 
    }, 1000);
    const ok = Math.random() > 0.75;
});
```

For both resolve and reject, we can pass any data we want.
