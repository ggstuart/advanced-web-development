---
type: unit
title: Simple visual effects
weight: 30
---

In this unit we will look at three methods for creating animated visual effects in the browser.

<!--more-->

1. Using the CSS `transition` property
1. Using CSS `@keyframes`
1. Approaches with JavaScript


<div id="animation-container"></div>

<script>
const container = document.querySelector('#animation-container');
const n = 100;
const newDiv = (_, i) => {
    const div = document.createElement('div');    
    div.style.animationDelay = `${i/n}s`;
    return div; 
}
const divs = Array.from({length: n}, newDiv);
console.log(container);

container.append(...divs);
</script>


<style>
    #animation-container {
        width: 30%;
        margin-inline: auto;
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        div {
            aspect-ratio: 1;
            background: red;
            text-align: center;
            align-content: center;
            animation-name: magic;
            animation-duration: 3s;
            animation-direction: alternate;
            animation-iteration-count: infinite;
        }
    }
    @keyframes magic {
        50% {
            background: orange;
            scale: 0.75;
        }
        100% {
            rotate: 0.25turn;
        }
    }
</style>