export function checkAnswer(question, selectedIndex) {
  return question.correct === selectedIndex;
}

export function calculateScore(correctAnswers, totalQuestions) {
  return `${correctAnswers} из ${totalQuestions}`;
}
