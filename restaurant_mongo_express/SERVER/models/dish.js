import mongoose from "mongoose";

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
});

export default mongoose.model("Dish", dishSchema);
