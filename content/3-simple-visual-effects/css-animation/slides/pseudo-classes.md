---
type: slide
title: pseudo-classes
classes: [three-even, p-burger, both-gap]
---

A CSS [pseudo-class] selector specifies a specific state of an element after a colon (`:`).
For example, the `:hover` pseudo-class selects elements only when the mouse is over them.

> The `:active` pseudo-class applies when an element is being activated by the user.

```css
button {
    transition: 300ms;
    &:active {
        scale: 1.5;
    }
}
```

<div class="demo" id="active">
    <button>Click me!</button>
</div>

> The `:focus` pseudo-class selects elements with user focus.

```css
input {
    transition: 300ms;
    &:focus {
        scale: 2.5;
    }
}
```

<fieldset class="demo" id="focus">
    <label for="red">red:</label>
    <input type="radio" name="test" id="red">
    <label for="green">green:</label>
    <input type="radio" name="test" id="green">
    <label for="blue">blue:</label>
    <input type="radio" name="test" id="blue">
</fieldset>

> The new `:user-invalid` and `:user-valid` pseudo-classes respond to input validity.

```css
/* 
This one is a bit more complex.

It requires pseudo-elements.
*/
```

<div class="demo" id="user-valid">
    <label for="pwd">Password:</label>
    <input id="pwd" type="password" minlength="8" placeholder="8 characters minimum" required>
</div>



<style>

    #active {
        button {
            background: white;
            color: black;
            border: 2px solid black;
            border-radius: 3px;
            padding: 0.5rem 1rem;
            font-size: 1.5em;
            transition: 300ms;
            &:hover {
                scale: 0.95;
            }
            &:active {
                filter: none;
                scale: 1.5;
            }
        }
    }
    #focus {
        display: grid;
        gap: 0 1rem;
        grid-template-columns: min-content auto;
        place-content: center;
        label {
            text-align: right;
        }
        input {
            font-size: inherit;
            transition: 300ms;
            &:focus {
                scale: 2.5;
                outline: none;
            }
        }
    }
    #user-valid {
        display: grid;
        grid-template-columns: auto auto auto;
        place-content: center;
        place-items: center;
        gap: 0.5rem;
        #pwd {
            max-width: 15ch;
            font-size: inherit;
            line-height: 1.3;
            border: 2px solid black;
            border-radius: 2rem;
            padding: 0 1rem;
            transition: 500ms;
        }
        #pwd::placeholder {
            font-size: 0.65em;
        }
        #pwd:user-invalid {
            border-color: hsl(0, 100%, 40%);
            background: hsl(0, 100%, 95%);
        }
        #pwd:user-valid {
            border-color: hsl(150, 100%, 30%);
            background: hsl(150, 100%, 95%);
        }
        &::after {
            font-size: 1.2em;
            font-weight: bold;
            opacity: 0;
            content: "✖";
            transition: 500ms;
        }
        &:has(:user-invalid)::after {
            color: hsl(0, 100%, 40%);
            opacity: 1;
        }
        &:has(:user-valid)::after {
            color: hsl(150, 100%, 30%);
            content: "✔";
            opacity: 1;
        }
    }
</style>

[pseudo-class]: https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes