let token = null;

document.getElementById('loginForm')
    .addEventListener('submit', async (e) => {
        e.preventDefault();

        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            token = data.token;

            document.getElementById('token').value = token;

            document.getElementById('message').textContent =
                data.message + '. Токен действует 60 секунд';

        } catch (error) {
            document.getElementById('message').textContent =
                error.message;
        }
    });

// Проверка токена
document.getElementById('checkButton')
    .addEventListener('click', async () => {

        if (!token) {
            document.getElementById('message').textContent =
                'Сначала получите токен';
            return;
        }

        try {
            const response = await fetch('/profile', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            document.getElementById('message').textContent =
                data.message + '. Роль: ' + data.role;

        } catch (error) {
            document.getElementById('message').textContent =
                error.message;
        }
    });
