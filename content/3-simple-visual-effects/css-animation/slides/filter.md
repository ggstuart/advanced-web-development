---
type: slide
title: filters
---

> We can also apply CSS filters to change how elements appear.

```css
fieldset:has(input[value="blur"]:checked) + img { filter: blur(5px); }
```

<div class="demo filter">
    <fieldset>
        <label>
            <code>none</code>
            <input type="radio" name="filter" value="none">
        </label>
        <label>
            <code>blur(5px)</code>
            <input type="radio" name="filter" value="blur">
        </label>
        <label>
            <code>brightness(1.4)</code>
            <input type="radio" name="filter" value="brightness">
        </label>
        <label>
            <code>contrast(200%)</code>
            <input type="radio" name="filter" value="contrast">
        </label>
        <label>
            <code>drop-shadow(0 0 20px black)</code>
            <input type="radio" name="filter" value="drop-shadow">
        </label>
        <label>
            <code>grayscale(100%)</code>
            <input type="radio" name="filter" value="grayscale">
        </label>
        <label>
            <code>hue-rotate(90deg)</code>
            <input type="radio" name="filter" value="hue-rotate">
        </label>
        <label>
            <code>invert(100%)</code>
            <input type="radio" name="filter" value="invert">
        </label>
        <label>
            <code>opacity(25%)</code>
            <input type="radio" name="filter" value="opacity">
        </label>
        <label>
           <code>saturate(10%)</code>
            <input type="radio" name="filter" value="saturate">
        </label>
        <label>
            <code>sepia(100%)</code>
            <input type="radio" name="filter" value="sepia">
        </label>
    </fieldset>
    <img src="https://picsum.photos/id/71/1200/600">
</div>

<style>
.demo.filter {
    display: grid;
    /* gap: 1rem; */
    padding: 1rem;
    grid-template-columns: max-content 1fr;
    
    > img {
        width: 100%;
        height: 100%;        
        transition: 1300ms;
        margin: 0;
    }

    fieldset {
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 1px;
        padding: 0;

        label {
            background: #ddd;
            display: grid;
            grid-column: span 2;
            grid-template-columns: subgrid;
            padding: 0.25rem 0.5rem;
            &:hover { 
                filter: brightness(1.05);
            }
        }
        code {
            font-size: 0.9em;
            align-content: center;
            text-align: right;
        }
    }
    fieldset + img { transition: 1000ms; }
    fieldset:has(input[value="blur"]:checked) + img { filter: blur(5px); } 
    fieldset:has(input[value="brightness"]:checked) + img { filter: brightness(1.4); } 
    fieldset:has(input[value="contrast"]:checked) + img { filter: blur(5px); } 
    fieldset:has(input[value="contrast"]:checked) + img { filter: contrast(200%); } 
    fieldset:has(input[value="drop-shadow"]:checked) + img { filter: drop-shadow(0 0 20px black); } 
    fieldset:has(input[value="grayscale"]:checked) + img { filter: grayscale(100%); } 
    fieldset:has(input[value="hue-rotate"]:checked) + img { filter: hue-rotate(90deg); } 
    fieldset:has(input[value="invert"]:checked) + img { filter: invert(100%); } 
    fieldset:has(input[value="opacity"]:checked) + img { filter: opacity(25%); } 
    fieldset:has(input[value="saturate"]:checked) + img { filter: saturate(10%); } 
    fieldset:has(input[value="sepia"]:checked) + img { filter: sepia(100%); } 


}
</style>