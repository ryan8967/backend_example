const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  catergory: { type: String, required: true },
  productName: { type: String, required: true },
  productColor: { type: String, required: true },
  description: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productImg: { type: String, required: false },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
