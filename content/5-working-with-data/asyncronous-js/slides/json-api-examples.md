---
type: slide
title: examples of JSON APIs
classes: [api-examples]
---

There are loads of APIs out there, 
Here are a few examples:

| API                              | Resources                                            | Notes                                   |
| -------------------------------- | :--------------------------------------------------- | :-------------------------------------- |
| [swapi]                          | films, people, planets, species, starships, vehicles | **GET** only.                           | 
| [The Metropolitan Museum of Art] | Objects, object, departments and search              | **GET** only.                           |
| [wikimedia]                      | e.g. Search results                                  | Requires authentication                 |
| [github][github API]             | Users, Organisations, Repositories, Branches, Commits, Issues, Comments, etc. | Automate your github! | 

> Some systems require authentication and some are not really very useful.
> The ideal REST API for our purposes should be relatively simple, should use the JSON format and should have good documentation.


[github API]: https://docs.github.com/en/rest?apiVersion=2022-11-28
[swapi]: https://swapi.tech/documentation
[The Metropolitan Museum of Art]: https://metmuseum.github.io/
[wikimedia]: https://www.mediawiki.org/wiki/API:Search