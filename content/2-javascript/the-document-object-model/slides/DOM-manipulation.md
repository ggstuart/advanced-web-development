---
title: Patterns of DOM Manipulation
type: slide
order: 51
classes: [one-two, p-burger, both-gap]
---

> We can grab an element and remove it or change its content. 

```js
document.querySelector('#this-element').remove();
document.querySelector('#that-element').textContent = "hello";
```

> We can loop over multiple elements.

```js
const paragraphs = document.querySelectorAll('p');
for (const p of paragraphs) {
    p.textContent = `${p.textContent} - modified`;
}
```

> We can also create new elements, compose them into complex structures and insert them into the DOM.<br><br>
This function is kept simple to save space, it has some serious limitations and flaws.<br><br>
For example, no `alt` attribute on the `<img>` and it should probably add a `class` to the `<article>`.
Also, it could handle multiple paragraphs.

```js
function myArticle(imageUrl, title, text) {
    const article = document.createElement('article');
    const img = document.createElement('img');
    const heading = document.createElement('h2');
    const p = document.createElement('p');
    img.src = imageUrl;
    heading.textContent = title;
    p.textContent = text;
    article.append(img, heading, p);
    return article;
}

const article = myArticle(
    'https://placecat.com/100/100', 
    "Article", 
    "This is an article."
)
document.body.append(article);
```