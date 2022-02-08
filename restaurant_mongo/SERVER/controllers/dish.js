const Dish = require("../models/dish.js");

module.exports.getDishes = async (req, res) => {
  try {
    let dishes = await Dish.find();
    res.status(201).json(dishes);
  } catch (err) {
    res.status(500).json({ action: "Something wrong" });
  }
};

module.exports.getDish = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = res.locals;
    if (["admin", "manager", "client"].includes(role)) {
      const dish = await Dish.findOne({ _id: id });
      if (dish) res.status(200).json({ action: "VERIFIED", dish: dish });
      else res.status(200).json({ action: "NO_DISH" });
    } else res.status(200).json({ action: "NOT_PERMISSIONED_USER" });
  } catch (err) {
    res.status(200).json({ action: "NO_DISH" });
  }
};

module.exports.addDish = async (req, res) => {
  try {
    const { newDish } = req.body;
    const { role } = res.locals;
    if (["admin", "manager"].includes(role)) {
      const dish = new Dish(newDish);
      await dish.save();
      if (dish) res.status(200).json({ action: "DISH_ADDED", dish: dish });
      else res.status(200).json({ action: "DISH_NOT_ADDED" });
    } else res.status(200).json({ action: "NOT_PERMISSIONED_USER" });
  } catch (err) {
    res.status(500).json({ action: "Something wrong" });
  }
};

module.exports.deleteDish = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = res.locals;
    if (["admin", "manager"].includes(role)) {
      await Dish.deleteOne({ _id: id });
      res.status(200).json({ action: "DISH_REMOVED" });
    } else res.status(200).json({ action: "NOT_PERMISSIONED_USER" });
  } catch (err) {
    res.status(500).json({ action: "Something wrong" });
  }
};

module.exports.updateDish = async (req, res) => {
  try {
    const { id } = req.params;
    const { dish } = req.body;
    const { role } = res.locals;
    if (["admin", "manager"].includes(role)) {
      Dish.findByIdAndUpdate(id, dish, { new: true }, (err, updatedDish) => {
        if (err) res.status(200).json({ action: "NOT_EDITED" });
        else res.status(200).json({ action: "DISH_EDITED", dish: updatedDish });
      });
    } else res.status(200).json({ action: "NOT_PERMISSIONED_USER" });
  } catch (err) {
    res.status(500).json({ action: "Something wrong" });
  }
};

module.exports.rateDish = async (req, res) => {
  const { id } = req.params;
  const { rate, userID } = req.body;
  const { role } = res.locals;
  if (["client"].includes(role)) {
    let dish = await Dish.findById(id);
    if (dish) {
      const alreadyRated = dish.rates.some((rate) => rate.id == userID);
      if (alreadyRated) {
        await Dish.findOneAndUpdate(
          { _id: id, "rates.id": userID },
          {
            $set: { ["rates.$.rate"]: rate },
          }
        );
        // IT WORS TOO
        // const index = dish.rates.findIndex(
        //   (rate) => rate.id == userID
        // );
        // dish.rates[index].rate = rate;
        // await Dish.findOneAndUpdate(id, {
        //   $set: { rates: dish.rates },
        // });
      } else {
        await Dish.findByIdAndUpdate(id, {
          $addToSet: { rates: { id: userID, rate: rate } },
        });
      }
      dish = await Dish.findById(id);
      res.status(200).json({ action: "STARS_SET", dish: dish });
    } else res.status(200).json({ action: "NO_DISH" });
  } else res.status(200).json({ action: "NOT_PERMISSIONED_USER" });
};

module.exports.commentDish = async (req, res) => {
  const { id } = req.params;
  const { comment, userID } = req.body;
  const { role } = res.locals;
  if (["manager", "client"].includes(role)) {
    await Dish.findByIdAndUpdate(id, {
      $addToSet: { comments: { id: userID, comment: comment } },
      // comments: { id: decodedToken.id, comment: comment },
    });
    res.status(200).json({ action: "DISH_COMMENTED" });
  } else res.status(200).json({ action: "NOT_PERMISSIONED_USER" });
};
