import { questions } from "./modules/questions.js";
import { checkAnswer, calculateScore } from "./modules/quiz.js";
import { showQuestion, showResult } from "./modules/ui.js";

let currentIndex = 0;
let correctAnswers = 0;
let answered = false;

const nextButton = document.querySelector("#next");
const scoreOutput = document.querySelector("#score");

function renderCurrentQuestion() {
  answered = false;
  nextButton.textContent = "Следующий вопрос";

  showQuestion(
    questions[currentIndex],
    currentIndex + 1,
    questions.length,
    handleAnswer
  );

  scoreOutput.textContent =
    `Счёт: ${calculateScore(correctAnswers, questions.length)}`;
}

function handleAnswer(selectedIndex, selectedButton) {
  if (answered) return;

  answered = true;

  const isCorrect = checkAnswer(
    questions[currentIndex],
    selectedIndex
  );

  const feedback = document.querySelector("#feedback");

  if (isCorrect) {
    correctAnswers++;
    feedback.textContent = "Правильно!";
  } else {
    feedback.textContent =
      "Неправильно. Попробуй запомнить правильный ответ.";
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true;
  });

  selectedButton.focus();
  nextButton.disabled = false;

  scoreOutput.textContent =
    `Счёт: ${calculateScore(correctAnswers, questions.length)}`;
}

nextButton.addEventListener("click", () => {
  if (currentIndex === questions.length - 1) {
    if (nextButton.textContent === "Пройти ещё раз") {
      currentIndex = 0;
      correctAnswers = 0;
      renderCurrentQuestion();
      return;
    }

    showResult(correctAnswers, questions.length);
    nextButton.textContent = "Пройти ещё раз";
    return;
  }

  if (!answered) return;

  currentIndex++;
  renderCurrentQuestion();
});

renderCurrentQuestion();
