// This is ./metmuseum/article.js, where we define the behaviour of articles elements which wrap our figures

import { getMuseumSearch, getMuseumObject } from "./api.js";
import createFigure from "./figure.js";

export const io = new IntersectionObserver((entries) => {
    const intersecting = entries.filter(e => e.isIntersecting);
    for (const entry of intersecting) {
        io.unobserve(entry.target);
        loadArticle(entry.target);
    }
});

async function loadArticle(article) {
    const objectID = article.dataset.objectId;
    const object = await getMuseumObject(objectID);
    const figure = createFigure(object);
    article.append(figure);
}

function createArticle(objectID) {
    const article = document.createElement('article');
    article.dataset.objectId = objectID;
    io.observe(article);
    return article;
}

export async function search(query, isHighlight) {
    const objectIDs = await getMuseumSearch(query, isHighlight);
    return objectIDs.map(createArticle);
}