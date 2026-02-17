const username = document.getElementById('user-bar-username');
const progLayout = document.getElementById('progress-layout');

function loadUser() {
    const storedUsername = localStorage.getItem('username');

    if (username && storedUsername) {
        username.innerText = 'u/' + storedUsername;
    }
}

const progressCreationRequest = async (completion, bookId) => {
    const response = await fetch(
        baseUrl.concat(createProgressPath),
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            method: "POST",
            body: JSON.stringify({
                userId: localStorage.getItem('userId'),
                bookId: bookId,
                completion: completion
            })
        }
    )

    if (response.status != 201) {
        const data = await response.json();
        console.log(data);
        throw new Error(data.title);
    }

    return await response.text();
}

const userProgressRequest = async () => {
    const response = await fetch(
        baseUrl.concat(
            getUserProgressPath.replace('{id}', localStorage.getItem('userId'))
        ),
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            method: "GET",
        }
    )
    const data = await response.json();

    if (!response.ok) {
        console.error(data);
        throw new Error(data.title);
    }

    console.log(data);
    return data;
}



async function createProgress(completion, bookId) {

    try {
        const data = await progressCreationRequest(completion, bookId);
        alert(data)
    } catch (error) {
        alert(error)
        console.log(error);
    }
}

const buildProgressContainer = (book, progress) => {

    const bookContainer = document.createElement('div');
    bookContainer.classList.add('book-container');
    bookContainer.id = progress.id;

    const image = document.createElement('img');
    image.src = book.image;

    const bookDetails = document.createElement('div');
    bookDetails.classList.add('book-details');

    const h2Title = document.createElement('h2');
    h2Title.textContent = book.title;

    const h3 = document.createElement('h3')
    h3.textContent = `(${progress.completion}% Read )`
    const list = document.createElement('ul');
    list.classList.add('authors-list');

    if (book.authors) {
        for (let i = 0; i < book.authors.length; i++) {
            const listElement = document.createElement('li');
            listElement.textContent = book.authors[i].name;

            list.appendChild(listElement);
        }
    }


    bookDetails.appendChild(h2Title);
    bookDetails.appendChild(h3);
    bookDetails.appendChild(list);

    bookContainer.appendChild(image);
    bookContainer.appendChild(bookDetails)

    progLayout.appendChild(bookContainer);
}

async function loadUserProgress() {
    cleanLayout(progLayout);

    try {
        const data = await userProgressRequest();
        console.log(data);

        for (let i = 0; i < data.length; i++) {
            const prog = {
                id: data[i].id,
                completion: data[i].completion
                }
            book = data[i].book;

            buildProgressContainer( book, prog)

        }
    } catch (e) {
        console.error(e);
        alert(e);
    }
}


if (window.location.pathname.endsWith("progress.html") && checkLogin()) {

    window.onload = loadUserProgress()
}


