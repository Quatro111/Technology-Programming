const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const SECRET = process.env.JWT_SECRET ||
    'development-jwt-secret-change-me';

const user = {
    login: 'student',
    password: bcrypt.hashSync('12345', 10),
    id: 1,
    role: 'student'
};

// Выдача JWT
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

    const token = jwt.sign(
        {
            sub: String(user.id),
            role: user.role
        },
        SECRET,
        {
            algorithm: 'HS256',
            expiresIn: '60s',
            issuer: 'student-app',
            audience: 'student-users'
        }
    );

    res.json({
        message: 'Токен успешно создан',
        token: token
    });
});

// Middleware проверки JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Токен отсутствует'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET, {
            algorithms: ['HS256'],
            issuer: 'student-app',
            audience: 'student-users'
        });

        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({
            message: 'Токен недействителен или истек'
        });
    }
}

// Защищенный маршрут
app.get('/profile', authenticateToken, (req, res) => {
    res.json({
        message: 'Доступ разрешен',
        userId: req.user.sub,
        role: req.user.role
    });
});

app.listen(3003, () => {
    console.log('Проект №3: http://localhost:3003');
});
