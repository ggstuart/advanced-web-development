// This is ./metmuseum/api.js, it handles all communication with the museum API

const baseURL = 'https://collectionapi.metmuseum.org/public/collection/v1';

async function getMuseumEndpoint(endpoint) {
    const response = await fetch(`${baseURL}/${endpoint}`);
    return response.json();
}

export async function getMuseumObject(objectID) {
    return getMuseumEndpoint(`objects/${objectID}`);
}

export async function getMuseumSearch(query, isHighlight=true) {
    const result = await getMuseumEndpoint(`search?isHighlight=${isHighlight}&hasImages=true&q=${query}`);
    return result.objectIDs || [];
}