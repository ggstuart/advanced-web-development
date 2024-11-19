---
type: slide
title: The Node API
classes: [even, block-burger, p-burger]
---

> Both the [document API] object and all [element API] objects inherit functionality from the [node API].

```js
const data = {
    HTML: "content",
    CSS: "presentation",
    JS: "behaviour"
}

const myList = document.createElement('ol');
for (const key in data) {
    const item = document.createElement('li');
    const language = document.createElement('strong');
    const purpose = document.createElement('em');
    const text = document.createElement('span');
    language.textContent = key;
    text.textContent = 'is for';    
    purpose.textContent = data[key];
    item.appendChild(language);
    item.appendChild(text);
    item.appendChild(purpose);
    myList.appendChild(item);
}
```
```html
<ol>
    <li>
        <strong>HTML</strong>
        <span>is for</span>
        <em>content</em>
    </li>
    <li>
        <strong>CSS</strong>
        <span>is for</span>
        <em>presentation</em>
        </li>
    <li>
        <strong>JS</strong>
        <span>is for</span>
        <em>behaviour</em>
    </li>
</ol>
```

[document API]: https://developer.mozilla.org/en-US/docs/Web/API/Document
[element API]: https://developer.mozilla.org/en-US/docs/Web/API/Element
[node API]: https://developer.mozilla.org/en-US/docs/Web/API/Node