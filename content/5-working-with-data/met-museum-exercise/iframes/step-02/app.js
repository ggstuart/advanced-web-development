// This is app.js, the script that configures and creates our application

import createHeader from "./metmuseum/header.js";
import createFooter from "./metmuseum/footer.js";
import createFigure from "./metmuseum/figure.js";
import { getMuseumObject } from "./metmuseum/api.js";

const header = createHeader('Metropolitan Museum of Art Collection');
const main = document.createElement('main');
const footer = createFooter();

document.body.append(header, main, footer);

const object = await getMuseumObject(700610);
const figure = createFigure(object);
main.append(figure);