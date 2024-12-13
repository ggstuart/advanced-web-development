---
title: Canvas Animation
type: exercise
weight: 30
author: Dr Graeme Stuart
---

JavaScript has excellent support for creating animations.
This is a great excuse to introduce javascript classes.

In this exercise, we will create a simple animated scene with user interaction.


<!--more-->

We have seen how we can create a function that draws a scene on an HTML `<canvas>` element.
In this exercise we will expand this idea further.

## Set up a simple template

Let's begin with a very simple example.
The HTML can be extremely simple as we will build everything with JavaScript this time.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Canvas animation</title>
    <link rel="stylesheet" href="style.css">
    <script type="module" src="animation.js"></script>
</head>
<body>
</body>
</html>
```

All we have provided is a CSS file and a JavaScript module.
Our CSS is familiar.

```css
body {
    margin: 0;
    display: grid;
}
```

We can use JavaScript to create the canvas, access the 2D context object and define a simple square in the center of the canvas.

```js
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Prepare the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.append(canvas);

// Set up some data for our scene
let x = canvas.width / 2;
let y = canvas.height / 2;
let size = 50;

// Draw the scene
ctx.translate(x, y);
ctx.fillRect(-size / 2, -size / 2, size, size);
```

Hopefully the above code makes sense.
We have created three variables pertaining to our scene.

The `x` and `y` variables set the location of the center of the square.
The `size` variable determines the length of each side of the square.

> We have used `let` to declare them because we will need to reassign their values later.

When we draw the square, we translate the origin to the location we want and then we set the top-left corner of our square so the square is centred on the origin.

The result is hopefully no surprise.

{{<iframe src="iframes/animation-1" width="1000" height="500">}}{{</iframe>}}

With this structure it's easy to move our square or change it's size by simply manipulating the values we give our variables.

> Try it. 
> Change the values and see what happens.<br>
> This is how we will manage our animation.

We can modify our code to add a `draw()` function that we can call to draw the simple scene.

```js {hl_lines="15-22"}
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Prepare the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.append(canvas);

// Set up some data for our scene
let x = canvas.width / 2;
let y = canvas.height / 2;
let size = 50;

// Draw the scene
function draw() {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillRect(-size / 2, -size / 2, size, size);
    ctx.restore();
}

draw();
```

In the above code we have wrapped our call to [translate] in [save] and [restore] calls.
This ensures our function has no side-effects on the position of the origin.

> We don't want to translate the origin further in each frame, we want to reset the origin to the top-left corner so the next frame can be drawn correctly. 

### Animate the scene using `setInterval`

A simple (but flawed) way to animate the scene is to use [`setInterval`] to call a function regularly.
Before we do this, we need to add some behaviour to our scene.
Let's say we want our square to move to the right by one pixel every frame.
To do this, we can add a function that we can call every frame.

```js {linenostart=22}
// Update the scene
function update() {
    x += 1;
    x %= canvas.width;
}
```

> When the value of `x` is greater than the canvas width, it will *wrap* around the canvas because we used [remainder assignment] (`%=`) with the canvas width.

We also need a function that will do the necessary work each frame.
1. Clear the canvas
1. Call our new `update()` function
1. Call our `draw()` function

We clear the canvas using [clearRect], specifying the canvas dimensions.

```js {linenostart=28}
// Complete one frame
function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    draw();
}
```

Finally, we use [`setInterval`] to call our `frame()` function every millisecond.

The result is that our scene is redrawn continuously with the square moving across the canvas. 

{{<iframe src="iframes/animation-2" width="1000" height="500">}}{{</iframe>}}

> You may notice that the speed of the square is not always consistent. 
Sometimes there is a longer gap between frames, sometimes shorter.

The full code listing now looks like this.

```js
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Prepare the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.append(canvas);

// Set up some data for our scene
let x = canvas.width / 2;
let y = canvas.height / 2;
let size = 50;

// Draw the scene
function draw() {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillRect(-size / 2, -size / 2, size, size);
    ctx.restore();
}

// Update the scene
function update() {
    x += 1;
    x %= canvas.width;
}

// Complete one frame
function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    draw();
}

setInterval(frame, 1);
```

## Using `requestAnimationFrame`

The `setInterval` method works but is inefficient and can lead to poor results because it is not aligned with the browsers paint cycle.

The speed of our square is set to one *pixel per frame*.
Thus, the speed of our square can change depending on how many frames we are actually getting per second.
The browser will typically repaint at 60 frames per second, though some hardware has a higher frame-rate.
Even on the same hardware, there is always some variation in frame-rate and if the CPU is particularly busy or the browser has a lot of work to do, it may skip a frame occasionally.

> So, using `setInterval`, we are potentially updating the location and drawing our square multiple times between repaints.
This is pointless and inefficient.

If we want our animation to be consistent across different circumstances, we should use a specialised method [`requestAnimationFrame`] which is integrated with the browser and will call the provided function exactly once before the next repaint.

The `frame()` function needs to be updated to take a `timestamp` argument.
We will use this to calculate an `elapsed` variable in which we will store the elapsed time since the previous frame.
We can then pass this value into the `update()` function so it can be taken into account in further calculations.

```js {linenostart=28, hl_lines=["2-5", 7, 9, 12]}
// Complete one frame
let previousTimestamp = 0;
function frame(timestamp) {
    const elapsed = (timestamp - previousTimestamp) / 1000;
    previousTimestamp = timestamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update(elapsed);
    draw();
    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
```

> Notice that inside our function, once all the work is done, we again register the `frame` function to be called again.
This is not a recursion, we are adding the function to a list of functions that will be called before we repaint.

Notice we have declared a new variable `previousTimestamp` to store the previous timestamp.
We set this value after calculating the elapsed time.

With this in place, we can develop our `update()` function to expect an `elapsed` argument and integrate this with a new `xSpeed` variable which now represents *pixels per second* rather than *pixels per frame*.

The code now looks like this:

```js {hl_lines=[13, "24-25"]}
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Prepare the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.append(canvas);

// Set up some data for our scene
let x = canvas.width / 2;
let y = canvas.height / 2;
let size = 50;
let xSpeed = 100; // pixels per second

// Draw the scene
function draw() {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillRect(-size / 2, -size / 2, size, size);
    ctx.restore();
}

// Update the scene
function update(elapsed) {
    x += elapsed * xSpeed;
    x %= canvas.width;
}

// Complete one frame
let previousTimestamp = 0;
function frame(timestamp) {
    const elapsed = (timestamp - previousTimestamp) / 1000;
    previousTimestamp = timestamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update(elapsed);
    draw();
    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
```

We can update our code to specify the `xSpeed` of our square in *pixels per second* rather than *pixels per frame*.

Not much has changed, but we have a much better infrastructure for a solid animation.

{{<iframe src="iframes/animation-3" width="1000" height="500">}}{{</iframe>}}

> You may notice that the speed is now consistent as any skipped frames will now cause longer values of `elapsed` and hence the square will move further accordingly.
> Under pressure, the animation should become jerky rather than change speed.

### Adding some user interaction

Let's make a simple update to give users control over the horizontal acceleration of the square.

We will do this by monitoring keyboard events with a new `userInput` object which will let our system know which keys are currently pressed.

```js {hl_lines=["15-25", 37]}
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Prepare the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.append(canvas);

// Set up some data for our scene
let x = canvas.width / 2;
let y = canvas.height / 2;
let size = 50;
let xSpeed = 0; 

let acceleration = 1000;

const userInput = {
    'ArrowLeft': false,
    'ArrowRight': false,
    get xDirection() {
        return this.ArrowRight - this.ArrowLeft;
    }
}
document.addEventListener('keydown', ev => { userInput[ev.key] = true; });
document.addEventListener('keyup', ev => { userInput[ev.key] = false; })

// Draw the scene
function draw() {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillRect(-size / 2, -size / 2, size, size);
    ctx.restore();
}

// Update the scene
function update(elapsed) {
    xSpeed += acceleration * userInput.xDirection * elapsed;
    x += elapsed * xSpeed + canvas.width;
    x %= canvas.width;
}

// Complete one frame
let previousTimestamp = 0;
function frame(timestamp) {
    const elapsed = (timestamp - previousTimestamp) / 1000;
    previousTimestamp = timestamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update(elapsed);
    draw();
    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
```


When a key is pressed, the `keydown` event is triggered and we set the value of the given key on our `userInput` object to `true`. 
When the key is released, the `keyup` event is triggered and we will set the value of the given key back to `false`.
So the object will always tell us which keys are currently held.
Though, we only care if the `ArrowLeft` or `ArrowRight` keys are pressed.

We determine the direction of the acceleration by subtracting the boolean value `userInput.ArrowLeft` from the boolean value `userInput.ArrowRight`.

> If both keys are pressed or neither, the result is zero acceleration.

The `userInput` object has a convenient [getter] which calculates this for us and exposes it as the `xDirection` property.
We use this in the logic of our `update()` function.

We multiply the `xDirection` by a fixed `acceleration` value (with units of *pixels per second per second*) and apply this to the `xSpeed` which ultimately follows through to the `x` position of the square.

> The event listeners are active on the below iframe, however, you may need to select the iframe with your mouse in order to interact with it.

{{<iframe src="iframes/animation-4" width="1000" height="500" tabIndex="0">}}{{</iframe>}}


## Using classes

OK, so we can define elements in our scene such as the square.
Let's try to add 100 squares to our scene and make them move randomly.

To do this, we could generate 100 carefully coordinated versions of each variable (`x`, `y`, `xSpeed` etc).
An easier alternative, is to define a [`class`] of objects and generate 100 instances of our [`class`].

> We will develop this class in a new file *square.js*.

We can begin by considering the setup for our object. 
We need a constructor that will receive and store all the necessary data for the instance.
That is, the location, size and speed of the square.

> Notice that we [export] the class so it can be imported in our *animation.js* module.

```js
export class Square { 
    constructor(x, y, size, xSpeed, ySpeed) { 
        this.x = x;
        this.y = y;
        this.size = size;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
    }
}
```

We can add a `draw()` method for drawing the square, using the location and size.
The method is passed a `ctx` argument which it uses to do the drawing.

> We've added a white border so we need to explicitly call [beginPath], [rect], [fill] and [stroke].

```js {hl_lines="10-24"}
export class Square { 
    constructor(x, y, size, xSpeed, ySpeed) { 
        this.x = x;
        this.y = y;
        this.size = size;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
    }

    draw(ctx) {
        ctx.save();
        ctx.strokeStyle = "white";
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.rect(
            -this.size / 2,
            -this.size / 2,
            this.size,
            this.size
        );
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
}
```

An `update()` method will describe the behaviour of our objects.
Each frame, they move the appropriate distance in each dimension based on the provided `elapsed` argument.

```js {hl_lines="10-13"}
export class Square { 
    constructor(x, y, size, xSpeed, ySpeed) { 
        this.x = x;
        this.y = y;
        this.size = size;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
    }

    update(elapsed) { 
        this.x += this.xSpeed * elapsed;
        this.y += this.ySpeed * elapsed;
    }

    draw(ctx) {
        ctx.save();
        ctx.strokeStyle = "white";
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.rect(
            -this.size / 2,
            -this.size / 2,
            this.size,
            this.size
        );
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
}
```

To describe how the objects interact with the edge of the canvas, we will add a `bounce()` method that requires a `canvas` argument from which it takes the dimensions.


```js {hl_lines="15-24"}
export class Square { 
    constructor(x, y, size, xSpeed, ySpeed) { 
        this.x = x;
        this.y = y;
        this.size = size;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
    }

    update(elapsed) { 
        this.x += this.xSpeed * elapsed;
        this.y += this.ySpeed * elapsed;
    }

    bounce(canvas) {
        if (this.x < 0 || this.x > canvas.width) {
            this.xSpeed *= -1;
            this.x = this.x < 0 ? 0 : canvas.width;
        }
        if (this.y < 0 || this.y > canvas.height) {
            this.ySpeed *= -1;
            this.y = this.y < 0 ? 0 : canvas.height;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.strokeStyle = "white";
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.rect(
            -this.size / 2,
            -this.size / 2,
            this.size,
            this.size
        );
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
}
```

To implement the class in our main *animation.js* file, we need to create an array of random squares.
We can do this with a function that returns a random square.

> Remember to [`import`] the Square class at the top of the file

```js {linenostart=11}
function randomSquare() { 
    return new Square(
        canvas.width * Math.random(),               // x
        canvas.height * Math.random(),              // y
        10 + 40 * Math.random(),                    // size
        0.5 * canvas.width * (Math.random() - 0.5), // xSpeed
        0.5 * canvas.height * (Math.random() - 0.5) // ySpeed
    )
}
let squares = Array.from({ length: 100 }, randomSquare);
```

The function takes no arguments and all it does is generate random inputs for our class constructor.
The `x` and `y` coordinates are set to random values within the canvas.
The `size` argument is set to a random value between 10 and 50.
The speed is set so the objects can move in any direction (i.e. they can be positive or negative) and is relative to the canvas size, so the fastest objects will cross the canvas in a few seconds.

> In this way, we are choosing the range of values that each argument can take.
> Feel free to modify the parameters.

We create 100 squares using [`Array.from`] which allows us to pass in an array-like object (in this case an object with a `length` property) and calls our `randomSquare()` function to generate each element of the new array.

> This is a great trick for generating an array of custom objects.

Now we have an array of 100 `Square` objects, we need replacement `update()` and `draw()` functions. 
All they need to do is loop over our array and call the appropriate methods from our class for each instance.

```js {linenostart=22}
// Draw the scene
function draw() {
    for (const square of squares) {
        square.draw(ctx);
    }
}

// Update the scene
function update(elapsed) {
    for (const square of squares) {
        square.update(elapsed);
        square.bounce(canvas);
    }
}
```

Our new functions do what they need to do. 
All our `Square` objects are updated before we draw anything.
We have also called the `bounce` method to handle interactions between the squares and the canvas edge.

Our `frame()` function can remain the same, it just calls the above functions, managing the main animation loop.

If you have followed correctly, you should have this.

{{<iframe src="iframes/animation-5a" width="1000" height="500">}}{{</iframe>}}

> Don't worry if not, the fill listing is shown below.

### Adding rotation

Now we have a decent structure, adding features is pretty easy.
For example, we can add in an `angle` and a `rotationSpeed` to our class to enable randomly spinning squares.

> These are equivalent to `x` and `xSpeed` or `y` and `ySpeed`.

```js {hl_lines=[2, "8-9", 15, 33]}
export class Square { 
    constructor(x, y, size, xSpeed, ySpeed, rotationSpeed) { 
        this.x = x;
        this.y = y;
        this.size = size;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.rotationSpeed = rotationSpeed;
        this.angle = 0;
    }

    update(elapsed) { 
        this.x += this.xSpeed * elapsed;
        this.y += this.ySpeed * elapsed;
        this.angle += this.rotationSpeed * elapsed;
    }

    bounce(canvas) {
        if (this.x < 0 || this.x > canvas.width) {
            this.xSpeed *= -1;
            this.x = this.x < 0 ? 0 : canvas.width;
        }
        if (this.y < 0 || this.y > canvas.height) {
            this.ySpeed *= -1;
            this.y = this.y < 0 ? 0 : canvas.height;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.strokeStyle = "white";
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.rect(
            -this.size / 2,
            -this.size / 2,
            this.size,
            this.size
        );
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
}
```

We also need to implement this in our main *animation.js* file, setting the range of possible rotation speeds.

The full code listing looks like this:

```js {hl_lines=18}
import { Square } from "./square.js";

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Prepare the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.append(canvas);

function randomSquare() { 
    return new Square(
        canvas.width * Math.random(),
        canvas.height * Math.random(),
        10 + 90 * Math.random(),
        0.5 * canvas.width * (Math.random() - 0.5),
        0.5 * canvas.height * (Math.random() - 0.5),
        2 * Math.PI * (Math.random() - 0.5)
    )
}
let squares = Array.from({ length: 100 }, randomSquare);

// Draw the scene
function draw() {
    for (const square of squares) {
        square.draw(ctx);
    }
}

// Update the scene
function update(elapsed) {
    for (const square of squares) {
        square.update(elapsed);
        square.bounce(canvas);
    }
}

// Complete one frame
let previousTimestamp = 0;
function frame(timestamp) {
    const elapsed = (timestamp - previousTimestamp) / 1000;
    previousTimestamp = timestamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update(elapsed);
    draw();
    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
```

Our squares now spin.

{{<iframe src="iframes/animation-5" width="1000" height="500">}}{{</iframe>}}


### Adding random colours

Did we say that adding new functionality is simple?
Let's make every square a different colour.
There are many ways to do this, but we will experiment with passing a callback function to generate a random colour.

The class definition needs a small tweak to save the colour and to set the `fillStyle`.

```js {hl_lines=["2-3", 33]}
export class Square {
    constructor(colourFn, x, y, size, xSpeed, ySpeed, rotationSpeed) {
        this.colour = colourFn();
        this.x = x;
        this.y = y;
        this.size = size;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.rotationSpeed = rotationSpeed;
        this.angle = 0;
    }

    update(elapsed) {
        this.x += this.xSpeed * elapsed;
        this.y += this.ySpeed * elapsed;
        this.angle += this.rotationSpeed * elapsed;
    }

    bounce(canvas) {
        if (this.x < 0 || this.x > canvas.width) {
            this.xSpeed *= -1;
            this.x = this.x < 0 ? 0 : canvas.width;
        }
        if (this.y < 0 || this.y > canvas.height) {
            this.ySpeed *= -1;
            this.y = this.y < 0 ? 0 : canvas.height;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.strokeStyle = "white";
        ctx.fillStyle = this.colour;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.rect(
            -this.size / 2,
            -this.size / 2,
            this.size,
            this.size
        );
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }
}
```


All we need to do is create a function that returns a valid random colour and pass the function into our constructor.

```js {hl_lines=["11-14", 18]}
import { Square } from "./square.js";

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Prepare the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.append(canvas);

function randomColour() {
    const hue = Math.random() * 360;
    return `hsl(${hue}, 80%, 60%)`;
}

function randomSquare() { 
    return new Square(
        randomColour,
        canvas.width * Math.random(),
        canvas.height * Math.random(),
        10 + 40 * Math.random(),
        0.5 * canvas.width * (Math.random() - 0.5),
        0.5 * canvas.height * (Math.random() - 0.5),
        2 * Math.PI * (Math.random() - 0.5)
    )
}
let squares = Array.from({ length: 100 }, randomSquare);

// Draw the scene
function draw() {
    for (const square of squares) {
        square.draw(ctx);
    }
}

// Update the scene
function update(elapsed) {
    for (const square of squares) {
        square.update(elapsed);
        square.bounce(canvas);
    }
}

// Complete one frame
let previousTimestamp = 0;
function frame(timestamp) {
    const elapsed = (timestamp - previousTimestamp) / 1000;
    previousTimestamp = timestamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update(elapsed);
    draw();
    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
```

A very minor change that has a big visual impact.

{{<iframe src="iframes/animation-6" width="1000" height="500">}}{{</iframe>}}

### More structure

We can add more structure to our code by defining a `Scene` class that is responsible for managing the elements of the scene (i.e. our array of squares).
This allows us to control the animation in very generic terms from our top-level script.

```js {hl_lines=[1, 12, "20-21"]}
import { Scene } from "./scene.js";

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Prepare the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.append(canvas);

// Initialise the scene
const scene = new Scene(canvas, 100);

// Complete one frame
let previousTimestamp = 0;
function frame(timestamp) {
    const elapsed = (timestamp - previousTimestamp) / 1000;
    previousTimestamp = timestamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    scene.update(elapsed);
    scene.draw();
    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
```

> The *animation.js* module is becoming more stable.
As the main entry point for our project, it creates the canvas and initialises our scene (passing it a canvas and one parameter, the number of squares we want in the scene).
It also manages the animation loop using `requestAnimationFrame`.

All other aspects are delegated to the new `Scene` class which will compose the scene and manage the details of updating and drawing all the elements in play.

Create a *scene.js* file as follows.

```js
import { Square } from "./square.js";

function randomValue(min, max) {
    return min + Math.random() * (max - min);
}

export class Scene { 
    
    constructor(canvas, nSquares) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        // parameters for colour
        this.hueRange = randomValue(60, 300);
        this.minHue = randomValue(0, 360 - this.hueRange);
        this.saturation = randomValue(20, 100);
        this.lightness = randomValue(20, 60);

        // parameters for speed
        this.maxTimeToCross = randomValue(1, 10);

        // parameters for size
        this.minSize = randomValue(0.01, 0.1);
        this.maxSize = randomValue(this.minSize, 0.2);

        this.squares = Array.from({ length: nSquares }, () => {
            return new Square(
                this.randomLocation,
                this.randomSize,
                this.randomSpeed,
                this.randomColour
            )
        });
    }

    get edge() {
        return Math.min(this.canvas.width, this.canvas.height);
    }

    get randomSize() {
        return this.edge * randomValue(this.minSize, this.maxSize);
    }

    get randomColour() {
        const hue = this.minHue + randomValue(0, this.hueRange);        
        return `hsl(${hue}, ${this.saturation}%, ${this.lightness}%)`;
    }

    get randomLocation() {
        return {
            x: randomValue(0, this.canvas.width),
            y: randomValue(0, this.canvas.height)
        }
    }

    get randomSpeed() {
        const maxSpeed = this.edge / this.maxTimeToCross;
        return {
            x: randomValue(-maxSpeed, maxSpeed),
            y: randomValue(-maxSpeed, maxSpeed),
            rotation: randomValue(-2 * Math.PI, 2 * Math.PI)
        }
    }

    draw() {
        for (const square of this.squares) {
            square.draw(this.ctx);            
        }
    }

    update(elapsed) {
        for (const square of this.squares) {
            square.update(elapsed);
            square.bounce(this.canvas);
        }
    }
}
```

We have added several calculated [getter] properties to make the code easier to read.
In our constructor function we initialise some random parameters and we use these to set the constraints for the randomness of individual `Square` objects.

We have changed the form of data taken by the `Square` class.

> For example, rather than providing an `x` and a `y`, we now take a `location` which is expected to be an object with `x` and `y` properties.
> This is an internal API change that we decided to implement as a way to simplify the code.
> Reducing the number of parameters we need to pass makes the code easier to understand.

The new *square.js* file is only changed to account for this upgrade, it's functionally identical.

```js {hl_lines=["2-6", "11-13", "17-19", "21-23", 31]}
export class Square {
    constructor(location, size, speed, colour) {
        this.colour = colour;
        this.location = location;
        this.size = size;
        this.speed = speed;
        this.angle = 0;
    }

    update(elapsed) {
        this.location.x += this.speed.x * elapsed;
        this.location.y += this.speed.y * elapsed;
        this.angle += this.speed.rotation * elapsed;
    }

    bounce(canvas) {
        if (this.location.x < 0 || this.location.x > canvas.width) {
            this.speed.x *= -1;
            this.location.x = this.location.x < 0 ? 0 : canvas.width;
        }
        if (this.location.y < 0 || this.location.y > canvas.height) {
            this.speed.y *= -1;
            this.location.y = this.location.y < 0 ? 0 : canvas.height;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.strokeStyle = "white";
        ctx.fillStyle = this.colour;
        ctx.translate(this.location.x, this.location.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.rect(
            -this.size / 2,
            -this.size / 2,
            this.size,
            this.size
        );
        ctx.fill();
        ctx.stroke();
        ctx.restore();        
    }
}
```

Notice that every time we refresh the screen or create a new instance of the `Scene` class, the parameters are regenerated.

{{<iframe src="iframes/animation-7" width="310" height="310">}}{{</iframe>}}
{{<iframe src="iframes/animation-7" width="310" height="310">}}{{</iframe>}}
{{<iframe src="iframes/animation-7" width="310" height="310">}}{{</iframe>}}
{{<iframe src="iframes/animation-7" width="310" height="310">}}{{</iframe>}}
{{<iframe src="iframes/animation-7" width="310" height="310">}}{{</iframe>}}
{{<iframe src="iframes/animation-7" width="310" height="310">}}{{</iframe>}}

### Adding variety

We can create a new kind of object, let's call it a `Thing`. 

This is *thing.js*:

```js
export class Thing {
    constructor(location, angle) { 
        this.location = location;
        this.angle = angle
        this.speed = 100;
        this.steering = 0;
    }

    get xComponent() {
        return Math.cos(this.angle);
    }
    get yComponent() {
        return Math.sin(this.angle);
    }

    handleEdge(canvas) {
        this.location.x += canvas.width;
        this.location.x %= canvas.width;
        this.location.y += canvas.height;
        this.location.y %= canvas.height;
    }

    update(elapsed) { 
        this.steering += (Math.random() - 0.5) * 0.01;
        this.steering = Math.max(-0.1, Math.min(this.steering, 0.1));
        this.angle += this.steering;
        this.location.x += this.xComponent * this.speed * elapsed;
        this.location.y += this.yComponent * this.speed * elapsed;
    }

    draw(ctx) { 
        ctx.save();
        ctx.translate(this.location.x, this.location.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(20, 0);
        ctx.rotate(2 * Math.PI / 3);
        ctx.lineTo(12, 0);
        ctx.rotate(2 * Math.PI / 3);
        ctx.lineTo(12, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();        
    }
}
```

> Try to work out what it does

Now, notice our new class has a `draw` method, an `update` method and a `handleEdge` method.
This is going to be our expectation from all objects.
So, we will align the `Square` class to the same API.

```js {hl_lines=16}
export class Square {
    constructor(location, size, speed, colour) {
        this.colour = colour;
        this.location = location;
        this.size = size;
        this.speed = speed;
        this.angle = 0;
    }

    update(elapsed) {
        this.location.x += this.speed.x * elapsed;
        this.location.y += this.speed.y * elapsed;
        this.angle += this.speed.rotation * elapsed;
    }

    handleEdge(canvas) {
        if (this.location.x < 0 || this.location.x > canvas.width) {
            this.speed.x *= -1;
            this.location.x = this.location.x < 0 ? 0 : canvas.width;
        }
        if (this.location.y < 0 || this.location.y > canvas.height) {
            this.speed.y *= -1;
            this.location.y = this.location.y < 0 ? 0 : canvas.height;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.strokeStyle = "white";
        ctx.fillStyle = this.colour;
        ctx.translate(this.location.x, this.location.y);
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.rect(
            -this.size / 2,
            -this.size / 2,
            this.size,
            this.size
        );
        ctx.fill();
        ctx.stroke();        
        ctx.restore();
    }
}
```

Our `Scene` class needs to change to incorporate our new class of objects.
We now create an array of mixed types in which all elements follow our rules.

> This is a form of *duck typing*.

```js {hl_lines=[2, 10, "34-39", 80]}
import { Square } from "./square.js";
import { Thing } from "./thing.js";

function randomValue(min, max) {
    return min + Math.random() * (max - min);
}

export class Scene { 
    
    constructor(canvas, nSquares, nThings) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");

        // parameters for colour
        this.hueRange = randomValue(60, 300);
        this.minHue = randomValue(0, 360 - this.hueRange);
        this.saturation = randomValue(20, 100);
        this.lightness = randomValue(20, 60);

        // parameters for speed
        this.maxTimeToCross = randomValue(1, 10);

        // parameters for size
        this.minSize = randomValue(0.01, 0.1);
        this.maxSize = randomValue(this.minSize, 0.2);

        this.objects = Array.from({ length: nSquares }, () => {
            return new Square(
                this.randomLocation,
                this.randomSize,
                this.randomSpeed,
                this.randomColour
            )
        }).concat(Array.from({ length: nThings }, () => { 
            return new Thing(
                { x: canvas.width / 2, y: canvas.height / 2 },
                randomValue(-2 * Math.PI, 2 * Math.PI)
            );
        }));
    }

    get edge() {
        return Math.min(this.canvas.width, this.canvas.height);
    }

    get randomSize() {
        return this.edge * randomValue(this.minSize, this.maxSize);
    }

    get randomColour() {
        const hue = this.minHue + randomValue(0, this.hueRange);        
        return `hsl(${hue}, ${this.saturation}%, ${this.lightness}%)`;
    }

    get randomLocation() {
        return {
            x: randomValue(0, this.canvas.width),
            y: randomValue(0, this.canvas.height)
        }
    }

    get randomSpeed() {
        const maxSpeed = this.edge / this.maxTimeToCross;
        return {
            x: randomValue(-maxSpeed, maxSpeed),
            y: randomValue(-maxSpeed, maxSpeed),
            rotation: randomValue(-2 * Math.PI, 2 * Math.PI)
        }
    }

    draw() {
        for (const obj of this.objects) {
            obj.draw(this.ctx);            
        }
    }

    update(elapsed) {
        for (const obj of this.objects) {
            obj.update(elapsed);
            obj.handleEdge(this.canvas);
        }
    }
}
```

All we now need is to pass an extra value into the `Scene` class.

```js {hl_lines=12}
import { Scene } from "./scene.js";

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

// Prepare the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.append(canvas);

// Initialise the scene
const scene = new Scene(canvas, 20, 20);

// Complete one frame
let previousTimestamp = 0;
function frame(timestamp) {
    const elapsed = (timestamp - previousTimestamp) / 1000;
    previousTimestamp = timestamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    scene.update(elapsed);
    scene.draw();
    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
```

The result is a more complex scene with more variety. 

{{<iframe src="iframes/animation-8" width="1000" height="600">}}{{</iframe>}}

## References

- The [`setInterval`] method allowed us to call a function regularly to draw a scene. 
- We used [`requestAnimationFrame`] to coordinate an animated scene.
- We used [beginPath] and [rect] to modify our path.
- We used [stroke] and [fill] to draw.
- We used [translate] and [rotate] to set the position and angle of our drawing. 
- Using [save] and [restore] to return the canvas context back to its original state.
- We also used [clearRect] to clear the scene before drawing each frame.

[`setInterval`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval
[`requestAnimationFrame`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame
[remainder assignment]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder_assignment

[translate]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/translate
[rotate]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate

[save]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save
[restore]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore

[clearRect]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect

[getter]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get

[`Array.from`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from

[stroke]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/stroke
[fill]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fill
[rect]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rect
[beginPath]: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/beginPath

[`class`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
[`import`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import