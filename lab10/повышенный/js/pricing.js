export function calculateTotal(items, products) {
  return items.reduce((sum, item) => {
    const product = products.find(
      product => product.id === item.id
    );

    return product
      ? sum + product.price * item.quantity
      : sum;
  }, 0);
}

export function formatPrice(amount) {
  return new Intl.NumberFormat("ru-RU").format(amount);
}
