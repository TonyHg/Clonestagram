const Post = require("../models/post.model");
const PostRepository = require("../repositories/post.repository");
const FollowRepository = require("../repositories/follow.repository");

const ObjectId = require("mongodb").ObjectId;

exports.createPost = async (
  userId,
  file,
  filename,
  description,
  uploadDate
) => {
  const o_id = new ObjectId(userId);

  let post = new Post({
    user: o_id,
    file: file,
    filename: filename,
    description: description,
    uploadDate: uploadDate,
  });

  return await post.save();
};

exports.getAllPosts = async () => {
  return await PostRepository.getAllPosts();
};

exports.getPost = async (postId) => {
  return await PostRepository.getPost(postId);
};

exports.getFeed = async (userId) => {
  const followings = (await FollowRepository.getFollowings(userId)).map((f) =>
    f.user.toString()
  );
  followings.push(userId);
  var feed = [];
  for (const f of followings) {
    const posts = await PostRepository.getUserPosts(f);
    feed = feed.concat(posts);
  }
  feed.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
  return feed;
};
