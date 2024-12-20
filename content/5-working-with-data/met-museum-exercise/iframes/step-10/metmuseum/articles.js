// This is ./metmuseum/article.js, where we define the behaviour of articles elements which wrap our figures
import { getMuseumSearch } from "./api.js";

function createArticle(objectID) {
    const article = document.createElement('article');
    article.dataset.objectId = objectID;
    return article;
}

export async function search(query) {
    const objectIDs = await getMuseumSearch(query);
    return objectIDs.map(createArticle);
}