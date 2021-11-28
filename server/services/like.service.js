const Like = require("../models/like.model");
const LikeRepository = require("../repositories/like.repository");

const ObjectId = require("mongodb").ObjectId;

exports.getLikes = async (postId) => {
  return await LikeRepository.getLikes(postId);
};

exports.getLike = async (userId, postId) => {
  return await LikeRepository.getLike(userId, postId);
};

exports.like = async (userId, postId) => {
  const o_postId = new ObjectId(postId);
  const o_userId = new ObjectId(userId);

  const maybeLike = await LikeRepository.getLike(userId, postId);
  if (maybeLike) return maybeLike;

  const like = new Like({
    user: o_userId,
    post: o_postId,
  });

  return await like.save();
};

exports.unlike = async (userId, postId) => {
  return await LikeRepository.unlike(userId, postId);
};
