const mongoose = require("mongoose");

const settingsSchema = mongoose.Schema({
  settingName: String,
  value: String,
});

const Setting = mongoose.model("Setting", settingsSchema, "settings");
module.exports = Setting;
