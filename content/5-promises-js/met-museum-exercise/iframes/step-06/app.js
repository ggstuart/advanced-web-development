// This is app.js, the script that configures and creates our application

import createHeader from "./metmuseum/header.js";
import createFooter from "./metmuseum/footer.js";
import createFigure from "./metmuseum/figure.js";
import { getMuseumSearch, getMuseumObject } from "./metmuseum/api.js";

const header = createHeader('Metropolitan Museum of Art Collection', getMuseumSearch);
const main = document.createElement('main');
const footer = createFooter();

document.body.append(header, main, footer);

document.body.addEventListener('search', async ev => {
    const query = ev.target.value;
    const result = await getMuseumSearch(query);
    for (const objectID of result) {
        const object = await getMuseumObject(objectID);
        const figure = createFigure(object);
        main.append(figure);
    }
});
