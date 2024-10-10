const main = document.querySelector('main');
const list = document.createElement('ul');
const input = document.createElement('input');

input.type = "text";
input.placeholder = "new item";
input.ariaLabel = "new item";

main.append(input, list);