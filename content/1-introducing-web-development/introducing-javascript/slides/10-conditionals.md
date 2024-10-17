---
title: Conditionals
type: slide
order: 10
classes: []
---

> Use [`if...else`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) to execute a block conditionally.

```js
if(a > 10) {
    console.log("maximum reached!")
}
```

> Here we check the value of the `location` object to inspect the URL of the current requested page.

```js
if(location.protocol == "http:") {
    alert("Plain HyperText Transfer Protocol!");
} else {
    console.log("HyperText Transfer Protocol (Secure)!");
}
```

> Whatever you pass into the `if` clause will be converted to boolean.
> The `else` clause is optional.
> Further `else if()` clauses can be added before the final `else`.