---
type: slide
title: Restful JSON APIs
classes: [rest, both-gap]
---

Web servers can expose functionality using different HTTP methods.

| Method               | Action                  | Response Code     |
| -------------------- | :---------------------- | :---------------- |
| **GET**              | Fetches a resource      | 200 success       | 
| **POST**             | Creates a new resource  | 201 created       | 
| **PUT**              | Replaces a resource     | 200 success       | 
| **PATCH**            | Modifies a resource     | 200 success       | 
| **DELETE**           | Deletes a resource      | 200 success       | 

> Although these are not all available directly from HTML, Web browsers can issue **asynchronous** HTTP requests triggered from JavaScript *without reloading the document*. 
