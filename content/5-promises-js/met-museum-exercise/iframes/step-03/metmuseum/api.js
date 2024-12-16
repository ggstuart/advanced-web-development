// This is ./metmuseum/api.js, it handles all communication with the museum API

const baseURL = 'https://collectionapi.metmuseum.org/public/collection/v1';

async function getMuseumEndpoint(endpoint) {
    const response = await fetch(`${baseURL}/${endpoint}`);
    return response.json();
}

export async function getMuseumObject(objectID) {
    return getMuseumEndpoint(`objects/${objectID}`);
}

export async function getMuseumSearch(query) {
    return getMuseumEndpoint(`search?q=${query}&hasImages=true`);
}
