// This is ./metmuseum/figure.js, where we define the DOM for an individual object

const defaultImage = "data:image/png;base64,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"

export default function createFigure(object) {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const caption = document.createElement('figcaption');
    const title = document.createElement('h2');
    const objectInfo = document.createElement('dl');
    const department = document.createElement('h3');

    img.loading = "lazy";
    img.addEventListener('error', ev => {
        img.src = defaultImage;
    });
    img.src = object.primaryImageSmall;
    img.alt = object.title;
    title.textContent = object.title;
    department.textContent = object.department;
    
    for (const key of ['objectName', 'objectDate', 'medium']) {        
        if (object[key]) {            
            const dt = document.createElement('dt');
            const dd = document.createElement('dd');
            dt.textContent = key;
            dd.textContent = object[key];
            objectInfo.append(dt, dd);
        }
    }
    caption.append(title, department, objectInfo);
    figure.append(img, caption);

    return figure;
}