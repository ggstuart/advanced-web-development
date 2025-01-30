// Create an image
const img = document.createElement('img');
img.src = `https://picsum.photos/id/100/1000`;

// Create some content
const heading = document.createElement('h2');
const paragraph = document.createElement('p');
heading.textContent = "this is a heading";
paragraph.textContent = "this is a paragraph";

// Build the figure
const figure = document.createElement('figure');
const caption = document.createElement('figcaption');
caption.append(heading, paragraph);
figure.append(img, caption);
figure.classList.add('my-component');

// Add the new component to our list
const target = document.querySelector('#target');
const li = document.createElement('li');
li.append(figure);
target.append(li);
