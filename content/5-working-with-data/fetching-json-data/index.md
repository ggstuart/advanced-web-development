---
type: exercise
title: Fetching JSON data
author: Dr Graeme Stuart
---

In this exercise we will demonstrate using the `fetch` API to make HTTP requests.

<!--more-->

Our JavaScript code will trigger HTTP requests to load data from *JSON* files.

## Using a previous example

We will start by taking the final example from the [modern css exercise]({{< ref "/1-reintroducing-web-development/modern-css" >}}).
We want to convert the example into a data-driven page, which loads data from a *JSON* file and builds a page from the data using JavaScript.

The original web page looks like this.

{{<iframe src="examples/container-9" width="1000" height="1200">}}{{</iframe>}}

This is the <a href="examples/container-9/index.html" download="index.html">original HTML document</a>.
We will remove most of this.

```HTML
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
                    <figure class="my-component featured">
                        <img src="https://www.placecats.com/220/220" alt="a cat">
                        <figcaption>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, dolore.</p>
                            <p>Architecto reiciendis velit illo provident at aperiam quis officia accusamus?</p>
                        </figcaption>
                    </figure>
                </li>
                <li>
                    <figure class="my-component">
                        <img src="https://www.placecats.com/220/220" alt="a cat">
                        <figcaption>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, quia!</p>
                            <p>Non, delectus? Enim temporibus unde recusandae ad est eos quasi.</p>
                        </figcaption>
                    </figure>
                </li>
                <li>
                    <figure class="my-component">
                        <img src="https://www.placecats.com/220/220" alt="a cat">
                        <figcaption>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptate, esse.</p>
                            <p>Alias ipsa tempora beatae a libero necessitatibus illum quae reprehenderit.</p>
                        </figcaption>
                    </figure>
                </li>
                <li>
                    <figure class="my-component">
                        <img src="https://www.placecats.com/220/220" alt="a cat">
                        <figcaption>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed, fugiat?</p>
                            <p>Neque, perferendis? Consequatur illo dolores laborum labore iusto amet. Totam.</p>
                        </figcaption>
                    </figure>
                </li>
                <li>
                    <figure class="my-component">
                        <img src="https://www.placecats.com/220/220" alt="a cat">
                        <figcaption>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, soluta.</p>
                            <p>Molestiae, quisquam illum numquam quasi provident suscipit natus reprehenderit excepturi.</p>
                        </figcaption>
                    </figure>
                </li>
                <li>
                    <figure class="my-component">
                        <img src="https://www.placecats.com/220/220" alt="a cat">
                        <figcaption>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda, veniam?</p>
                            <p>Amet itaque deserunt commodi tempore fuga reiciendis dolores earum corporis!</p>
                        </figcaption>
                    </figure>
                </li>
                <li>
                    <figure class="my-component featured">
                        <img src="https://www.placecats.com/220/220" alt="a cat">
                        <figcaption>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, id.</p>
                            <p>Consectetur omnis commodi, ex doloribus alias deleniti non ad consequuntur?</p>
                        </figcaption>
                    </figure>
                </li>
                <li>
                    <figure class="my-component">
                        <img src="https://www.placecats.com/320/320" alt="a cat">
                        <figcaption>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem, et!</p>
                            <p>Cum, eos! Tenetur magni, molestias accusantium velit nobis ab consequatur.</p>
                        </figcaption>
                    </figure>
                </li>
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
                    <figure class="my-component featured">
                        <img src="https://www.placecats.com/230/230" alt="">
                        <figcaption>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, perferendis!</p>
                            <p>Est sapiente et, laboriosam perspiciatis laudantium harum? Pariatur, laudantium vitae?</p>
                        </figcaption>
                    </figure>
                </li>
                <li>
                    <figure class="my-component">
                        <img src="https://www.placecats.com/330/230" alt="">
                        <figcaption>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, natus.</p>
                            <p>Explicabo nemo repudiandae ad quis voluptates iusto ducimus labore fugit?</p>
                        </figcaption>
                    </figure>
                </li>
                <li>
                    <figure class="my-component">
                        <img src="https://www.placecats.com/230/330" alt="">
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

The <a href="examples/container-9/style.css" download="index.html">original CSS</a> looks like this.

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

ul.grid {
    padding: 0;
    list-style: none;
    display: grid;
    gap: 2rem;
    grid-auto-flow: dense;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));

    @media (width>600px) {
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    }

    @media (width>900px) {
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }

    li:has(.featured) {
        border-radius: 5px;
        outline: 5px solid hsl(100, 20%, 30%);
        @media (width>358px) {
            grid-column: span 2;
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
        font-size: 0.9em;
        display: grid;

        grid-template-columns: 60px 1fr;
        grid-template-rows: auto;

        >img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            /* object-position: top; */
            aspect-ratio: 1;
        }
    
        >figcaption {
            padding-inline: 1rem;
            display: grid;
            place-content: center;
            p { margin-block: 0.25rem; }
        }

        @container (width<300px) {
            grid-template-rows: auto;
            grid-template-columns: auto;

            >img {
                grid-column: 1;
                grid-row: 1;
                aspect-ratio: 2;
            }

            >figcaption {
                grid-column: 1;
                grid-row: 1;
                backdrop-filter: brightness(0.5) contrast(0.7);
                color: white;
                text-align: center;
                padding-inline: 0.5rem;
            }
        }

        @container (width>=350px) {
            grid-template-columns: 100px 1fr;
        }

        @container (width>=400px) {
            grid-template-columns: 150px 1fr;
        }

        @container (width>=450px) {
            grid-template-columns: 250px 1fr;
            > img { aspect-ratio: 1.3; }
        }

        @container (width>=600px) {
            font-size: 1.2em;
            >figcaption { padding-inline: 2rem; }
        }

        @container (width>=800px) {
            grid-template-columns: 400px 1fr;
            font-size: 1.6em;

            >figcaption {
                padding-inline: 2rem;
            }
        }

        @container (width>=1000px) {
            grid-template-columns: 500px 1fr;
            font-size: 2em;

            >figcaption {
                padding-inline: 2rem;
            }
        }
    }
}
```

### Cutting out the content

The original document contains many examples of the component we designed in the previous exercise.
Each component contains an image and some simple content.

>This is the important structure.
>```html {linenos=false}
><figure class="my-component">
>    <img src="https://www.placecats.com/200/200" alt="a cat">
>    <figcaption>
>        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, porro.</p>
>        <p>Unde iusto asperiores excepturi, molestiae molestias inventore ad blanditiis non!</p>
>    </figcaption>
></figure>
>```
>Each of the components contains a `figure.my-component` element with an `img` and a `figcaption`.

Now we need to remove all the content because we want to load the content from a file and build it dynamically.
Strip back the HTML to this.

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
            <h2>This will be a list of components</h2>
            <ul class="grid">
            </ul>
        </section>
    </main>
    <footer>
        <small>
            <p>Using fetch to load data</p>
        </small>
    </footer>
</body>
</html>
```

Now, we can add a script to insert new content into the list.
We can also update the page content a little and add an `id` attribute to the list.

```html {hl_lines=["7-8", 12, 17, 23]}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Fetch</title>
    <script type="module" src="fetch.js"></script>
</head>
<body>
    <header>
        <h1>Using fetch to load data</h1>
    </header>
    <main>
        <section>
            <h2>This will be a list of components</h2>
            <ul id="target" class="grid">
            </ul>
        </section>
    </main>
    <footer>
        <small>
            <p>Using fetch to load data</p>
        </small>
    </footer>
</body>
</html>
```

## Building components

We can build out the necessary structure in a simple procedural way, creating all the necessary elements and setting their attributes as necessary.

For this, we will need to:
- create an `<img>` element 
- Create some content, e.g. a heading and a paragraph
- create a `<figure>` element and a `<figcaption>` element
- insert the content into the `<figcaption>`
- insert the `<img>` and `<figcaption>` into the `<figure>`
- add the `my-component` class to the `<figure>`

To add the figure into our page we need to:
- find the `<ul id="target" class="grid">` element
- insert a new `<li>` element into it
- add the `<figure>` to the `<li>` element.

We know how to do all of this with JavaScript.

> Add the following code to the file *fetch.js*.

```js
// Create an image
const img = document.createElement('img');
img.src = `https://picsum.photos/id/100/1000`;

// Create some content
const heading = document.createElement('h2');
const paragraph = document.createElement('p');
heading.textContent = "this is a heading";
paragraph.textContent = "this is a paragraph";

// Build the figure
const figure = document.createElement('figure');
const caption = document.createElement('figcaption');
caption.append(heading, paragraph);
figure.append(img, caption);
figure.classList.add('my-component');

// Add the new component to our list
const target = document.querySelector('#target');
const li = document.createElement('li');
li.append(figure);
target.append(li);
```

The broad steps involved are indicated by the comments.
We create an image, create some content, build the figure and add the new component to our list.
Some of these steps define the structure of the component and will be the same for each component we want to build.
Other steps are specific to individual components as they involve data.

The result is a component that is correctly styled, taking up the full width of our list.

{{<iframe src="examples/fetch-1" width="1000" height="600">}}{{</iframe>}}   

### Extracting reusable functions

We will now restructure our code to move the more generic steps into reusable functions.
For example, creating the `<figure>` and `<figcaption>` elements and inserting the image and content in the correct place.

> This will allow us to focus on data handling.
Eventually, the data involved will need to be read from our *JSON* file. 

We will begin by extracting a simple function that will construct a figure from a provided image and content.

```js {hl_lines=["1-7", 20]}
function createFigure(img, content) {
    const figure = document.createElement('figure');
    const caption = document.createElement('figcaption');
    caption.append(...content);
    figure.append(img, caption);
    return figure
}

// Create an image
const img = document.createElement('img');
img.src = `https://picsum.photos/id/100/1000`;

// Create some content
const heading = document.createElement('h2');
const paragraph = document.createElement('p');
heading.textContent = "this is a heading";
paragraph.textContent = "this is a paragraph";

// Build the figure
const figure = createFigure(img, [heading, paragraph]);
figure.classList.add('my-component');

// Add the new component to our list
const target = document.querySelector('#target');
const li = document.createElement('li');
li.append(figure);
target.append(li);
```

The function should be self-explanatory.
It creates elements for the figure and caption, builds the necessary structure and returns the figure.
The steps we have extracted into our function are the same for every figure and our function doesn't need to know anything about the content.

> One thing to notice is that we use the [spread syntax] on line 4.
This implies that the `content` argument should be an array of elements.
We pass in the array on line 20.

You should see the result is unchanged but our code is moving in the direction of being reusable.

### Considering a file format

Let's pull our data together into a form we can easily load from a *JSON* file.
A simple object with keys for the picsum image id, the title of the component (which we will add as a heading) and some content (which we will add as a paragraph).

```js {linenos=false}
const data = {
    picsumId: 50,
    title: "This is an example",
    description: "A simple example to demonstrate the principle"
};
```

> Rather than storing image urls, we have decided to store id's for the lorem picsum system.
> This keeps the data simple and avoids duplication, but it also makes the system less flexible, relying on lorem picsum for all images.
We could just have easily decided to store the full url of the image in the file.

We can update our code as follows to use the data from our object.

```js {hl_lines=["9-13", "15-19", 22, "27-28"]}
function createFigure(img, content) {
    const figure = document.createElement('figure');
    const caption = document.createElement('figcaption');
    caption.append(...content);
    figure.append(img, caption);
    return figure
}

function picsumImg(id, size) {
    const img = document.createElement('img');
    img.src = `https://picsum.photos/id/${id}/${size}`;
    return img;
}

const data = {
    picsumId: 55,
    title: "This is an example",
    description: "A simple example to demonstrate the principle"
};

// Create an image
const img = picsumImg(data.picsumId, 1000);

// Create some content
const heading = document.createElement('h2');
const paragraph = document.createElement('p');
heading.textContent = data.title;
paragraph.textContent = data.description;

// Build the figure
const figure = createFigure(img, [heading, paragraph]);
figure.classList.add('my-component');

// Add the new component to our list
const target = document.querySelector('#target');
const li = document.createElement('li');
li.append(figure);
target.append(li);
```

We have extracted the logic for the image `src` attribute into the `picsumImg()` function to create images from an id and a size. 
We also now take the content for our `<h2>` and `<p>` elements from our data structure.

{{<iframe src="examples/fetch-3" width="1000" height="600">}}{{</iframe>}}   

### Make it a one-liner

Now we can finish the refactoring process to make the creation of a component a simple function call where we can pass our data structure directly to the function.

```js {hl_lines=["15-24", "32-33"]}
function createFigure(img, content) {
    const figure = document.createElement('figure');
    const caption = document.createElement('figcaption');
    caption.append(...content);
    figure.append(img, caption);
    return figure
}

function picsumImg(id, size) {
    const img = document.createElement('img');
    img.src = `https://picsum.photos/id/${id}/${size}`;
    return img;
}

function createComponent({picsumId, title, description}) {
    const img = picsumImg(picsumId, 1000);
    const heading = document.createElement('h2');
    const paragraph = document.createElement('p');
    heading.textContent = title;
    paragraph.textContent = description;
    const figure = createFigure(img, [heading, paragraph]);
    figure.classList.add('my-component');
    return figure;
}

const data = {
    picsumId: 200,
    title: "This is a picture of a cow",
    description: "It's a hairy cow"
};

// Build the component
const figure = createComponent(data);

// Add the new component to our list
const target = document.querySelector('#target');
const li = document.createElement('li');
li.append(figure);
target.append(li);
```

Wrapping the entire process in one function has many advantages as we shall see.

> In this case, we have also chosen to use functions for the lower-level procedures such as generating the image and the figure.
We could have one large function doing all the work, but organising the different tasks into functions can help to make code more reusable and more readable/maintainable.

You should get the same result as usual.

{{<iframe src="examples/fetch-4" width="1000" height="600">}}{{</iframe>}}   

## Creating multiple components

Now we should expand our code to allow for the creation and insertion of multiple components.
This is relatively simple.
We can expand the data structure into an array and use [Array.map] to create an array of components.

> One wrinkle is that we need to create an `<li>` for each figure.
Rather than including this in the `createComponent` function, I have decided that this is a logically separate task.
You may choose the simpler approach of returning an `<li>` from the function directly.
As usual, this is a trade-off between conceptual clarity and simplicity.

```js {hl_lines=["26-42", 45, "49-54"]}
function createFigure(img, content) {
    const figure = document.createElement('figure');
    const caption = document.createElement('figcaption');
    caption.append(...content);
    figure.append(img, caption);
    return figure
}

function picsumImg(id, size) {
    const img = document.createElement('img');
    img.src = `https://picsum.photos/id/${id}/${size}`;
    return img;
}

function createComponent({picsumId, title, description}) {
    const img = picsumImg(picsumId, 1000);
    const heading = document.createElement('h2');
    const paragraph = document.createElement('p');
    heading.textContent = title;
    paragraph.textContent = description;
    const figure = createFigure(img, [heading, paragraph]);
    figure.classList.add('my-component');
    return figure;
}

const data = [
    {
        "picsumId": 1032,
        "title": "crater",
        "description": "An impact crater is an approximately circular depression in the surface of a planet, moon, or other solid body in the Solar System or elsewhere, formed by the hypervelocity impact of a smaller body."
    },
    {
        "picsumId": 103,
        "title": "feet",
        "description": "The foot (plural: feet) is an anatomical structure found in many vertebrates. It is the terminal portion of a limb which bears weight and allows locomotion. In many animals with feet, the foot is a separate organ at the terminal part of the leg made up of one or more segments or bones."
    },
    {
        "picsumId": 1039,
        "title": "waterfall",
        "description": "A waterfall is an area where water flows over a vertical drop or a series of steep drops in the course of a stream or river. Waterfalls also occur where meltwater drops over the edge of a tabular iceberg or ice shelf."
    }
];

// Build the components
const figures = data.map(createComponent);

// Add the new component to our list
const target = document.querySelector('#target');
const items = figures.map(figure => {
    const li = document.createElement('li');
    li.append(figure);
    return li;
});
target.append(...items);
```

Adding more components into our page has the expected result. 
The styles we developed previously are just about acceptable, though the system may need some tweaks.

{{<iframe src="examples/fetch-5" width="1000" height="600">}}{{</iframe>}}   

## Loading data from a json file

OK, now we have the tooling in place, we can add this
<a href="examples/fetch-6/data.json" download="data.json">data.json</a> file to the project.

> Download the file and add it to your project. It can go in the root folder alongside the javascript.
Though in a complex project you may want to create a data folder or similar.

We can load the data easily using `fetch()`.

```js {hl_lines="26-27"}
function createFigure(img, content) {
    const figure = document.createElement('figure');
    const caption = document.createElement('figcaption');
    caption.append(...content);
    figure.append(img, caption);
    return figure
}

function picsumImg(id, size) {
    const img = document.createElement('img');
    img.src = `https://picsum.photos/id/${id}/${size}`;
    return img;
}

function createComponent({picsumId, title, description}) {
    const img = picsumImg(picsumId, 1000);
    const heading = document.createElement('h2');
    const paragraph = document.createElement('p');
    heading.textContent = title;
    paragraph.textContent = description;
    const figure = createFigure(img, [heading, paragraph]);
    figure.classList.add('my-component');
    return figure;
}

const response = await fetch('data.json');
const data = await response.json();

// Build the components
const figures = data.map(createComponent);

// Add the new component to our list
const target = document.querySelector('#target');
const items = figures.map(figure => {
    const li = document.createElement('li');
    li.append(figure);
    return li;
});
target.append(...items);
```



The result still needs some CSS work, but the basic pattern looks good.

{{<iframe src="examples/fetch-6" width="1000" height="600">}}{{</iframe>}}   

For a few final tweaks, update the CSS file to <a href="examples/fetch-7/style.css" download="style.css">this file</a>.

## Featured items

Add the following javascript to add the class *featured* selectively to some components.

```js {hl_lines="23-25"}
function createFigure(img, content) {
    const figure = document.createElement('figure');
    const caption = document.createElement('figcaption');
    caption.append(...content);
    figure.append(img, caption);
    return figure
}

function picsumImg(id, size) {
    const img = document.createElement('img');
    img.src = `https://picsum.photos/id/${id}/${size}`;
    return img;
}

function createComponent({picsumId, title, description, featured}) {
    const img = picsumImg(picsumId, 1000);
    const heading = document.createElement('h2');
    const paragraph = document.createElement('p');
    heading.textContent = title;
    paragraph.textContent = description;
    const figure = createFigure(img, [heading, paragraph]);
    figure.classList.add('my-component');
    if (featured) {
        figure.classList.add('featured');
    }
    return figure;
}

const response = await fetch('data.json');
const data = await response.json();

// Build the components
const figures = data.map(createComponent);

// Add the new component to our list
const target = document.querySelector('#target');
const items = figures.map(figure => {
    const li = document.createElement('li');
    li.append(figure);
    return li;
});
target.append(...items);
```

Now update the JSON file to set a few items to `"featured": true` as in <a href="examples/fetch-7/data.json" download="data.json">this file</a> and the final result should look something like this.

{{<iframe src="examples/fetch-7" width="1000" height="600">}}{{</iframe>}}   


## Conclusions

We have seen that we can store data in our own *JSON* files and use it to build content.
This approach can be useful when we want to create standardised, structured HTML components.
Although the JSON file format allows for a wide range of configurations and thus allows for arbitrarily complex data which can be used to make decisions whilst building a site. 

The next exercise will expand this idea further by building an application based on an externally provided *JSON* API.


[spread syntax]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
[Array.map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map