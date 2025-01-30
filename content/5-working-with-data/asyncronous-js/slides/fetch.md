---
type: slide
title: Making HTTP requests with fetch
classes: [even, block-burger, both-gap, tiny-code]
---

> The [fetch API] makes HTTP requests.
> Calling [`window.fetch()`] returns a promise that resolves to an HTTP [`Response`] object.

```js
const url = 'https://www.swapi.tech/api/';

fetch(url).then(response => {
    response.text().then(data => {
        console.log(data);
    });
});
```


```plaintext
'{
    "message": "ok",
    "result": {
        "films": "https://www.swapi.tech/api/films",
        "people": "https://www.swapi.tech/api/people",
        "planets": "https://www.swapi.tech/api/planets",
        "species": "https://www.swapi.tech/api/species",
        "starships": "https://www.swapi.tech/api/starships",
        "vehicles": "https://www.swapi.tech/api/vehicles"
    }
}'
```

```js
const url = 'https://www.swapi.tech/api/';

fetch(url).then(response => {
    response.json().then(data => {
        console.log(data);
    });
});
```


```json
{
    message: "ok",
    result: {
        films: "https://www.swapi.tech/api/films",
        people: "https://www.swapi.tech/api/people",
        planets: "https://www.swapi.tech/api/planets",
        species: "https://www.swapi.tech/api/species",
        starships: "https://www.swapi.tech/api/starships",
        vehicles: "https://www.swapi.tech/api/vehicles"
    }
}
```

> The `Response` object has methods such as [`Response.text()`] and [`Response.json()`] which also return promises.


[fetch API]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
[`window.fetch()`]: https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch
[`Response`]: https://developer.mozilla.org/en-US/docs/Web/API/Response
[`Response.text()`]: https://developer.mozilla.org/en-US/docs/Web/API/Response/text
[`Response.json()`]: https://developer.mozilla.org/en-US/docs/Web/API/Response/json