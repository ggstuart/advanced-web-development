---
type: slide
title: Response Codes
classes: [one-three, both-gap]
---


**Code**

**HTTP [Response Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status) should reflect the status of the processed request.**

> **200 OK**

> No problem, your request was processed successfully

 **303 See Other**

 The result can be seen at another location.

> **400 Bad request**

> This doesn't make sense. 
Your request was not processed.

**401 Unauthorized**

Poorly named as this really means unauthenticated, i.e "I don't know who you are", .

> **403 Forbidden**

> I know you. 
You can't have the requested resource.

**404 Not found**

I'm not sure what you were trying to do because this resource doesn't exist.

> **500 Internal server error**

> Wait... something went wrong. I don't feel well.
