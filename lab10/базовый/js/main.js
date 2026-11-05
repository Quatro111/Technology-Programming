import {
  friendlyGreeting,
  formalGreeting,
  funnyGreeting
} from "./modules/greetings.js";

const nameInput = document.querySelector("#name");
const typeSelect = document.querySelector("#type");
const result = document.querySelector("#result");
const button = document.querySelector("#greet");

button.addEventListener("click", () => {
  const name = nameInput.value.trim();

  if (name === "") {
    result.textContent = "Пожалуйста, введи имя.";
    return;
  }

  let message;

  if (typeSelect.value === "friendly") {
    message = friendlyGreeting(name);
  } else if (typeSelect.value === "formal") {
    message = formalGreeting(name);
  } else {
    message = funnyGreeting(name);
  }

  result.textContent = message;
});

nameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    button.click();
  }
});
