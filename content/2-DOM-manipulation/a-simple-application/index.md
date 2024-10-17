---
title: A simple application
type: exercise
weight: 30
author: Dr Graeme Stuart
---

The Document Object Model (DOM) doesn't need to be static.
With JavaScript, we can create dynamic applications in HTML without the need for reloading.

<!--more-->

In this exercise, we will introduce the basics of building dynamic applications using event listeners and DOM manipulation.
However, we will be approaching the topic holistically, considering our HTML and CSS carefully as we introduce JavaScript.

> Create a folder for this exercise. 
> You can organise your files in whatever way suits you.
> Just consider that you will be creating lots of code and you will need to keep it organised.
> One approach might be to contain all the exercise code in one place and all your personal experiments in another.
>
> ```markdown {linenos=false}
> CTEC3705
>  ├─ exercises
>  │    └─ 1_DOM_manipulation
>  └─ experiments
>       ├─ experiment_1
>       └─ experiment_2
> ```
> Open the *folder* for this exercise in VSCode.

## A simple application

We will build a simple "todo list" application to demonstrate the concepts and technologies involved.
The primary user requirements of the applications are as follows:

>1. The user should be able to view a list of items
>1. The user should be able to add new items to the list
>1. The user should be able to delete items from the list
>1. The user should be able to toggle an item's 'done' state

A full application would have more requirements and more detail, but we will stick with this core list for this exercise.

In this exercise, we will take the simplest approach possible.
In terms of a plan of action, we should consider the order in which we will implement the the core functionality.
Each additional feature should provide the smallest possible incremental improvement, keeping each step as simple as possible.

> Think about the order in which we should add the features.
> The list **must** be in place *before* we can add items to it.
> We **must** have items in the list *before* we can remove them or toggle them. 
> The last two features could be implemented in either order, however, we will choose deleting first as it should be easier than toggling.

## An HTML template

Considering the HTML structure and components of our application is important.
The HTML will provide a foundation for the project.
A simple starting point is the default VSCode HTML template.

> Create a file `index.html` and use the default template (type a single exclamation mark `!`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
```

We should make a few changes here.

> - Replace the title with something like "Todo Application".
> - Insert a link to a stylesheet
> - Insert a script element with `type="module"`

```html {hl_lines=["6-8"]}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo Application</title>
    <link rel="stylesheet" href="assets/style.css">
    <script type="module" src="assets/todo-list.js"></script>
</head>
<body>
</body>
</html>
```

We have set the locations of the linked files in an `assets` folder.
This keeps the project neat.

> Make sure you create the folder structure and these files, they can be empty for now.
>
>```text
>1_DOM_manipulation
>   ├─ assets
>   │   ├─ style.css
>   │   └─ todo-list.js
>   └─ index.html
>```
> We won't need any other files. 
> All the HTML, CSS and JavaScript will be in these three files.

### Core HTML structure

Within the `<body>` of the document we need a basic structure to provide orientation for new users and to support the visual layout of the page.
To make a basic start on this we can add a `<header>`, a `<main>` and a `<footer>` with some contextual information about the application.

```html {hl_lines="11-20"}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo Application</title>
    <link rel="stylesheet" href="style.css">
    <script type="module" src="todo-list.js"></script>
</head>
<body>
    <header>
        <h1>Todo list</h1>
    </header>
    <main>
    </main>
    <footer>
        <small>
            <p>&copy; todo enterprises Ltd.</p>
        </small>
    </footer>
</body>
</html>
```


> Now we should look at what we have produced.
>
> Start the *live server* in VSCode.
> If it is not installed, [install it now](https://ggstuart.github.io/web-application-development/welcome/vscode/#using-the-live-server-extension).

The result should look something like this.
Obviously it's not much yet.
We still have our four features to add, each with implications for the HTML.
The functional pieces will go within the `<main>` element.

{{<iframe src="examples/step-01" width="400" height="200">}}{{</iframe>}}

### Some basic styles

Adding some styles now will help us to make the application work well on a mobile device. 
The key thing we want to add is a grid layout on the `<body>` element so that the `<header>`, `<main>` and `<footer>` elements are positioned appropriately.
We want the `<main>` element to take all the available space so the `<footer>` is pushed to the bottom.

> Add some code to `styles.css` as follows

```css
body {
    margin: 0 auto;
    
    display: grid;
    grid-template-rows: auto 1fr auto;
    min-height: 100dvh;
}
```

This has added some structure to the page layout.
The `<body>` element now has no margins and is forced to take up at least the full height of the viewport.
We have allocated this height using the grid so that the `<main>` element will stretch if necessary.

> We have not fixed the height of the body, only provided a minimum value. 
> Adding enough content into the main element will cause a scroll.

However, because we removed the margin, any content within the `<header>`, `<main>` and `<footer>` elements are now squashed right up against the edge of the viewport.

We can add a nested rule which applies to all elements which are direct children of the `<body>` element to give them a bit of padding.

```css {hl_lines="8-10"}
body {
    margin: 0 auto;
    
    min-height: 100dvh;
    display: grid;
    grid-template-rows: auto 1fr auto;

    > * {
        padding-inline: 1rem;
    }
}
```

Now you should see that the content is spread across the height of your viewport and we have given the various elements space to breath.

{{<iframe src="examples/step-02" width="400" height="600">}}{{</iframe>}}

> We will take a mobile-first approach here. 
> So, for now, we are only interested in how the site appears in a smaller viewport.

We can also add a colour scheme and font with [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*).
This will allow us to use the same properties in different places in our application.


```css {hl_lines=["1-11", "13-15"]}
:root {
    --main-bg1: hsl(285 10% 27% / 0.9);
    --main-bg2: hsl(285, 10%, 15%);
    --main-bg-gradient: linear-gradient(
        var(--main-bg1), 
        var(--main-bg2)
    );
    --main-font: system-ui;
    --main-color: hsl(285, 5%, 80%);
}

body {
    font-family: var(--main-font);
    background: var(--main-bg-gradient);
    color: var(--main-color);

    margin: 0 auto;
    
    min-height: 100dvh;
    display: grid;
    grid-template-rows: auto 1fr auto;

    > * {
        padding-inline: 1rem;
    }
}
```

> It helps to add properties which you may want to change to the top of the file as it makes it easier to change them later without seeking out the places where they are defined.

The result is beginning to look less horrid.
Feel free to set your own fonts and colours.

{{<iframe src="examples/step-03" width="400" height="600">}}{{</iframe>}}


## Creating the application

Let's get some more HTML in place, adding the elements which will be fundamental to the application operation.
We need:

- A list element to contain the items
- A way to add new items
- A way to delete each item
- A way to toggle the 'done' state of each item

### A list element

*Presenting a list* should be straight forward, we need to choose between an [unordered list](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul) (`<ul>`) and an [ordered list](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol) (`<ol>`).
I'm going with an unordered list, simply because the application requirements do not describe the requirement to order the list.
Feel free to use an ordered list if you like, though this would require some minor modifications to the code presented in this exercise.

> For a more quirky implementation, a [description list](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl) (`<dl>`) could also potentially be used, though this would require each item to have a term and a description (adding new requirements that we will not pursue here). 
> Feel free to try this once you are confident.

### Two approaches to adding elements to the DOM

Now we need to consider how the list will make it into our DOM. 
Will we hard-code it in HTML or insert it using JavaScript?

#### Accessing a static list with JavaScript 

We *could* add the list into our HTML directly.

```html {hl_lines=15}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo Application</title>
    <link rel="stylesheet" href="style.css">
    <script type="module" src="todo-list.js"></script>
</head>
<body>
    <header>
        <h1>Todo list</h1>
    </header>
    <main>
        <ul id="todo-list"></ul>
    </main>
    <footer>
        <small>
            <p>&copy; todo enterprises Ltd.</p>
        </small>
    </footer>
</body>
</html>
```
> We added an `id` attribute to our list because this makes it easier to pinpoint the exact element with JavaScript.

With the list element in place, we can add some JavaScript code into our `assets/todo-list.js` module to get a reference to the list.

```js
const list = document.getElementById('todo-list');
console.log(list);
```

OK, this doesn't do much, but if you check the JavaScript console in your web browser (accessible through e.g. *F12* or *Ctrl + Shift + I*, see [this exercise](https://ggstuart.github.io/web-application-development/welcome/chrome/#the-browser-developer-tools) for a reminder) you should see the element has been found and logged.

> The [`getElementById`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById) method of the [`Document`](https://developer.mozilla.org/en-US/docs/Web/API/Document) API provides a reliable way to target specific elements with unique `id` attributes.

This approach is absolutely fine. 
However, we are looking at JavaScript here, so there is an alternative approach we might favour.


#### Dynamically generating a list element

*Alternatively*, we can dynamically generate the list element and insert it into the document.

>Since we are talking about JavaScript here, this will be the approach we will take in this exercise.
>
> Remove the list element from your HTML.
> We will create it and insert it with JavaScript instead.

Update your `todo-list.js` file as follows:

```js
const main = document.querySelector('main');
const list = document.createElement('ul');

main.append(list);
```

> We will now explain this in detail, because it's the first time.

In line 1 we are using the [`querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) method of the [`Document`](https://developer.mozilla.org/en-US/docs/Web/API/Document) API using [CSS selector syntax](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors/Selectors_and_combinators).
We grab a reference to our `<main>` element and assign it to a JavaScript variable we have called `main`.

```js
const main = document.querySelector('main');
```

In line 2 we then use the [`createElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) method to create our list (we specified a `<ul>` element in this case) and assign it to a JavaScript variable we have called `list`.

```js {linenostart=2}
const list = document.createElement('ul');
```


Now, both of our variables, `main` and `list` hold references to elements.
The `<main>` element is part of the DOM.
The newly created `<ul>` element is not yet attached to the DOM.

In line 4, to add the list into the document, we used the [`append`](https://developer.mozilla.org/en-US/docs/Web/API/Element/append) method which is available on all [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) objects to attach our list to the DOM.

```js {linenostart=4}
main.append(list);
```

> At this point, the list element is not visible as it has no contents.

Now let's move on to populating the list with content.

### Adding new items

Items consist of a text string 'label' and a boolean 'done' value.
For now, we will only consider the label, since we don't need the 'done' toggling feature yet.

#### UI components

*Adding new items* will require the user to provide a text string.
The obvious element for this is an `<input type="text">`.

We can add one above the list by modifying our code like this.

```js {hl_lines="3-9"}
const main = document.querySelector('main');
const list = document.createElement('ul');
const input = document.createElement('input');

input.type = "text";
input.placeholder = "new item";
input.ariaLabel = "new item";

main.append(input, list);
```

We have created an `<input>` element, set its `type`, `placeholder` and `aria-label` attributes and then added it into the main before our list.

Now our users can type in the text for a new item.

{{<iframe src="examples/step-04" width="400" height="600">}}{{</iframe>}}

But *all* they can do is type.
We need a way for the user to trigger the new item creation.
We need an *event handler*.

There are several options:

- We could listen for the `<input>` 'change' event
- We could listen for a `<button>` 'click' event
- We could listen for a `<form>` 'submit' event 

We will choose the `<form>` option because the form can be submitted by pressing the 'enter' key, which is convenient for the user but the form can also be submitted by a `<button>` so we can provide more options with less code.

> Forms have a facility known as [implicit submission](https://www.w3.org/TR/2011/WD-html5-20110525/association-of-controls-and-forms.html#implicit-submission) which causes a form to be submitted when the user clicks a submit `<button>` or when the user presses enter in an `<input>` element.

Let's create a new `<form>` and add our `<input>` into it, along with a new `<button>`.

```js {hl_lines=[3, 5, "10-16"]}
const main = document.querySelector('main');
const list = document.createElement('ul');
const addForm = document.createElement('form');
const input = document.createElement('input');
const button = document.createElement('button');

input.type = "text";
input.placeholder = "new item";
input.ariaLabel = "new item";

button.type = "submit";
button.textContent = "add";

addForm.append(input, button);

main.append(addForm, list);
```

Study the changes.
They should make sense.
We have created a `<form>` element and a `<button>` element.
We give the button some text content to display the word "add" inside the button.

When we build the DOM structure, we add the input and the button into the form and then add the form and the list into the main element.

The result should look like this.

{{<iframe src="examples/step-05" width="400" height="600">}}{{</iframe>}}

Since the input and button are [inline elements](https://ggstuart.github.io/web-application-development/html-basics/default-flow/#inline-elements), they sit nicely in the form by default. 

The `<form>` has given us a nice mechanism for collecting the user input.

> Try typing a value into the `<input>` element and press enter.
>
> When the form is submitted, the page reloads.
> You can also submit the form by clicking the button.
>
> This is the default behaviour, the form is sending a `GET` request to  load the same page.

#### An event handler

Now we need to attach some JavaScript to the 'submit' event of our form so we can control what happens to the data and avoid the page reload.

> We can add event handlers to all elements (as well as to the `document` and `window` objects) and there are loads of different events we can listen for, depending on the element in question.
> Understanding event handlers is key to understanding JavaScript in the browser.
>
> Read about [event handlers](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events) if you find this confusing.

This is all we need to make our application functional.

```js {hl_lines="17-25"}
const main = document.querySelector('main');
const list = document.createElement('ul');
const addForm = document.createElement('form');
const input = document.createElement('input');
const button = document.createElement('button');

input.type = "text";
input.placeholder = "new item";
input.ariaLabel = "new item";

button.type = "submit";
button.textContent = "add";

addForm.append(input, button);

main.append(addForm, list);

addForm.addEventListener('submit', ev => {
    ev.preventDefault();
    if(!input.value) return;
    const li = document.createElement('li');
    li.textContent = input.value;
    input.value = "";
    list.append(li);
});
```

This requires some explanation.

Notice that we are calling the [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) method on our form and passing two arguments.

- A string (in this case, `'submit'`) indicating the event we want to listen for
- A [callback function](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function) describing what to do when the event triggers.

The function we pass is also known as an [event handler](https://developer.mozilla.org/en-US/docs/Web/Events/Event_handlers).
Event handlers typically take an [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event) object as an argument.
Our *event handler* function will be automatically executed by the browser whenever the specified event is triggered on the given element.
The event object is automatically passed to the function.

We have provided the callback function as an [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), defined inline.

> Alternatively, we could have defined a named function like this for our event handler:
>
>```js {linenos=false}
> function AddFormSubmitHandler(ev) {
>     ev.preventDefault();
>     if(!input.value) return;
>     const li = document.createElement('li');
>     li.textContent = input.value;
>     input.value = "";
>     list.append(li);
> }  
>```
> We know this is an event handler from the name, but also because it takes an event object as its only argument.
> With this function defined, we could have passed it into the `addEventListener` method like so.
> ```js  {linenos=false}
> addForm.addEventListener('submit', createItemSubmitHandler);
>``` 
> This would achieve the identical effect.
> In this case we have chosen brevity over clarity.

#### How does it work?

In this case, the 'submit' event is specific to forms.
Our event handler will be executed whenever the form is submitted.

The first thing we do is we call the [preventDefault](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) method on the event object.
This stops the form from actually submitting its HTTP request and so prevents the page from reloading.

```js {linenostart=19}
ev.preventDefault();
```


We then check to see if the `<input>` element has a value.
If it doesn't (i.e. if it is an empty string), then we return without doing anything.

```js {linenostart=20}
if(!input.value) return;
```

At this point we are able to create an `<li>` element and set its content to the value entered by the user into the `<input>` element.

```js {linenostart=21}
const li = document.createElement('li');
li.textContent = input.value;
```

Finally, we clear the input so the user can add another item and insert our newly created item into our list.

```js {linenostart=23}
input.value = "";
list.append(li);
```


Our application now has some concrete functionality.
We can now add a new item to our list.

{{<iframe src="examples/step-06" width="400" height="600">}}{{</iframe>}}

Whilst the page is in the browser, our JavaScript code is in control, modifying the DOM according to the logic we have implemented.
Use *the enter key* to efficiently submit multiple items.
Try submitting *an empty item*, it should be ignored.

>However, refreshing the page reloads the application from scratch, returning us to an empty list.
> We will solve this another time.

#### More styles

The bullet point list is not really how we want it to look. 
We can add some styles to make the system look a bit more like the application in our imagination.

> This is from my imagination, yours will require different code.

We will start by controlling the layout and styles of the form.

```css {hl_lines=["11-17","35-53"]}
:root {
    --main-bg1: hsl(285 10% 27% / 0.9);
    --main-bg2: hsl(285, 10%, 15%);
    --main-bg-gradient: linear-gradient(
        var(--main-bg1), 
        var(--main-bg2)
    );
    --main-font: system-ui;
    --main-color: hsl(285, 5%, 80%);

    --highlight-bg1: hsl(24, 96%, 55%);
    --highlight-bg2: hsl(24, 96%, 45%);
    --highlight-bg-gradient: linear-gradient(
        var(--highlight-bg1),
        var(--highlight-bg2)
    );
    --highlight-color: hsl(24, 5%, 90%);
}

body {
    font-family: var(--main-font);
    background: var(--main-bg-gradient);
    color: var(--main-color);

    margin: 0 auto;
    
    min-height: 100dvh;
    display: grid;
    grid-template-rows: auto 1fr auto;

    > * {
        padding-inline: 1rem;
    }
}

button {
    background: var(--highlight-bg-gradient);
    color: var(--highlight-color);
}

form {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.5rem;
    
    input,
    button {
        border: none;
        font-size: inherit;
        padding: 0.5rem;
        border-radius: 3px;
    }
}
```

We have set some more colours for `<button>` elements, controlled the layout of the `<form>` and set the `font-size` and basic box properties of both `<input>` and `<button>` elements inside the form.

The result is starting to look decent.

> You may disagree.
> If you are confident, make improvements.

{{<iframe src="examples/step-07" width="400" height="600">}}{{</iframe>}}

Now we should improve the list itself.

```css {hl_lines=["16-23", "61-75"]}
:root {
    --main-bg1: hsl(285 10% 27% / 0.9);
    --main-bg2: hsl(285, 10%, 15%);
    --main-bg-gradient: linear-gradient(
        var(--main-bg1),
        var(--main-bg2));
    --main-font: system-ui;
    --main-color: hsl(285, 5%, 80%);

    --highlight-bg1: hsl(24, 96%, 55%);
    --highlight-bg2: hsl(24, 96%, 45%);
    --highlight-bg-gradient: linear-gradient(
        var(--highlight-bg1),
        var(--highlight-bg2));
    --highlight-color: hsl(24, 5%, 90%);

    --item-bg1: hsl(135, 14%, 48%);
    --item-bg2: hsl(135, 14%, 38%);
    --item-bg-gradient: linear-gradient(
            90deg,
            var(--item-bg1),
            var(--item-bg2));
    --item-color: hsl(135, 5%, 90%);
}

body {
    font-family: var(--main-font);
    background: var(--main-bg-gradient);
    color: var(--main-color);

    margin: 0 auto;

    min-height: 100dvh;
    display: grid;
    grid-template-rows: auto 1fr auto;

    >* {
        padding-inline: 1rem;
    }
}

button {
    background: var(--highlight-bg-gradient);
    color: var(--highlight-color);
}

form {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.5rem;

    input,
    button {
        border: none;
        font-size: inherit;
        padding: 0.5rem;
        border-radius: 3px;
    }
}

ul {
    padding: 0;
    list-style: none;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    li {
        background: var(--item-bg-gradient);
        color: var(--item-color);
        padding: 0.5rem;
        border-radius: 3px;
    }
}
```

These simple tweaks control the layout of the list with flexbox and add some colour to the list items as well as tweaking their box properties slightly for a more consistent look.

{{<iframe src="examples/step-08" width="400" height="600">}}{{</iframe>}}

### Deleting items from the list

Deleting items is different. 
We can't simply have a single `<form>` for this.
Each item in the list will need its own delete `<button>`.

> It could be a `<form>` as above, but we only need a `<button>` here.

Let's update our JavaScript to insert the new element.

```js {hl_lines=["22-23", 25]}
const main = document.querySelector('main');
const list = document.createElement('ul');
const addForm = document.createElement('form');
const input = document.createElement('input');
const button = document.createElement('button');

input.type = "text";
input.placeholder = "new item";
input.ariaLabel = "new item";

button.type = "submit";
button.textContent = "add";

addForm.append(input, button);

main.append(addForm, list);

addForm.addEventListener('submit', ev => {
    ev.preventDefault();
    if (!input.value) return;
    const li = document.createElement('li');
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = "&times;";
    li.textContent = input.value;
    li.append(deleteBtn);
    input.value = "";
    list.append(li);
});
```

The change is simple, all we are doing is creating a new `<button>` element and appending it to the list item.

> One wrinkle is that we are setting its content via [innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML) because we need to interpret the `&times;` symbol (&times;) as html.

Checking the result we can see it has worked but there are issues.

{{<iframe src="examples/step-09" width="400" height="600">}}{{</iframe>}}

Obviously, the styling isn't right. 
The buttons are not taking on all the basic styles. 
We need a quick refactor.

One problem is that our button and input styles are nested inside the form styles.
This means they are not being applied outside of a form. 

We will move the nested rules so that *all* inputs and buttons, no matter where they appear will take on these core styles.

```css {hl_lines=["47-53", "60-66"]}
:root {
    --main-bg1: hsl(285 10% 27% / 0.9);
    --main-bg2: hsl(285, 10%, 15%);
    --main-bg-gradient: linear-gradient(
        var(--main-bg1),
        var(--main-bg2));
    --main-font: system-ui;
    --main-color: hsl(285, 5%, 80%);

    --highlight-bg1: hsl(24, 96%, 55%);
    --highlight-bg2: hsl(24, 96%, 45%);
    --highlight-bg-gradient: linear-gradient(
        var(--highlight-bg1),
        var(--highlight-bg2));
    --highlight-color: hsl(24, 5%, 90%);

    --item-bg1: hsl(135, 14%, 48%);
    --item-bg2: hsl(135, 14%, 38%);
    --item-bg-gradient: linear-gradient(
        90deg,
        var(--item-bg1),
        var(--item-bg2));
    --item-color: hsl(135, 5%, 90%);
}

body {
    font-family: var(--main-font);
    background: var(--main-bg-gradient);
    color: var(--main-color);

    margin: 0 auto;

    min-height: 100dvh;
    display: grid;
    grid-template-rows: auto 1fr auto;

    >* {
        padding-inline: 1rem;
    }
}

button {
    background: var(--highlight-bg-gradient);
    color: var(--highlight-color);
}

input,
button {
    border: none;
    font-size: inherit;
    padding: 0.5rem;
    border-radius: 3px;
}

form {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.5rem;








}

ul {
    padding: 0;
    list-style: none;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    li {
        background: var(--item-bg-gradient);
        color: var(--item-color);
        padding: 0.5rem;
        border-radius: 3px;
    }
}
```

Now you should see that the buttons look better, but their placement is still wrong.
We will need to make the list item container into a grid, similar to the form.

#### A visual class

Let's factor out the visual style of our form so we can use it elsewhere. 
Our form is a container that holds two elements. 
The first element takes up the majority of the space.
The second element is a button that should be automatically sized depending on its content.

The idea is that we can format our `<li>` in the same way. 
Perhaps with a `<span>` to hold the text and our `<button>` as before.
By adding the same class to our form and to our list item, we can keep our styles well organised and ensure consistency in the look and feel of the page.

The first step is to make the change in structure.

```js {hl_lines=[22, 25, 26]}
const main = document.querySelector('main');
const list = document.createElement('ul');
const addForm = document.createElement('form');
const input = document.createElement('input');
const button = document.createElement('button');

input.type = "text";
input.placeholder = "new item";
input.ariaLabel = "new item";

button.type = "submit";
button.textContent = "add";

addForm.append(input, button);

main.append(addForm, list);

addForm.addEventListener('submit', ev => {
    ev.preventDefault();
    if (!input.value) return;
    const li = document.createElement('li');
    const label = document.createElement('span');
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = "&times;";
    label.textContent = input.value;
    li.append(label, deleteBtn);
    input.value = "";
    list.append(li);
});
```
We have simply created a new `<span>` element and used it to hold the text.

Next, we add the new class onto the `<form>` and the `<li>` elements.

We will call the class `.with-button`.
This may be a stupid name, but in this context it reflects the purpose well enough. 

> You may prefer a longer name such as `.container-with-button` for example.
> In a small project like this, the name shouldn't be a problem as long as we know what it is for.


```js {hl_lines=["13-14", 28]}
const main = document.querySelector('main');
const list = document.createElement('ul');
const addForm = document.createElement('form');
const input = document.createElement('input');
const button = document.createElement('button');

input.type = "text";
input.placeholder = "new item";
input.ariaLabel = "new item";

button.type = "submit";
button.textContent = "add";

addForm.classList.add('with-button');

addForm.append(input, button);

main.append(addForm, list);

addForm.addEventListener('submit', ev => {
    ev.preventDefault();
    if (!input.value) return;
    const li = document.createElement('li');
    const label = document.createElement('span');
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = "&times;";
    label.textContent = input.value;
    li.classList.add('with-button');
    li.append(label, deleteBtn);
    input.value = "";
    list.append(li);
});
```

> We are making this refactoring change step-by-step so you can hopefully see the individual moves are fairly simple, even if the overall change is complex.

Now we can take the `<form>` styles and move them to the new class.
We also need to switch out the `<li>` styles for `<span>` styles.

```css {hl_lines=[55, 69]}
:root {
    --main-bg1: hsl(285 10% 27% / 0.9);
    --main-bg2: hsl(285, 10%, 15%);
    --main-bg-gradient: linear-gradient(
        var(--main-bg1),
        var(--main-bg2));
    --main-font: system-ui;
    --main-color: hsl(285, 5%, 80%);

    --highlight-bg1: hsl(24, 96%, 55%);
    --highlight-bg2: hsl(24, 96%, 45%);
    --highlight-bg-gradient: linear-gradient(
        var(--highlight-bg1),
        var(--highlight-bg2));
    --highlight-color: hsl(24, 5%, 90%);

    --item-bg1: hsl(135, 14%, 48%);
    --item-bg2: hsl(135, 14%, 38%);
    --item-bg-gradient: linear-gradient(
        90deg,
        var(--item-bg1),
        var(--item-bg2));
    --item-color: hsl(135, 5%, 90%);
}

body {
    font-family: var(--main-font);
    background: var(--main-bg-gradient);
    color: var(--main-color);

    margin: 0 auto;

    min-height: 100dvh;
    display: grid;
    grid-template-rows: auto 1fr auto;

    >* {
        padding-inline: 1rem;
    }
}

button {
    background: var(--highlight-bg-gradient);
    color: var(--highlight-color);
}

input,
button {
    border: none;
    font-size: inherit;
    padding: 0.5rem;
    border-radius: 3px;
}

.with-button {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.5rem;
}

ul {
    padding: 0;
    list-style: none;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    span {
        background: var(--item-bg-gradient);
        color: var(--item-color);
        padding: 0.5rem;
        border-radius: 3px;
    }
}
```

This simple change has improved the site without adding new CSS code.
All we needed to do was change the way we used selectors.

The form is OK, but I don't like the way the items are broken into two pieces. 
We can do better.

{{<iframe src="examples/step-10" width="400" height="600">}}{{</iframe>}}

We can modify the new class to remove the gap and create a sleeker design.

> Remember that the `.with-button` class is only to be added to elements with two children where the second child is a button.
> So we can easily target the first and second element using the pseudo-classes `:first-child` and `:last-child`.

```css {hl_lines="58-66"}
:root {
    --main-bg1: hsl(285 10% 27% / 0.9);
    --main-bg2: hsl(285, 10%, 15%);
    --main-bg-gradient: linear-gradient(
        var(--main-bg1),
        var(--main-bg2));
    --main-font: system-ui;
    --main-color: hsl(285, 5%, 80%);

    --highlight-bg1: hsl(24, 96%, 55%);
    --highlight-bg2: hsl(24, 96%, 45%);
    --highlight-bg-gradient: linear-gradient(
        var(--highlight-bg1),
        var(--highlight-bg2));
    --highlight-color: hsl(24, 5%, 90%);

    --item-bg1: hsl(135, 14%, 48%);
    --item-bg2: hsl(135, 14%, 38%);
    --item-bg-gradient: linear-gradient(
        90deg,
        var(--item-bg1),
        var(--item-bg2));
    --item-color: hsl(135, 5%, 90%);
}

body {
    font-family: var(--main-font);
    background: var(--main-bg-gradient);
    color: var(--main-color);

    margin: 0 auto;

    min-height: 100dvh;
    display: grid;
    grid-template-rows: auto 1fr auto;

    >* {
        padding-inline: 1rem;
    }
}

button {
    background: var(--highlight-bg-gradient);
    color: var(--highlight-color);
}

input,
button {
    border: none;
    font-size: inherit;
    padding: 0.5rem;
    border-radius: 3px;
}

.with-button {
    display: grid;
    grid-template-columns: 1fr auto;

    
    *:first-child {
        border-radius: 3px 0 0 3px;
    }

    button:last-child {
        border-radius: 0 3px 3px 0;
    }
}

ul {
    padding: 0;
    list-style: none;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    span {
        background: var(--item-bg-gradient);
        color: var(--item-color);
        padding: 0.5rem;
        border-radius: 3px;
    }
}
```

Removing the gap looks great. 

{{<iframe src="examples/step-11" width="400" height="600">}}{{</iframe>}}

A final bit of tidying up, we will introduce more generic, reusable classes into our design.
For this, we need to add classes to elements that should take on the highlight or item colours.

```js {hl_lines=[13, 28, 30]}
const main = document.querySelector('main');
const list = document.createElement('ul');
const addForm = document.createElement('form');
const input = document.createElement('input');
const button = document.createElement('button');

input.type = "text";
input.placeholder = "new item";
input.ariaLabel = "new item";

button.type = "submit";
button.textContent = "add";
button.classList.add('highlight');

addForm.classList.add('with-button');

addForm.append(input, button);

main.append(addForm, list);

addForm.addEventListener('submit', ev => {
    ev.preventDefault();
    if (!input.value) return;
    const li = document.createElement('li');
    const label = document.createElement('span');
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = "&times;";
    deleteBtn.classList.add('highlight');
    label.textContent = input.value;
    label.classList.add('item');
    li.classList.add('with-button');
    li.append(label, deleteBtn);
    input.value = "";
    list.append(li);
});
```

> This small additional work will help make the CSS much simpler.


We can also refactor the `<span>` styles, combining the `padding` and `border-radius` with the `<input>` and `<button>` styles.

```css {hl_lines=["42-47", 52, 81]}
:root {
    --main-bg1: hsl(285 10% 27% / 0.9);
    --main-bg2: hsl(285, 10%, 15%);
    --main-bg-gradient: linear-gradient(
        var(--main-bg1),
        var(--main-bg2));
    --main-font: system-ui;
    --main-color: hsl(285, 5%, 80%);

    --highlight-bg1: hsl(24, 96%, 55%);
    --highlight-bg2: hsl(24, 96%, 45%);
    --highlight-bg-gradient: linear-gradient(
        var(--highlight-bg1),
        var(--highlight-bg2));
    --highlight-color: hsl(24, 5%, 90%);

    --item-bg1: hsl(135, 14%, 48%);
    --item-bg2: hsl(135, 14%, 38%);
    --item-bg-gradient: linear-gradient(
        90deg,
        var(--item-bg1),
        var(--item-bg2));
    --item-color: hsl(135, 5%, 90%);
}

body {
    font-family: var(--main-font);
    background: var(--main-bg-gradient);
    color: var(--main-color);

    margin: 0 auto;

    min-height: 100dvh;
    display: grid;
    grid-template-rows: auto 1fr auto;

    >* {
        padding-inline: 1rem;
    }
}

.item {
    background: var(--item-bg-gradient);
    color: var(--item-color);
}

.highlight {
    background: var(--highlight-bg-gradient);
    color: var(--highlight-color);
}

span,
input,
button {
    border: none;
    font-size: inherit;
    padding: 0.5rem;
    border-radius: 3px;
}

.with-button {
    display: grid;
    grid-template-columns: 1fr auto;

    *:first-child {
        border-radius: 3px 0 0 3px;
    }

    button:last-child {
        border-radius: 0 3px 3px 0;
    }
}

ul {
    padding: 0;
    list-style: none;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;

}
```

You should see the application still looks the same, we have just refactored the implementation.

#### Activating the delete buttons

Obviously, the delete buttons currently don't actually do anything.
We need to register a unique event handler on each button.

```js {hl_lines="36-38"}
const main = document.querySelector('main');
const list = document.createElement('ul');
const addForm = document.createElement('form');
const input = document.createElement('input');
const button = document.createElement('button');

input.type = "text";
input.placeholder = "new item";
input.ariaLabel = "new item";

button.type = "submit";
button.textContent = "add";
button.classList.add('highlight');

addForm.classList.add('with-button');

addForm.append(input, button);

main.append(addForm, list);

addForm.addEventListener('submit', ev => {
    ev.preventDefault();
    if (!input.value) return;
    const li = document.createElement('li');
    const label = document.createElement('span');
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = "&times;";
    deleteBtn.classList.add('highlight');
    label.textContent = input.value;
    label.classList.add('item');
    li.classList.add('with-button');
    li.append(label, deleteBtn);
    input.value = "";
    list.append(li);

    deleteBtn.addEventListener('click', ev => {
        li.remove();
    });
});
```

> This is a [closure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) because the `li` variable is accessed from within our nested event handler function.
Even though the delete button is pressed after the submit event handler has completed, the `li` variable created on line 24 is still accessible from within the closure.

This simple addition activates the delete button on each item.

{{<iframe src="examples/step-12" width="400" height="600">}}{{</iframe>}}

### Toggling the 'done' state

The `<input type="checkbox">` is a great way to store a boolean value.
So, we will convert our `<span>` to a `<label>` and add an `<input type="checkbox">` inside it.

```js {hl_lines=["25-26", "32-33"]}
const main = document.querySelector('main');
const list = document.createElement('ul');
const addForm = document.createElement('form');
const input = document.createElement('input');
const button = document.createElement('button');

input.type = "text";
input.placeholder = "new item";
input.ariaLabel = "new item";

button.type = "submit";
button.textContent = "add";
button.classList.add('highlight');

addForm.classList.add('with-button');

addForm.append(input, button);

main.append(addForm, list);

addForm.addEventListener('submit', ev => {
    ev.preventDefault();
    if (!input.value) return;
    const li = document.createElement('li');
    const label = document.createElement('label');
    const done = document.createElement('input');
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = "&times;";
    deleteBtn.classList.add('highlight');
    label.textContent = input.value;
    label.classList.add('item');
    done.type = "checkbox";
    label.append(done);
    li.classList.add('with-button');
    li.append(label, deleteBtn);
    input.value = "";
    list.append(li);

    deleteBtn.addEventListener('click', ev => {
        li.remove();
    });
});
```

We need to update our CSS to account for the change from `<span>` to `<label>`.

```css {hl_lines=52}
:root {
    --main-bg1: hsl(285 10% 27% / 0.9);
    --main-bg2: hsl(285, 10%, 15%);
    --main-bg-gradient: linear-gradient(
        var(--main-bg1),
        var(--main-bg2));
    --main-font: system-ui;
    --main-color: hsl(285, 5%, 80%);

    --highlight-bg1: hsl(24, 96%, 55%);
    --highlight-bg2: hsl(24, 96%, 45%);
    --highlight-bg-gradient: linear-gradient(
        var(--highlight-bg1),
        var(--highlight-bg2));
    --highlight-color: hsl(24, 5%, 90%);

    --item-bg1: hsl(135, 14%, 48%);
    --item-bg2: hsl(135, 14%, 38%);
    --item-bg-gradient: linear-gradient(
        90deg,
        var(--item-bg1),
        var(--item-bg2));
    --item-color: hsl(135, 5%, 90%);
}

body {
    font-family: var(--main-font);
    background: var(--main-bg-gradient);
    color: var(--main-color);

    margin: 0 auto;

    min-height: 100dvh;
    display: grid;
    grid-template-rows: auto 1fr auto;

    >* {
        padding-inline: 1rem;
    }
}

.item {
    background: var(--item-bg-gradient);
    color: var(--item-color);
}

.highlight {
    background: var(--highlight-bg-gradient);
    color: var(--highlight-color);
}

label,
input,
button {
    border: none;
    font-size: inherit;
    padding: 0.5rem;
    border-radius: 3px;
}

.with-button {
    display: grid;
    grid-template-columns: 1fr auto;

    *:first-child {
        border-radius: 3px 0 0 3px;
    }

    button:last-child {
        border-radius: 0 3px 3px 0;
    }
}

ul {
    padding: 0;
    list-style: none;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;

}
```

Now, each item has a checkbox indicating the done state.

{{<iframe src="examples/step-13" width="400" height="600">}}{{</iframe>}}

We can use CSS to hide the actual checkbox and use the `<label>` `background` and `text-decoration` to indicate the state.

```css {hl_lines="86-94"}
:root {
    --main-bg1: hsl(285 10% 27% / 0.9);
    --main-bg2: hsl(285, 10%, 15%);
    --main-bg-gradient: linear-gradient(
        var(--main-bg1),
        var(--main-bg2)
    );
    --main-font: system-ui;
    --main-color: hsl(285, 5%, 80%);

    --highlight-bg1: hsl(24, 96%, 55%);
    --highlight-bg2: hsl(24, 96%, 45%);
    --highlight-bg-gradient: linear-gradient(
        var(--highlight-bg1),
        var(--highlight-bg2)
    );
    --highlight-color: hsl(24, 5%, 90%);

    --item-bg1: hsl(135, 14%, 48%);
    --item-bg2: hsl(135, 14%, 38%);
    --item-bg-gradient: linear-gradient(
        90deg,
        var(--item-bg1),
        var(--item-bg2)
    );
    --item-color: hsl(135, 5%, 90%);
}

body {
    font-family: var(--main-font);
    background: var(--main-bg-gradient);
    color: var(--main-color);

    margin: 0 auto;

    min-height: 100dvh;
    display: grid;
    grid-template-rows: auto 1fr auto;

    >* {
        padding-inline: 1rem;
    }
}

.item {
    background: var(--item-bg-gradient);
    color: var(--item-color);
}

.highlight {
    background: var(--highlight-bg-gradient);
    color: var(--highlight-color);
}

label,
input,
button {
    border: none;
    font-size: inherit;
    padding: 0.5rem;
    border-radius: 3px;
}

.with-button {
    display: grid;
    grid-template-columns: 1fr auto;

    *:first-child {
        border-radius: 3px 0 0 3px;
    }

    button:last-child {
        border-radius: 0 3px 3px 0;
    }
}

ul {
    padding: 0;
    list-style: none;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;

}

input[type="checkbox"] {
    display: none;
}

label:has(input:checked) {
    text-decoration: line-through;
    background: oklch(from var(--item-bg2) calc(l - .1) c h);
}
```

> I've slightly reformatted the gradient code here also.
> There is no strict right and wrong with CSS formatting.
> However, you should always use a consistent style throughout.

The items can now be toggled by clicking and the 'done' items are clearly identified. 

{{<iframe src="examples/step-14" width="400" height="600">}}{{</iframe>}}

## Refinements

Now we have a fully working and respectable user interface which meets all the requirements, there are a few tweaks we can make that add some refinement to the application.
We can introduce some transition animations to make the experience feel smoother and we can refine our use of fonts.

So this is our final version.

{{<iframe src="examples/step-15" width="400" height="600">}}{{</iframe>}}

Study the code differences highlighted below.
We have used a few new techniques here.

In the JavaScript, we have added a class to an item before removing it.
This class has an animation which visibly removes the item from our list. 
This then allows us to actually remove the element on the `animationend` event.

> The `animationend` event triggers when the animation ends!

```js {hl_lines="40-43"}
const main = document.querySelector('main');
const list = document.createElement('ul');
const addForm = document.createElement('form');
const input = document.createElement('input');
const button = document.createElement('button');

input.type = "text";
input.placeholder = "new item";
input.ariaLabel = "new item";

button.type = "submit";
button.textContent = "add";
button.classList.add('highlight');

addForm.classList.add('with-button');

addForm.append(input, button);

main.append(addForm, list);

addForm.addEventListener('submit', ev => {
    ev.preventDefault();
    if (!input.value) return;
    const li = document.createElement('li');
    const label = document.createElement('label');
    const done = document.createElement('input');
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = "&times;";
    deleteBtn.classList.add('highlight');
    label.textContent = input.value;
    label.classList.add('item');
    done.type = "checkbox";
    label.append(done);
    li.classList.add('with-button');
    li.append(label, deleteBtn);
    input.value = "";
    list.append(li);

    deleteBtn.addEventListener('click', ev => {
        li.classList.add('removing');
        li.addEventListener('animationend', ev => {
            li.remove();
        })
    });
});
```

This allows for an animation to be applied before the item is finally removed.

> Note that if no animation is added to the CSS then the item will not be removed.
> This worries me slightly, but I got over it.

The style updates include the addition of two animations, one to animate new items as they are added into the list and one to animate the items before they are removed.
We also want to animate the background of items when we toggle the 'done' state. 
To achieve this, we have registered our `--item-bg1` and `item-bg2` custom properties using the [@property](https://developer.mozilla.org/en-US/docs/Web/CSS/@property) rule.
This allows us to specify that our custom properties are of type `<color>` and enables the transition animation to apply to a gradient.

```css {hl_lines=["1-12", "55-59", "62-70", "108-116", "123-140"]}
@property --item-bg1 {
    syntax: '<color>';
    initial-value: hsl(135, 14%, 48%);
    inherits: true;
}

@property --item-bg2 {
    syntax: '<color>';
    initial-value: hsl(135, 14%, 28%);
    inherits: true;
}

:root {
    --main-bg1: hsl(285 10% 27% / 0.9);
    --main-bg2: hsl(285, 10%, 15%);
    --main-bg-gradient: linear-gradient(
        var(--main-bg1),
        var(--main-bg2)
    );
    --main-font: system-ui;
    --main-color: hsl(285, 5%, 95%);

    --highlight-bg1: hsl(24, 96%, 55%);
    --highlight-bg2: hsl(24, 96%, 45%);
    --highlight-bg-gradient: linear-gradient(
        var(--highlight-bg1),
        var(--highlight-bg2)
    );
    --highlight-color: hsl(24, 5%, 95%);
    --item-color: hsl(135, 5%, 95%);
}

body {
    font-family: var(--main-font);
    background: var(--main-bg-gradient);
    color: var(--main-color);

    margin: 0 auto;

    min-height: 100dvh;
    display: grid;
    grid-template-rows: auto 1fr auto;

    >* {
        padding-inline: 1rem;
    }
}

h1 {
    font-size: 1.5em;
    font-weight: 400;
}

.item {
    --item-bg-gradient: linear-gradient(
        90deg,
        var(--item-bg1),
        var(--item-bg2)
    );
    background: var(--item-bg-gradient);
    color: var(--item-color);
    transition:
        --item-bg1 .4s,
        --item-bg2 .6s .2s;

    &:has(input:checked) {
        text-decoration: line-through;
        --item-bg1: hsl(135, 14%, 28%);
        --item-bg2: hsl(135, 14%, 18%);
    }
}

.highlight {
    background: var(--highlight-bg-gradient);
    color: var(--highlight-color);
}

label,
input,
button {
    border: none;
    font-size: inherit;
    padding: 0.5rem;
    border-radius: 3px;
}

.with-button {
    display: grid;
    grid-template-columns: 1fr auto;

    *:first-child {
        border-radius: 3px 0 0 3px;
    }

    button:last-child {
        border-radius: 0 3px 3px 0;
    }
}

ul {
    padding: 0;
    list-style: none;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    li {
        margin-top: -2.5rem;
        opacity: 0;
        animation: appear .4s forwards;

        &.removing {
            animation: disappear .4s forwards;
        }
    }
}

input[type="checkbox"] {
    display: none;
}

@keyframes appear {
    100% {
        opacity: 1;
        margin-top: 0;
    }
}

@keyframes disappear {
    0% {
        opacity: 1;
        margin-top: 0;
    }

    100% {
        opacity: 0;
        margin-top: -2.5rem;
    }
}
```

At this point we have taken a very simple concept with four main features and built it into a working application in only 45 lines of JavaScript code.
We paid a lot of attention to how the application is presented and ended up with 140 lines of CSS.

>In this exercise you should have picked up the basics of DOM manipulation. 
Using JavaScript, we can turn an HTML document into a dynamic application.
