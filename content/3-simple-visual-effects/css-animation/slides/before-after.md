---
title: ::Before and ::after
type: slide
classes: [before-after, p-burger, both-gap]
---

The [::before] and [::after] pseudo elements can be added to any element using CSS.

> They become the first and last child elements.

```css
.surrounded {
    &::before, &::after { background-color: yellow; }
    &::before { content: "before "; }
    &::after { content: " after"; }
}
```

<div class="demo">
    <div class="surrounded">div.surrounded</div>
</div>

<style>
.surrounded {
    &::before, &::after { background-color: yellow; }
    &::before { content: "before "; }
    &::after { content: " after"; }
}
</style>

> They can be part of a grid layout.

```css
.surrounded2 {
    display: grid;
    grid-template-rows: 1fr auto 1fr;
    &::before, &::after { background-color: yellow; }
    &::before { content: "before "; }
    &::after { content: " after"; }
}
```

<div class="demo">
    <div class="surrounded2">div.surrounded2</div>
</div>

<style>
.surrounded2 {
    display: grid;
    grid-template-rows: 1fr auto 1fr;
    &::before, &::after { background-color: yellow; }
    &::before { content: "before "; }
    &::after { content: " after"; }
}
</style>

> They can be animated easily.

```css
.fancy-underline {
    display: grid;
    grid-template-rows: auto 3px;
    justify-content: center;
    &::after {
        content: "";
        justify-self: center;
        background-color: blue; 
        width: 0;
        transition: 300ms;
    }
    &:hover::after { width: 100%; }
}
```

<div class="demo spaced">
    <div class="fancy-underline">div.fancy-underline</div>
    <div class="fancy-underline2">div.dbl-underline</div>
    <div class="fancy-underline3">div.something-else</div>
</div>

<style>
.fancy-underline {
    display: grid;
    grid-template-rows: auto 3px;
    justify-content: center;
    &::after {
        content: "";
        justify-self: center;
        background-color: blue; 
        width: 0;
        transition: 300ms;
    }
    &:hover::after { width: 100%; }
}
.fancy-underline2 {
    display: grid;
    grid-template-rows: 3px auto 3px;
    justify-content: center;
    &::after, &::before {
        content: "";
        justify-self: start;
        background-color: red; 
        width: 0;
        transition: 300ms;
    }
    &::after {
        justify-self: end;
    }
    &:hover {
        &::before, &::after { width: 100%; }
    }
}
.fancy-underline3 {
    display: grid;
    grid-template-columns: 1em 1fr 1em;
    justify-content: center;
    /* transition: 1300ms; */
    &::after, &::before {
        background-color: transparent;
        transition: translate 500ms, rotate 500ms, background-color 1000ms;
        content: "";
        justify-self: center;
        width: 100%;
        height: 3px;
    }
    &:hover {
        &::after, &::before { background-color: green; }
        &::after { translate: -2em 0.5em; rotate: -0.25turn;}
        &::before { translate: 2em 0.5em; rotate: 0.25turn;}
    }
}
</style>

[::before]: https://developer.mozilla.org/en-US/docs/Web/CSS/::before
[::after]: https://developer.mozilla.org/en-US/docs/Web/CSS/::after
