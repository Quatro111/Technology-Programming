const booksList = document.getElementById('booksList');
const message = document.getElementById('message');

async function loadBooks() {
    const response = await fetch('/books');
    const books = await response.json();

    booksList.innerHTML = '';

    books.forEach(book => {
        const div = document.createElement('div');
        div.className = 'book';

        const title = document.createElement('strong');
        title.textContent = book.title;

        const author = document.createElement('p');
        author.textContent = 'Автор: ' + book.author;

        div.append(title, author);
        booksList.appendChild(div);
    });
}

// Вход
document.getElementById('loginForm')
    .addEventListener('submit', async (e) => {
        e.preventDefault();

        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;

        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login, password })
        });

        const data = await response.json();
        message.textContent = data.message;

        if (response.ok) {
            document.getElementById('logoutButton').hidden = false;
            document.getElementById('loginForm').hidden = true;
        }
    });

// Добавление книги
document.getElementById('bookForm')
    .addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;

        const response = await fetch('/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, author })
        });

        const data = await response.json();

        document.getElementById('bookMessage').textContent =
            data.message;

        if (response.ok) {
            e.target.reset();
            loadBooks();
        }
    });

// Выход
document.getElementById('logoutButton')
    .addEventListener('click', async () => {
        const response = await fetch('/logout', {
            method: 'POST'
        });

        const data = await response.json();
        message.textContent = data.message;

        if (response.ok) {
            document.getElementById('logoutButton').hidden = true;
            document.getElementById('loginForm').hidden = false;
        }
    });

loadBooks();
