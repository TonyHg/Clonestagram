const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let PostSchema = new Schema({
  userId: { type: String, required: true },
  file: { type: Object, required: true },
  description: { type: String, required: true },
  uploadDate: { type: String, required: true },
});

module.exports = mongoose.model("Post", PostSchema);
