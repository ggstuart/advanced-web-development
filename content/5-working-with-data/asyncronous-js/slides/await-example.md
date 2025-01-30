---
type: slide
title: A real example
classes: [tiny-code, even, block-burger]
---

> Our code reflects the specifics of [the star wars API].

<div id="demo-async"></div>

```js
async function getJSON(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data.result || data.results;
}

async function loadItems(url) {
    const data = await getJSON(url);
    return data.map(item => {
        const span = document.createElement('span');
        span.textContent = item.name || item.description;
        return span;
    });
}

const demo = document.querySelector('#demo-async');
const index = await getJSON('https://www.swapi.tech/api/');

for(const key in index) {
    const btn = document.createElement('button');
    btn.textContent = key;
    btn.addEventListener('click', async ev => {
        output.classList.remove('allow-empty');
        while(output.firstChild) { output.lastChild.remove(); }
        output.append(...await loadItems(index[key]));
    });
    demo.append(btn);
}

const output = document.createElement('output');
output.classList.add('allow-empty');
demo.append(output);
```

<script type="module">
async function getJSON(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data.result || data.results;
}

async function loadItems(url) {
    const data = await getJSON(url);
    return data.map(item => {
        const span = document.createElement('span');
        span.textContent = item.name || item.description;
        return span;
    });
}

const demo = document.querySelector('#demo-async');
const index = await getJSON('https://www.swapi.tech/api/');

for(const key in index) {
    const btn = document.createElement('button');
    btn.textContent = key;
    btn.addEventListener('click', async ev => {
        output.classList.remove('allow-empty');
        while(output.firstChild) { output.lastChild.remove(); }
        output.append(...await loadItems(index[key]));
    });
    demo.append(btn);
}
const output = document.createElement('output');
output.classList.add('allow-empty');
demo.append(output);
</script>

<style>
    #demo-async {
        background: black;
        padding: 0.5rem;
        output {
            display: grid;
            grid-template-columns: repeat(3, auto);
            place-content: center;
            gap: 0.5rem;
            padding: 0.5rem;
            span {
                background: var(--clr-accent);
                border-radius: 2ch;
                border: 2px solid var(--clr-accent2);
                align-content: center;
                padding: 0.5ch;
            }
            &:empty:not(.allow-empty) {
                display: grid;
                grid-template-columns: auto auto;
                gap: 0.5rem;
                place-content: center;
                place-items: center;
                color: white;
                &::before {
                    content: "loading..."
                }
                &::after {
                    content: "";
                    aspect-ratio: 10;
                    width: 2ch;
                    background: yellow;
                    animation: spin 600ms infinite linear;
                }
            }
        }
        &:empty {
            display: grid;
            grid-template-columns: auto auto;
            gap: 0.5rem;
            place-content: center;
            place-items: center;
            color: white;
            &::before {
                content: "loading..."
            }
            &::after {
                content: "";
                aspect-ratio: 10;
                width: 2ch;
                background: yellow;
                animation: spin 600ms infinite linear;
            }
        }
    }
    @keyframes spin {100% {rotate: 1turn;}}
</style>

[the star wars API]: https://swapi.tech/documentation