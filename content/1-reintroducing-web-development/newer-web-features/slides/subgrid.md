---
type: slide
title: CSS Subgrid
classes: [even, small-code]
---


```HTML
<div class="parent">
    <div class="child">
        <img src="https://www.placecats.com/neo/200/200">
        <p>Child 1</p>
    </div>
    <div class="child">
        <p>Child 2</p>
        <img src="https://www.placecats.com/millie/200/200">
    </div>
    <div class="child">
        <img src="https://www.placecats.com/bella/200/200">
        <p>Child 3 wraps</p>
    </div>
</div>
```

```CSS
.parent {
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px min-content 100px;
    place-content: center;
    gap: 0 1rem;
    .child {
        grid-row: span 2;
        display: grid;
        grid-template-rows: subgrid;
        &:nth-child(2) {
            grid-column: 2;
            grid-row: 2 / span 2;
        }
    }
}
```

> Subgrid allows nested grids to inherit rows and columns from their parent grid.

<div class="parent">
    <div class="child">
        <img src="https://www.placecats.com/neo/200/200">
        <p>Child 1</p>
    </div>
    <div class="child">
        <p>Child 2</p>
        <img src="https://www.placecats.com/millie/200/200">
    </div>
    <div class="child">
        <img src="https://www.placecats.com/bella/200/200">
        <p>Child 3 wraps</p>
    </div>
</div>

<style>
    .parent {
        display: grid;
        grid-template-columns: 100px 100px 100px;
        grid-template-rows: 100px min-content 100px;
        place-content: center;
        gap: 0 1rem;
        .child {
            background: black;
            border: 2px solid black;
            color: white;
            border-radius: 0.5rem;
            overflow: hidden;
            grid-row: span 2;
            display: grid;
            grid-template-rows: subgrid;
            &:nth-child(2) {
                grid-column: 2;
                grid-row: 2 / span 2;
            }
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            p {
                margin: 0.5rem 0;
            }
        }
    }
</style>