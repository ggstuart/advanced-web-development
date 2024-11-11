---
title: HTML Canvas
type: exercise
weight: 20
author: Dr Graeme Stuart
---

The HTML `<canvas>` element was introduced with HTML5.
Fundamentally, it allows developers to read and write pixel data into an element and display the pixels on the screen.

<!--more-->

Although access to the low-level pixel data is provided, the typical way to interact with a `<canvas>` is via the [CanvasRenderingContext2D] API.

> We will be demonstrating the "2d" drawing API.
There are also options for using 3D APIs such as [WebGL] and the newer [WebGPU]. 
However, these are beyond the scope of this module.

## Creating a canvas

A `<canvas>` element can be considered a lot like a customisable `<img>` element.
A `<canvas>` must have `width` and `height` attributes.
These determine the resolution of the image in pixels.
If no values are provided then the defaults are a height of 150px and a width of 300px.

The size of the element on the screen will depend on the width and height as well as the resolution of the screen, although it can also be controlled with CSS in the usual way.
Thus, as very small canvas can be stretched or a very large canvas can be compressed.

Create a new project and add a *800px &times; 400px* canvas as follows.

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
    <script type="module" src="canvas.js"></script>
</head>
<body>
    <canvas id="canvas" width="800" height="400"></canvas>
</body>
</html>
```

> We have also added a css file and a script.

You should find that the canvas is not obviously visible. 
This is because it has no background colour by default.
Look in your developer tools and you should see the element is there and it has the given dimensions.

### Resizing the canvas

In this example we want our canvas to take up the full viewport.

> We don't need to do this, we are choosing to do it. 
> Canvas elements can be given any size you prefer and integrated into a document just like an image or video.

Updating the styles a little will help us to control the position of the canvas precisely.

```css
body {
    margin: 0;
    display: grid;
}
```

We have removed the default margin from the `<body>` element and
added a grid layout to help avoid scrollbars when we resize the canvas using javascript.

In our script, we need to overwrite the `width` and `height` attributes to make our canvas fill the available viewport dimensions.

```js
const w = window.innerWidth;
const h = window.innerHeight;

const canvas = document.getElementById('canvas');

canvas.width = w;
canvas.height = h;
```

We have created two variables `w` and `h` to hold the width and height values.
We have taken these values from the [window] API using the [innerWidth] and [innerHeight] properties.
Then we grab a reference to the `<canvas>` element and set our width and height attributes accordingly.

> We could also take these values from the [clientWidth] and [clientHeight] properties of the [document body] property (which is an [Element] object).


Now, checking the size of our canvas in the developer tools, we should see that it takes up the entire viewport.
Importantly, the canvas resolution is one pixel per screen pixel.
We have not used CSS to *stretch* the canvas, we have increased the canvas to fill the viewport exactly.

But we still see nothing interesting as the canvas is transparent.

## Drawing a line

It's time to actually draw something.

In order to use the 2D drawing API, we need a [CanvasRenderingContext2D] object. 
We get this by calling the [getContext] method of the canvas element.

```js {hl_lines="9"}
const w = window.innerWidth;
const h = window.innerHeight;

const canvas = document.getElementById('canvas');

canvas.width = w;
canvas.height = h;

const ctx = canvas.getContext('2d');
```

> The variable `ctx` is the `CanvasRenderingContext2D` object and is linked to our `<canvas>` element.
It provides us with all the methods we need to draw on our canvas.

The canvas uses a simple 2D coordinates system in which the top-left corner is the origin.
We can call [path methods] of the `CanvasRenderingContext2D` API, providing `(x, y)` coordinates representing points on the canvas.

To draw a simple line between two coordinates, we can use the [moveTo] and [lineTo] methods. 

```js {hl_lines="11-12"}
const w = window.innerWidth;
const h = window.innerHeight;

const canvas = document.getElementById('canvas');

canvas.width = w;
canvas.height = h;

const ctx = canvas.getContext('2d');

ctx.moveTo(50, 50);
ctx.lineTo(w - 50, h - 50);
```

If we imagine a pen moving across the canvas. 
The [moveTo] method moves the pen to the specified coordinates without contacting the canvas.
The [lineTo] method draws a straight line from the current location to the specified coordinates.
So these two lines of code are required to draw a line between two points.

> We have now specified the line coordinates, but the line has not been drawn yet.

The `moveTo` and `lineTo` methods are [path methods], they don't actually do the drawing.
They create a list of instructions (a *path*) which are waiting to be executed.
To actually draw our line onto the canvas, we can call the [stroke] method.

```js {hl_lines="13"}
const w = window.innerWidth;
const h = window.innerHeight;

const canvas = document.getElementById('canvas');

canvas.width = w;
canvas.height = h;

const ctx = canvas.getContext('2d');

ctx.moveTo(50, 50);
ctx.lineTo(w - 50, h - 50);
ctx.stroke();
```


The [stroke] method outlines the current path using the current [strokeStyle] and [lineWidth].
Since the default `strokeStyle` is `#000` (black), and the default `lineWidth` is 1, the result is a thin black line.

{{<iframe src="examples/basic-1" width="1000" height="500">}}{{</iframe>}}

> If you change the value of the [lineWidth] or [strokeStyle] properties *before* calling [stroke] then you should get a different result.

The line begins at coordinate `(50, 50)` since these are the values passed into `moveTo(50, 50)`.
The first value is the `x` (horizontal) coordinate indicating 50 pixels to the right of the left edge of the canvas.
The second value is the `y` (vertical) coordinate indicating 50 pixels below the top edge of the canvas.
This is the starting point of our line.

We passed calculated values into `lineTo(w - 50, h - 50)`.
These similarly indicate that we want the end of the line to be at 50 pixels less than the full width of the canvas (i.e. 50px to the left of the right edge) and 50 pixels less than the full height of the canvas (i.e. 50px above the bottom).

> Note that the `lineTo` method requires a starting coordinate for the line.
If it is called before the *pen* has been given a position then it will not draw a line and will act identically to `moveTo`.



> To draw complex shapes typically involves a lot of careful maths.
> In this case we have demonstrated that we can fairly easily locate points relative to each edge of the canvas.
> Notice that the line will adapt to the size of the canvas
>
> {{<iframe src="examples/basic-1" width="300" height="500">}}{{</iframe>}}
> {{<iframe src="examples/basic-1" width="500" height="300">}}{{</iframe>}}
>
> We will try to keep it fairly simple but there will be a lot of data and mathematical operations involved to calculate the necessary coordinates for more complex drawings.
> We shall see later that it is beneficial to create functions and methods which do these low-level calculations for us so we can work at a higher level of abstraction.

### Closing the path

A single line is a good start, but if we want to create more complex drawings then we will need to create filled shapes.

We will need at least three points for this.
Update your code with a few extra lines.

```js {hl_lines=[12, 14]}
const w = window.innerWidth;
const h = window.innerHeight;

const canvas = document.getElementById('canvas');

canvas.width = w;
canvas.height = h;

const ctx = canvas.getContext('2d');

ctx.moveTo(50, 50);
ctx.lineTo(w - 50, 50);
ctx.lineTo(w - 50, h - 50);
ctx.lineTo(50, h - 50);
ctx.stroke();
```

Each additional call to the `lineTo` method adds another line to the path.
Each line begins where the previous line ended.

> We could have added a call to `moveTo` between the `lineTo` calls. 
This would have created a new *sub-path* leading to a break in the drawn line.

Now our path encloses an area of the canvas.

{{<iframe src="examples/basic-2" width="1000" height="500">}}{{</iframe>}}


We can add a line which joins back to the beginning of the path by calling the [closePath] method.

```js {hl_lines=15}
const w = window.innerWidth;
const h = window.innerHeight;

const canvas = document.getElementById('canvas');

canvas.width = w;
canvas.height = h;

const ctx = canvas.getContext('2d');

ctx.moveTo(50, 50);
ctx.lineTo(w - 50, 50);
ctx.lineTo(w - 50, h - 50);
ctx.lineTo(50, h - 50);
ctx.closePath();
ctx.stroke();
```

This gives us a closed polygon.

{{<iframe src="examples/basic-3" width="1000" height="500">}}{{</iframe>}}

We can fill the rectangle by calling the [fill] method instead of the [stroke] method.

```js {hl_lines=16}
const w = window.innerWidth;
const h = window.innerHeight;

const canvas = document.getElementById('canvas');

canvas.width = w;
canvas.height = h;

const ctx = canvas.getContext('2d');

ctx.moveTo(50, 50);
ctx.lineTo(w - 50, 50);
ctx.lineTo(w - 50, h - 50);
ctx.lineTo(50, h - 50);
ctx.closePath();
ctx.fill();
```

The area inside the path is now filled.

{{<iframe src="examples/basic-4" width="1000" height="500">}}{{</iframe>}}

### Fill and stroke styles

The [fillStyle] and [strokeStyle] properties determine what colour to use when filling or stroking.
They can take any valid CSS colour value and we have seen that the default values for both are `#000` (black).

>There are also more style options such as [lineWidth].
See the [Applying styles and colors] tutorial for more details.

After setting some styles, we can combine `fill` and `stroke` to create a filled rectangle with a border.

```js {hl_lines=["11-13", 21]}
const w = window.innerWidth;
const h = window.innerHeight;

const canvas = document.getElementById('canvas');

canvas.width = w;
canvas.height = h;

const ctx = canvas.getContext('2d');

ctx.fillStyle = 'yellow';
ctx.strokeStyle = 'red';
ctx.lineWidth = 5;

ctx.moveTo(50, 50);
ctx.lineTo(w - 50, 50);
ctx.lineTo(w - 50, h - 50);
ctx.lineTo(50, h - 50);
ctx.closePath();
ctx.fill();
ctx.stroke();
```

> Note that the order in which you call `fill` and `stroke` matters since the `stroke` method draws a line centred on the zero-width path whilst the `fill` method fills the area inside the path and does not affect any pixels outside the path.

{{<iframe src="examples/basic-5" width="1000" height="500">}}{{</iframe>}}


## Convenience methods

The API provides some convenience methods for common tasks.
For example, the [rect] method will add a rectangle to the path.
It takes four arguments, the `(x, y)` coordinates of the top-left corner, the width and the height.

```js {hl_lines="15-16"}
const w = window.innerWidth;
const h = window.innerHeight;

const canvas = document.getElementById('canvas');

canvas.width = w;
canvas.height = h;

const ctx = canvas.getContext('2d');

ctx.fillStyle = 'yellow';
ctx.strokeStyle = 'red';
ctx.lineWidth = 5;

ctx.rect(50, 50, w/2 - 75, h - 100);
ctx.rect(w/2 + 25, 50, w/2 - 75, h - 100);
ctx.fill()
ctx.stroke()
```

The shortcut method saves a lot of typing and complexity.

{{<iframe src="examples/basic-6" width="1000" height="500">}}{{</iframe>}}

> Again, there are calculated values in the code above.
> For complex calculations, having *magic numbers* is usually a bad idea.
> It is much better to name your terms with variables and combine them more explicitly.
>
> Consider how helpful it is to expand your code to be more explicit with the addition of comments.
>
> ```js {hl_lines="15-30"}
> const w = window.innerWidth;
> const h = window.innerHeight;
> 
> const canvas = document.getElementById('canvas');
> 
> canvas.width = w;
> canvas.height = h;
> 
> const ctx = canvas.getContext('2d');
> 
> ctx.fillStyle = 'yellow';
> ctx.strokeStyle = 'red';
> ctx.lineWidth = 5;
> 
> const margin = 50;
> 
> // rectangle height: remove two margins from the canvas height
> const height = h - margin * 2;
>
> // rectangle width: remove three margins from the canvas width and divide by two
> const width = (w - margin * 3) / 2;
> 
> const top = margin;
> const left1 = margin;
>
> // the second rectangle starts after the first
> const left2 = margin + width + margin;
> 
> ctx.rect(left1, top, width, height);
> ctx.rect(left2, top, width, height);
> ctx.fill()
> ctx.stroke()
> ```
>
> Saving a few lines of code can be useful but there is often a trade-off with readability.
> Code should be concise, but not too concise.
> Readability counts.

## Managing paths

Did you notice that the above example did not draw a line from the end of the first rectangle to the beginning of the second?
This is because the [rect] method adds a new *sub-path* onto the path.
A new *sub-path* is created when we call [moveTo]. 

> We can think of a sub-path as causing the *pen* to be lifted and moved in a series of instructions.

If we don't understand *paths* and *sub-paths* then we can get unexpected results.
For example, consider the [arc] method which we can use to draw circles and partial circles.

> Review how the [arc] method works and make sure you understand what the first five arguments are for.


```js {hl_lines="15-21"}
const w = window.innerWidth;
const h = window.innerHeight;

const canvas = document.getElementById('canvas');

canvas.width = w;
canvas.height = h;

const ctx = canvas.getContext('2d');

ctx.fillStyle = 'yellow';
ctx.strokeStyle = 'red';
ctx.lineWidth = 5;

const x1 = (w / 3);
const x2 = x1 * 2;
const y = h / 2;
const radius = Math.min(w, h) / 4;

ctx.arc(x1, y, radius, 0, 2 * Math.PI);
ctx.arc(x2, y, radius, 0, 2 * Math.PI);
ctx.fill()
ctx.stroke()
```

The code looks similar to the previous example, but the result is more different than we may expect.

{{<iframe src="examples/basic-7" width="1000" height="500">}}{{</iframe>}}


Inexplicably, the [arc] method does not create a new *sub-path*.
We could calculate the location of the start of the circle and make a call to `moveTo`.
However, it's often easier to simply create an entirely new *path* using the [beginPath] method.

> When a new path is created in this way, all previous instructions are lost.
> Since [stroke] and [fill] will only apply to one path at a time, we will need to call them for each *path* separately.

```js {hl_lines="21-24"}
const w = window.innerWidth;
const h = window.innerHeight;

const canvas = document.getElementById('canvas');

canvas.width = w;
canvas.height = h;

const ctx = canvas.getContext('2d');

ctx.fillStyle = 'yellow';
ctx.strokeStyle = 'red';
ctx.lineWidth = 5;

const x1 = (w / 3);
const x2 = x1 * 2;
const y = h / 2;
const radius = Math.min(w, h) / 4;

ctx.arc(x1, y, radius, 0, 2 * Math.PI);
ctx.fill()
ctx.stroke()

ctx.beginPath();
ctx.arc(x2, y, radius, 0, 2 * Math.PI);
ctx.fill()
ctx.stroke()
```

The result is what we originally intended.

{{<iframe src="examples/basic-8" width="1000" height="500">}}{{</iframe>}}

> These idiosyncrasies are just a fact of life. 
We need to accept them and move on.
>
> Frustratingly, we also have the [fillRect] and [strokeRect] methods but no equivalent for arcs.

## Drawing something more complex

It helps to build some structure into our code if we want to draw more complex scenes.

> Of course, it is possible to draw complex scenes without structure, but we are keen to make the code both readable and extendable.

Consider this code:

```js
const w = window.innerWidth;
const h = window.innerHeight;

const canvas = document.getElementById('canvas');

canvas.width = w;
canvas.height = h;

const ctx = canvas.getContext('2d');

ctx.strokeStyle = 'black';
ctx.lineWidth = 5;

// Face
const faceX = w / 2;
const faceY = h / 2;
const faceRadius = Math.min(w, h) / 3;

// Eyes
const eyeY = faceY - faceRadius / 3;
const eyeOffset = faceRadius / 3;
const eyeXRadius = faceRadius / 6;
const eyeYRadius = faceRadius / 5;

// Pupils
const pupilOffsetX = (Math.random() - 0.5) * eyeXRadius
const pupilOffsetY = (Math.random() - 0.5) * eyeYRadius
const pupilXRadius = eyeXRadius * 0.2;
const pupilYRadius = eyeYRadius * 0.2;

// Mouth
const mouthOffset = faceRadius * 0.1;
const mouthRadius = faceRadius * 0.7;

// Draw face
ctx.fillStyle = 'yellow';
ctx.arc(faceX, faceY, faceRadius, 0, 2 * Math.PI);
ctx.fill()
ctx.stroke()

// Draw mouth
ctx.beginPath();
ctx.arc(faceX, faceY + mouthOffset, mouthRadius, 0, Math.PI);
ctx.stroke()

// For each eye
for (const eye of [-1, 1]) {
    const eyeX = faceX + (eye * eyeOffset);

    // draw eye
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.ellipse(
        eyeX, eyeY,
        eyeXRadius, eyeYRadius,
        0, 0, 2 * Math.PI
    );
    ctx.fill();
    ctx.stroke();

    // draw pupil
    ctx.fillStyle = "black";
    const pupilX = eyeX + pupilOffsetX;
    const pupilY = eyeY + pupilOffsetY;
    ctx.beginPath();
    ctx.ellipse(
        pupilX, pupilY,
        pupilXRadius, pupilYRadius,
        0, 0, 2 * Math.PI
    );
    ctx.fill();
}
```

In 72 lines we manage to draw a simple face.

{{<iframe src="examples/face-1" width="1000" height="500">}}{{</iframe>}}

But even though we have many named variables and left the code somewhat verbose with comments, the code is still difficult to follow.

> Read it through a few times and try to work out what is going on.

### Introducing structure

Let's rewrite the code with more flexibility in mind.
We can introduce some basic structure to handle the details.
This should allow us to focus on the more high-level abstractions.

First, create a file called *face.js*.
We will use this to handle the main abstraction of the concept of our face drawing.

We can begin with a simple function.

```js
export default function face(ctx, radius) {
    ctx.save();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = radius / 40;
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}
```

One major change here is that we are drawing our [arc] at the origin `(0, 0)`.
We can see this as the first two arguments we provide to the function are `0` and `0`.

We have decided (for now) that the only information our function will get is the canvas context on which to draw and the radius for the face.

>We could require more arguments if we wished to.
>This is *our* API.


We have also used the [save] and [restore] methods to save and restore the state of the canvas.
This avoids creating the side-effect of changing the [strokeStyle], [lineWidth] and [fillStyle].

> So our function can be called from anywhere and the calling code doesn't need to worry about it modifying the canvas context styles.
> However, notice that it does create a new path and destroy anything that was previously on the path.
So we need to have some idea what we are doing.

Notice we have also added the keywords `export default` to our function.
Adding the [export] keyword allows us to [import] the function from our main module.

Delete the old *canvas.js* code (or take a copy) and replace it with the following code:

```js {hl_lines=[1, "13-16"]}
import face from './face.js'

const w = window.innerWidth;
const h = window.innerHeight;

const canvas = document.getElementById('canvas');

canvas.width = w;
canvas.height = h;

const ctx = canvas.getContext('2d');

const radius = Math.min(w, h) * 0.45;

ctx.translate(w / 2, h / 2);
face(ctx, radius);
```

There are  few new things here.


Firstly, we use the `import` keyword to import our function from `face.js`.
This keeps all the details of drawing faces out of our main script.
So we can concentrate on how we are going to use our own API.

We calculate the `radius` variable so the face will fit nicely inside the canvas.
Then we call the [translate] method.
This moves the origin of the canvas context to the middle of the canvas (half the width and half the height).

> Notice that the *size* and *position* of our drawn face is determined in this main file.
These are higher-level concerns than exactly how the face should be drawn.
This file is responsible for composing our scene. 

The result is a start.

{{<iframe src="examples/face-2" width="1000" height="500">}}{{</iframe>}}

Now we want to draw a mouth.
We have decided that the end-user doesn't care about the details, so it is the responsibility of the `face()` function to handle the mouth drawing.

Let's add a `mouth()` function to *face.js*.

```js {hl_lines=[10, "14-18"]}
export default function face(ctx, radius) {
    ctx.save();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = radius / 40;
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    mouth(ctx, radius * 0.9);
    ctx.restore();
}

function mouth(ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI);
    ctx.stroke();
}
```

The new function is pretty simple. 
All it does is draw a half circle of the given radius to the canvas at the origin.

> We are relying on the fact that circles are drawn from the right (0 radians) in a clockwise direction by default. 
So all we need to do is specify angles from zero to `Math.PI` for a semi-circle.
We have located the circle at the center of our face, this may be something we want to tweak but it works well enough for now.

When we call our function, we are specifying a mouth radius of 80% of the face radius.
This could be made more explicit with a named variable.
We have left it implicit in this case.

The result is good enough.

{{<iframe src="examples/face-3" width="1000" height="500">}}{{</iframe>}}

To add eyes, we can do something similar. 
Each eye will be comprised of two arcs, one for the main eye outline and one for the pupil.

However, we need a bit more information about each eye.
They need to be placed on the y-axis at some position above the center of the face and each eye is offset horizontally from the center.

We can implement this in the same way as an `eye()` function and simply call it twice when we draw our face.

```js {hl_lines=["11-17", "27-41"]}
export default function face(ctx, radius) {
    ctx.save();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = radius / 40;
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    mouth(ctx, radius * 0.8);

    ctx.translate(-radius / 3, -radius / 3);
    eye(ctx, radius * 0.25);

    ctx.translate(2 * radius / 3, 0);
    eye(ctx, radius * 0.25);

    ctx.restore();
}

function mouth(ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI);
    ctx.stroke();
}

function eye(ctx, radius) {
    ctx.save();

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.ellipse(0, 0, radius, radius * 1.3, 0, 0, 2 * Math.PI);
    ctx.fill()
    ctx.stroke();

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
}
```

Again, the only information we are passing to our `eye()` function is the radius we want.

> Study the code, notice that we are using the [ellipse] method and we have fixed the aspect-ratio of the ellipse to 1.3.

{{<iframe src="examples/face-4" width="1000" height="500">}}{{</iframe>}}

## Expanding the complexity

So our `face()` function is complete and we can use it to compose a different scene very easily.

For example, placing faces side-by-side is simple enough.

```js {hl_lines="13-33"}
import face from './face.js'

const w = window.innerWidth;
const h = window.innerHeight;

const canvas = document.getElementById('canvas');

canvas.width = w;
canvas.height = h;

const ctx = canvas.getContext('2d');

const radius = Math.min(w, h) / 4;

// One in the middle
ctx.translate(w / 2, h / 2);
face(ctx, radius);

// One to the left
ctx.translate(-radius * 1.5, 0);
face(ctx, radius / 2);

// One to the right
ctx.translate(radius * 3, 0);
face(ctx, radius / 2);

// One to the top
ctx.translate(-radius * 1.5, -radius * 1.5);
face(ctx, radius / 2);

// One to the bottom
ctx.translate(0, radius * 3);
face(ctx, radius / 2);
```

We can use the function to draw a face with any radius at the canvas origin.
With code to *translate* the origin, this means we can place faces anywhere we want.
The limit is your imagination.

{{<iframe src="examples/face-5" width="1000" height="500">}}{{</iframe>}}

Try using the [rotate] method, like this.

```js {hl_lines="15-26"}
import face from './face.js'

const w = window.innerWidth;
const h = window.innerHeight;

const canvas = document.getElementById('canvas');

canvas.width = w;
canvas.height = h;

const ctx = canvas.getContext('2d');

const radius = Math.min(w, h) / 4;

// One in the middle
ctx.translate(w / 2, h / 2);
face(ctx, radius);

// eight around the outside
for (const angle of [0, 1, 2, 3, 4, 5, 6, 7]) {
    ctx.save();
    ctx.rotate(angle * Math.PI / 4);
    ctx.translate(0, -radius * 1.5);
    face(ctx, radius / 2);
    ctx.restore()    
}
```

This requires a bit of careful thought.

{{<iframe src="examples/face-6" width="1000" height="500">}}{{</iframe>}}

> Again, we have calculated all the coordinates carefully so the drawing should work on any canvas.
>
> {{<iframe src="examples/face-6" width="200" height="500">}}{{</iframe>}}
> {{<iframe src="examples/face-6" width="350" height="400">}}{{</iframe>}}
> {{<iframe src="examples/face-6" width="300" height="200">}}{{</iframe>}}



### Adding structure

Now we have a pattern we can repeat, adding more structure is quite easy.

Here we formalise the previous example into a function and now we can call this function multiple times to create a randomised composition.

```js
import face from './face.js'

const w = window.innerWidth;
const h = window.innerHeight;

const canvas = document.getElementById('canvas');

canvas.width = w;
canvas.height = h;

const ctx = canvas.getContext('2d');

function flower(ctx, radius) {
    const r = radius / 4;

    // One in the middle
    face(ctx, r);
    
    // eight around the outside
    for (const angle of [0, 1, 2, 3, 4, 5, 6, 7]) {
        ctx.save();
        ctx.rotate(angle * Math.PI / 4);
        ctx.translate(0, -r * 1.5);
        face(ctx, r / 2);
        ctx.restore()    
    }
}

function randomFlower(ctx) {
    ctx.save();
    const x = w * Math.random();
    const y = h * Math.random();
    const r = Math.min(w, h) * (0.1 + 0.2 * Math.random());
    ctx.translate(x, y);
    flower(ctx, r);
    ctx.restore()
}

let total = 0;
do {
    total += Math.random();
    randomFlower(ctx);
} while (total < 10);

```


Creating patterns built on patterns can produce interesting results.

{{<iframe src="examples/face-7" width="1000" height="1000">}}{{</iframe>}}   




## Providing more control

Returning to our `face()` function, let's provide the user (of the function) with options.

The first option we want to expose will be to move the pupils within the eyes.
We can specify input data to be passed as an argument.
We need an `x` and a `y` parameter, and we want to ensure that the pupils always fall inside the eyes, so rather than allowing length values, we will require values from -1 (left/up) to +1 (right/down).

For example, the following arguments would be valid.

```js {linenos=false}
{ x: -1, y: 0 }    // fully left and vertically central
{ x: -0.5, y: 0 }  // half left and vertically central
{ x: 1, y: 0.5 }   // fully right and half down
{ x: 0.5, y: -1 }  // half right and fully up
{ x: 0, y: 0 }     // central, as we have by default
```

We can implement this by updating the arguments taken by the `eye()` function and allowing these to be passed into the `face()` function.

```js {hl_lines=[1, 13, 16, 27, "36-44"]}
export default function face(ctx, radius, {pupilOffset}) {
    ctx.save();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = radius / 40;
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    mouth(ctx, radius * 0.8);

    ctx.translate(-radius / 3, -radius / 3);
    eye(ctx, radius * 0.25,{ pupilOffset });

    ctx.translate(2 * radius / 3, 0);
    eye(ctx, radius * 0.25,  {pupilOffset });

    ctx.restore();
}

function mouth(ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI);
    ctx.stroke();
}

function eye(ctx, radius, {pupilOffset = {X: 0, y: 0}}) {
    ctx.save();
    
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.ellipse(0, 0, radius, radius * 1.3, 0, 0, 2 * Math.PI);
    ctx.fill()
    ctx.stroke();

    // constrain the arguments
    pupilOffset.x = Math.max(-1, Math.min(pupilOffset.x, 1));
    pupilOffset.y = Math.max(-1, Math.min(pupilOffset.y, 1));

    // Apply the arguments
    ctx.translate(
        radius * 0.65 * pupilOffset.x,
        radius * 0.65 * pupilOffset.y
    );

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
}
```

The `eye()` function now translates the canvas accordingly.
It also needs to constrain the passed in values to between -1 and 1 to avoid the pupils being drawn beyond the edge of the eyes.

We now need to update our scene to see the result.

```js
import face from './face.js'

const w = window.innerWidth;
const h = window.innerHeight;

const canvas = document.getElementById('canvas');

canvas.width = w;
canvas.height = h;

const ctx = canvas.getContext('2d');
const size = Math.min(w, h);
ctx.translate((w - size)/2, (h - size)/2);

const radius = size / 10;
ctx.translate(radius, radius);

for (const x of [0, 1, 2, 3, 4]) { 
    for (const y of [0, 1, 2, 3, 4]) {
        ctx.save();
        ctx.translate(2 * x * radius, 2 * y * radius);
        const pupilOffset = { x: (2 - x) / 2, y: (2 - y) / 2 };
        face(ctx, radius, {pupilOffset});
        ctx.restore();
    }
}
```

The above code draws a grid of faces, all looking towards the center.

{{<iframe src="examples/face-8" width="1000" height="800">}}{{</iframe>}}   


Notice we used [destructuring assignment] to enable named arguments. 
This allows the new `pupilOffset` argument to be optional.
Adding more optional parameters with default values is similar.
Here we add an `eyeSize` option and an `eyeGap` option.
Both arguments are expected to be between 0 and 1.
We have taken these values and interpreted them *within the design* to give a result between zero and the maximum value that fits. 

```js {hl_lines=[1, "12-26"]}
export default function face(ctx, radius, {pupilOffset, eyeSize=0.5, eyeGap=0.5}) {
    ctx.save();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = radius / 40;
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    mouth(ctx, radius * 0.8);

    // Constrain the eyeSize to [0, 1]
    eyeSize = Math.max(0, Math.min(eyeSize, 1));

    // Apply the eyeSize with additional constraint
    eyeSize = radius * 0.4 * eyeSize;

    // Calculate a reasonable eyeGap from provided value
    const spareSpace = (radius * 2) - (eyeSize * 4);
    eyeGap = (eyeSize * 2) + (spareSpace * 0.35 * eyeGap);

    ctx.translate(-eyeGap / 2, -radius / 3);
    eye(ctx, eyeSize, { pupilOffset });

    ctx.translate(eyeGap, 0);
    eye(ctx, eyeSize, { pupilOffset });

    ctx.restore();
}

function mouth(ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI);
    ctx.stroke();
}

function eye(ctx, radius, {pupilOffset = {X: 0, y: 0}}) {
    ctx.save();
    
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.ellipse(0, 0, radius, radius * 1.3, 0, 0, 2 * Math.PI);
    ctx.fill()
    ctx.stroke();

    // constrain the arguments
    pupilOffset.x = Math.max(-1, Math.min(pupilOffset.x, 1));
    pupilOffset.y = Math.max(-1, Math.min(pupilOffset.y, 1));

    // Apply the arguments
    ctx.translate(
        radius * 0.65 * pupilOffset.x,
        radius * 0.65 * pupilOffset.y
    );

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
}
```

> This is just playing with the design space.

We can modify our scene to provide random values for our new parameters.

```js {hl_lines="22-26"}
import face from './face.js'

const w = window.innerWidth;
const h = window.innerHeight;

const canvas = document.getElementById('canvas');

canvas.width = w;
canvas.height = h;

const ctx = canvas.getContext('2d');
const size = Math.min(w, h);
ctx.translate((w - size)/2, (h - size)/2);

const radius = size / 10;
ctx.translate(radius, radius);

for (const x of [0, 1, 2, 3, 4]) { 
    for (const y of [0, 1, 2, 3, 4]) {
        ctx.save();
        ctx.translate(2 * x * radius, 2 * y * radius);
        face(ctx, radius, {
            pupilOffset: { x: (2 - x) / 2, y: (2 - y) / 2 },
            eyeSize: Math.random(),
            eyeGap: Math.random()
        });
        ctx.restore();
    }
}
```

{{<iframe src="examples/face-9" width="1000" height="800">}}{{</iframe>}}   

> Consider how you would add more optional parameters for controlling the drawing.
>
> Try to expose a parameter for setting the fillStyle for the face.
>
> What else could you modify?
> How about the mouth position, mouth radius, or mouth start angle/end angle?

> Now, create a canvas drawing of your own.
Try to draw something simple, like a stick person, a tree or a building.
Turn your code into a function and add parameters to provide users with options.

## References

In this exercise we have mainly used the [CanvasRenderingContext2D] API. 
We have used the following methods.
- [getContext]
- [moveTo]
- [lineTo]
- [stroke]
- [fill]
- [closePath]
- [rect]
- [arc]
- [ellipse]
- [translate]
- [rotate]

And these properties
- [fillStyle]
- [strokeStyle]
- [lineWidth]

There are many methods and properties that we didn't use. 

See also:
- [WebGL]
- [WebGPU]
- [Applying styles and colors]
- [path methods]
- [destructuring assignment]

[CanvasRenderingContext2D]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
[WebGL]: https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API
[WebGPU]: https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API
[window]: https://developer.mozilla.org/en-US/docs/Web/API/Window
[innerWidth]: https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth
[innerHeight]: https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight
[document body]: https://developer.mozilla.org/en-US/docs/Web/API/Document/body
[Element]: https://developer.mozilla.org/en-US/docs/Web/API/Element
[clientWidth]: https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth
[clientHeight]: https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight
[getContext]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
[moveTo]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/moveTo
[lineTo]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineTo
[stroke]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/stroke
[fill]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fill
[closePath]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/closePath
[path methods]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D#paths
[fillStyle]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle
[strokeStyle]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle
[lineWidth]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth
[Applying styles and colors]: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors
[rect]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rect
[fillRect]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect
[strokeRect]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeRect
[arc]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
[beginPath]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath
[save]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save
[restore]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore
[ellipse]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/ellipse
[translate]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate
[rotate]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate
[destructuring assignment]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#unpacking_properties_from_objects_passed_as_a_function_parameter
[export]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
[import]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import