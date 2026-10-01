const productInput = document.querySelector("#productInput");
const addButton = document.querySelector("#addButton");
const clearButton = document.querySelector("#clearButton");
const productList = document.querySelector("#productList");
const countElement = document.querySelector("#count");
const searchInput = document.querySelector("#search");

let products = [];

function renderProducts(searchText = "") {
    productList.innerHTML = "";

    let visibleCount = 0;

    for (let i = 0; i < products.length; i++) {

        if (products[i].toLowerCase().includes(searchText.toLowerCase())) {

            const li = document.createElement("li");

            li.textContent = products[i];

            productList.appendChild(li);

            visibleCount++;
        }
    }

    countElement.textContent = `Товаров: ${visibleCount}`;

    if (products.length === 0) {
        productList.innerHTML = '<p class="empty">Список пуст</p>';
    }
}

function addProduct() {

    const product = productInput.value.trim();

    if (product === "") {
        alert("Введите название товара!");
    } else {
        products.push(product);

        productInput.value = "";

        renderProducts(searchInput.value);
    }
}

addButton.addEventListener("click", addProduct);

productInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addProduct();
    }
});

searchInput.addEventListener("input", function () {
    renderProducts(searchInput.value);
});

clearButton.addEventListener("click", function () {

    if (products.length > 0) {
        products = [];
        renderProducts();
    } else {
        alert("Список уже пуст!");
    }
});

renderProducts();
