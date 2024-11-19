---
title: HTML and CSS are decoupled
type: slide
classes: [block-burger, zen]
---

> Remember CSS Zen Garden?


![The CSS Zen Garden page showing many designs](./images/www.csszengarden.com_pages_alldesigns_.png)

In principle, the point of CSS is to maintain a separation of concerns.

HTML provides semantics, declaring the *meaning* of the content and *could* have any number of alternative stylesheets.

CSS describes the *presentation* of the content and *could* be applied to any number of alternative HTML documents.

Stylesheets need to have some knowledge of the document structure.
Adding hooks such as `id` and `class` attributes to your HTML help to make them easier to style.

![The CSS Zen Garden page showing many designs](./images/www.csszengarden.com_pages_alldesigns_.png)

> This relationship between the HTML and CSS needs to be arranged by you, the developer. 