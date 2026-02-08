---
title: Hypermedia controls
type: slide
classes: [plain-form]
---

> Anchors and forms are examples of hypermedia controls

[hyperlinks](#) are hypermedia controls for submitting GET requests.

<form>
    <p>Forms are also hypermedia controls.</p>
    <label>slide</label>
    <input name="slide" type="number" style="width: 4em">
    <button>Submit</button>
</form>

Forms can submit GET or POST requests and include custom data.

> HATEOAS means that subsequent requests are discovered inside the previous response.