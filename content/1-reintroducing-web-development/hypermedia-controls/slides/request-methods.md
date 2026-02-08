---
type: slide
title: HTTP Request Methods
classes: [one-three, burger, both-gap]
---

HTML only allows two request methods, GET and POST.
They imply a different intent.

> GET requests are always *safe*.
They never change server state.

>A simple request for a representation if a resource.
e.g. **GET /** = Give me the home page.
In a simple HTML application, the request is for an HTML representation.

> GET requests are also *idempotent*

> They can be issued and reissued many times without any problem.

> POST requests are not *safe*.
They change server state.

>A bit more complex since POST requests in an HTML application must do many jobs. 
Fundamentally, they submit data for the resource to process. 

> POST Requests are also not guaranteed to be *idempotent*

>This means that issuing the same POST request multiple times may change the state each time. 
e.g. by adding duplicate records into a collection.

POST requests should be handled with care.