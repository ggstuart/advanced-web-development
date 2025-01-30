const target = document.querySelector('#target');

function createFigure(img, content) {
    const figure = document.createElement('figure');
    const caption = document.createElement('figcaption');
    caption.append(...content);
    figure.append(img, caption);
    figure.classList.add('my-component');
    return figure
}

const picsumImg = (id, size) => { 
    const img = document.createElement('img');
    img.src = `https://picsum.photos/id/${id}/${size}`;
    return img;
}

const toParagraphs = (text) => { 
    return text.split('\n\n').map(txt => { 
        const p = document.createElement('p');
        p.textContent = txt;
        return p;
    })
}

const picsumId = 100;
const text = `This is some text which contains newline characters.

Each pair of newline characters creates a new paragraph element.`

const img = picsumImg(picsumId, 200);
const content = toParagraphs(text);
const figure = createFigure(img, content);
const li = document.createElement('li');

li.append(figure);
target.append(li);

// fetch('articles.json').then(response => {
//     response.json().then(loadData);
// });

// const loadData = (data) => { 
//     const articles = data.map(createArticle);
//     target.append(...articles);
// }


// const createArticle = ({title, content, picsumId, featured}) => {
//     const article = document.createElement('article');
//     const container = document.createElement('div');
//     const img = picsumImg(picsumId, 200);
//     const h2 = document.createElement('h2');
//     const div = document.createElement('div');

//     h2.textContent = title;
//     div.append(h2);
//     div.append(...content.map(txt => {
//         const p = document.createElement('p');
//         p.textContent = txt;
//         return p;        
//     }))
//     container.classList.add('responsive');
//     if (featured) {
//         article.classList.add('featured');        
//     }
//     container.append(img, div);
//     article.append(container);
//     return article;
// }

// function elementWithContent(tag, content) {
//     const element = document.createElement(tag);
//     element.textContent = content;
//     return element;
// }