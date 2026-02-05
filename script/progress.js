const username = document.getElementById('user-bar-username')

function loadUser() {
    const storedUsername = localStorage.getItem('username');

    if (username && storedUsername) {
        username.innerText = 'u/' + storedUsername;
    }
}

const createProgressPath = "/myreads/progress/create";
const updateProgressPath = "";
const getUserProgressPath = "/myreads/progress/get/user/{id}";
// const baseUrl = "https://myreads-4sp9.onrender.com";


const progressCreationRequest = async (completion, bookId) => {
    const response = await fetch(
        baseUrl.concat(createProgress),
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
        alert("Not working for now!!!!");
        // const data =  await progressCreationRequest(completion, bookId);
        // alert(data)
    } catch (error) {
        console.log(error);
    }
}


