const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  userName: { type: String, required: true, unique: false },
  productName: { type: String, required: true },
  productColor: { type: String, required: true },
  description: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productImg: { type: String, required: false },
});
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
