---
title: Inheritance
type: slide
classes: [even, block-burger]
---

> Using [`extends`] we can implement subclasses of our custom classes to share functionality between related classes.
> Essentially the parent class becomes the prototype of the child class. 


```js
class Coordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Square extends Coordinate { 
    constructor(x, y, size) {
        super(x, y);
        this.size = size;
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillRect(
            -this.size, -this.size, 
             this.size,  this.size
        );
        ctx.restore();
    }
}
```
```js
class Coordinate {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Square { 
    constructor(location, size) {
        this.location = location;
        this.size = size;
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.location.x, this.location.y);
        ctx.fillRect(
            -this.size, -this.size, 
             this.size,  this.size
        );
        ctx.restore();
    }
}
```
> Typically, composition is favoured over inheritance.

[`extends`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends