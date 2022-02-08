const Setting = require("../models/settings");

module.exports.getPersistence = async (req, res) => {
  try {
    const { role } = res.locals;
    if (["admin", "manager", "client"].includes(role)) {
      const setting = await Setting.findOne({ settingName: "persistence" });
      if (setting) {
        res
          .status(200)
          .json({ action: "PERSISTENCE_GET", persistence: setting });
      } else res.status(200).json({ action: "CANNOT_GET_PERSISTENCE" });
    } else {
      res.status(200).json({ action: "NOT_PERMISSIONED_USER" });
    }
  } catch (err) {
    res.status(500).json({ action: "Something wrong" });
  }
};

module.exports.setPersistence = async (req, res) => {
  try {
    const { persistenceValue } = req.body;
    const { role } = res.locals;
    if (["admin"].includes(role)) {
      const setting = await Setting.findOneAndUpdate(
        { settingName: "persistence" },
        { $set: { value: persistenceValue } },
        { new: true }
      );
      if (setting) {
        res
          .status(200)
          .json({ action: "PERSISTENCE_SET", persistence: setting });
      } else res.status(200).json({ action: "CANNOT_SET_PERSISTENCE" });
    } else {
      res.status(200).json({ action: "NOT_PERMISSIONED_USER" });
    }
  } catch (err) {
    res.status(500).json({ action: "Something wrong" });
  }
};
