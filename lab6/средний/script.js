const questions = document.querySelectorAll(".question");
const answers = document.querySelectorAll(".answer");

questions.forEach(function (question, index) {
    question.addEventListener("click", function () {

        answers.forEach(function (answer) {
            answer.classList.remove("active");
        });

        answers[index].classList.add("active");
    });
});
