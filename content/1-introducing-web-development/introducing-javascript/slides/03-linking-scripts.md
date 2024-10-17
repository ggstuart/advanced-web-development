---
title: Linking scripts
type: slide
order: 3
classes: [even]
---

- Include a `<script>` element in your document.
- Place it in the `<head>` element.
- Set the `type` attribute to `"module"`
- Set the `src` attribute to the file where the code lives.


```html {hl_lines=6}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Page with a script</title>
    <script src="scripts.js" type="module"></script>
  </head>
  <body>
      <!-- your page content is here -->
  </body>
</html>
```

![live-server](./images/live-server.png)

>JavaScript modules require the [*live server*](https://ggstuart.github.io/web-application-development/welcome/vscode/#using-the-live-server-extension) extension for VSCode (which is recommended anyway) and allows for the use of import and export statements.
