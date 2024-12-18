---
title: ::Before and ::after
type: slide
classes: [before-after, p-burger, both-gap]
---

The [`::before`] and [`::after`] pseudo elements can be added to any element using CSS.

> They become the first and last child elements.

> They can be part of a grid layout.

> They can be animated easily.

```css
.surrounded {
    &::before,
    &::after {
        background-color: yellow; 
    }
    &::before {
        content: "before ";
    }
    &::after {
        content: " after";
    }
}
```


```css
.surrounded2 {
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto auto;
  place-content: center;
  &::before, 
  &::after {
    content: "💀";
    background: black;
    padding-block: 0.25rem;
  }
}
```

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


<div class="demo">
    <div class="surrounded2">
        <span>1<sup>st</sup> span</span>
        <span>2<sup>nd</sup> span</span>
    </div>
</div>

<style>
.surrounded2 {
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: auto auto;
    place-content: center;
    &::before, &::after {
        content: "💀";
        background: black;
        padding-block: 1rem;
    }
}
</style>


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
    grid-template-columns: auto max-content auto;
    place-content: center;
    place-items: center;
    gap: 0.5ch;
    &::after, &::before {
        content: "";
        aspect-ratio: 1;
        width: 1ch;
        transition: background-color 400ms;
        animation: spin 1s infinite linear;
    }
    &:hover {
        &::after, &::before { background: var(--clr-primary-button); }
    }
}
@keyframes spin { 100% { rotate: 1turn; }}
</style>

[`::before`]: https://developer.mozilla.org/en-US/docs/Web/CSS/::before
[`::after`]: https://developer.mozilla.org/en-US/docs/Web/CSS/::after
