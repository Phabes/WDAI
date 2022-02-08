const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const MAXAGE = 3 * 24 * 60 * 60;
const SECRET = "AUTHKEY";

module.exports.registerUser = async (req, res) => {
  try {
    const { newUser } = req.body;
    const checkUser = await User.findOne({ email: newUser.email });
    if (checkUser == null) {
      const user = new User(newUser);
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
      const token = jwt.sign({ id: user._id, role: user.role }, SECRET, {
        expiresIn: MAXAGE,
      });
      res.cookie("token", token, { httpOnly: true, maxAge: MAXAGE * 1000 });
      res
        .status(200)
        .json({ action: "USER_REGISTERED", user: user.nick, role: user.role });
    } else {
      res.status(200).json({ action: "USER_EXISTS" });
    }
  } catch (err) {
    res.status(500).json({ action: "Something wrong" });
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        const token = jwt.sign({ id: user._id, role: user.role }, SECRET, {
          expiresIn: MAXAGE,
        });
        res.cookie("token", token, { httpOnly: true, maxAge: MAXAGE * 1000 });
        res
          .status(200)
          .json({ action: "USER_LOGGED", user: user.nick, role: user.role });
      } else res.status(200).json({ action: "WRONG_PASSWORD" });
    } else res.status(200).json({ action: "USER_DOESNT_EXIST" });
  } catch (err) {
    res.status(500).json({ action: "Something wrong" });
  }
};

module.exports.logoutUser = async (req, res) => {
  res.cookie("token", "", { httpOnly: true, maxAge: 1 });
  res.status(200).json({ action: "USER_LOGOUT" });
};

// module.exports.findUser = async (req, res) => {
//   const { token } = req.cookies;
//   if (token) {
//     jwt.verify(token, SECRET, async (err, decodedToken) => {
//       if (err) {
//         res.status(200).json({ action: "NOT_VERIFIED" });
//       } else {
//         const user = await User.findById(decodedToken.id);
//         res.status(200).json({
//           action: "VERIFIED",
//           user: user,
//           // nick: user.nick,
//           // role: user.role,
//           // active: user.activeAccount,
//         });
//       }
//     });
//   } else {
//     res.status(200).json({ action: "NOT_VERIFIED" });
//   }
// };

module.exports.findUser = async (req, res) => {
  const { role, _id } = res.locals;
  if (["admin", "manager", "client"].includes(role)) {
    const user = await User.findById(_id);
    res.status(200).json({
      action: "VERIFIED",
      user: user,
      // nick: user.nick,
      // role: user.role,
      // active: user.activeAccount,
    });
  } else {
    res.status(200).json({ action: "NOT_PERMISSIONED_USER" });
  }
};

module.exports.placeAnOrder = async (req, res) => {
  const { orders } = req.body;
  const { role, _id } = res.locals;
  if (["client"].includes(role)) {
    await User.findByIdAndUpdate(_id, {
      // purchaseHistory: orders,
      $addToSet: { purchaseHistory: orders },
      basket: [],
    });
    res.status(200).json({ action: "ORDER_MADE" });
  } else {
    res.status(200).json({ action: "NOT_PERMISSIONED_USER" });
  }
};

module.exports.checkIfBought = async (req, res) => {
  const { role, _id } = res.locals;
  if (["client"].includes(role)) {
    const user = await User.findById(_id);
    if (user) {
      const { id } = req.body;
      const bought = user.purchaseHistory.some((e) => e._id == id);
      res.status(200).json({ action: "VERIFIED", bought: bought });
    } else res.status(200).json({ action: "NO_USER" });
  } else {
    res.status(200).json({ action: "NOT_PERMISSIONED_USER" });
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const { role } = res.locals;
    if (["admin"].includes(role)) {
      let users = await User.find().select({
        _id: 1,
        nick: 1,
        email: 1,
        role: 1,
        activeAccount: 1,
      });
      res.status(200).json({ action: "USERS_GET", users: users });
    } else {
      res.status(200).json({ action: "NOT_PERMISSIONED_USER" });
    }
  } catch {
    res.status(200).json({ action: "Something wrong" });
  }
};

module.exports.changeBanUser = async (req, res) => {
  try {
    const { role } = res.locals;
    if (["admin"].includes(role)) {
      const { _id, activeAccount } = req.body;
      const user = await User.findByIdAndUpdate(_id, {
        activeAccount: !activeAccount,
      });
      res.status(200).json({ action: "USER_ACTIVE_CHANGE", user: user });
    } else {
      res.status(200).json({ action: "NOT_PERMISSIONED_USER" });
    }
  } catch {
    res.status(200).json({ action: "Something wrong" });
  }
};

module.exports.changeRole = async (req, res) => {
  try {
    const { role } = res.locals;
    const { oldUser, newRole } = req.body;
    if (["admin"].includes(role)) {
      const user = await User.findByIdAndUpdate(oldUser._id, {
        role: newRole,
      });
      res.status(200).json({ action: "USER_ROLE_CHANGE", user: user });
    } else {
      res.status(200).json({ action: "NOT_PERMISSIONED_USER" });
    }
  } catch {
    res.status(200).json({ action: "Something wrong" });
  }
};

module.exports.updateBasket = async (req, res) => {
  try {
    const { role, _id } = res.locals;
    const { basket } = req.body;
    if (["client"].includes(role)) {
      const user = await User.findByIdAndUpdate(_id, {
        basket: basket,
      });
      res.status(200).json({ action: "BASKET_UPDATED", user: user });
    } else {
      res.status(200).json({ action: "NOT_PERMISSIONED_USER" });
    }
  } catch {
    res.status(200).json({ action: "Something wrong" });
  }
};

module.exports.getBasket = async (req, res) => {
  try {
    const { role, _id } = res.locals;
    if (["client"].includes(role)) {
      const user = await User.findById(_id);
      res.status(200).json({ action: "BASKET_GET", user: user });
    } else {
      res.status(200).json({ action: "NOT_PERMISSIONED_USER" });
    }
  } catch {
    res.status(200).json({ action: "Something wrong" });
  }
};
