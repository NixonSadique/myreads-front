const layout = document.getElementById('book-layout');

const buildBookContainer = (book) => {
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

    if (authors) {
        for (let i = 0; i < authors.length; i++) {
            const listElement = document.createElement('li');
            listElement.textContent = authors[i].name;

            list.appendChild(listElement);
        }
    }

    const button = document.createElement('button');
    button.textContent = 'Add Book Progress';

    bookDetails.appendChild(h2Title);
    bookDetails.appendChild(list);
    bookDetails.appendChild(button);

    bookContainer.appendChild(image);
    bookContainer.appendChild(bookDetails)

    layout.appendChild(bookContainer);
}

/* Api Calls*/

const searchInput = document.getElementById("search-input");
const searchType = document.getElementById("search-select").value;
const baseUrl = 'https://myreads-4sp9.onrender.com';
const searchBookPath = '/myreads/books/search/{query}';
const getBookPath = '/myreads/books/get/{query}';
const similaarBookPath = '/myreads/books/similar/{id}';
const searchAuthorsPath = '/myreads/books/authors/{query}';

const cleanLayout = () => {
    layout.innerHTML = "";
}

async function loadBooks() {
    cleanLayout();
    const bookSearch = await fetchData("rick riordan", searchBookPath)

    for (let i = 0; i < bookSearch.length; i++) {
        buildBookContainer(bookSearch[i]);
    }
}

const search = async () => {
    const query = searchInput.value || "1";

    try {

        switch (searchType) {
            case "search-books":
                cleanLayout();
                const bookSearch = await fetchData(searchInput, searchBookPath)

                for (let i = 0; i < bookSearch.length; i++) {
                    buildBookContainer(bookSearch[i]);
                }
                break;
            case "get-books":
                cleanLayout();
                const getBooks = await fetchData(searchInput, getBookPath);

                for (let i = 0; i < getBooks.length; i++) {
                    buildBookContainer(getBooks[i]);
                }
                break;
            case 'searchAuthors':
                cleanLayout();
                const authors = await fetchData(searchInput, searchAuthorsPath);
                const ol = document.createElement('ol')
                for (let i = 0; i < authors.length; i++) {
                    const li = document.createElement('li');
                    layout.appendChild(li.innerText = `${authors[i].id} : ${authors[i].name}`)
                }

                break;
            default:
                throw new Error();
                break;
        }
    } catch (e) {
        console.error(e);
    }
}


const fetchData = async (query, path) => {
    const response = await fetch(
        baseUrl.concat(path).replace("{query}", query),
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            method: "GET"
        }
    );

    const data = await response.json();

    if (!response.ok) {
        console.error(data);
        throw new Error(data.title);
    }

    console.log(data);
    return data;
}

function checkLogin() {

    const targetDate = new Date(localStorage.getItem("expirationDate"));
    const now = new Date();

    console.log(targetDate);
    console.log(now);

    if (now > targetDate) {
        localStorage.clear();
        window.location.href = "/pages/login.html";
        return;
    } 
    loadBooks();
}


window.onload = checkLogin();