const mongoose = require("mongoose");

const dishSchema = mongoose.Schema({
  name: String,
  kitchenType: String,
  category: String,
  products: String,
  available: Number,
  priceUSD: Number,
  description: String,
  url: Array,
  avgStars: Number,
  rates: Array,
  comments: Array,
});

const Dish = mongoose.model("Dish", dishSchema, "dishes");
module.exports = Dish;
