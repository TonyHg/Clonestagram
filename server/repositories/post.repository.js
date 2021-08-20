const dbUtils = require("../utils/dbUtils");
const db = dbUtils.getDb();
const Post = require("../models/post.model");
const posts = db.collection("posts");

exports.getAllPost = () => {
  const posts = Post.find().populate("user");
  return posts;
};

exports.getPost = (id) => {
  const ObjectId = require("mongodb").ObjectId;
  const o_id = new ObjectId(id);

  const query = { _id: o_id };
  return posts.findOne(query);
};

exports.getUserPosts = (id) => {
  const ObjectId = require("mongodb").ObjectId;
  const o_id = new ObjectId(id);

  const query = { user: o_id };
  return Post.find(query).populate("user");
};

exports.deleteUserPosts = (id) => {
  const ObjectId = require("mongodb").ObjectId;
  const o_id = new ObjectId(id);

  const query = { user: o_id };
  return posts.deleteMany(query);
};
