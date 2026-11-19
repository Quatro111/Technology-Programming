const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'library-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 10 * 60 * 1000
    }
}));

const user = {
    login: 'admin',
    password: bcrypt.hashSync('12345', 10)
};

let books = [
    { id: 1, title: 'JavaScript', author: 'Иван Петров' },
    { id: 2, title: 'HTML и CSS', author: 'Алексей Смирнов' },
    { id: 3, title: 'Основы программирования', author: 'Мария Иванова' }
];

function auth(req, res, next) {
    if (!req.session.authorized) {
        return res.status(401).json({
            message: 'Для добавления книг необходимо войти'
        });
    }

    next();
}

// Вход администратора
app.post('/login', (req, res) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).json({
            message: 'Заполните все поля'
        });
    }

    if (login !== user.login ||
        !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({
            message: 'Неверные данные'
        });
    }

    req.session.regenerate(err => {
        if (err) {
            return res.status(500).json({
                message: 'Ошибка сервера'
            });
        }

        req.session.authorized = true;

        res.json({ message: 'Вы вошли как администратор' });
    });
});

// Получение каталога доступно всем
app.get('/books', (req, res) => {
    res.json(books);
});

// Добавление доступно только авторизованным
app.post('/books', auth, (req, res) => {
    const { title, author } = req.body;

    if (!title?.trim() || !author?.trim()) {
        return res.status(400).json({
            message: 'Заполните название и автора'
        });
    }

    const book = {
        id: Date.now(),
        title: title.trim(),
        author: author.trim()
    };

    books.push(book);

    res.status(201).json({
        message: 'Книга добавлена',
        book
    });
});

// Выход
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({
                message: 'Ошибка выхода'
            });
        }

        res.clearCookie('connect.sid');
        res.json({ message: 'Вы вышли из системы' });
    });
});

app.listen(3002, () => {
    console.log('Проект №2: http://localhost:3002');
});
