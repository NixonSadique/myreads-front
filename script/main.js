const layout = document.getElementById('book-layout');

const buildBookContainer =  (book) => {
    const bookId = book.id;
    const title = book.title;
    const imageUrl = book.image;
    const authors = book.authors;

    const bookContainer = document.createElement('div');
    bookContainer.classList.add('book-container');

    const image = document.createElement('img');
    image.src = imageUrl;
    
    const bookDetails = document.createElement('div');
    bookDetails.classList.add('book-details');

    const h2Title = document.createElement('h2');
    h2Title.textContent = title;

    const list = document.createElement('ul');
    list.classList.add('authors-list');
    
    for (let i = 0; i < authors.length; i++) {
        const listElement = document.createElement('li');
        listElement.textContent = authors[i].name;
        
        list.appendChild(listElement);
    }

    const button =  document.createElement('button');
    button.textContent = 'Add Book Progress';

    bookDetails.appendChild(h2Title);
    bookDetails.appendChild(list);
    bookDetails.appendChild(button);

    bookContainer.appendChild(image);
    bookContainer.appendChild(bookDetails)

    layout.appendChild(bookContainer);
}

const loadBooks =  (e) => {
    
    const book = {
        id: 1,
        title: "Percy Jackson",
        image: "https://covers.openlibrary.org/b/id/13011239-M.jpg",
        authors: [
            {
                id: 1,
                name: "Rick Riordan"
            }
        ]
    }

    buildBookContainer(book);
}


document.getElementById('search-button').addEventListener("click", loadBooks);