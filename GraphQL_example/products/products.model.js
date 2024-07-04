const products = [
  {
    id: "readshoe",
    description: "Red Shoe",
    price: 19.99,
    reviews: [],
  },
  {
    id: "blueshoe",
    description: "Blue Shoe",
    price: 18.99,
    reviews: [],
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
function addNewProduct(id, description, price) {
  const newProduct = {
    id,
    description,
    price,
    reviews: [],
  };
  products.push(newProduct);
  return newProduct;
}
module.exports = {
  getAllProducts,
  getProductsByPrice,
  getProductById,
  addNewProduct,
};
