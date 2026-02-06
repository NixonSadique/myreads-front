const searchForm = document.getElementById("search-form")
const layout = document.getElementById('book-layout');
const overlay = document.getElementById('overlay')
const searchInput = document.getElementById("search-input");

const buildBookContainer = (book, progressid=null) => {

    const bookContainer = document.createElement('div');
    bookContainer.classList.add('book-container');
    bookContainer.id = book.id;

    const image = document.createElement('img');
    image.src = book.image;

    const bookDetails = document.createElement('div');
    bookDetails.classList.add('book-details');

    const h2Title = document.createElement('h2');
    h2Title.textContent = book.title;

    const list = document.createElement('ul');
    list.classList.add('authors-list');

    if (book.authors) {
        for (let i = 0; i < book.authors.length; i++) {
            const listElement = document.createElement('li');
            listElement.textContent = book.authors[i].name;

            list.appendChild(listElement);
        }
    }

    const button = document.createElement('button');
    button.textContent = 'Add Book Progress';
    button.addEventListener("click", (e) => creationForm(book.id, e));

    bookDetails.appendChild(h2Title);
    bookDetails.appendChild(list);
    bookDetails.appendChild(button);

    bookContainer.appendChild(image);
    bookContainer.appendChild(bookDetails)

    layout.appendChild(bookContainer);
}


const creationForm = (bookId, e) => {
    e.preventDefault();

    console.log("On FORM")

    const form = document.createElement('form');
    form.classList.add('progress-form');
    overlay.getElementsByTagName('div')[0].appendChild(form);
    overlay.classList.remove('hidden');

    const label = document.createElement('label');
    label.innerText = "How much have you read this book?"

    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = "0";
    slider.max = "100";
    slider.step = "1";
    slider.value = "0";

    const span = document.createElement('span')
    span.innerText = slider.value + "%"
    slider.addEventListener('input', (e) => {

        e.preventDefault();
        span.innerText = slider.value + "%"

    })


    const submit = document.createElement('input');
    submit.classList.add('button')
    submit.type = 'submit';


    form.append(label, span, slider, submit);
    console.log("Form Created")

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        overlay.classList.add('hidden')
        form.remove();
        
        console.log("Form Event Listener")
        createProgress(slider.value, bookId);
    })
}



const cleanLayout = (layout) => {
    layout.innerHTML = "";
}

async function loadBooks() {
    cleanLayout(layout);
    
    const bookSave = localStorage.getItem("books");
    if (bookSave) {
        const bookObj = JSON.parse(bookSave);
        for (let i = 0; i < bookObj.length; i++) {
            buildBookContainer(bookObj[i]);
        }
        return;
    }

    try {
        const bookSearch = await fetchData("rick riordan", searchBookPath);
        localStorage.setItem("books", JSON.stringify(bookSearch));
    
        for (let i = 0; i < bookSearch.length; i++) {
            buildBookContainer(bookSearch[i]);
        }
        
    } catch (error) {
        alert(e);
        console.error(e);
    }

}

const search = async (e) => {
    e.preventDefault();
    const searchType = document.getElementById("search-select").value;

    const query = searchInput.value || "1";

    try {

        switch (searchType) {
            case "search-books":
                cleanLayout(layout);
                const bookSearch = await fetchData(query, searchBookPath)

                for (let i = 0; i < bookSearch.length; i++) {
                    buildBookContainer(bookSearch[i]);
                }
                break;
            case "get-books":
                cleanLayout(layout);
                const getBooks = await fetchData(query, getBookPath);

                for (let i = 0; i < getBooks.length; i++) {
                    buildBookContainer(getBooks[i]);
                }
                break;
            case 'search-authors':
                cleanLayout(layout);
                const authors = await fetchData(query, searchAuthorsPath);
                const ol = document.createElement('ol')
                for (let i = 0; i < authors.length; i++) {
                    const li = document.createElement('li');
                    li.innerText = `${authors[i].id} : ${authors[i].name}`
                    ol.appendChild(li)
                }

                layout.appendChild(ol)

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
        alert("Your Token expired!\n Log in, to create a new one!")
        window.location.href = "/pages/login.html";
        return false;
    }
    return true;
}

if (window.location.pathname.endsWith("home.html") && checkLogin()) {
    window.onload = loadBooks();
    
}


function hide() {
    overlay.classList.add('hidden');
    const form = document.getElementsByClassName('progress-form')[0]
    overlay.getElementsByTagName('div')[0].removeChild(form);
}


if (searchForm) {
    searchForm.addEventListener("submit", search)
}