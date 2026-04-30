---
type: slide
title: More complex requests
---

> By default, fetch makes a GET request with no body.

```js {hl_lines="5-8"}
form.addEventListener("submit", async ev => {
    ev.preventDefault();
    const formData = new FormData(form);

    const response = await fetch("/api/items", {
        method: "POST",
        body: formData
    });

    if (response.ok) {        
        const item = await response.json();
        list.insertAdjacentHTML('beforeend', `<li>
        <span class="label">${item.label}</span>
            <span>Due ${new Date(item.due_date).toLocaleDateString("en-gb", fmt)}</span>
            <form method="POST" action="/items/${item.id}/delete"><button>&times;</button></form>
        </li>`);
        form.reset();
    }

});
```
> More complex requests can be submitted by passing an options object.