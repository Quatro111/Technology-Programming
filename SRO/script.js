const tempInput = document.getElementById("tempInput");
const humidityInput = document.getElementById("humidityInput");
const lightInput = document.getElementById("lightInput");

const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const light = document.getElementById("light");
const alerts = document.getElementById("alerts");
const history = document.getElementById("history");
const status = document.getElementById("status");

let timer = null;

function updateClock() {
    document.getElementById("clock").textContent =
        new Date().toLocaleTimeString("ru-RU");
}

setInterval(updateClock, 1000);
updateClock();

function checkValues(t, h, l) {
    const messages = [];

    if (t < 18 || t > 27) {
        messages.push("Температура вне нормы!");
    }

    if (h < 30 || h > 60) {
        messages.push("Влажность вне нормы!");
    }

    if (l < 300 || l > 750) {
        messages.push("Освещённость вне нормы!");
    }

    if (messages.length === 0) {
        alerts.className = "alert good";
        alerts.textContent =
            "Все показатели находятся в пределах нормы.";
    } else {
        alerts.className = "alert warning";
        alerts.textContent = "ВНИМАНИЕ: " + messages.join(" ");
    }
}

function saveMeasurement(t, h, l) {
    temperature.textContent = t.toFixed(1) + " °C";
    humidity.textContent = h + " %";
    light.textContent = l + " лк";

    checkValues(t, h, l);

    const row = history.insertRow(0);
    const time = new Date().toLocaleTimeString("ru-RU");

    row.insertCell(0).textContent = time;
    row.insertCell(1).textContent = t.toFixed(1) + " °C";
    row.insertCell(2).textContent = h + " %";
    row.insertCell(3).textContent = l + " лк";

    while (history.rows.length > 20) {
        history.deleteRow(history.rows.length - 1);
    }

    tempInput.value = t;
    humidityInput.value = h;
    lightInput.value = l;
}

document.getElementById("sensorForm").addEventListener(
    "submit",
    function(event) {
        event.preventDefault();

        const t = Number(tempInput.value);
        const h = Number(humidityInput.value);
        const l = Number(lightInput.value);

        if (
            tempInput.value.trim() === "" ||
            humidityInput.value.trim() === "" ||
            lightInput.value.trim() === "" ||
            !Number.isFinite(t) ||
            !Number.isFinite(h) ||
            !Number.isFinite(l) ||
            t < -50 || t > 80 ||
            h < 0 || h > 100 ||
            l < 0 || l > 10000
        ) {
            alert("Проверьте введённые значения!");
            return;
        }

        saveMeasurement(t, h, l);
    }
);

function simulateSensors() {
    const t = Number((18 + Math.random() * 14).toFixed(1));
    const h = Math.floor(25 + Math.random() * 51);
    const l = Math.floor(200 + Math.random() * 701);

    saveMeasurement(t, h, l);
}

document.getElementById("simulateBtn").addEventListener(
    "click",
    function() {
        simulateSensors();
    }
);

document.getElementById("autoBtn").addEventListener(
    "click",
    function() {
        if (timer !== null) {
            return;
        }

        status.textContent = "● Автомониторинг включён";
        timer = setInterval(simulateSensors, 3000);
        simulateSensors();
    }
);

document.getElementById("stopBtn").addEventListener(
    "click",
    function() {
        if (timer !== null) {
            clearInterval(timer);
            timer = null;
        }

        status.textContent = "● Автомониторинг остановлен";
    }
);

document.getElementById("resetBtn").addEventListener(
    "click",
    function() {
        if (timer !== null) {
            clearInterval(timer);
            timer = null;
        }

        history.innerHTML = "";
        saveMeasurement(23.5, 45, 520);
        history.innerHTML = "";

        status.textContent = "● История сброшена";
    }
);

saveMeasurement(23.5, 45, 520);
