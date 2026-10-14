const form = document.getElementById("sensorForm");
const message = document.getElementById("message");
const historyBody = document.getElementById("history");
const alertsList = document.getElementById("alerts");

const tempInput = document.getElementById("tempInput");
const humidityInput = document.getElementById("humidityInput");
const lightInput = document.getElementById("lightInput");

let historyData = [];
let autoTimer = null;

function updateClock() {
    document.getElementById("clock").textContent =
        "Текущее время: " + new Date().toLocaleString("ru-RU");
}

function getProblems(data) {
    const problems = [];

    if (data.temp < 18 || data.temp > 27) {
        problems.push("Температура вне нормы");
    }

    if (data.humidity < 30 || data.humidity > 60) {
        problems.push("Влажность вне нормы");
    }

    if (data.light < 300 || data.light > 750) {
        problems.push("Освещённость вне нормы");
    }

    return problems;
}

function validateData(data) {
    if (
        tempInput.value.trim() === "" ||
        humidityInput.value.trim() === "" ||
        lightInput.value.trim() === ""
    ) {
        return "Ошибка: заполните все поля.";
    }

    if (
        !Number.isFinite(data.temp) ||
        !Number.isFinite(data.humidity) ||
        !Number.isFinite(data.light)
    ) {
        return "Ошибка: введите корректные числа.";
    }

    if (data.temp < -20 || data.temp > 60) {
        return "Температура должна быть от -20 до 60 °C.";
    }

    if (data.humidity < 0 || data.humidity > 100) {
        return "Влажность должна быть от 0 до 100%.";
    }

    if (data.light < 0 || data.light > 100000) {
        return "Освещённость должна быть от 0 до 100000 лк.";
    }

    return "";
}

function showAlerts(problems) {
    alertsList.replaceChildren();

    if (problems.length === 0) {
        const item = document.createElement("li");
        item.textContent = "Все показатели в норме.";
        item.className = "good";
        alertsList.appendChild(item);
        return;
    }

    problems.forEach(problem => {
        const item = document.createElement("li");
        item.textContent = "Предупреждение: " + problem;
        item.className = "danger";
        alertsList.appendChild(item);
    });
}

function renderHistory() {
    historyBody.replaceChildren();

    if (historyData.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 5;
        cell.textContent = "Пока нет измерений";
        row.appendChild(cell);
        historyBody.appendChild(row);
        return;
    }

    historyData.forEach(record => {
        const row = document.createElement("tr");

        const values = [
            record.time,
            record.temp + " °C",
            record.humidity + " %",
            record.light + " лк",
            record.status
        ];

        values.forEach((value, index) => {
            const cell = document.createElement("td");
            cell.textContent = value;

            if (index === 4) {
                cell.className =
                    record.status === "Норма" ? "good" : "danger";
            }

            row.appendChild(cell);
        });

        historyBody.appendChild(row);
    });
}

function displayData(data) {
    document.getElementById("temperature").textContent =
        data.temp + " °C";

    document.getElementById("humidity").textContent =
        data.humidity + " %";

    document.getElementById("light").textContent =
        data.light + " лк";

    const problems = getProblems(data);
    const status = document.getElementById("status");

    if (problems.length === 0) {
        status.textContent = "Все показатели в норме";
        status.className = "good";
    } else {
        status.textContent = "Обнаружены отклонения";
        status.className = "danger";
    }

    showAlerts(problems);

    historyData.unshift({
        time: new Date().toLocaleTimeString("ru-RU"),
        temp: data.temp,
        humidity: data.humidity,
        light: data.light,
        status: problems.length > 0 ? "Отклонение" : "Норма"
    });

    historyData = historyData.slice(0, 50);
    renderHistory();
}

function applyData(data) {
    const error = validateData(data);

    if (error) {
        message.textContent = error;
        return;
    }

    displayData(data);
    message.textContent = "Измерение успешно добавлено.";
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const data = {
        temp: Number(tempInput.value),
        humidity: Number(humidityInput.value),
        light: Number(lightInput.value)
    };

    applyData(data);
});

function simulateMeasurement() {
    const data = {
        temp: Number((16 + Math.random() * 16).toFixed(1)),
        humidity: Number((20 + Math.random() * 65).toFixed(1)),
        light: Math.round(Math.random() * 1000)
    };

    tempInput.value = data.temp;
    humidityInput.value = data.humidity;
    lightInput.value = data.light;

    applyData(data);
}

document.getElementById("simulateBtn").addEventListener(
    "click",
    simulateMeasurement
);

document.getElementById("autoBtn").addEventListener("click", function() {
    if (autoTimer !== null) {
        message.textContent = "Автоизмерение уже запущено.";
        return;
    }

    simulateMeasurement();
    autoTimer = setInterval(simulateMeasurement, 3000);
    message.textContent = "Автоизмерение запущено.";
});

document.getElementById("stopBtn").addEventListener("click", function() {
    if (autoTimer !== null) {
        clearInterval(autoTimer);
        autoTimer = null;
        message.textContent = "Автоизмерение остановлено.";
    } else {
        message.textContent = "Автоизмерение не запущено.";
    }
});

document.getElementById("resetBtn").addEventListener("click", function() {
    historyData = [];
    renderHistory();
    message.textContent = "История измерений очищена.";
});

updateClock();
setInterval(updateClock, 1000);
renderHistory();
