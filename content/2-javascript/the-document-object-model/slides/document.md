---
title: The document API
type: slide
classes: [p-burger, three-two, both-gap]
---

The [document API] provides access to the current DOM.

> We can grab specific parts of the document, for example the [`doctype`], [`head`] or the [`body`].
> In the browser, we can also access properties such as the [`URL`] and [`title`] of the document.


```js
const headElement = document.head;
const bodyElement = document.body;
const docType = document.doctype;
const url = document.URL;
const title = document.title;
```

> Element types such as [`images`], [`links`], [`scripts`] or [`styleSheets`] can be grabbed easily.

```js
const images = document.images;
const links = document.links;
const scripts = document.scripts;
const stylesheets = document.styleSheets;
```


> Accessing [HTMLElement] objects from the DOM can be done in many ways.

```js
document.getElementById('my-id');
document.getElementByTagName('div');
document.getElementByClassName('my-class');
```

> [createElement] allows us to create new elements.
> All elements support the [appendChild] method, inherited from the [Node API].

```js
const p = document.createElement('p');
document.body.appendChild(p);
```

> Multiple elements can be appended using the [append] method, inherited from [Element].

```js
const p1 = document.createElement('p');
const p2 = document.createElement('p');
document.body.append(p1, p2);
```

[document API]: https://developer.mozilla.org/en-US/docs/Web/API/Document
[`head`]: https://developer.mozilla.org/en-US/docs/Web/API/Document/head
[`body`]: https://developer.mozilla.org/en-US/docs/Web/API/Document/body
[`doctype`]: https://developer.mozilla.org/en-US/docs/Web/API/Document/doctype
[`images`]: https://developer.mozilla.org/en-US/docs/Web/API/Document/images
[`links`]: https://developer.mozilla.org/en-US/docs/Web/API/Document/links
[`scripts`]: https://developer.mozilla.org/en-US/docs/Web/API/Document/scripts
[`styleSheets`]: https://developer.mozilla.org/en-US/docs/Web/API/Document/styleSheets
[`URL`]: https://developer.mozilla.org/en-US/docs/Web/API/Document/URL
[`title`]: https://developer.mozilla.org/en-US/docs/Web/API/Document/title

[createElement]: https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
[HTMLElement]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
[Element]: https://developer.mozilla.org/en-US/docs/Web/API/Element
[append]: https://developer.mozilla.org/en-US/docs/Web/API/Element/append

[node API]: https://developer.mozilla.org/en-US/docs/Web/API/Node
[appendChild]: https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild