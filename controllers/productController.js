const Models = require("../models/ProductModels");
const APIFeatures = require("../utils/apiFeatures");

exports.getProducts = async (req, res, next) => {
  const features = new APIFeatures(Models.find(), req.query)
    .filter()
    .sort()
    .paginate();
  const models = await features.query;

  res.status(200).json(models);
};
