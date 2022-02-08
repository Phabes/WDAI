import Dish from "../models/dish.js";

export const getDishes = async (req, res) => {
  try {
    let dishes = await Dish.find({});
    res.status(201).json(dishes);
  } catch (err) {
    res.status(500).json({ action: "Something wrong" });
  }
};

export const getDish = async (req, res) => {
  try {
    const { id } = req.params;
    let dish = await Dish.find({ _id: id });
    res.status(201).json(dish[0]);
  } catch (err) {
    res.status(500).json({ action: "Something wrong" });
  }
};

export const addDish = async (req, res) => {
  try {
    const { newDish } = req.body;
    const dish = new Dish(newDish);
    await dish.save();
    res.status(200).json({ action: "DISH_ADDED" });
  } catch (err) {
    res.status(500).json({ action: "Something wrong" });
  }
};

export const deleteDish = async (req, res) => {
  try {
    const { id } = req.params;
    await Dish.deleteOne({ _id: id });
    res.status(200).json({ action: "DISH_REMOVED" });
  } catch (err) {
    res.status(500).json({ action: "Something wrong" });
  }
};
