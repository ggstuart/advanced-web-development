---
type: slide
title: async/await
classes: [two-three, block-burger, both-gap]
---

> The [`async`] / [`await`] syntax was introduced in ECMAScript 2017.
It allows for a more natural style of asynchronous code.

The `await` keyword allows us to wait for a promise to resolve and returns the result.
It effectively converts asynchronous code back into synchronous code.


```js
const url = 'https://www.swapi.tech/api/';

const response = await fetch(url);
const data = await response.json();
console.log(data);
```


We can use `await` at the top-level of a module or in a function declared as `async`.
These functions always return a promise.
They can be used to convert synchronous code into asynchronous code.

```js
async function getJSON(url) {
    const response = await fetch(url);
    return response.json();
}

getJSON('https://www.swapi.tech/api/').then(console.log);
```

> Awaiting causes *blocking*.
Our code has to wait for the request to return a response.
Creating `async` functions allows us to easily wrap complex processes in non-blocking promises.

[`async`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
[`await`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await