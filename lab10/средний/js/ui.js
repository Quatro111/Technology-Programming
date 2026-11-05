export function showQuestion(question, number, total, onAnswer) {
  document.querySelector("#progress").textContent =
    `Вопрос ${number} из ${total}`;

  document.querySelector("#question").textContent = question.question;

  const answersContainer = document.querySelector("#answers");
  answersContainer.innerHTML = "";

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer";
    button.textContent = answer;

    button.addEventListener("click", () => onAnswer(index, button));

    answersContainer.append(button);
  });

  document.querySelector("#feedback").textContent = "";
  document.querySelector("#next").disabled = true;
}

export function showResult(correct, total) {
  document.querySelector("#progress").textContent = "Викторина завершена";
  document.querySelector("#question").textContent = "Твой результат:";
  document.querySelector("#answers").innerHTML = "";

  document.querySelector("#feedback").textContent =
    `${correct} правильных ответов из ${total}.`;

  document.querySelector("#next").textContent = "Пройти ещё раз";
  document.querySelector("#next").disabled = false;
}
