const form = document.getElementById("orderForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const product = document.getElementById("product").value;
    const quantity = Number(document.getElementById("quantity").value);
    const delivery = document.querySelector('input[name="delivery"]:checked');
    const message = document.getElementById("message");

    if (product === "") {
        message.textContent = "Выберите товар";
        return;
    }

    if (quantity <= 0 || isNaN(quantity)) {
        message.textContent = "Количество должно быть больше 0";
        return;
    }

    if (!delivery) {
        message.textContent = "Выберите способ доставки";
        return;
    }

    message.textContent =
        "Заказ успешно оформлен: " +
        product + ", количество: " +
        quantity + ", доставка: " +
        delivery.value;
});
