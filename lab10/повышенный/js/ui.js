import { formatPrice } from "./pricing.js";

export function renderMenu(menu) {
  const container = document.querySelector("#menu");
  container.innerHTML = "";

  menu.forEach(product => {
    const card = document.createElement("article");
    card.className = "product";

    const title = document.createElement("h3");
    title.textContent = product.name;

    const price = document.createElement("p");
    price.textContent = `${formatPrice(product.price)} ₸`;

    const label = document.createElement("label");
    label.textContent = "Количество: ";

    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.max = "20";
    input.step = "1";
    input.value = "0";
    input.dataset.id = product.id;
    input.className = "quantity";

    label.append(input);
    card.append(title, price, label);
    container.append(card);
  });
}

export function renderOrder(items, menu, total) {
  const list = document.querySelector("#order-list");
  list.innerHTML = "";

  items.forEach(item => {
    const product = menu.find(
      product => product.id === item.id
    );

    const line = document.createElement("li");
    line.textContent =
      `${product.name} — ${item.quantity} шт.`;

    list.append(line);
  });

  document.querySelector("#total").textContent =
    formatPrice(total);
}
