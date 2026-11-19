const form = document.getElementById('loginForm');

const DEMO_USER = {
    login: 'student',
    password: '12345',
    name: 'Иван Иванов'
};

form.addEventListener('submit', (event) => {
    event.prevent.preventDefault();

    const login = document.getElementById('login').value.trim();
    const password = document.getElementById('password').value;

    if (!login || !password) {
        document.getElementById('message').textContent = 'Заполните все поля';
        return;
    }

    if (login !== DEMO_USER.login || password !== DEMO_USER.password) {
        document.getElementById('message').textContent = 'Неверный логин или пароль';
        return;
    }

    sessionStorage.setItem('studentName', DEMO_USER.name);
    showProfile(DEMO_USER.name);
    document.getElementById('message').textContent = 'Вход выполнен успешно';
});

function showProfile(name) {
    document.getElementById('loginSection').hidden = true;
    document.getElementById('profileSection').hidden = false;
    document.getElementById('studentName').textContent = 'Студент: ' + name;
}

document.getElementById('logoutButton').addEventListener('click', () => {
    sessionStorage.removeItem('studentName');
    document.getElementById('profileSection').hidden = true;
    document.getElementById('loginSection').hidden = false;
    document.getElementById('message').textContent = 'Вы вышли из системы';
    form.reset();
});

const savedName = sessionStorage.getItem('studentName');
if (savedName) {
    showProfile(savedName);
}
