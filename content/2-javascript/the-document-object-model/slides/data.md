---
type: slide
title: Convert data into nodes
classes: [even, p-burger, both-gap]
---

Code can be used to render data into HTML.

```js
const data = {
    HTML: "content",
    CSS: "presentation",
    JS: "behaviour"
}
```

<blockquote>
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
</blockquote>


```js
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
