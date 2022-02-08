const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  nick: String,
  email: String,
  password: String,
  role: String,
  purchaseHistory: [
    { _id: String, name: String, quantity: Number, orderDate: Number },
  ],
  activeAccount: Boolean,
  basket: Array,
});

const User = mongoose.model("User", userSchema, "users");
module.exports = User;
