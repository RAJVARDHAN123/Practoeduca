document.getElementById('user').textContent = window.localStorage.getItem('user');
document.getElementById('Username').value = window.localStorage.getItem('user');

function load() {
    if (window.localStorage.getItem('email') == '') {
        window.open('/', '_self')
    }
}
document.getElementById('backlay').addEventListener('click', () => {
    document.getElementById('backlay').classList.add('fade');
    document.getElementById('USer').classList.add('hide');
    setTimeout(() => {
        document.getElementById('backlay').classList.add('hide');
    }, 400);
})

document.getElementById('backlay2').addEventListener('click', () => {
    document.getElementById('backlay2').classList.add('fade');
    document.getElementById('Pass').classList.add('hide');
    setTimeout(() => {
        document.getElementById('backlay2').classList.add('hide');
    }, 400);
})

function openUser() {
    document.getElementById('backlay').classList.remove('fade');
    document.getElementById('USer').classList.remove('hide');
    document.getElementById('backlay').classList.remove('hide');
}

function openPass() {
    document.getElementById('backlay2').classList.remove('fade');
    document.getElementById('Pass').classList.remove('hide');
    document.getElementById('backlay2').classList.remove('hide');
}

function change() {
    firebase.database().ref('/users/' + Decode(window.localStorage.getItem('email')) + '/').update({
        username: document.getElementById('Username').value
    })
    window.localStorage.setItem("user", document.getElementById('Username').value);
    document.getElementById('backlay').classList.add('fade');
    document.getElementById('USer').classList.add('hide');
    setTimeout(() => {
        document.getElementById('backlay').classList.add('hide');
    }, 400);
}

function changePass() {
    firebase.database().ref('/users/' + Decode(window.localStorage.getItem('email')) + '/').update({
        password: document.getElementById('Password').value
    })
    window.localStorage.setItem("pass", document.getElementById('Password').value);
    document.getElementById('backlay2').classList.add('fade');
    document.getElementById('Pass').classList.add('hide');
    setTimeout(() => {
        document.getElementById('backlay2').classList.add('hide');
    }, 400);
}

function logout() {

    window.localStorage.setItem("email", '');
    window.localStorage.setItem("pass", '');
    window.localStorage.setItem("user", '');

    window.open('/', '_self');

}