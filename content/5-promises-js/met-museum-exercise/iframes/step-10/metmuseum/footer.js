// This is ./metmuseum/footer.js, where we define the app footer

export default function createFooter() { 
    const footer = document.createElement('footer');
    const link = document.createElement('a');
    link.href = "https://metmuseum.github.io/";
    link.textContent = "metmuseum API";
    footer.append("Created using the ", link);
    return footer;
}