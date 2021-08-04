const dbUtils = require("../utils/dbUtils");
const db = dbUtils.getDb();
const comments = db.collection("comments");
const Comments = require("../models/comment.model");

exports.getComments = (postId) => {
  const ObjectId = require("mongodb").ObjectId;
  const o_id = new ObjectId(postId);

  const query = { post: o_id };
  return Comments.find(query).populate("user");
};

exports.deleteComment = (commentId) => {
  const ObjectId = require("mongodb").ObjectId;
  const o_id = new ObjectId(commmentId);

  const query = { _id: o_id };
  return comments.deleteOne(query);
};
