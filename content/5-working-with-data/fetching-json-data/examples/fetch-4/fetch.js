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

const data = {
    picsumId: 200,
    title: "This is a picture of a cow",
    description: "It's a hairy cow"
};

// Build the component
const figure = createComponent(data);

// Add the new component to our list
const target = document.querySelector('#target');
const li = document.createElement('li');
li.append(figure);
target.append(li);
