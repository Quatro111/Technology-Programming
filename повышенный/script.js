const taskInput = document.querySelector("#taskInput");
const addButton = document.querySelector("#addButton");
const taskList = document.querySelector("#taskList");

const totalElement = document.querySelector("#total");
const completedElement = document.querySelector("#completed");
const activeElement = document.querySelector("#active");

const emptyMessage = document.querySelector("#emptyMessage");
const filterButtons = document.querySelectorAll(".filterButton");

let tasks = [];
let currentFilter = "all";

function renderTasks() {

    taskList.innerHTML = "";

    let completedCount = 0;
    let activeCount = 0;
    let visibleCount = 0;

    for (let i = 0; i < tasks.length; i++) {

        const task = tasks[i];

        // Подсчёт статистики
        if (task.completed) {
            completedCount++;
        } else {
            activeCount++;
        }

        if (
            currentFilter === "active" &&
            task.completed
        ) {
            continue;
        }

        if (
            currentFilter === "completed" &&
            !task.completed
        ) {
            continue;
        }

        visibleCount++;

        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        const text = document.createElement("span");
        text.textContent = task.text;
        text.classList.add("task-text");

        if (task.completed) {
            text.classList.add("completed");
        }

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Удалить";
        deleteButton.classList.add("delete");

        checkbox.addEventListener("change", function () {
            task.completed = checkbox.checked;
            renderTasks();
        });
      
        deleteButton.addEventListener("click", function () {

            const index = tasks.indexOf(task);

            if (index !== -1) {
                tasks.splice(index, 1);
            }

            renderTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    }

    totalElement.textContent = tasks.length;
    completedElement.textContent = completedCount;
    activeElement.textContent = activeCount;

    if (visibleCount === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Введите текст задачи!");
        return;
    }

    const newTask = {
        text: text,
        completed: false
    };

    tasks.push(newTask);

    taskInput.value = "";

    renderTasks();
}

addButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addTask();
    }
});

for (let i = 0; i < filterButtons.length; i++) {

    filterButtons[i].addEventListener("click", function () {

        currentFilter = filterButtons[i].dataset.filter;

        for (let j = 0; j < filterButtons.length; j++) {
            filterButtons[j].classList.remove("active");
        }

        filterButtons[i].classList.add("active");

        renderTasks();
    });
}

renderTasks();
