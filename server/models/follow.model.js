const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let FollowSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Follow", FollowSchema);
