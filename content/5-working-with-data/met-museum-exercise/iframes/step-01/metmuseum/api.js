const baseURL = 'https://collectionapi.metmuseum.org/public/collection/v1';

export async function getMuseumEndpoint(endpoint) {
    const response = await fetch(`${baseURL}/${endpoint}`);
    return response.json();
}