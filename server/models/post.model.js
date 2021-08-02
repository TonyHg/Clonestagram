const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let PostSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  file: { type: Object, required: true },
  filename: { type: String, required: true },
  description: { type: String, required: true },
  uploadDate: { type: String, required: true },
});

module.exports = mongoose.model("Post", PostSchema);
