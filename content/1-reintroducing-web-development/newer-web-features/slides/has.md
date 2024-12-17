---
type: slide
title: :has
classes: [has, block-burger]
---

> The `:has` pseudo-class allows you to select elements based on their content.

<div class="example1">
    <label>Control a parent based on child</label>
    <input type="checkbox">
</div>

```css
:has(input:checked) {
    background-color: red;
}
```

<div class="example2">
    <button>Activate</button>
</div>

```css
:has(button:active)) {
    background-color: red;
}
```

> This allows for some nice design features. 



<style>
.example1, .example2 {
    button {
        font-size: inherit;
    }
}
.example1:has(input:checked) {
    background-color: red;
}
.example2:has(button:active) {
    background-color: red;
}
</style>