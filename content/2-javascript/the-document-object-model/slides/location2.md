---
title: The location API
type: slide
classes: [p-burger, even, both-gap]
---

The [Location API] can also be used to load pages.

> Reload the current page
```js
location.reload();
```

> Modify a component
```js
location.search = '?slide=8';
```

> Load a given page, *with* the current page added to history.
```js
location.assign('https://www.github.com');
```

> Load a given page, *without* the current page added to history.
```js
location.replace('https://www.github.com');
```

Executing code like this when the page loads doesn't make any sense.
**We need to use events**.

[Location API]: https://developer.mozilla.org/en-US/docs/Web/API/Location
