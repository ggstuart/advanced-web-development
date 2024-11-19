---
type: slide
title: CSS Nesting
---


> A long-awaited upgrade to CSS is the ability to nest rulesets.

```CSS
ul.flexy {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.25rem;
    background: black;
}
ul.flexy li {
    padding: 0.5rem;
    background: white;
}
ul.flexy li:nth-child(3) {
    background: red;
    color: white;
}
ul.flexy :nth-child(2) {
    background: blue;
    color: red;
}

```
```CSS
ul.flexy {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.25rem;
    background: black;
    li {
        padding: 0.5rem;
        background: white;
        &:nth-child(3) {
            background: red;
            color: white;
        }
    }
    :nth-child(2) {
        background: blue;
        color: red;
    }
}

```
<ul class="flexy">
    <li>Item</li>
    <li>Item</li>
    <li>Item</li>
    <li>Item</li>
</ul>

>By default, the *child selector* (` `) is assumed. 
For pseudo-classes, pseudo-elements and similar, the *nesting selector* (`&`) can be used.


<style>
.content:has(ul.flexy) {
    grid-template-rows: min-content 1fr min-content auto;
    grid-template-columns: 1fr 1fr;
    :not(.highlight) {
        grid-column: span 2;
    }
}
ul.flexy {
    list-style: none;
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.25rem;
    background: black;
    li {
        background: white;
        padding: 0.25rem 1rem;
        border-radius: 1rem;
        &:nth-child(3) {
            background: red;
            color: white;
        }
    }
    :nth-child(2) {
        background: blue;
        color: red;
    }
}

</style>