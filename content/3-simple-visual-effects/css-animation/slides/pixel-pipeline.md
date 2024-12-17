---
title: The pixel pipeline
type: slide
classes: [contain, pipeline]
---

> Animating involves work that must be carried out between frames.

- **Javascript** - modifying the DOM or CSSOM
- **Style calculations** - calculate what styles each element should have based on the provided selectors.
- **Layout** - calculate the geometry within the viewport based on the style rules.
- **Paint** - calculate the pixel values on multiple layers (rasterisation).
- **Composite** - Apply the layers to the screen in order.

![The pixel pipeline](./images/the-full-pixel-pipeline.jpg)

Changing e.g. the `height` of an element is a **layout** change that will trigger *reflow* and affected areas will need to be repainted and composited.

Some properties such as `color` or `background-color`, are *paint-only* and do not require an expensive *reflow*.

> Some properties, such as `transform` and `opacity` don't even impact the paint step.