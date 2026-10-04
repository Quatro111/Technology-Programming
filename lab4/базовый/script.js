const form = document.getElementById("studentForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const course = document.getElementById("course").value;
    const agree = document.getElementById("agree").checked;
    const message = document.getElementById("message");

    if (fullName === "") {
        message.textContent = "Введите ФИО";
        return;
    }

    if (email === "") {
        message.textContent = "Введите e-mail";
        return;
    }

    if (!email.includes("@")) {
        message.textContent = "Введите корректный e-mail";
        return;
    }

    if (course === "") {
        message.textContent = "Выберите курс";
        return;
    }

    if (!agree) {
        message.textContent = "Подтвердите согласие с правилами";
        return;
    }

    message.textContent = "Регистрация успешно выполнена!";
});
