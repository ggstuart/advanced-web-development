---
title: Strings
type: slide
order: 9
classes: [even, p-burger, h-gap]
---

[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) *literals* are specified by single or double quotes.

```js
const code = "CTEC3705";
const name = "Advanced Web Development";
```

> Basic string manipulation can be achieved with *concatenation*, though it is annoying and difficult to read.

```js
const concatenation = "Welcome to " + code + ": " + name;
```

> String *interpolation* with template literals uses backticks and expressions can be included with a dollar sign and curly braces. 

```js
const interpolation = `Welcome to ${code}: ${name}`;
```
> String interpolation is intuitive and elegant as well as faster and better, so use it..

Strings have loads of useful methods like 
[`includes`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes),
[`replace`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace),
[`trim`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim) and
[`split`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split).