---
type: slide
title: Authentication and authorisation
classes: [burger, gap, even]
---

> Explain and demonstrate *session-based authentication*. 
Demonstrate your authorisation system, including how normal users are prevented from accessing admin user capabilities.
Discuss trade-offs and security considerations.


```js
import { createSession } from '../models/sessions.js';

export function login(headers, username) {
    
    // Create session record and get the sessionId
    const sessionId = createSession(username);

    // Add a session cookie to the response
    setCookie(headers, {
        name: "sessionId",
        value: sessionId,
        path: "/"
    });
}
```

This is the core code for logging in. 
There is a lot more to it than just this code. 
Your task is to explain the entire process of authentication and authorisation to your audience in an accessible way.


> Check out the [cookies]({{< ref "/8-authentication/cookies" >}}) and [authentication]({{< ref "/8-authentication/authentication" >}}) lectures for a reminder.
Make sure you use the *network panel* in the browser developer tools to highlight the HTTP communication and think about using *console logging* to show how requests for protected pages are handled.