const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CommentSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  comment: { type: String, required: true },
  uploadDate: { type: String, required: true },
});

module.exports = mongoose.model("Comment", CommentSchema);
