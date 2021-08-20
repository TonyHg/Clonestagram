const dbUtils = require("../utils/dbUtils");
const db = dbUtils.getDb();
const likes = db.collection("likes");

exports.getLikes = (postId) => {
  const ObjectId = require("mongodb").ObjectId;
  const o_postId = new ObjectId(postId);

  const query = { post: o_postId };
  return likes.find(query).toArray();
};

exports.getLike = (userId, postId) => {
  const ObjectId = require("mongodb").ObjectId;
  const o_userId = new ObjectId(userId);
  const o_postId = new ObjectId(postId);

  const query = { user: o_userId, post: o_postId };
  return likes.findOne(query);
};

exports.unlike = (userId, postId) => {
  const ObjectId = require("mongodb").ObjectId;
  const o_userId = new ObjectId(userId);
  const o_postId = new ObjectId(postId);

  const query = { user: o_userId, post: o_postId };
  return likes.deleteOne(query);
};

exports.deleteUserLikes = (id) => {
  const ObjectId = require("mongodb").ObjectId;
  const o_id = new ObjectId(id);

  const query = { user: o_id };
  return likes.deleteMany(query);
};
