---
title: The location API
type: slide
classes: [twin-code]
---

> The [`location`] property of `document` provides access to the [Location API] which can access the URL components.

```js
function loc_append(key, value) {
    const dt = document.createElement('dt');
    const dd = document.createElement('dd');
    dt.textContent = key;
    dd.textContent = value;
    loc.append(dt, dd);
}
```
```js
loc_append('location.href', location.href);
loc_append('location.origin', location.origin);
loc_append('location.pathname', location.pathname);
loc_append('location.search', location.search);
loc_append('location.hash', location.hash);
loc_append('location.protocol', location.protocol);
loc_append('location.host', location.host);
loc_append('location.hostname', location.hostname);
loc_append('location.port', location.port);
```

<dl id="loc"></dl>

<style>
    dl#loc {
        background: #333;
        margin: auto;
        padding: 2px;
        display: grid;
        gap: 2px;
        place-content: center;
        grid-template-columns: min-content auto;
        > * {
            padding-inline: 0.5rem;
            background: #eee;
            margin: 0;
        }
        dt {
            font-weight: bold;
            text-align: right;
            &::after { content: ":";}
        }
        dd {
            text-align: left;
        }
    }
</style>

<script>
    function loc_append(key, value) {
        const dt = document.createElement('dt');
        const dd = document.createElement('dd');
        dt.textContent = key;
        dd.textContent = value;
        loc.append(dt, dd);
    }
    loc_append('location.href', location.href);
    loc_append('location.origin', location.origin);
    loc_append('location.pathname', location.pathname);
    loc_append('location.search', location.search);
    loc_append('location.hash', location.hash);
    loc_append('location.protocol', location.protocol);
    loc_append('location.host', location.host);
    loc_append('location.hostname', location.hostname);
    loc_append('location.port', location.port);
</script>

[`location`]: https://developer.mozilla.org/en-US/docs/Web/API/Document/location
[Location API]: https://developer.mozilla.org/en-US/docs/Web/API/Location
