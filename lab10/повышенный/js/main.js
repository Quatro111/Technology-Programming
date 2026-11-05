import { menu } from "./modules/menu.js";
import { createOrder } from "./modules/orders.js";
import { calculateTotal } from "./modules/pricing.js";
import { renderMenu, renderOrder } from "./modules/ui.js";

const status = document.querySelector("#status");
const orderButton = document.querySelector("#place-order");

renderMenu(menu);

orderButton.addEventListener("click", () => {
  const quantities = {};

  document.querySelectorAll(".quantity").forEach(input => {
    quantities[input.dataset.id] = input.value;
  });

  const order = createOrder(menu, quantities);

  if (order.error) {
    status.textContent = order.error;
    return;
  }

  const total = calculateTotal(order.items, menu);

  renderOrder(order.items, menu, total);

  status.textContent =
    `Заказ оформлен! Сумма: ${total} ₸. Статус: принят.`;
});

document.querySelector("#menu").addEventListener("input", () => {
  status.textContent = "";
});
