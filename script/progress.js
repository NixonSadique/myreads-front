const username = document.getElementById('user-bar-username')

function loadUser(){
    const storedUsername = localStorage.getItem('username');

    if (username && storedUsername) {
        username.innerText = 'u/' + storedUsername;
    }
}

window.onload = loadUser;