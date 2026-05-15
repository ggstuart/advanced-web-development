---
title: grid properties
type: slide
order: 9
classes: [css-grid]
---

`grid-template-columns` determines the number and type of columns.

```css
body {
    grid-template-columns: 1fr;
};    
```

{{<iframe src="examples/grid/1.html" width="600" height="200">}}{{</iframe>}}

```css
body {
    grid-template-columns: 1fr 1fr;
};    
```

{{<iframe src="examples/grid/2.html" width="600" height="200">}}{{</iframe>}}

```css
body {
    grid-template-columns: 1fr 4fr 1fr;
    grid-template-rows: 1fr 2fr 2fr 1fr;
}    
```

{{<iframe src="examples/grid/3.html" width="600" height="200">}}{{</iframe>}}

```css
body {
    grid-template-columns: 1fr 10% 2fr 2em;
    grid-template-rows: 1fr auto 2fr;
};    
```

{{<iframe src="examples/grid/4.html" width="600" height="200">}}{{</iframe>}}

`grid-template-rows` determines the number and type of rows.
