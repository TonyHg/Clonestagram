const dbUtils = require("../utils/dbUtils");
const db = dbUtils.getDb();
const Post = require("../models/post.model");

exports.getAllPost = () => {
  const posts = Post.find().populate("user");
  return posts;
};

exports.getUserPosts = (id) => {
  const ObjectId = require("mongodb").ObjectId;
  const o_id = new ObjectId(id);

  const collection = db.collection("posts");
  const query = { user: o_id };
  const posts = collection.find(query);
  return posts.toArray();
};

exports.deleteUserPosts = (id) => {
  const ObjectId = require("mongodb").ObjectId;
  const o_id = new ObjectId(id);

  const query = { user: o_id };
  const collection = db.collection("posts");
  return collection.deleteMany(query);
};
