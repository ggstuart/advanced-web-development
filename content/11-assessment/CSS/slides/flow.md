---
type: slide
title: Flow layout (default)
classes: [one-two, burger, gap, flow]
---

> Flow layout is the default for all HTML elements.
The *outer* `display` property determines element layout.

Block elements take up the full width of the viewport and force subsequent elements down.

{{<iframe src="examples/flow/block.html" width="1000" height="150">}}{{</iframe>}}

Inline elements flow like text and can be nested inside block elements.
They wrap onto new lines as necessary and increase the height of the parent.

{{<iframe src="examples/flow/inline.html" width="1000" height="150">}}{{</iframe>}}

Nesting block elements inside inline elements is invalid.

{{<iframe src="examples/flow/invalid.html" width="1000" height="150">}}{{</iframe>}}

> Both **inline** and **block** are known as the *outer* display types because they determine how an element is placed relative to its siblings.