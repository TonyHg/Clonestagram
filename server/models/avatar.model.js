const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let AvatarSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  file: { type: Object, required: true },
  filename: { type: String, required: true },
});

module.exports = mongoose.model("Avatar", AvatarSchema);
