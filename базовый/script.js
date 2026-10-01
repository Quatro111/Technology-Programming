const valueElement = document.querySelector("#value");
const messageElement = document.querySelector("#message");

const plusButton = document.querySelector("#plus");
const minusButton = document.querySelector("#minus");
const resetButton = document.querySelector("#reset");

const presetButtons = document.querySelector("#presetButtons");

let counter = 0;

function updateCounter() {
    valueElement.textContent = counter;
    messageElement.textContent = `Текущее значение: ${counter}`;

    if (counter > 0) {
        valueElement.classList.add("positive");
        valueElement.classList.remove("negative");
    } else if (counter < 0) {
        valueElement.classList.add("negative");
        valueElement.classList.remove("positive");
    } else {
        valueElement.classList.remove("positive");
        valueElement.classList.remove("negative");
    }
}

plusButton.addEventListener("click", function () {
    counter++;
    updateCounter();
});

minusButton.addEventListener("click", function () {
    counter--;
    updateCounter();
});

resetButton.addEventListener("click", function () {
    counter = 0;
    updateCounter();
});

const presets = [0, 5, 10];

for (let i = 0; i < presets.length; i++) {
    const button = document.createElement("button");

    button.textContent = presets[i];

    button.addEventListener("click", function () {
        counter = presets[i];
        updateCounter();
    });

    presetButtons.appendChild(button);
}

updateCounter();
