const target = document.querySelector("#target");
const scoreElement = document.querySelector("#score");
const restart = document.querySelector("#restart");
const game = document.querySelector("#game");

let score = 0;

function moveTarget() {
    const x = Math.random() * (game.clientWidth - 50);
    const y = Math.random() * (game.clientHeight - 50);

    target.style.left = x + "px";
    target.style.top = y + "px";
}

target.addEventListener("click", function () {
    score++;

    scoreElement.textContent = score;

    if (score >= 10) {
        target.style.display = "none";
        alert("Вы победили!");
    } else {
        moveTarget();
    }
});

restart.addEventListener("click", function () {
    score = 0;
    scoreElement.textContent = score;
    target.style.display = "block";

    moveTarget();
});

moveTarget();
