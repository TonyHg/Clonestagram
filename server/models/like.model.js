const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let LikeSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
});

module.exports = mongoose.model("Like", LikeSchema);
