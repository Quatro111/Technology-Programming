const pages = {
    about: {
        title: "О себе",
        text: "Привет! Меня зовут Студент. Я учусь программированию и изучаю веб-разработку."
    },
    skills: {
        title: "Мои навыки",
        text: "• HTML5 — создание страниц\n• CSS3 — оформление сайтов\n• JavaScript — интерактивность\n• Работа с DOM и событиями"
    },
    contacts: {
        title: "Контакты",
        text: "Email: student@example.com\n\nГород: Алматы\n\nСвязаться со мной можно по электронной почте."
    }
};

const content = document.querySelector("#content");
const buttons = document.querySelectorAll("[data-page]");

function showPage(pageName) {
    const page = pages[pageName];

    if (!page) {
        content.textContent = "Раздел не найден.";
        return;
    }

    const title = document.createElement("h2");
    title.textContent = page.title;

    const text = document.createElement("p");
    text.textContent = page.text;
    text.style.whiteSpace = "pre-line";

    content.replaceChildren(title, text);

    buttons.forEach(button => {
        const isActive = button.dataset.page === pageName;

        button.classList.toggle("active", isActive);
        button.setAttribute("aria-current",
            isActive ? "page" : "false");
    });

    localStorage.setItem("lastPage", pageName);
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        showPage(button.dataset.page);
    });
});

const savedPage = localStorage.getItem("lastPage");
showPage(pages[savedPage] ? savedPage : "about");
