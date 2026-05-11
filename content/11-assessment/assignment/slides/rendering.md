---
type: slide
title: Server-side rendering vs client-side updates
classes: [burger, gap, even]
---

> Compare server-side rendering (view functions returning HTML strings) with asynchronous client-side updates (fetch API, JSON responses, DOM manipulation).
Explain the pros and cons of each approach with clear, practical examples.

```js {class="small"}
const itemToHTML = (item) => `
<li>
    <span class="label">${item.label}</span>
    <form method="POST" action="/items/${item.id}/delete">
        <button>&times;</button>
    </form>
</li>`;



export function itemList(items) {
    const listItems = items.map(itemToHTML);
    return `
    <section aria-labelledby="item-heading">
        <h2 id="item-heading">Items</h2>
        <ul>${listItems.join("")}</ul>
    </section>`;
}
```

```js {class="small"}
form.addEventListener("submit", async ev => {
    ev.preventDefault();
    const formData = new FormData(form);

    const response = await fetch("/api/items", {
        headers: {"content-type": "application/json"},
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData.entries()))
    });

    if (response.ok) {        
        const item = await response.json();
        list.insertAdjacentHTML('beforeend', itemToHTML(item));
        form.reset();
    }
});
```

> This is about generating HTML.
Your application should include examples of both server-side rendering and client-side rendering. 
Demonstrate the basics of each approach and give us your opinion.
Make sure you comment on modern approaches.
This one may require a bit of research.