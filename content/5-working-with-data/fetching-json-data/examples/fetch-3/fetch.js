function createFigure(img, content) {
    const figure = document.createElement('figure');
    const caption = document.createElement('figcaption');
    caption.append(...content);
    figure.append(img, caption);
    return figure
}

function picsumImg(id, size) {
    const img = document.createElement('img');
    img.src = `https://picsum.photos/id/${id}/${size}`;
    return img;
}

const data = {
    picsumId: 55,
    title: "This is an example",
    description: "A simple example to demonstrate the principle"
};

// Create an image
const img = picsumImg(data.picsumId, 1000);

// Create some content
const heading = document.createElement('h2');
const paragraph = document.createElement('p');
heading.textContent = data.title;
paragraph.textContent = data.description;

// Build the figure
const figure = createFigure(img, [heading, paragraph]);
figure.classList.add('my-component');

// Add the new component to our list
const target = document.querySelector('#target');
const li = document.createElement('li');
li.append(figure);
target.append(li);
