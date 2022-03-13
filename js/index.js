const myModal = new bootstrap.Modal('#register-modal');
let logged = sessionStorage.getItem('logged');
const session = localStorage.getItem('session');

checkLogged();

document.getElementById('login-form').addEventListener('submit', event => {
    event.preventDefault();

    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    const checkSession = document.getElementById('session-check').checked;

    if(!getAccount(email)) {
        alert('Opps! Verifique o usuário ou a senha.');
        return;
    } else {
        if (getAccount(email).password !== password) {
            alert('Opps! Verifique o usuário ou a senha.');
            return;
        };

        saveSession(email, checkSession);

        window.location.href = 'home.html';
    };
    
});

document.getElementById('create-form').addEventListener('submit', event => {
    event.preventDefault();

    const email = document.getElementById('email-create-input').value;
    const password = document.getElementById('password-create-input').value;    

    if (email.length < 5) {
        alert('Preencha o campo com um e-mail válido!');
        return;
    } else if (password.length < 3) {
        alert('Preencha a senha com no mínimo 3 digitos!');
        return;
    };

    saveAccount({
        email,
        password,
        transactions: []
    });

    myModal.hide();

});

function checkLogged() {
    if (session) {
        sessionStorage.setItem('logged', session);
        logged = session;
    };
    
    if (logged) {
        saveSession(logged, session);

        window.location.href = 'home.html';
    };  
};

function saveAccount(data) {
    localStorage.setItem(data.email, JSON.stringify(data));
};

function saveSession(data, saveSession) {
    if (saveSession) {
        localStorage.setItem('session', data);
    };

    sessionStorage.setItem('logged', data);
};

function getAccount(key) {
    
    if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key));
    };

    return '';
};