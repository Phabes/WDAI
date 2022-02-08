const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const {
  getDishes,
  getDish,
  addDish,
  deleteDish,
  updateDish,
  rateDish,
  commentDish,
} = require("./controllers/dish");
const {
  registerUser,
  loginUser,
  logoutUser,
  findUser,
  placeAnOrder,
  checkIfBought,
  getAllUsers,
  changeBanUser,
  changeRole,
  updateBasket,
  getBasket,
} = require("./controllers/user");
const { getPersistence, setPersistence } = require("./controllers/settings");
const { requireAuth } = require("./middleware/authMiddleware");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:4200",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/getDishes", getDishes);
app.get("/getDish/:id", requireAuth, getDish);
app.delete("/removeDish/:id", requireAuth, deleteDish);
app.post("/updateDish/:id", requireAuth, updateDish);
app.post("/addDish", requireAuth, addDish);
app.post("/rateDish/:id", requireAuth, rateDish);
app.post("/commentDish/:id", requireAuth, commentDish);
app.post("/placeAnOrder", requireAuth, placeAnOrder);
app.post("/checkIfBought", requireAuth, checkIfBought);
app.post("/getAllUsers", requireAuth, getAllUsers);
app.post("/changeBanUser", requireAuth, changeBanUser);
app.post("/changeRole", requireAuth, changeRole);
app.post("/authUser", requireAuth, findUser);
app.post("/getPersistence", requireAuth, getPersistence);
app.post("/setPersistence", requireAuth, setPersistence);
app.post("/updateBasket", requireAuth, updateBasket);
app.post("/getBasket", requireAuth, getBasket);
app.post("/registerUser", registerUser);
app.post("/loginUser", loginUser);
app.post("/logoutUser", logoutUser);

const CONNECTION_URL =
  "mongodb+srv://restaurantAdmin:adminPassword@cluster0.bfvmc.mongodb.net/restaurant";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`SERVER RUNNING ON PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
