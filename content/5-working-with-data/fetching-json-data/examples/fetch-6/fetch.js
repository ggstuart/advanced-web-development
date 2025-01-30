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

function createComponent({picsumId, title, description}) {
    const img = picsumImg(picsumId, 1000);
    const heading = document.createElement('h2');
    const paragraph = document.createElement('p');
    heading.textContent = title;
    paragraph.textContent = description;
    const figure = createFigure(img, [heading, paragraph]);
    figure.classList.add('my-component');
    return figure;
}

const response = await fetch('data.json');
const data = await response.json();

// Build the components
const figures = data.map(createComponent);

// Add the new component to our list
const target = document.querySelector('#target');
const items = figures.map(figure => {
    const li = document.createElement('li');
    li.append(figure);
    return li;
});
target.append(...items);
