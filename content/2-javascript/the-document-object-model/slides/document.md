---
title: The document API
type: slide
classes: [p-burger, even, both-gap]
---

The [document API] provides access to the current DOM.

> For example, we can access the [doctype], [document.head] or the [document.body] directly.

```js
const headElement = document.head;
const bodyElement = document.body;
const docType = document.doctype;
```

> We can grab specific parts of the document, for example [images], [links], [scripts] or [styleSheets].

```js
const images = document.images;
const links = document.links;
const scripts = document.scripts;
const stylesheets = document.styleSheets;
```

> In the browser, we can also access properties such as the [URL] and [title] of the document.

```js
const url = document.URL;
const title = document.title;
```

> The [location] property provides access to the [Location API] which can access the URL components and load related pages.

```js
const loc = document.location;
```

> The [createElement] method allows us to create new [HTMLElement] objects.

```js
const paragraph = document.createElement('p');
```

[document API]: https://developer.mozilla.org/en-US/docs/Web/API/Document
[document.head]: https://developer.mozilla.org/en-US/docs/Web/API/Document/head
[document.body]: https://developer.mozilla.org/en-US/docs/Web/API/Document/body
[doctype]: https://developer.mozilla.org/en-US/docs/Web/API/Document/doctype
[images]: https://developer.mozilla.org/en-US/docs/Web/API/Document/images
[links]: https://developer.mozilla.org/en-US/docs/Web/API/Document/links
[scripts]: https://developer.mozilla.org/en-US/docs/Web/API/Document/scripts
[styleSheets]: https://developer.mozilla.org/en-US/docs/Web/API/Document/styleSheets
[URL]: https://developer.mozilla.org/en-US/docs/Web/API/Document/URL
[title]: https://developer.mozilla.org/en-US/docs/Web/API/Document/title
[location]: https://developer.mozilla.org/en-US/docs/Web/API/Document/location
[Location API]: https://developer.mozilla.org/en-US/docs/Web/API/Location

[createElement]: https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
[HTMLElement]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement