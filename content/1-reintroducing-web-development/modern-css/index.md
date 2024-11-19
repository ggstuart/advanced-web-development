---
title: Modern CSS features
type: exercise
weight: 30
---

In this exercise we will explore some important CSS features introduced more recently.
In particular, we will look at CSS nesting and `@container` queries.

<!--more-->

As an introductory exercise, we will take it slowly and build something step by step and include as many references as possible.
However, we will be assuming a level of familiarity.
> If you are confused then please refer back to [CTEC2712].


## Nesting

[CSS Nesting] was declared a newly available feature in 2023 and so can now safely be used in most cases.
Nesting can make the logic of a CSS file much easier to follow since rules can be placed logically in their proper context.

Let's create a simple example.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>CSS nesting and container queries</title>
</head>
<body>
    <header>
        <h1>CSS nesting and container queries</h1>
    </header>
    <main>
        <section>
            <h2>This is a section</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam placeat soluta totam reiciendis blanditiis labore?</p>
        </section>
    </main>
    <footer>
        <small>
            <p>CSS nesting and container queries</p>
        </small>
    </footer>
</body>
</html>
```

We have created a document with a linked CSS file.
Inside the `<body>` element we have added a basic page structure with a `<header>`, `<main>` and `<footer>`.
Inside the `<main>` we have added some content in a `<section>`.

Styling the page in the traditional way might look like this.

```css
body {
    margin: 0;
    background: hsl(100, 20%, 90%);
    color: hsl(100, 50%, 10%);
    font-family: system-ui;
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100dvh;
}

body>header,
body>footer,
body>main>section {
    padding-inline: 1rem;
}

body>main p {
    max-width: 70ch;
    line-height: 1.4;
}

body>header,
body>footer {
    background: hsl(100, 20%, 80%);
    display: flow-root;
}

body>footer {
    color: hsl(100, 20%, 30%);
    text-align: right;
}
```

> There is a lot to explain here.

The core change is to the layout.
We have set the minimum height of the `<body>` element to fill the viewport (line 8) and added a grid layout (line 6) which gives the `<main>` element any spare space (line 7) which pushes the `<footer>` element to the bottom of the viewport (when there is not enough content to fill the viewport).

> Notice we use [selector lists] to apply similar style rules to multiple selectors.
This ensures consistency.
We could alternatively use [custom properties] for this.

We have also set some default styles for the page, including colours and a font, we have overridden some box properties (`margin` and `padding-inline`) and we set the header and footer elements to `display: flow-root` to prevent any margins from overflowing.
There are also some tweaks to `<p>` elements inside the main content.

The result is pretty basic, but its good enough for our purposes.

{{<iframe src="examples/container-1" width="1000" height="400">}}{{</iframe>}}

We can now introduce nesting to create a block of CSS code which describes the `<body>` layout and default styles.
Notice that we have explicitly used the [child combinator] (`>`) in our selectors to target very specific elements in the document hierarchy.

Merging the code into a nested block is relatively simple and allows us to remove repeated selectors (such as `body`).
The following code has removed all but the main `body` selector and moved everything else inside it.

```css
body {
    margin: 0;
    background: hsl(100, 20%, 90%);
    color: hsl(100, 50%, 10%);
    font-family: system-ui;
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100dvh;
    
    >header,
    >footer,
    >main>section {
        padding-inline: 1rem;
    }
    
    >main p {
        max-width: 70ch;
        line-height: 1.4;
    }
    
    >header,
    >footer {
        background: hsl(100, 20%, 80%);
        display: flow-root;
    }
    
    >footer {
        color: hsl(100, 20%, 30%);
        text-align: right;
    }
}
```

Nothing has changed in the site. 
We still have identical styles.

This is our site on a small mobile device.

{{<iframe src="examples/container-1" width="360" height="600">}}{{</iframe>}}

## Creating a component

As another demonstration of CSS nesting and in preparation for a discussion of container queries, we will create a reusable component in our document.
That is, a chunk of structured HTML with associated CSS rules which we can use to insert content into our page.

The HTML for our component is simple. 
We will use a `<figure>` element, with an `<img>` and a `<figcaption>` for a small amount of content describing the image. In this case, we will add a few short paragraphs of text inside the caption.

Adding it into our page with a `class=my-component` attribute to allow us to style it without affecting any other `<figure>` elements.

```html {hl_lines="18-28"}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>CSS nesting and container queries</title>
</head>
<body>
    <header>
        <h1>CSS nesting and container queries</h1>
    </header>
    <main>
        <section>
            <h2>This is a section</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam placeat soluta totam reiciendis blanditiis labore?</p>
        </section>
        <section>
            <h2>This is our component</h2>
            <figure class="my-component">
                <img src="https://www.placecats.com/200/200" alt="a cat">
                <figcaption>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, porro.</p>
                    <p>Unde iusto asperiores excepturi, molestiae molestias inventore ad blanditiis non!</p>
                </figcaption>
            </figure>
            <p>It takes the full width of it's container.</p>
        </section>
    </main>
    <footer>
        <small>
            <p>CSS nesting and container queries</p>
        </small>
    </footer>
</body>
</html>
```

We can create another nested set of CSS rules to style our component.

```css {hl_lines="33-51"}
body {
    margin: 0;
    background: hsl(100, 20%, 90%);
    color: hsl(100, 50%, 10%);
    font-family: system-ui;
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100dvh;
    
    >header,
    >footer,
    >main>section {
        padding-inline: 1rem;
    }
    
    >main p {
        max-width: 70ch;
        line-height: 1.4;
    }
    
    >header,
    >footer {
        background: hsl(100, 20%, 80%);
        display: flow-root;
    }
    
    >footer {
        color: hsl(100, 20%, 30%);
        text-align: right;
    }
}

figure.my-component {
    margin: 0;
    background: white;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 0 5px 0 black;
    display: grid;
    grid-template-rows: 200px auto;

    >img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    >figcaption {
        padding-inline: 1rem;
    }
}
```

The component has been given a white background, a border radius (the `overflow: hidden` rule prevents the image corners from overflowing the figure) and a box shadow.
We also added a grid layout making the first row (the image) 200px high and allowing the second row to take its natural height.
We have specified that the image should cover the full width and height of its grid cell (with cropping allowed) and that the caption should have some padding.

The result is OK for narrow viewports.

{{<iframe src="examples/container-2" width="360" height="600">}}{{</iframe>}}

But when we widen the viewport, the component takes up the full width and this causes the image to grow wider and wider with no constraint.

{{<iframe src="examples/container-2" width="800" height="600">}}{{</iframe>}}

### A media query

We would prefer if the image was constrained and the caption moved to the right.
This can be achieved by a simple media query which can be nested inside our component CSS.

```css {hl_lines="52-55"}
body {
    margin: 0;
    background: hsl(100, 20%, 90%);
    color: hsl(100, 50%, 10%);
    font-family: system-ui;
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100dvh;
    
    >header,
    >footer,
    >main>section {
        padding-inline: 1rem;
    }
    
    >main p {
        max-width: 70ch;
        line-height: 1.4;
    }
    
    >header,
    >footer {
        background: hsl(100, 20%, 80%);
        display: flow-root;
    }
    
    >footer {
        color: hsl(100, 20%, 30%);
        text-align: right;
    }
}

figure.my-component {
    margin: 0;
    background: white;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 0 5px 0 black;
    display: grid;
    grid-template-rows: 200px auto;
    
    >img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    >figcaption {
        padding-inline: 1rem;
    }

    @media (width>400px) {
        grid-template-columns: 200px auto;
        grid-template-rows: auto;
    }
}
```

Now, if the viewport is under our 400px limit, we get the original layout.

{{<iframe src="examples/container-3" width="400" height="600">}}{{</iframe>}}

But in larger viewports, the layout changes to utilise the available width more effectively. 

{{<iframe src="examples/container-3" width="500" height="700">}}{{</iframe>}}

### Adding a grid

The problem with this approach is that it is not very flexible in terms of reusability.
What if we wanted to include multiple instances of our component in one page?

For example, let's add a new section with a grid of components.

> We are using `<ul>` and `<li>` elements to create the structure of the grid.
This is partly because it's a reasonable markup for a list of anything and partly because we want to add an extra layer (the `<li>` elements) into our markup for styling purposes.
Any structure would work here, for example, we could use a `<div>` rather than the `<ul>` and wrap our components in `<article>` elements.

```html {hl_lines="29-69"}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>CSS nesting and container queries</title>
</head>
<body>
    <header>
        <h1>CSS nesting and container queries</h1>
    </header>
    <main>
        <section>
            <h2>This is a section</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam placeat soluta totam reiciendis blanditiis labore?</p>
        </section>
        <section>
            <h2>This is our component</h2>
            <figure class="my-component">
                <img src="https://www.placecats.com/200/200" alt="a cat">
                <figcaption>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, porro.</p>
                    <p>Unde iusto asperiores excepturi, molestiae molestias inventore ad blanditiis non!</p>
                </figcaption>
            </figure>
            <p>It takes the full width of it's container.</p>
        </section>
        <section>
            <h2>Adding components into a grid</h2>
            <ul class="grid">
                <li>
                    <figure class="my-component">
                        <img src="https://www.placecats.com/230/230" alt="">
                        <figcaption>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, necessitatibus!</p>
                            <p>Animi delectus quibusdam repudiandae ex deserunt illo. Perspiciatis, dignissimos eius.</p>
                        </figcaption>
                    </figure>
                </li>
                <li>
                    <figure class="my-component">
                        <img src="https://www.placecats.com/230/230" alt="">
                        <figcaption>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, perferendis!</p>
                            <p>Est sapiente et, laboriosam perspiciatis laudantium harum? Pariatur, laudantium vitae?</p>
                        </figcaption>
                    </figure>
                </li>
                <li>
                    <figure class="my-component">
                        <img src="https://www.placecats.com/230/230" alt="">
                        <figcaption>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, natus.</p>
                            <p>Explicabo nemo repudiandae ad quis voluptates iusto ducimus labore fugit?</p>
                        </figcaption>
                    </figure>
                </li>
                <li>
                    <figure class="my-component">
                        <img src="https://www.placecats.com/230/230" alt="">
                        <figcaption>
                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur, fugit!</p>
                            <p>Nostrum consequuntur ab sunt ut minus alias quae perspiciatis magnam.</p>
                        </figcaption>
                    </figure>
                </li>
            </ul>
        </section>
    </main>
    <footer>
        <small>
            <p>CSS nesting and container queries</p>
        </small>
    </footer>
</body>
</html>
```

We need some basic styling to remove the defaults and to create a basic grid layout with gaps.

```css {hl_lines="33-38"}
body {
    margin: 0;
    background: hsl(100, 20%, 90%);
    color: hsl(100, 50%, 10%);
    font-family: system-ui;
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100dvh;
    
    >header,
    >footer,
    >main>section {
        padding-inline: 1rem;
    }
    
    >main p {
        max-width: 70ch;
        line-height: 1.4;
    }
    
    >header,
    >footer {
        background: hsl(100, 20%, 80%);
        display: flow-root;
    }
    
    >footer {
        color: hsl(100, 20%, 30%);
        text-align: right;
    }
}

ul.grid {
    padding: 0;
    list-style: none;
    display: grid;
    gap: 1rem;
}

figure.my-component {
    margin: 0;
    background: white;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 0 5px 0 black;
    display: grid;
    grid-template-rows: 200px auto;
    
    >img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    >figcaption {
        padding-inline: 1rem;
    }

    @media (width>400px) {
        grid-template-columns: 200px auto;
        grid-template-rows: auto;
    }
}
```

The result shows our components working well at small sizes. 

{{<iframe src="examples/container-4" width="400" height="700">}}{{</iframe>}}

They are also fine at larger sizes, expanding just as we planned.  

{{<iframe src="examples/container-4" width="700" height="700">}}{{</iframe>}}

### Media queries can be fragile

The problem occurs when we try to be more creative with the layout.
Let's try to break into two columns when there is room to do so.
We will restrict the first column to 300px and let the second column stretch to fill the space.

```css {hl_lines=["39-41", 45]}
body {
    margin: 0;
    background: hsl(100, 20%, 90%);
    color: hsl(100, 50%, 10%);
    font-family: system-ui;
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100dvh;
    
    >header,
    >footer,
    >main>section {
        padding-inline: 1rem;
    }
    
    >main p {
        max-width: 70ch;
        line-height: 1.4;
    }
    
    >header,
    >footer {
        background: hsl(100, 20%, 80%);
        display: flow-root;
    }
    
    >footer {
        color: hsl(100, 20%, 30%);
        text-align: right;
    }
}

ul.grid {
    padding: 0;
    list-style: none;
    display: grid;
    gap: 1rem;

    @media (width>400px) {
        grid-template-columns: 300px auto;
    }
}

figure.my-component {
    height: 100%
    margin: 0;
    background: white;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 0 5px 0 black;
    display: grid;
    grid-template-rows: 200px auto;
    
    >img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    >figcaption {
        padding-inline: 1rem;
    }

    @media (width>400px) {
        grid-template-columns: 200px auto;
        grid-template-rows: auto;
    }
}
```

> We also added `height: 100%` to ensure our components take up the full height of their container.

Now we can see the problem.
Due to our original media query, all the components are forced to have the same horizontal layout in viewports over 400px wide.

This is fine for the components in the wider column, they appear normal.
However, the components in the narrow column don't have enough room and so the captions are overflowing the figures.
Since we have `overflow: hidden` set on the figures, the content is simply lost.

{{<iframe src="examples/container-5" width="1000" height="700">}}{{</iframe>}}

> This is not good enough. 
Some users will not be able to read our content!

We can fix this with *container queries*.

## Container queries

The long-awaited [`@container` query] syntax became *newly available* in February 2023 and will be *widely available* in August 2025.

> This exercise was created in October 2024, so at the time of writing, `@container` was pretty new.

Similar to `@media` queries, `@container` queries are rules that allow developers to apply styles conditionally.
The main difference being that where `@media` queries apply styles based on viewport characteristics, `@container` queries apply styles based on an element's container.
The container is determined by checking all the element's parent elements in turn and finding the first one identified as a container.

So, we need to make two simple changes to our code.

1. We need to identify *containers* with `container-type: inline-size`.
1. We need to change the `@media` query to a `@container` query.

```css {hl_lines=["43-45", 68]}
body {
    margin: 0;
    background: hsl(100, 20%, 90%);
    color: hsl(100, 50%, 10%);
    font-family: system-ui;
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100dvh;
    
    >header,
    >footer,
    >main>section {
        padding-inline: 1rem;
    }
    
    >main p {
        max-width: 70ch;
        line-height: 1.4;
    }
    
    >header,
    >footer {
        background: hsl(100, 20%, 80%);
        display: flow-root;
    }
    
    >footer {
        color: hsl(100, 20%, 30%);
        text-align: right;
    }
}

ul.grid {
    padding: 0;
    list-style: none;
    display: grid;
    gap: 1rem;

    @media (width>400px) {
        grid-template-columns: 300px auto;
    }

    li {
        container-type: inline-size;
    }
}

figure.my-component {
    height: 100%;
    margin: 0;
    background: white;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 0 5px 0 black;
    display: grid;
    grid-template-rows: 200px auto;
    
    >img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    >figcaption {
        padding-inline: 1rem;
    }

    @container (width>400px) {
        grid-template-columns: 200px auto;
        grid-template-rows: auto;
    }
}
```

> Other container types are available, but are more complex and so are beyond the scope of this exercise.

Now we should see that our narrow components have the vertical layout whilst our wider components have the horizontal layout.
The container query is looking at the nearest container to decide whether it should be included.


{{<iframe src="examples/container-6" width="1000" height="700">}}{{</iframe>}}

Notice that the original component at the top doesn't have a container and so the conditional styles are not applied.
We can fix this by being more generic with our styling.

We can specify that any element which [:has()] a `figure.my-component` as a direct child, should be considered a *container*.

> The [:has()] pseudo-class was considered *newly available* in December 2023.
It allows for CSS selectors which look at parent elements.
In this case we are looking for direct parents.

This replaces the need to set the `li` elements to be containers since they are included in this more generic selector.

```css {hl_lines=["43-45", "48-49", 75]}
body {
    margin: 0;
    background: hsl(100, 20%, 90%);
    color: hsl(100, 50%, 10%);
    font-family: system-ui;
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100dvh;
    
    >header,
    >footer,
    >main>section {
        padding-inline: 1rem;
    }
    
    >main p {
        max-width: 70ch;
        line-height: 1.4;
    }
    
    >header,
    >footer {
        background: hsl(100, 20%, 80%);
        display: flow-root;
    }
    
    >footer {
        color: hsl(100, 20%, 30%);
        text-align: right;
    }
}

ul.grid {
    padding: 0;
    list-style: none;
    display: grid;
    gap: 1rem;

    @media (width>400px) {
        grid-template-columns: 300px auto;
    }




}

*:has(>figure.my-component) {
    container-type: inline-size;

    figure.my-component {
        height: 100%;
        margin: 0;
        background: white;
        border-radius: 5px;
        overflow: hidden;
        box-shadow: 0 0 5px 0 black;
        display: grid;
        grid-template-rows: 200px auto;
        
        >img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        >figcaption {
            padding-inline: 1rem;
        }

        @container (width>400px) {
            grid-template-columns: 200px auto;
            grid-template-rows: auto;
        }
    }
}

```

> This is nice, we can nest our component styles inside this new selector, keeping it all together.

Now each of our components has access to the conditional styles within the `@container` query.

{{<iframe src="examples/container-7" width="1000" height="700">}}{{</iframe>}}

## Stress testing our component

Now we have a self-contained component with a container query, we can insert our component into different parts of our page and it should adapt accordingly.
Let's mess around with the grid to see if we can make it work nicely.

First, we can try to arrange our four components into an interesting pattern.
We should see that the individual components adapt to the space they are given.

```css {hl_lines="39-62"}
body {
    margin: 0;
    background: hsl(100, 20%, 90%);
    color: hsl(100, 50%, 10%);
    font-family: system-ui;
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100dvh;
    
    >header,
    >footer,
    >main>section {
        padding-inline: 1rem;
    }
    
    >main p {
        max-width: 70ch;
        line-height: 1.4;
    }
    
    >header,
    >footer {
        background: hsl(100, 20%, 80%);
        display: flow-root;
    }
    
    >footer {
        color: hsl(100, 20%, 30%);
        text-align: right;
    }
}

ul.grid {
    padding: 0;
    list-style: none;
    display: grid;
    gap: 1rem;

    @media (width>450px) {
        grid-template-rows: auto auto auto;
        grid-template-columns: 1fr 1fr;

        li:first-of-type,
        li:last-of-type {
            grid-column: span 2;
        }
    }

    @media (width>600px) {
        grid-template-rows: auto 200px auto;
        grid-template-columns: auto 200px auto;

        li:nth-of-type(1),
        li:nth-of-type(4) {
            grid-column: span 2;
        }

        li:nth-of-type(2),
        li:nth-of-type(3) {
            grid-row: span 2;
        }
    }
}

*:has(>figure.my-component) {
    container-type: inline-size;

    figure.my-component {
        height: 100%;
        margin: 0;
        background: white;
        border-radius: 5px;
        overflow: hidden;
        box-shadow: 0 0 5px 0 black;
        display: grid;
        grid-template-rows: 200px auto;
        
        >img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    
        >figcaption {
            padding-inline: 1rem;
        }
    
        @container (width>400px) {
            grid-template-columns: 200px auto;
            grid-template-rows: auto;
        }
    }
}
```




> Notice that we have not modified the figure code. 
> This is only a change to the grid layout.
> Our figures will adapt to the context in which they are placed.
>
> The result is a flexible layout. 
> Our components are adapting nicely and can be viewd at any size.

{{<iframe src="examples/container-8" width="1000" height="1300">}}{{</iframe>}}


<script>
    const iframe = document.querySelector('iframe[src$="container-8"]');

    iframe.animate(
        [
            { width: "1000px" }, 
            { width: "400px", offset: .45 }, 
            { width: "400px", offset: .55 }, 
            { width: "1000px" }
        ],
        { duration: 10000, iterations: Infinity, }
    );
</script>


## Your turn

Spend some time playing with nesting and container queries.

1. Increase the list length to include 12 components.
1. Add an intrinsic layout to the grid.
1. Add `class="featured"` to a few of your `<figure>` elements.
1. Modify your grid to make items containing *featured* components span two columns.
1. Add more container queries to make your component even more adaptive.
1. In particular, try to reduce the height of narrow components by overlapping the image and caption. 
1. Consider how your media queries and container queries interact.

>This is what I made:


{{<iframe src="examples/container-9" width="1000" height="1300">}}{{</iframe>}}

<script>
    const container9 = document.querySelector('iframe[src$="container-9"]');
    
    container9.animate(
        [
            { width: "1000px" }, 
            { width: "320px", offset: .45 }, 
            { width: "320px", offset: .55 }, 
            { width: "1000px" }
        ],
        { duration: 15000, iterations: Infinity, }
    );
</script>







## Conclusions

We have introduced a few important new CSS features.

**Nesting CSS** is great. 
Our nested CSS is divided into three simple self-contained chunks.
1. The `body`
1. The `ul.grid`
1. The `figure.my-compoonent`

Each chunk is clearly identifiable and there are no loose style rules to confuse us.
Each nested rule is intimately connected with its context, helping us to avoid confusion. 

**Container queries** are a powerful and flexible new tool.
They don't replace media queries but create a new capapbility to design self-contained components that can respond to their context.


### References



- [CTEC2712]
- [CSS Nesting]
- [child combinator]
- [selector lists]
- [custom properties]
- [`@container` query]
- [:has()]


[CTEC2712]: https://ggstuart.github.io/web-application-development/
[CSS Nesting]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting/Using_CSS_nesting
[child combinator]: https://developer.mozilla.org/en-US/docs/Web/CSS/Child_combinator
[selector lists]: https://developer.mozilla.org/en-US/docs/Web/CSS/Selector_list
[custom properties]: https://developer.mozilla.org/en-US/docs/Web/CSS/--*
[`@container` query]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries
[:has()]: https://developer.mozilla.org/en-US/docs/Web/CSS/:has