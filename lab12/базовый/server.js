const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'student-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 5 * 60 * 1000
    }
}));

const user = {
    login: 'student',
    password: bcrypt.hashSync('12345', 10),
    name: 'Иван Иванов'
};

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
            message: 'Неверный логин или пароль'
        });
    }

    req.session.regenerate(err => {
        if (err) {
            return res.status(500).json({
                message: 'Ошибка сервера'
            });
        }

        req.session.user = {
            name: user.name
        };

        res.json({
            message: 'Вход выполнен успешно',
            name: user.name
        });
    });
});

app.get('/profile', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            message: 'Сначала войдите в систему'
        });
    }

    res.json(req.session.user);
});

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

app.listen(3001, () => {
    console.log('Проект №1: http://localhost:3001');
});
