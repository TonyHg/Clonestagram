const dbUtils = require("../utils/dbUtils");
const db = dbUtils.getDb();
const Post = require("../models/post.model");

exports.getAllPost = () => {
  // const posts = db.collection("posts");
  const posts = Post.find();
  return posts;
};
