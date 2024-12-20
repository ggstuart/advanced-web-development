// This is app.js, the script that configures and creates our application

import createHeader from "./metmuseum/header.js";
import createFooter from "./metmuseum/footer.js";

const header = createHeader('Metropolitan Museum of Art Collection');
const main = document.createElement('main');
const footer = createFooter();

document.body.append(header, main, footer);
