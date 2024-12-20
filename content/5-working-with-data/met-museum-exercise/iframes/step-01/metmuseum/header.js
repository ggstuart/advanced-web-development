// This is ./metmuseum/header.js, where we define the app header

export default function createHeader(mainHeading) {
    const header = document.createElement('header');
    const h1 = document.createElement('h1');
    h1.textContent = mainHeading;
    header.append(h1);
    return header;
}