// This is ./metmuseum/figure.js, where we define the DOM for an individual object

export default function createFigure(object) {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const caption = document.createElement('figcaption');

    img.loading = "lazy";
    img.src = object.primaryImageSmall;
    img.alt = object.title;
    caption.textContent = object.title;
    figure.append(img, caption);
    return figure;
}
