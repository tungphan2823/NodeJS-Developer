const orders = [
  {
    date: "2022-02-22",
    subtotal: 37.98,
    items: [
      {
        product: {
          id: "readshoe",
          description: "Old Red Shoe",
          price: 19.99,
        },
        quantity: 2,
      },
      {
        product: { id: "blueshoe", description: "Blue Shoe", price: 18.99 },
        quantity: 1,
      },
    ],
  },
];
function getAllOrders() {
  return orders;
}
module.exports = { getAllOrders };
