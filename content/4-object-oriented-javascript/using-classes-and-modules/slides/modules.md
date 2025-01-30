---
type: slide
title: modules
classes: [p-burger, one-two, both-gap]
---

JavaScript modules allow the use of the [`import`] and [`export`] syntax.


> We must specify our script is a module like this.

```html {hl_lines=5}
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- etc -->
    <script type="module" src="main.js"></script>
</head>
<body></body>
</html>
```

> A function can be explicitly `export`ed from another module e.g. *picsum.js*.
This will typically deal with the details and expose a useful API.

```js {hl_lines=1}
export function randomImage(size) {
    const img = document.createElement('img');
    img.src = `https://picsum.photos/${size}`;
    img.alt = "A random picture from lorem picsum";
    return img;
}
```

> Our *main.js* module can then `import` the function from our *picsum.js* module.

```js {hl_lines=1}
import { randomImage } from "./picsum.js";
const img = randomImage(100);
document.body.append(img);
```


This allows us to move less important details out of our main module to other modules so we can focus on getting our high-level task done. 

[`import`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
[`export`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export