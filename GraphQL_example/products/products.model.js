const products = [
  {
    id: "readshoe",
    description: "Red Shoe",
    price: 19.99,
  },
  {
    id: "blueshoe",
    description: "Blue Shoe",
    price: 18.99,
  },
];
function getAllProducts() {
  return products;
}
function getProductsByPrice(min, max) {
  return products.filter((product) => {
    return product.price >= min && product.price <= max;
  });
}
function getProductById(id) {
  return products.filter((product) => product.id === id);
}
module.exports = { getAllProducts, getProductsByPrice, getProductById };
