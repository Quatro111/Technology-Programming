export function createOrder(menu, quantities) {
  const items = [];

  for (const product of menu) {
    const quantity = Number(quantities[product.id] || 0);

    if (
      !Number.isInteger(quantity) ||
      quantity < 0 ||
      quantity > 20
    ) {
      return {
        error: "Количество должно быть целым числом от 0 до 20."
      };
    }

    if (quantity > 0) {
      items.push({
        id: product.id,
        quantity
      });
    }
  }

  if (items.length === 0) {
    return {
      error: "Выбери хотя бы одно блюдо."
    };
  }

  return { items };
}
