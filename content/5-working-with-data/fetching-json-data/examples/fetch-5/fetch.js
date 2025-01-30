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

const data = [
    {
        "picsumId": 1032,
        "title": "crater",
        "description": "An impact crater is an approximately circular depression in the surface of a planet, moon, or other solid body in the Solar System or elsewhere, formed by the hypervelocity impact of a smaller body."
    },
    {
        "picsumId": 103,
        "title": "feet",
        "description": "The foot (plural: feet) is an anatomical structure found in many vertebrates. It is the terminal portion of a limb which bears weight and allows locomotion. In many animals with feet, the foot is a separate organ at the terminal part of the leg made up of one or more segments or bones."
    },
    {
        "picsumId": 1039,
        "title": "waterfall",
        "description": "A waterfall is an area where water flows over a vertical drop or a series of steep drops in the course of a stream or river. Waterfalls also occur where meltwater drops over the edge of a tabular iceberg or ice shelf."
    }
];

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
