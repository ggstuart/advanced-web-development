---
title: Basic loops
type: slide
order: 12
classes: [one-two, h-gap]
---

> Similar to Java or C, for loops allow things to be repeated a number of times.

```js
// A classic loop style
// you should probably never do this

for(let i=0; i<10; i++) {
    console.log(i);
}
```

> A while loop will only execute while a condition is met.

```js
// the block is never executed
// the string is left unchanged

s = "hello world"

while(s.length < 10) {
  s = `${s}!` 
}
```

> A do...while loop will always execute once before the condition is checked.

```js
// we add one exclamation mark
// and the condition fails first time

s = "hello world"

do {
  s = `${s}!`             
} while (s.length < 10) 
```