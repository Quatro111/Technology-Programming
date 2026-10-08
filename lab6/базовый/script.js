const counter = document.querySelector("#counter");
const plus = document.querySelector("#plus");
const minus = document.querySelector("#minus");
const reset = document.querySelector("#reset");

let value = 0;

plus.addEventListener("click", function () {
    value++;
    counter.textContent = value;});

minus.addEventListener("click", function () {
    value--;
    counter.textContent = value;});

reset.addEventListener("click", function () {
    value = 0;
    counter.textContent = value;});
