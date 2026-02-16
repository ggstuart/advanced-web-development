---
title: JavaScript
type: unit
weight: 20
---

Creating a web server with JavaScript is simple, structuring one is not.

<!--more-->

Expanding from a very basic web server to a fully featured web application requires carefully structured code.

```js
Deno.serve(request => {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <title>My Web Application</title>
        </head>
        <body>
            <header>
                <h1>My Web Application</h1>
            </header>
            <main>
                <h2>Home page</h2>
                <p>This is the home page!</p>
            </main>
        </body>
    </html>`;
    const headers = new Headers({"content-type": "text/html"});
    return new Response(html, { headers });
})
```

JavaScript can also be used in the browser to manipulate the Document Object Model and to make HTTP requests. 
A web application is more fun with JavaScript.