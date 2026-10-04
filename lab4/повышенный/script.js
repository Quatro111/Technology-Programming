const form = document.getElementById("registrationForm");

const login = document.getElementById("login");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const loginStatus = document.getElementById("loginStatus");
const emailStatus = document.getElementById("emailStatus");
const passwordStatus = document.getElementById("passwordStatus");
const confirmStatus = document.getElementById("confirmStatus");
const message = document.getElementById("message");

function checkLogin() {
    if (login.value.trim().length < 3) {
        loginStatus.textContent = "Логин должен содержать минимум 3 символа";
        return false;
    }

    loginStatus.textContent = "Логин корректный";
    return true;
}

function checkEmail() {
    if (!email.value.includes("@")) {
        emailStatus.textContent = "Введите корректный e-mail";
        return false;
    }

    emailStatus.textContent = "E-mail корректный";
    return true;
}

function checkPassword() {
    if (password.value.length < 8) {
        passwordStatus.textContent = "Пароль должен содержать минимум 8 символов";
        return false;
    }

    passwordStatus.textContent = "Пароль корректный";
    return true;
}

function checkConfirmPassword() {
    if (confirmPassword.value !== password.value) {
        confirmStatus.textContent = "Пароли не совпадают";
        return false;
    }

    confirmStatus.textContent = "Пароли совпадают";
    return true;
}

login.addEventListener("input", checkLogin);
email.addEventListener("input", checkEmail);
password.addEventListener("input", checkPassword);
confirmPassword.addEventListener("input", checkConfirmPassword);

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const loginCorrect = checkLogin();
    const emailCorrect = checkEmail();
    const passwordCorrect = checkPassword();
    const confirmCorrect = checkConfirmPassword();

    if (!loginCorrect ||
        !emailCorrect ||
        !passwordCorrect ||
        !confirmCorrect) {

        message.textContent = "Исправьте ошибки в форме";
        return;
    }

    message.textContent = "Регистрация успешно выполнена!";
});
