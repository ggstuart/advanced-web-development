---
type: slide
title: JavaScript Object Notation
classes: [tiny-code, three-two, block-burger]
---

> [JSON] is a data format commonly used on the web and implemented in most languages. 

```json
{
  "login": "ggstuart",
  "id": 266805,
  "node_id": "MDQ6VXNlcjI2NjgwNQ==",
  "avatar_url": "https://avatars.githubusercontent.com/u/266805?v=4",
  "url": "https://api.github.com/users/ggstuart",
  "html_url": "https://github.com/ggstuart",
  "subscriptions_url": "https://api.github.com/users/ggstuart/subscriptions",
  "organizations_url": "https://api.github.com/users/ggstuart/orgs",
  "repos_url": "https://api.github.com/users/ggstuart/repos",
  "received_events_url": "https://api.github.com/users/ggstuart/received_events",
  "type": "User",
  "user_view_type": "public",
  "site_admin": false,
  "name": "Graeme Stuart",
  "company": "@IESD, De Montfort University",
  "blog": "http://ggstuart.com",
  "location": "Leicester, UK",
  "bio": "I'm a researcher and developer teaching web technology to undergraduates. I wrote a book and some software, I authored some papers and was involved in projects.",
  "twitter_username": null,
  "public_repos": 40,
  "public_gists": 3,
  "followers": 62,
  "following": 13,
  "created_at": "2010-05-06T18:51:06Z",
  "updated_at": "2024-12-16T15:34:28Z"
}
```

```js

// data is often received as a string
const jsonString = '{"key": "value"}';

// converting to an object is easy using JSON.parse()
const jsonData = JSON.parse(jsonString);

console.log(jsonData);
// {key: 'value'}

// If you have an object
jsonData["another key"] = 123

// convert to JSON using JSON.stringify()
const newString = JSON.stringify(jsonData);

console.log(newString);
// '{"key":"value","another key":123}'
```


> Linked to, and emerging from the JavaScript world, JSON is a language-independent format.

[JSON]: https://www.json.org/json-en.html