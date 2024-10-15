---
title: Declaring variables - scope
type: slide
order: 35
classes: [even, scope]
---

> Use `const` by default. If you need reassignment, use `let`.

> Before ECMAScript 2015, all variables were declared using `var` and globally scoped.

```js
// DON'T USE var!!
var a = 1; 
```

Globally-scoped and reassignable - DON'T DO IT!

> ECMAScript 2015 introduced a better, block-scoped variable.

```js
// let is MUCH BETTER!
let b = 1; 
```

Block-scoped and reassignable - THIS IS FINE WHEN NEEDED

> as well as a more restricted constant variable.

```js
// const is the BEST!
const c = 1;
```


Block-scoped and not reassignable - USE THIS BY DEFAULT 
