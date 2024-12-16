---
type: exercise
title: Metropolitan museum of art application
---

In this exercise we will develop an application for exploring the *Metropolitan Museum of Art* collection via the published JSON API.

<!--more-->

The [Metropolitan Museum of Art] provides free access to hundreds of thousands of images with detailed descriptions of objects in the collection.
You can read [About the MET API] or head straight to the [API documentation] on github.
Not all information fields are available for all elements so we will work with a small subset of the available data in this demonstration. Feel free to elaborate and develop the system further after you complete the example code.

In this example, we will build an application that will allow users to enter a search term and view paginated results.
The basic functional requirements are as follows:

- Users can enter a search term
- On searching, users are presented with details of any matching items
- If more than 12 items match the search, users can navigate 12 items at a time with previous and next buttons

> The approach we will take is to build the minimal possible system and refactor as we go to keep the code as clean as possible.
Take this lab slowly and try to understand each step. Ask questions as soon as they arise. Don’t continue to the next step until you understand the current step.

## Setup

As usual, we will need a basic template. 
We will build the entire application using Javascript, so all we need is a basic `<head>` element with links to CSS and a JS module.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Metropolitan Museum of Art</title>
    <link rel="stylesheet" href="style.css">
    <script type="module" src="app.js"></script>
</head>
<body>
    
</body>
</html>
```

We have named our main JS module *app.js*. 
We will try to keep the code in this file focussed on initialising and configuring the application.
Any implementation details that can be moved into another module will be moved as soon as possible. 

> This is a useful approach to take when structuring your code.
Keep in mind the purpose of each module and don't allow code into the module unless it is meeting the purpose.
>
> In this case, we are dealing with the top level of the application only, structuring the document at a high level.

The first thing we need is a structure for the page.
We will need a `<header>`, a `<main>` and a `<footer>` to contain the core page structure.
This can be created as follows.

```js
// This is app.js, the script that configures and creates our application

const header = document.createElement('header');
const main = document.createElement('main');
const footer = document.createElement('footer');

document.body.append(header, main, footer);
```

The result is not so interesting because the elements don't have any content, but you should see our three structural elements are now in place in the page.

### Create a header

Now we can fill out the header with an actual visible element containing a title.
But since this is logic we can hand off to another module, we will import a function that creates the header for us.

> Create a folder *metmuseum* and add a new file *header.js* which exports the following function.

```js
// This is ./metmuseum/header.js, where we define the app header

export default function createHeader(mainHeading) {
    const header = document.createElement('header');
    const h1 = document.createElement('h1');
    h1.textContent = mainHeading;
    header.append(h1);
    return header;
}
```

Now we can modify our *app.js* file to import the new function and we can use it to generate a more sophisticated header.

```js {hl_lines="3-5"}
// This is app.js, the script that configures and creates our application

import createHeader from "./metmuseum/header.js";

const header = createHeader('Metropolitan Museum of Art Collection');
const main = document.createElement('main');
const footer = document.createElement('footer');

document.body.append(header, main, footer);
```

The header should appear in the page and any further modifications to the header can be added to the function within the *header.js* module.

### A simple footer

We can repeat the same idea with a footer.
Create a file *footer.js* which exports the following function.

```js
// This is ./metmuseum/footer.js, where we define the app footer

export default function createFooter() { 
    const footer = document.createElement('footer');
    const link = document.createElement('a');
    link.href = "https://metmuseum.github.io/";
    link.textContent = "metmuseum API";
    footer.append("Created using the ", link);
    return footer;
}
```

The footer doesn't require any configuration so we can just import our new function and call it without arguments in *app.js*.

```js {hl_lines=[4, 8]}
// This is app.js, the script that configures and creates our application

import createHeader from "./metmuseum/header.js";
import createFooter from "./metmuseum/footer.js";

const header = createHeader('Metropolitan Museum of Art Collection');
const main = document.createElement('main');
const footer = createFooter();

document.body.append(header, main, footer);
```

Now we can add some styles for the core structure before we move on.

```css
@import url('https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300&display=swap');

:root {
    --red: hsl(0, 70%, 50%);
    --dark: hsl(0, 0%, 20%);
    --light: hsl(0, 0%, 90%);
}

body {
    font-family: "Open Sans Condensed", sans-serif;
    background: var(--dark);
    color: var(--light);
    display: grid;
    margin: 0;
    grid-template-rows: auto 1fr auto;
    min-height: 100dvh;

    header, footer {
        background: var(--red);
        padding-inline: 1rem;
    }

    header {
        h1 {
            margin-block: 0.5rem;
        }
    }
    footer {
        padding-block: 0.5rem;
        text-align: right;
        a {
            color: inherit;
        }
    }
}
```

The result is a sensible mobile-first start for the project.

{{<iframe src="iframes/step-01" width="320" height="600">}}{{</iframe>}}   

## The museum API

Documentation for the API can be found at https://metmuseum.github.io/. Spend a few minutes browsing the page. In particular, we will be using the [object] and [search] endpoints.

You should see that the search endpoint will provide us with a list of objectIDs for artifacts that match the search criteria and the object endpoint provides data for an individual item. It is no coincidence that this is exactly what is needed for a simple app.


### Requesting an object

To request details for a specific object, we need to make a request like this:

```plaintext {linenos=false}
https://collectionapi.metmuseum.org/public/collection/v1/objects/[objectID]
```

For example, the endpoint [https://collectionapi.metmuseum.org/public/collection/v1/objects/10000](https://collectionapi.metmuseum.org/public/collection/v1/objects/10000) should contain details of the object with the *id* 10000.
Clicking the link should load the JSON data for the object.

The JSON data are sparsely populated, but usually there will be a sensible title for the object under the *title* key and an image under the *primaryImageSmall* key.


```json
{
    "GalleryNumber": "774",
    "accessionNumber": "10.125.161",
    "accessionYear": "1910",
    "additionalImages": [],
    "artistAlphaSort": "",
    "artistBeginDate": "",
    "artistDisplayBio": "",
    "artistDisplayName": "",
    "artistEndDate": "",
    "artistGender": "",
    "artistNationality": "",
    "artistPrefix": "",
    "artistRole": "",
    "artistSuffix": "",
    "artistULAN_URL": "",
    "artistWikidata_URL": "",
    "city": "Boston",
    "classification": "",
    "constituents": null,
    "country": "United States",
    "county": "",
    "creditLine": "Gift of Mrs. Russell Sage, 1909",
    "culture": "American",
    "department": "The American Wing",
    "dimensions": "28 1/2 x 21 x 15 1/2 in. (72.4 x 53.3 x 39.4 cm)",
    "dynasty": "",
    "excavation": "",
    "geographyType": "Made in",
    "isHighlight": false,
    "isPublicDomain": true,
    "isTimelineWork": false,
    "linkResource": "",
    "locale": "",
    "locus": "",
    "measurements": [
        {
            "elementDescription": null,
            "elementMeasurements": {
                "Depth": 39.3701,
                "Height": 72.4,
                "Width": 53.3
            },
            "elementName": "Overall"
        }
    ],
    "medium": "Mahogany, satinwood, rosewood, ebony, white pine",
    "metadataDate": "2023-02-07T04:46:51.34Z",
    "objectBeginDate": 1800,
    "objectDate": "1800–1810",
    "objectEndDate": 1810,
    "objectID": 10000,
    "objectName": "Work table",
    "objectURL": "https://www.metmuseum.org/art/collection/search/10000",
    "objectWikidata_URL": "https://www.wikidata.org/wiki/Q116331578",
    "period": "",
    "portfolio": "",
    "primaryImage": "https://images.metmuseum.org/CRDImages/ad/original/17653.jpg",
    "primaryImageSmall": "https://images.metmuseum.org/CRDImages/ad/web-large/17653.jpg",
    "region": "New England",
    "reign": "",
    "repository": "Metropolitan Museum of Art, New York, NY",
    "rightsAndReproduction": "",
    "river": "",
    "state": "Massachusetts",
    "subregion": "",
    "tags": null,
    "title": "Work Table"
}
```

The image in the above example, taken from the *primaryImageSmall* key, looks like this:

![Work Table](https://images.metmuseum.org/CRDImages/ad/web-large/17653.jpg)

### Searching the collection

Similarly, there is an API for conducting a search of the collection, returning a list of object ids which match the search.
The search API has many parameters but a typical search request might look like this:

```plaintext {linenos=false}
https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=sunflowers
```

For example, the endpoint [https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=sunflowers](https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=sunflowers) should contain search results for the term *"sunflowers"* restricted to items which are identified as *highlights* in the collection.

The resultant file should loom like this:

```json
{
    "total": 6,
    "objectIDs": [
        485308,
        700610,
        761604,
        437329,
        436535,
        436121
    ]
}
```

> You can read up on the other API options in the [search] documentation.

So we can see that is should be easy enough to make a search request to get the *objectIDs* and then make an object request for each one to get the actual data.

## Implementing the API

To make these requests using JavaScript, we need to use the fetch API.
Add a new module, *api.js* for handling all our interactions with the API.
We can start with this simple code.

```js
// This is ./metmuseum/api.js, it handles all communication with the museum API

const baseURL = 'https://collectionapi.metmuseum.org/public/collection/v1';

async function getMuseumEndpoint(endpoint) {
    const response = await fetch(`${baseURL}/${endpoint}`);
    return response.json();
}
```

We have configured a `baseURL` to use for all requests and an [async] function that makes the request using [await] and [fetch] and returns json data.

### A function to request objects

To actually make an object request, we can add a simple one-liner that knows how to for the correct URL for an object request.

```js {hl_lines="10-12"}
// This is ./metmuseum/api.js, it handles all communication with the museum API

const baseURL = 'https://collectionapi.metmuseum.org/public/collection/v1';

async function getMuseumEndpoint(endpoint) {
    const response = await fetch(`${baseURL}/${endpoint}`);
    return response.json();
}

export async function getMuseumObject(objectID) {
    return getMuseumEndpoint(`objects/${objectID}`);
}
```

This should make requesting object very simple because we only need to pass the *objectID* to get JSON data back.

### Testing the function

We can test our function by updating our *app.js* module:

```js {hl_lines=[5, 13]}
// This is app.js, the script that configures and creates our application

import createHeader from "./metmuseum/header.js";
import createFooter from "./metmuseum/footer.js";
import { getMuseumObject } from "./metmuseum/api.js";

const header = createHeader('Metropolitan Museum of Art Collection');
const main = document.createElement('main');
const footer = createFooter();

document.body.append(header, main, footer);

window.getMuseumObject = getMuseumObject;
```

We have imported our new function and explicitly added it to the global window object.
This makes it available via the developer console, where we can try the following:
```js
await getMuseumObject("10000");
```

The output should demonstrate we now have access to data.

> Try requesting different objects to see what you get.

### A function for searching

We can add a similar function to *api.js* for conducting a search.
This can be as complex as you like to include more features, but we will stick to something relatively simple, constraining the results to objects which are identified as highlights and which (hopefully) have images.

```js {hl_lines="14-16"}
// This is ./metmuseum/api.js, it handles all communication with the museum API

const baseURL = 'https://collectionapi.metmuseum.org/public/collection/v1';

async function getMuseumEndpoint(endpoint) {
    const response = await fetch(`${baseURL}/${endpoint}`);
    return response.json();
}

export async function getMuseumObject(objectID) {
    return getMuseumEndpoint(`objects/${objectID}`);
}

export async function getMuseumSearch(query) {
    return getMuseumEndpoint(`search?isHighlight=true&hasImages=true&q=${query}`);
}
```

> feel free to test your function works in the same way as above.

## Visualising a museum object

So, now we have data at our fingertips, we need to design an interface for our users to view individual objects.
We can begin with a simple placeholder which simply returns a `<figure>` element with an image and caption.

Create a new file *figure.js* in the *metmuseum* folder and export the following function:

```js
// This is ./metmuseum/figure.js, where we define the DOM for an individual object

export default function createFigure(object) {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const caption = document.createElement('figcaption');

    img.loading = "lazy";
    img.src = object.primaryImageSmall;
    img.alt = object.title;
    caption.textContent = object.title;
    figure.append(img, caption);

    return figure;
}
```

The structure is pretty simple and should be enough for a basic test.
One thing we added was lazy loading, so if we add hundreds of elements into the page, most of which are not shown, the images won't load until they are near the viewport.
We will expand this with additional details later.

To test the function, import it into *app.js* and add some temporary code at the end of the file:

```js {hl_lines=[5, "14-16"]}
// This is app.js, the script that configures and creates our application

import createHeader from "./metmuseum/header.js";
import createFooter from "./metmuseum/footer.js";
import createFigure from "./metmuseum/figure.js";
import { getMuseumObject } from "./metmuseum/api.js";

const header = createHeader('Metropolitan Museum of Art Collection');
const main = document.createElement('main');
const footer = createFooter();

document.body.append(header, main, footer);

const object = await getMuseumObject(700610);
const figure = createFigure(object);
main.append(figure);
```
The result should be that we can see the image and caption in the page.
A good start.

### Sorting out the styling

OK, its working but it looks a mess.
For now we can style the figure for the mobile view.

```css {hl_lines="56-69"}
@import url('https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300&display=swap');

:root {
    --red: hsl(0, 70%, 50%);
    --dark: hsl(0, 0%, 20%);
    --light: hsl(0, 0%, 90%);
}

body {
    font-family: "Open Sans Condensed", sans-serif;
    background: var(--dark);
    color: var(--light);
    display: grid;
    margin: 0;
    grid-template-rows: auto 1fr auto;
    min-height: 100dvh;

    header, footer {
        background: var(--red);
        padding-inline: 1rem;
    }

    header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;

        h1 {
            margin-block: 0.5rem;
        }
        section#search {
            margin-block: 0.5rem;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 1ch;
            label::after {
                content: ":";
            }
            input {
                font-family: system-ui;
                font-size: inherit;
            }
        }
    }
    footer {
        padding-block: 0.5rem;
        text-align: right;
        a {
            color: inherit;
        }
    }
}

main {
    figure {
        display: grid;
        margin: 0;
        img {
            width: 100%;
        }
        figcaption {
            background: var(--light);
            color: var(--dark);
            padding: 1rem;
        }
    }
}
```

The additions remove the default margin from the figure and display the image and caption in a grid layout. 
They also constrain the images to the width of their container and provide a distinct background with some padding to the caption. 

The result is a lot neater and gives us the first real glimpse of how the application will look.

{{<iframe src="iframes/step-02" width="340" height="650">}}{{</iframe>}}   

> Remove the test code (lines 14 - 16 in *app.js*) before continuing. 

## Getting user input

We need an `<input>` element to allow the user to specify a search term.
This can be placed anywhere in our application, but we will add it to the header element.

Update *header.js* as follows:

```js {hl_lines=[6, 8, "12-30"]}
// This is ./metmuseum/header.js, where we define the app header

export default function createHeader(mainHeading) {
    const header = document.createElement('header');
    const h1 = document.createElement('h1');
    const search = searchBar();
    h1.textContent = mainHeading;
    header.append(h1, search);
    return header;
}

function searchBar() {
    const section = document.createElement('section');
    const label = document.createElement('label');
    const input = document.createElement('input');

    section.id = "search";
    input.type = "search";
    
    // link the label to the input
    input.id = "query";
    label.htmlFor = input.id;

    // add useful hints
    label.textContent = "search";
    input.placeholder = "e.g. sunflowers";

    section.append(label, input);
    return section;
}
```

We have made the input of type *"search"*.
This adds some tweaks to the UI on some browsers and will raise the *"search"* event when the user submits a search.

### Styling the search input

We can give the header a *flex-wrap* layout to keep the interface neat at all sizes.

```css {hl_lines=["24-27", "33-46"]}
@import url('https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300&display=swap');

:root {
    --red: hsl(0, 70%, 50%);
    --dark: hsl(0, 0%, 20%);
    --light: hsl(0, 0%, 90%);
}

body {
    font-family: "Open Sans Condensed", sans-serif;
    background: var(--dark);
    color: var(--light);
    display: grid;
    margin: 0;
    grid-template-rows: auto 1fr auto;
    min-height: 100dvh;

    header, footer {
        background: var(--red);
        padding-inline: 1rem;
    }

    header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;

        h1 {
            margin-block: 0.5rem;
        }

        section#search {
            margin-block: 0.5rem;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 1ch;
            label::after {
                content: ":";
            }
            input {
                font-family: system-ui;
                font-size: inherit;
            }
        }
    }
    footer {
        padding-block: 0.5rem;
        text-align: right;
        a {
            color: inherit;
        }
    }
}

main {
    figure {
        display: grid;
        margin: 0;
        img {
            width: 100%;
        }
        figcaption {
            background: var(--light);
            color: var(--dark);
            padding: 1rem;
        }
    }
}
```

The search bar looks good enough.

{{<iframe src="iframes/step-03" width="340" height="650">}}{{</iframe>}}   

## Responding to a search

When the user searches, we want to get the search results in preparation for adding the individual objects into the page.
We can begin by adding an event handler for the *"search"* event which performs the appropriate search and logs the result.

```js {hl_lines=[6, "14-18"]}
// This is app.js, the script that configures and creates our application

import createHeader from "./metmuseum/header.js";
import createFooter from "./metmuseum/footer.js";
import createFigure from "./metmuseum/figure.js";
import { getMuseumSearch } from "./metmuseum/api.js";

const header = createHeader('Metropolitan Museum of Art Collection');
const main = document.createElement('main');
const footer = createFooter();

document.body.append(header, main, footer);

document.body.addEventListener('search', async ev => {
    const query = ev.target.value;
    const result = await getMuseumSearch(query);
    console.log(result)
});
```

> Notice that the event handler is marked as an [async] function on line 13.

With this in place, try typing a query into the search bar and check that the results are properly logged.


### Handling empty results

Notice that if your search result is empty, then the `objectIDs` key in the result can be `null`.

```js {linenos=false}
{total: 0, objectIDs: null}
```

> Try entering a random string of characters to see this result.

To handle this situation, we can simplify the output of the `getMuseumSearch` function so it returns a simple list of *ObjectIDs*.

```js {hl_lines="15-16"}
// This is ./metmuseum/api.js, it handles all communication with the museum API

const baseURL = 'https://collectionapi.metmuseum.org/public/collection/v1';

async function getMuseumEndpoint(endpoint) {
    const response = await fetch(`${baseURL}/${endpoint}`);
    return response.json();
}

export async function getMuseumObject(objectID) {
    return getMuseumEndpoint(`objects/${objectID}`);
}

export async function getMuseumSearch(query) {
    const result = await getMuseumEndpoint(`search?isHighlight=true&hasImages=true&q=${query}`);
    return result.objectIDs || [];
}
```

> Notice the use of [await] in the above code to resolve the promise returned by `getMuseumEndpoint` before extracting the *objectIDs*.
> We also use the [logical OR] operator to replace `null` values with an empty array. 

The above tweak neatly handles the situation when there are no search results and provides a simpler output than the original API response.
In a small way, we are adapting the API to suit our needs.
We should see that the result which is logged to the console is now a simple array of *objectIDs* and it may be empty.

> The important thing here is that we can always iterate over the results, even if they are empty.
This allows us to keep our code neat by avoiding the need to include conditional clauses for empty results.


## Requesting the individual objects

The next step is a subtly complex.
Although a naive implementation works reasonably well, we will be improving this later on.

We can begin by just looping over the result and requesting each object in turn, adding figures to the DOM as we go.

Update *app.js* like this:

```js {hl_lines=[6, "17-21"]}
// This is app.js, the script that configures and creates our application

import createHeader from "./metmuseum/header.js";
import createFooter from "./metmuseum/footer.js";
import createFigure from "./metmuseum/figure.js";
import { getMuseumSearch, getMuseumObject } from "./metmuseum/api.js";

const header = createHeader('Metropolitan Museum of Art Collection');
const main = document.createElement('main');
const footer = createFooter();

document.body.append(header, main, footer);

document.body.addEventListener('search', async ev => {
    const query = ev.target.value;
    const result = await getMuseumSearch(query);
    for (const objectID of result) {
        const object = await getMuseumObject(objectID);
        const figure = createFigure(object);
        main.append(figure);
    }
});
```

Now, you should find that when we conduct a search, new figures are injected into the DOM.

{{<iframe src="iframes/step-04" width="320" height="600">}}{{</iframe>}}   

Great!
This works well enough to move forwards with it.

> We will update this significantly later, but first we will smooth out some more basic issues.

### Missing images

Some searches, for example *"sunflowers"* reveal that actually, some of the objects have missing images.
This is particularly annoying since we explicitly searched with *hasImages=true* in the url.

> Try searching for "*sunflowers*" to see these missing images.
> Extensive experimentation with different search terms may also reveal that there are object records with *"primaryImageSmall"* properties pointing to missing files on the museum server.

A neat solution to fixing these broken images is to register an event handler on the image *"error"* event which updates the *"src"* attribute to a default image.

> I asked chatGPT to provide a base64-encoded missing image.
> This is what it came up with:
>
> <img src="data:image/png;base64,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">
>
> The *"src"* string is very long and is included in the code example below.
> You may find/create a better image.

Update *figure.js* with the new default value.

```js {hl_lines=[3, "11-13"]}
// This is ./metmuseum/figure.js, where we define the DOM for an individual object

const defaultImage = "data:image/png;base64,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"
    
export default function createFigure(object) {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const caption = document.createElement('figcaption');

    img.loading = "lazy";
    img.addEventListener('error', ev => { 
        img.src = defaultImage;
    });
    img.src = object.primaryImageSmall;
    img.alt = object.title;
    caption.textContent = object.title;
    figure.append(img, caption);
 
    return figure;
}
```

> It is equally acceptable to add an image file to the project source and set the *"src"* attribute to point to your image.


The result is that on searching, missing images are now replaced with our default image.

{{<iframe src="iframes/step-05" width="320" height="600">}}{{</iframe>}}   


### Adding a prompt

When we first load our application there is a big blank space.
We can use CSS to fill this space with a prompt to conduct a search.

Notice how we are targeting the `::before` pseudo-element on the `:empty` pseudo-class of the `<main>` element.

```css {hl_lines="57-66"}
@import url('https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300&display=swap');

:root {
    --red: hsl(0, 70%, 50%);
    --dark: hsl(0, 0%, 20%);
    --light: hsl(0, 0%, 90%);
}

body {
    font-family: "Open Sans Condensed", sans-serif;
    background: var(--dark);
    color: var(--light);
    display: grid;
    margin: 0;
    grid-template-rows: auto 1fr auto;
    min-height: 100dvh;

    header, footer {
        background: var(--red);
        padding-inline: 1rem;
    }

    header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;

        h1 {
            margin-block: 0.5rem;
        }
        section#search {
            margin-block: 0.5rem;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 1ch;
            label::after {
                content: ":";
            }
            input {
                font-family: system-ui;
                font-size: inherit;
            }
        }
    }
    footer {
        padding-block: 0.5rem;
        text-align: right;
        a {
            color: inherit;
        }
    }
}

main {
    display: grid;
    &:empty {
        padding: 1rem;
        place-items: center;
        &::before {
            font-size: 2em;
            text-align: center;
            content: "Enter a search term to explore the collection"
        }
    }
    figure {
        display: grid;
        margin: 0;
        img {
            width: 100%;
        }
        figcaption {
            background: var(--light);
            color: var(--dark);
            padding: 1rem;
        }
    }
}
```

This is much nicer.
The message only appears when the `<main>` element is empty.

{{<iframe src="iframes/step-06" width="320" height="600">}}{{</iframe>}}   

### Showing the length of the search results

It's convenient for the user to see how many search results were found.
We could add an element into the DOM for this, but we can modify the CSS styles using JavaScript to use a similar approach to the above prompt. 
This time, we will only show the message when the element isn't empty.

We can set the `content` to display the value of the `data-message` attribute.

```css {hl_lines="58-61"}
@import url('https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300&display=swap');

:root {
    --red: hsl(0, 70%, 50%);
    --dark: hsl(0, 0%, 20%);
    --light: hsl(0, 0%, 90%);
}

body {
    font-family: "Open Sans Condensed", sans-serif;
    background: var(--dark);
    color: var(--light);
    display: grid;
    margin: 0;
    grid-template-rows: auto 1fr auto;
    min-height: 100dvh;

    header, footer {
        background: var(--red);
        padding-inline: 1rem;
    }

    header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;

        h1 {
            margin-block: 0.5rem;
        }
        section#search {
            margin-block: 0.5rem;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 1ch;
            label::after {
                content: ":";
            }
            input {
                font-family: system-ui;
                font-size: inherit;
            }
        }
    }
    footer {
        padding-block: 0.5rem;
        text-align: right;
        a {
            color: inherit;
        }
    }
}

main {
    display: grid;
    &::before {
        padding: 0.25rem 1rem;
        content: attr(data-message);
    }
    &:empty {
        padding: 1rem;
        place-items: center;
        &::before {
            font-size: 2em;
            text-align: center;
            content: "Enter a search term to explore the collection"
        }
    }
    figure {
        display: grid;
        margin: 0;
        img {
            width: 100%;
        }
        figcaption {
            background: var(--light);
            color: var(--dark);
            padding: 1rem;
        }
    }
}
```

When we conduct our search, we need to capture the length of the search results and set the value for the `dataset.message` attribute of the `<main>` element.

> We are using the [HTMLElement.dataset] property to store data on the `<main>` element.

We can do this with one simple line in our search handler.

```js {hl_lines=17}
// This is app.js, the script that configures and creates our application

import createHeader from "./metmuseum/header.js";
import createFooter from "./metmuseum/footer.js";
import createFigure from "./metmuseum/figure.js";
import { getMuseumSearch, getMuseumObject } from "./metmuseum/api.js";

const header = createHeader('Metropolitan Museum of Art Collection');
const main = document.createElement('main');
const footer = createFooter();

document.body.append(header, main, footer);

document.body.addEventListener('search', async ev => {
    const query = ev.target.value;
    const result = await getMuseumSearch(query);
    main.dataset.message = `found ${result.length} results for '${query}'`;
    for (const objectID of result) {
        const object = await getMuseumObject(objectID);
        const figure = createFigure(object);
        main.append(figure);
    }
});
```

Now when we search, you should see the message presented above the results.

{{<iframe src="iframes/step-07" width="320" height="600">}}{{</iframe>}}


### A `"searching"` animation

In some cases (and you may or may not not see this immediately) the API takes a little while to respond.
In these cases, our application simply waits for the `getMuseumSearch` promise to resolve and since the `<main>` element remains empty, the interface shows the `"Enter a search term to explore the collection"` prompt.

We'd like to replace this message with a nice animation that indicates that the search request is in progress and the user should wait patiently.
Something like this:

<div class="loading"></div>

<style>
.loading {
    --red: hsl(0, 70%, 50%);
    --dark: hsl(0, 0%, 20%);
    --light: hsl(0, 0%, 90%);
    display: grid;
    place-items: center;
    place-content: center;
    width: 200px;
    height: 100px;
    background: var(--dark);
    color: var(--light);
    &::before { content: "searching"; }
    &::after {
        content: "";
        width: 3em;
        aspect-ratio: 15;
        background: var(--red);
        animation: search 300ms infinite alternate ease-in-out;
    }
}
@keyframes search {
        0% {translate: -100% }
    100% {translate:  100% }
}

</style>


We will implement this by adding a `loading` class onto the `<main>` element whilst we wait for the response.
This will allow us to modify the prompt using CSS whilst the response is pending.

```js {hl_lines=[16, 19]}
// This is app.js, the script that configures and creates our application

import createHeader from "./metmuseum/header.js";
import createFooter from "./metmuseum/footer.js";
import createFigure from "./metmuseum/figure.js";
import { getMuseumSearch, getMuseumObject } from "./metmuseum/api.js";

const header = createHeader('Metropolitan Museum of Art Collection', getMuseumSearch);
const main = document.createElement('main');
const footer = createFooter();

document.body.append(header, main, footer);

document.body.addEventListener('search', async ev => {
    const query = ev.target.value;
    main.classList.add('loading');
    const result = await getMuseumSearch(query);
    main.dataset.message = `found ${result.length} results for '${query}'`;
    main.classList.remove('loading');
    for (const objectID of result) {
        const object = await getMuseumObject(objectID);
        const figure = createFigure(object);
        main.append(figure);
    }
});
```

The CSS change is pretty easy.
Adding an animation makes the message pop nicely.

```css {hl_lines=["70-82", "98-101"]}
@import url('https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300&display=swap');

:root {
    --red: hsl(0, 70%, 50%);
    --dark: hsl(0, 0%, 20%);
    --light: hsl(0, 0%, 90%);
}

body {
    font-family: "Open Sans Condensed", sans-serif;
    background: var(--dark);
    color: var(--light);
    display: grid;
    margin: 0;
    grid-template-rows: auto 1fr auto;
    min-height: 100dvh;

    header, footer {
        background: var(--red);
        padding-inline: 1rem;
    }

    header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;

        h1 {
            margin-block: 0.5rem;
        }
        section#search {
            margin-block: 0.5rem;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 1ch;
            label::after {
                content: ":";
            }
            input {
                font-family: system-ui;
                font-size: inherit;
            }
        }
    }
    footer {
        padding-block: 0.5rem;
        text-align: right;
        a {
            color: inherit;
        }
    }
}

main {
    display: grid;
    &::before {
        padding: 0.25rem 1rem;
        content: attr(data-message);
    }
    &:empty {
        padding: 1rem;
        place-items: center;
        &::before {
            font-size: 2em;
            text-align: center;
            content: "Enter a search term to explore the collection"
        }
        &.loading {
            place-content: center;
            &::before {
                content: "searching";
            }
            &::after {
                content: "";
                width: 3em;
                aspect-ratio: 15;
                background: var(--red);
                animation: search 300ms infinite alternate ease-in-out;
            }
        }
    }
    figure {
        display: grid;
        margin: 0;
        img {
            width: 100%;
        }
        figcaption {
            background: var(--light);
            color: var(--dark);
            padding: 1rem;
        }
    }
}

@keyframes search {
    0% { translate: -100%; }
    100% { translate: 100%; }
}
```

> It may be difficult to see the animation unless the server is slow to respond.
So you may want to manually add a `class="loading"` attribute onto the `<main>` element to see the animation in action.
>
>You can do this by modifying the *app.js* code temporarily, e.g. by moving line 16 up to line 13.
Just remember to move it back once you are happy with what we have done.

With the new code in place, our search animation is shown briefly whilst the request is pending and if the server takes a while to response, the user is not left wondering what is happening.

{{<iframe src="iframes/step-08" width="320" height="600">}}{{</iframe>}}

But, what about the waiting for the individual objects to load?

There are still some major issues with the interface.

1. The entire list of results is loaded, this can take a long time if there are lots of results.
1. Searching more than once is broken

## Clearing the list between searches

You may have discovered that searching multiple times simply appends new figures onto the previous results.

> Try e.g. searching for *"sunflowers*" and then *"potato"*.
You should see that the results of the second search are appended to the end of the `<main>` element. 

We don't want this behaviour.
We would rather that the `<main>` element was cleared so we can see the search animation and the main can be refilled with the new search results.

This is a fairly simple update, we can define a `clear` function that will clear out all the elements in our `<main>` element before creating any new elements.

```js {hl_lines=[17, "28-32"]}
// This is app.js, the script that configures and creates our application

import createHeader from "./metmuseum/header.js";
import createFooter from "./metmuseum/footer.js";
import createFigure from "./metmuseum/figure.js";
import { getMuseumSearch, getMuseumObject } from "./metmuseum/api.js";

const header = createHeader('Metropolitan Museum of Art Collection', getMuseumSearch);
const main = document.createElement('main');
const footer = createFooter();

document.body.append(header, main, footer);

document.body.addEventListener('search', async ev => {
    const query = ev.target.value;
    main.classList.add('loading');
    clear(main);
    const result = await getMuseumSearch(query);
    main.dataset.message = `found ${result.length} results for '${query}'`;
    for (const objectID of result) {
        const object = await getMuseumObject(objectID);
        const figure = createFigure(object);
        main.append(figure);
    }
    main.classList.remove('loading');
});

function clear(element) { 
    while (element.firstChild) {
        element.lastChild.remove();
    }
}
```

> This `while` loop is a common pattern for clearing an element.

We can now use our application for multiple searches and the list is cleared each time.

{{<iframe src="iframes/step-09" width="320" height="600">}}{{</iframe>}}

There are still major issues with this.
If we search twice in quick succession, the original search results are still being added into the DOM after we clear them out and the results are being mixed together.

This is because our `async` event handler allows the second search to begin before the first is complete.
We are not awaiting the result.
Yet we *do* await the call to `getMuseumObject` before we append each item in the loop, so our event handlers potentially take a very long time to complete.

Our fix to this will be quite sophisticated.
Rather than loading all the objects at once, we will insert placeholder elements and only load the individual objects when the user scrolls them into view.

## Adding an Intersection Observer

The [IntersectionObserver] API allows us to schedule code to execute when an element becomes visible within the viewport.
Typically, this is either caused by inserting an element into the DOM or by scrolling to an element that was previously not visible.

When the user enters a search query, we will make the `getMuseumSearch` request as usual, but rather than loading all the object, all we need to do is add placeholder `<article>` elements into the DOM.
We will then use the [IntersectionObserver] API to trigger the call to `getMuseumObject` and the creation of our `<figure>` elements on demand as the user scrolls down the page.

We can begin the implementation by adding a new module which we will name *articles.js* because we will use `<article>` elements as wrappers for our figures.

```js
// This is ./metmuseum/article.js, where we define the articles which wrap our figures

import { getMuseumSearch } from "./api.js";

function createArticle(objectID) {
    const article = document.createElement('article');
    article.dataset.objectId = objectID;
    return article;
}

export async function search(query) {
    const objectIDs = await getMuseumSearch(query);
    return objectIDs.map(createArticle);
}
```

We have exported an `async` function (`search(query)`) which conducts a search and maps the result to an array of empty `<article>` elements using the `createArticle` function.
The result is an article element for each result. 
These articles are each given a `data-object-id` attribute (notice the lowercase *"d"*) which will store the *objectID* which can subsequently be used to load their content.

### Insert the placeholders

Integrating the new module is easy enough.

> This will temporarily break our implementation since we no longer request our objects or create figures.

```js {hl_lines=[5, 16, 18]}
// This is app.js, the script that configures and creates our application

import createHeader from "./metmuseum/header.js";
import createFooter from "./metmuseum/footer.js";
import { search } from "./metmuseum/articles.js";

const header = createHeader('Metropolitan Museum of Art Collection');
const main = document.createElement('main');
const footer = createFooter();

document.body.append(header, main, footer);

document.body.addEventListener('search', async ev => {
    main.classList.add('loading');
    clear();
    const articles = await search(ev.target.value);
    main.dataset.message = `found ${articles.length} results for '${ev.target.value}'`;
    main.append(...articles);
    main.classList.remove('loading');
});

function clear() { 
    while (main.firstChild) { main.firstChild.remove(); }
}
```

Our application now loads in a set of empty articles very quickly after the search request is complete. 
They are not shown in the interface because they have no visible content.
However, they do replace the prompt message within the empty `<main>` element.

> Check the elements tab of the developer tools to confirm these new elements have been added.

### Style the placeholders

Now we need to style these empty articles so that they take up some space in the page and they can be used to visibly indicate that the individual articles are loading.

> The empty articles will show a loading indicator, until they are filled with a `<figure>` element.

```css {hl_lines=["84-105", "124-126"]}
@import url('https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300&display=swap');

:root {
    --red: hsl(0, 70%, 50%);
    --dark: hsl(0, 0%, 20%);
    --light: hsl(0, 0%, 90%);
}

body {
    font-family: "Open Sans Condensed", sans-serif;
    background: var(--dark);
    color: var(--light);
    display: grid;
    margin: 0;
    grid-template-rows: auto 1fr auto;
    min-height: 100dvh;

    header, footer {
        background: var(--red);
        padding-inline: 1rem;
    }

    header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;

        h1 {
            margin-block: 0.5rem;
        }
        section#search {
            margin-block: 0.5rem;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 1ch;
            label::after {
                content: ":";
            }
            input {
                font-family: system-ui;
                font-size: inherit;
            }
        }
    }
    footer {
        padding-block: 0.5rem;
        text-align: right;
        a {
            color: inherit;
        }
    }
}

main {
    display: grid;
    &::before {
        padding: 0.25rem 1rem;
        content: attr(data-message);
    }
    &:empty {
        padding: 1rem;
        place-items: center;
        &::before {
            font-size: 2em;
            text-align: center;
            content: "Enter a search term to explore the collection"
        }
        &.loading {
            place-content: center;
            &::before {
                content: "searching";
            }
            &::after {
                content: "";
                width: 3em;
                aspect-ratio: 15;
                background: var(--red);
                animation: search 300ms infinite alternate ease-in-out;
            }
        }
    }
    article {
        display: grid;
        &:empty {
            place-items: center;
            place-content: center;
            gap: 0.25rem;
            aspect-ratio: 1;
            border-block: 1px solid var(--light);
            &::before { content: "loading..."; }
            &::after {
                content: "";
                aspect-ratio: 2;
                width: 0;
                border-width: 2em;
                border-style: solid;
                border-radius: 2em;
                border-color: var(--red) var(--light);
                box-shadow: 0 0 10px 1px var(--light);
                animation: spin 1s infinite ease-in-out;
            }
        }
    }
    figure {
        display: grid;
        margin: 0;
        img {
            width: 100%;
        }
        figcaption {
            background: var(--light);
            color: var(--dark);
            padding: 1rem;
        }
    }
}

@keyframes search {
    0% { translate: -100%; }
    100% { translate: 100%; }
}
@keyframes spin {
    100% { rotate: 1turn; }
}
```

Our placeholders show a loading indicator which we will replace with the loaded content.

{{<iframe src="iframes/step-10" width="320" height="600">}}{{</iframe>}}

### Loading object data on demand

Now we can implement our [IntersectionObserver] to trigger the browser to download object data on demand, i.e. when an `<article>` element becomes visible in the viewport.

We can begin with a basic implementation where we [observe] each element as it is created.

Our observer will filter all entries to extract only those elements that are newly intersecting the viewport.
For each of these elements, we will call [unobserve] them (to ensure we only process each element once) and just log it to the console for now.

```js {hl_lines=["5-11", 16]}
// This is ./metmuseum/article.js, where we define the behaviour of articles elements which wrap our figures

import { getMuseumSearch } from "./api.js";

export const io = new IntersectionObserver((entries) => {
    const intersecting = entries.filter(e => e.isIntersecting);
    for (const entry of intersecting) {
        io.unobserve(entry.target);
        console.log(entry.target);
    }
});

function createArticle(objectID) {
    const article = document.createElement('article');
    article.dataset.objectId = objectID;
    io.observe(article);
    return article;
}

export async function search(query) {
    const objectIDs = await getMuseumSearch(query);
    return objectIDs.map(createArticle);
}
```
> Study the above code carefully and make sure you understand what is happening.
>
> We are creating an observer, which will be passed an array of events representing *changes in intersection* for observed elements. 

Our code filters out the entries for which `isIntersecting` has become true.
That is, those which have entered the viewport for the first time.
We can execute arbitrary code here before we remove the element from observation.

> Check the console as you enter a search and scroll around the results.
You should see that each of our `<article>` elements is logged just once as it enters the viewport. 

We can easily now expand this to load the data rather than just logging.

```js {hl_lines=["3-4", 10, "14-19"]}
// This is ./metmuseum/article.js, where we define the behaviour of articles elements which wrap our figures

import { getMuseumSearch, getMuseumObject } from "./api.js";
import createFigure from "./figure.js";

export const io = new IntersectionObserver((entries) => {
    const intersecting = entries.filter(e => e.isIntersecting);
    for (const entry of intersecting) {
        io.unobserve(entry.target);
        loadArticle(entry.target);
    }
});

async function loadArticle(article) {
    const objectID = article.dataset.objectId;
    const object = await getMuseumObject(objectID);
    const figure = createFigure(object);
    article.append(figure);
}

function createArticle(objectID) {
    const article = document.createElement('article');
    article.dataset.objectId = objectID;
    io.observe(article);
    return article;
}

export async function search(query) {
    const objectIDs = await getMuseumSearch(query);
    return objectIDs.map(createArticle);
}
```

The result is that our results are loaded much more efficiently since if the user does not scroll down the page then the data will not even be requested.

As the articles scroll into view, the user sees a loading indicator whilst the data is being requested and this is replaced quickly with the actual data.

{{<iframe src="iframes/step-11" width="320" height="600">}}{{</iframe>}}

A small CSS tweak will animate the appearance of the new data. 

```css {hl_lines=["107-108", "129-131"]}
@import url('https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300&display=swap');

:root {
    --red: hsl(0, 70%, 50%);
    --dark: hsl(0, 0%, 20%);
    --light: hsl(0, 0%, 90%);
}

body {
    font-family: "Open Sans Condensed", sans-serif;
    background: var(--dark);
    color: var(--light);
    display: grid;
    margin: 0;
    grid-template-rows: auto 1fr auto;
    min-height: 100dvh;

    header, footer {
        background: var(--red);
        padding-inline: 1rem;
    }

    header {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;

        h1 {
            margin-block: 0.5rem;
        }
        section#search {
            margin-block: 0.5rem;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 1ch;
            label::after {
                content: ":";
            }
            input {
                font-family: system-ui;
                font-size: inherit;
            }
        }
    }
    footer {
        padding-block: 0.5rem;
        text-align: right;
        a {
            color: inherit;
        }
    }
}

main {
    display: grid;
    &::before {
        padding: 0.25rem 1rem;
        content: attr(data-message);
    }
    &:empty {
        padding: 1rem;
        place-items: center;
        &::before {
            font-size: 2em;
            text-align: center;
            content: "Enter a search term to explore the collection"
        }
        &.loading {
            place-content: center;
            &::before {
                content: "searching";
            }
            &::after {
                content: "";
                width: 3em;
                aspect-ratio: 15;
                background: var(--red);
                animation: search 300ms infinite alternate ease-in-out;
            }
        }
    }
    article {
        display: grid;
        &:empty {
            place-items: center;
            place-content: center;
            gap: 0.25rem;
            aspect-ratio: 1;
            border-block: 1px solid var(--light);
            &::before { content: "loading..."; }
            &::after {
                content: "";
                aspect-ratio: 2;
                width: 0;
                border-width: 2em;
                border-style: solid;
                border-radius: 2em;
                border-color: var(--red) var(--light);
                box-shadow: 0 0 10px 1px var(--light);
                animation: spin 1s infinite ease-in-out;
            }
        }
    }
    figure {
        opacity: 0;
        animation: fadeIn 400ms;
        display: grid;
        margin: 0;
        img {
            width: 100%;
        }
        figcaption {
            background: var(--light);
            color: var(--dark);
            padding: 1rem;
        }
    }
}

@keyframes search {
    0% { translate: -100%; }
    100% { translate: 100%; }
}
@keyframes spin {
    100% { rotate: 1turn; }
}
@keyframes fadeIn {
    100% { opacity: 1; }
}
```

Now our object data animates in.

{{<iframe src="iframes/step-12" width="320" height="600">}}{{</iframe>}}


## Challenges

A few challenges to expand the application.

1. Expand the interface to include more data from the API (e.g. *"objectName"*, *"ObjectDate"* and *"medium"*).
1. Implement a checkbox for the user to decide the value for `isHighlight` in the search request.
1. Make the application work on larger screens.

You may end up with something like this:

{{<iframe src="iframes/final" width="1000" height="600">}}{{</iframe>}}


## Conclusions

We have built a user interface for the [Metropolitan Museum of Art] JSON API based on making HTTP requests using [fetch].
We divided the task into loading [search] results and loading individual [object] requests.
We inserted placeholder elements for each search result returned with the *"objectID"* stored in the DOM using the [HTMLElement.dataset] property. 
Crucially, we used the [IntersectionObserver] API to only load individual objects when they are being shown.

The user interface was divided into four main states:

- Before the user has entered a search, they are presented with a prompt 
- Whilst the search request is being requested from the server, they get a searching animation
- Whilst the individual object requests are being requested from the server, they see a loading animation
- After objects have been loaded, they see the object data.

We tried to implement as much as possible in the CSS layer and minimise the JavaScript.


[Metropolitan Museum of Art]: (https://www.metmuseum.org/)
[About the MET API]: https://www.metmuseum.org/perspectives/met-api-third-anniversary
[API documentation]: https://metmuseum.github.io/
[object]: https://metmuseum.github.io/#object
[search]: https://metmuseum.github.io/#search

[async]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
[await]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
[fetch]: https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch
[logical OR]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR
[HTMLElement.dataset]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset

[IntersectionObserver]: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

[observe]: https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/observe
[unobserve]: https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/unobserve