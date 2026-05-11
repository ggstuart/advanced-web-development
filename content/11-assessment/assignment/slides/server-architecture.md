---
type: slide
title: Server architecture
classes: [burger, gap, even]
---

> Explain routing + the MVC pattern as taught.
Explain and demonstrate basic security features (preventing SQL injection, XSS) and data validation tools used in the application.
**Include a brief critical evaluation of the choices made.**

Our routing logic decides how each incoming request is handled. 
The request is passed to controllers, performing the necessary tasks and deciding exactly how to respond. 
We have a variety of tools to support tasks such as rendering HTML pages, redirecting, setting cookies, performing data validation and authentication.
Models provide access to data persistence.
Views generate a user interface with embedded hypermedia controls.

![server architecture diagram](./images/server-architecture.svg)

> This one covers a lot of ground, try to give a flavour of how your server is organised. 
[Routing and MVC]({{< ref "/2-javascript/routing-and-mvc">}}) is the core, as well as any tools you have time to explain. 
Demonstrate the [security]({{< ref "7-security-and-validation/security-concerns" >}}) and [data validation]({{< ref "7-security-and-validation/data-validation" >}}) features in your application.
Crucially, provide a critique of the architecture, *highlight good aspects and suggest potential improvements*. 
