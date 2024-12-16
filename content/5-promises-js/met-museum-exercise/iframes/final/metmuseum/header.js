// This is ./metmuseum/header.js, where we define the app header

export default function createHeader(mainHeading) {
    const header = document.createElement('header');
    const h1 = document.createElement('h1');
    const search = searchBar();
    h1.textContent = mainHeading;
    header.append(h1, search);
    return header;
}

function searchBar() {
    const section = document.createElement('section');
    const label = document.createElement('label');
    const input = document.createElement('input');
    const highlight = document.createElement('input');
    const highlightLabel = document.createElement('label');

    section.id = "search";
    input.type = "search";

    // link the label to the input
    input.id = "query";
    label.htmlFor = input.id;

    // add useful hints
    label.textContent = "search";
    input.placeholder = "e.g. sunflowers";

    //  link highlight to label
    highlight.id = "highlight";
    highlightLabel.htmlFor = highlight.id;

    highlight.type = "checkbox";
    highlight.checked = true;
    highlightLabel.textContent = "highlights only?";

    section.append(label, input, highlightLabel, highlight);
    return section;
}