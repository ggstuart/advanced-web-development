---
type: slide
title: a working example
classes: [block-burger, even, tiny-code, promise-example]
---

> In this example, we have a button and an output and used css to render the promise state.

```html
<div id="promise-example">
    <button>Create promise</button>
    <output></output>
</div>
```

```css
#promise-example {
    grid-column: span 2;
    display: grid;
    grid-template-columns: 1fr 2fr;
    output {
        padding: 0.5rem;
        align-content: center;
        text-align: left;
        background: hsl(40, 100%, 20%);
        color: white;   
        &.pending {
            animation: pulse 100ms infinite alternate;
            &::before { content: "pending..."; }
        }
        &.resolved {
            background: hsl(100, 100%, 30%);
            &::before { content: "resolved: "; }
        }
        &.rejected {
            background: hsl(0, 100%, 30%);
            &::before { content: "rejected: "; }
        }
    }
}
@keyframes pulse {
    100% { background: hsl(40, 100%, 30%); }
}
```

```js
const btn = document.querySelector('#promise-example button');
const output = document.querySelector('#promise-example output');

btn.addEventListener('click', ev => {

    const myPromise = new Promise((resolve, reject) => {
        const ok = Math.random() > 0.75;
        const msg = ok ? "success!" : "failure!"; 
        setTimeout(() => { ok ? resolve(msg) : reject(msg); }, 1000);
    });

    myPromise.then(result => {            
        output.classList.replace("pending", "resolved");
        output.textContent = result;
    }).catch(error => {
        output.classList.replace("pending", "rejected");
        output.textContent = error;
    });

    output.className = "pending";
    output.textContent = "";
});
```


<div id="promise-example">
    <button>Create promise</button>
    <output></output>
</div>




<script type="module">
const btn = document.querySelector('#promise-example button');
const output = document.querySelector('#promise-example output');

btn.addEventListener('click', ev => {
    const myPromise = new Promise((resolve, reject) => {
        const ok = Math.random() > 0.75;
        const msg = ok ? "success!" : "failure!"; 
        setTimeout(() => { ok ? resolve(msg) : reject(msg); }, 1000);
    });

    myPromise.then(result => {            
        output.classList.replace("pending", "resolved");
        output.textContent = result;
    }).catch(error => {
        output.classList.replace("pending", "rejected");
        output.textContent = error;
    });
    output.className = "pending";
    output.textContent = "";
});
</script>


<style>
#promise-example {
    grid-column: span 2;
    display: grid;
    grid-template-columns: 1fr 2fr;
    button {
        scale: 1;
    }
    output {
        padding: 0.5rem;
        align-content: center;
        text-align: left;
        background-color: hsl(40, 100%, 20%);
        color: white;   
        &.pending {
            animation: pulse 100ms infinite alternate;
            &::before { content: "pending..."; }
        }
        &.resolved {
            background-color: hsl(100, 100%, 30%);
            &::before { content: "resolved: "; }
        }
        &.rejected {
            background-color: hsl(0, 100%, 30%);
            &::before { content: "rejected: "; }
        }
    }
}
@keyframes pulse {
    100% { background-color: hsl(40, 100%, 30%); }
}
</style>