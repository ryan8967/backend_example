const fs = require("fs");
const mongoose = require("mongoose");
const Models = require("../../models/ProductModels");

mongoose
  .connect(
    "mongodb+srv://admion:UeaCyDUqknmHW7j4@cluster0.hqcfp6u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  });

// READ JSON FILE
const models = JSON.parse(
  fs.readFileSync(`${__dirname}/products.json`, "utf-8")
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Models.create(models);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Models.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
