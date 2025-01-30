---
type: slide
title: Understanding API documentation
classes: [apis, three-two, both-gap, api-documentation]
---

The [github API] is very powerful. It allows you to do almost anything you can do via the github website, programmatically. 


> The [documentation][github documentation] indicates that all data is sent and received as JSON.
It provides a URL as the basis for all requests.

```plaintext
https://api.github.com
```

> It goes on to define endpoints for various resources. For example, **[users]** can be accessed at this endpoint. 
Where `{username}` should be replaced by an actual github username.

```plaintext
GET /users/{username}
```

> The request url for a user is a combination of the base URL and the endpoint.

```plaintext
https://api.github.com/users/{username}
```

> Visiting the endpoint for [my user] shows the JSON data in the browser window.

```plaintext
https://api.github.com/users/ggstuart
```

We will see that we can send a **GET** request programmatically, and receive JSON data in the response.

[github API]: https://docs.github.com/en/rest?apiVersion=2022-11-28

[github documentation]: https://docs.github.com/en/rest/using-the-rest-api/getting-started-with-the-rest-api?apiVersion=2022-11-28#schema

[users]: https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-a-user

[my user]: https://api.github.com/users/ggstuart