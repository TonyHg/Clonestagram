const FollowRepository = require("../repositories/follow.repository");
const Follow = require("../models/follow.model");
const ObjectId = require("mongodb").ObjectId;

exports.getFollowers = async (userId) => {
  return await FollowRepository.getFollowers(userId).map((f) => f.follower);
};

exports.getFollowings = async (userId) => {
  return await FollowRepository.getFollowings(userId).map((f) => f.user);
};

exports.follow = async (userId, followerId) => {
  const o_userId = new ObjectId(userId);
  const o_followerId = new ObjectId(followerId);

  const follow = new Follow({
    user: o_userId,
    follower: o_followerId,
  });

  return follow.save();
};

exports.unfollow = async (userId, followerId) => {
  await FollowRepository.unfollow(userId, followerId);
};

exports.isFollowing = async (userId, followerId) => {
  return (await FollowRepository.isFollowing(userId, followerId)) !== null;
};
