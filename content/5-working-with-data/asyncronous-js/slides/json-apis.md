---
type: slide
title: Restful JSON APIs
classes: [rest, both-gap]
---

Web services provide a way for software to interact with a web server directly using HTTP requests.
In particular, we are interested in a type of API architecture known as *"RESTful APIs"*.


| Verb        | Action                  | Response Code     |
| ----------- | :---------------------- | :---------------- |
| **GET**     | Fetches a resource      | 200 success       | 
| **POST**    | Creates a new resource  | 201 created       | 
| **PUT**     | Replaces a resource     | 200 success       | 
| **PATCH**   | Modifies a resource     | 200 success       | 
| **DELETE**  | Deletes a resource      | 200 success       | 

> REST stands for *"Representational State Transfer"*, it is an architectural style designed for the web.
It uses HTTP to perform Create, Read, Update, and Delete (CRUD) operations between client and server. 
