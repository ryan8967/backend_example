const express = require("express");
const mongoose = require("mongoose");
const productController = require("./controllers/productController");
const userController = require("./controllers/userController");
const cartController = require("./controllers/cartController");
const globalErrorHandler = require("./controllers/errorController");
const APIFeatures = require("./utils/apiFeatures");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

dotenv.config({ path: "./config.env" });

app.post("/signup", userController.signup);
app.post("/login", userController.login);

app.get("/", productController.getProducts);

app.post("/addcart/:userName", userController.protect, cartController.addCart);
app.get("/cart/:userName", userController.protect, cartController.getCart);
app.delete("/cart/:userName", userController.protect, cartController.deleteItem);
app.delete(
  "/clearcart/:userName",
  userController.protect,
  cartController.clearCart
);

app.use(globalErrorHandler);

mongoose
  .connect(
    "mongodb+srv://admion:UeaCyDUqknmHW7j4@cluster0.hqcfp6u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed");
  });
