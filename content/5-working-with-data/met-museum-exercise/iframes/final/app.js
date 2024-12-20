// This is app.js, the script that configures and creates our application

import createHeader from "./metmuseum/header.js";
import createFooter from "./metmuseum/footer.js";
import { search } from "./metmuseum/articles.js";

const header = createHeader('Metropolitan Museum of Art Collection');
const main = document.createElement('main');
const footer = createFooter();

document.body.append(header, main, footer);

document.body.addEventListener('search', async ev => {
    const query = ev.target.value;
    const isHighlight = header.querySelector('#highlight').checked;
    main.classList.add('loading');
    clear();
    const articles = await search(query, isHighlight);
    main.dataset.message = `found ${articles.length} ${isHighlight ? 'highlights' : 'results'} for '${query}'`;
    main.append(...articles);
    main.classList.remove('loading');
});

function clear() {
    while (main.firstChild) { main.firstChild.remove(); }
}