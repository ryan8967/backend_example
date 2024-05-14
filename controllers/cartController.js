const Cart = require("../models/CartModels");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

exports.addCart = catchAsync(async (req, res, next) => {
  const userName = req.params.userName;
  // Create a new cart associated with the user ID
  const newCart = await Cart.create({
    userName: userName,
    productName: req.body.productName,
    productColor: req.body.productColor,
    description: req.body.description,
    productPrice: req.body.productPrice,
    productImg: req.body.productImg,
  });

  res.status(201).json({
    status: "success",
    data: {
      cart: newCart,
    },
  });
});

exports.getCart = catchAsync(async (req, res, next) => {
  const userName = req.params.userName;
  const userCart = await Cart.find({ userName });

  if (!userCart) {
    return next(new AppError("Cart not found for the specified user.", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      userCart,
    },
  });
});

exports.deleteItem = catchAsync(async (req, res, next) => {
  const productId = req.body.productId;
  const cartItem = await Cart.findByIdAndDelete({ _id:productId });
  if (cartItem===null) {
    return next(
      new AppError(
        "Cart item not found for the specified user and product.",
        404
      )
    );
  }
  res.status(200).json({
    status: "success",
    message: "Cart item deleted successfully.",
  });
});

exports.clearCart = catchAsync(async (req, res, next) => {
  const userName = req.params.userName;

  const result = await Cart.deleteMany({ userName });

  if (result.deletedCount === 0) {
    return next(new AppError("No carts found for the specified user.", 404));
  }
  res.status(200).json({
    status: "success",
    message: "Cart cleared successfully.",
  });
});
