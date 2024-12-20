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

    section.id = "search";
    
    // link the label to the input
    input.id = "query";
    label.htmlFor = input.id;

    // add useful hints
    label.textContent = "search";
    input.placeholder = "e.g. sunflowers";

    // trigger a custom event
    input.addEventListener('change', ev => {
        const event = new CustomEvent("search", {
            bubbles: true,
            detail: { query: input.value }
        });
        section.dispatchEvent(event);
    });

    section.append(label, input);
    return section;
}