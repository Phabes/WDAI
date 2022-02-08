import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { getDishes, getDish, addDish, deleteDish } from "./controllers/dish.js";

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/getDishes", getDishes);
app.get("/getDish/:id", getDish);
app.post("/addDish", addDish);
app.delete("/removeDish/:id", deleteDish);

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
