const baseUrl = 'https://myreads-4sp9.onrender.com';
// const baseUrl = 'http://localhost:8080';

const authPath = '/myreads/auth/login';
const createUserPath = '/myreads/user/create';

const createForm = document.getElementById('signin-form');
const loginForm = document.getElementById('login-form');

// Sign In
const signinUsername = document.getElementById('sign-username')
const signinEmail = document.getElementById('sign-email')
const signinPass = document.getElementById('sign-pass')

// Log in
const loginEmail = document.getElementById('log-email')
const loginPass = document.getElementById('log-pass')

const createUser = async (e) => {
    e.preventDefault();

    const username = signinUsername.value;
    const email = signinEmail.value;
    const password = signinPass.value;

    try {
        const data = await userCreationResquest(username, email, password);
        alert(data);
        const authData = await authRequest(email, password);
        localStorage.setItem("token", authData.token);
        window.location.href = "/pages/home.html";
    } catch (e) {
        console.error(e);
    }

}

const userCreationResquest = async (username, email, password) => {
    const response = await fetch(
        baseUrl.concat(createUserPath),
        {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        }
    );

    if (response.status != 201) {
        const data = await response.json();
        console.log(data);
        throw new Error(data.title);
    }

    return await response.text();
}


const authUser = async (e) => {
    e.preventDefault();

    const email = loginEmail.value;
    const password = loginPass.value

    try {
        const data = await authRequest(email, password);
        localStorage.setItem("token", data.token);
        window.location.href = "/pages/home.html"
    } catch (e) {
        console.error(e);
    }

}

const authRequest = async (email, password) => {
    const response = await fetch(
        baseUrl.concat(authPath),
        {
            headers: { 'Content-Type': "application/json" },
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            })
        }
    )

    const data = await response.json();

    if (!response.ok) {
        console.error(data)
        alert(JSON.stringify(data));
        throw new Error(data.title);
    }

    return data;
}

if (createForm) {
    createForm.addEventListener('submit', createUser);
}

if (loginForm) {
    loginForm.addEventListener('submit', authUser);
}
