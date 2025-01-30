---
type: slide
title: chaining promises
classes: [even, p-burger, both-gap]
---

Working with promises can be confusing.

> When a promise resolves to something which generates another promise the code becomes increasingly nested.

> However, since [`Promise.then()`] returns a Promise object, we can *chain* promises together.

```js
const url = 'https://www.swapi.tech/api/';

fetch(url).then(response => {
    response.text().then(data => {
        console.log(data);
    });
});
```

```js
const url = 'https://www.swapi.tech/api/';

fetch(url).then(response => {
    return response.text();
}).then(text => {
    console.log(text);
})
```

> *Nested* promises lead to confusing code.

> *Chaining* promises like this keeps the code flat and is easier to follow.

Even using chaining like this is still confusing.

[`Promise.then()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then