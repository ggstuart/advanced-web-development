const main = document.querySelector('main');
const list = document.createElement('ul');
const addForm = document.createElement('form');
const input = document.createElement('input');
const button = document.createElement('button');

input.type = "text";
input.placeholder = "new item";
input.ariaLabel = "new item";

button.type = "submit";
button.textContent = "add";
button.classList.add('highlight');

addForm.classList.add('with-button');

addForm.append(input, button);

main.append(addForm, list);

addForm.addEventListener('submit', ev => {
    ev.preventDefault();
    if (!input.value) return;
    const li = document.createElement('li');
    const label = document.createElement('label');
    const done = document.createElement('input');
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = "&times;";
    deleteBtn.classList.add('highlight');
    label.textContent = input.value;
    label.classList.add('item');
    done.type = "checkbox";
    label.append(done);
    li.classList.add('with-button');
    li.append(label, deleteBtn);
    input.value = "";
    list.append(li);

    deleteBtn.addEventListener('click', ev => {
        li.classList.add('removing');
        li.addEventListener('animationend', ev => {
            li.remove();
        })
    });
});