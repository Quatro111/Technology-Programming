const form = document.getElementById('loginForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login, password })
        });

        const data = await response.json();

        document.getElementById('message').textContent =
            data.message;

        if (response.ok) {
            showProfile(data.name);
        }
    } catch {
        document.getElementById('message').textContent =
            'Ошибка соединения с сервером';
    }
});

function showProfile(name) {
    document.getElementById('loginSection').hidden = true;
    document.getElementById('profileSection').hidden = false;
    document.getElementById('studentName').textContent =
        'Студент: ' + name;
}

document.getElementById('logoutButton')
    .addEventListener('click', async () => {
        const response = await fetch('/logout', {
            method: 'POST'
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('profileSection').hidden = true;
            document.getElementById('loginSection').hidden = false;
            document.getElementById('message').textContent =
                data.message;
            form.reset();
        }
    });

async function checkSession() {
    try {
        const response = await fetch('/profile');

        if (response.ok) {
            const data = await response.json();
            showProfile(data.name);
        }
    } catch {
        console.log('Сессия не найдена');
    }
}

checkSession();
