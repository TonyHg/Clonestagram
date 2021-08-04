const dbUtils = require("../utils/dbUtils");
const db = dbUtils.getDb();
const follows = db.collection("follows");

exports.getFollowers = (id) => {
  const ObjectId = require("mongodb").ObjectId;
  const o_id = new ObjectId(id);

  const query = { user: o_id };
  return follows.find(query).toArray();
};

exports.getFollowings = (id) => {
  const ObjectId = require("mongodb").ObjectId;
  const o_id = new ObjectId(id);

  const query = { follower: o_id };
  return follows.find(query).toArray();
};

exports.unfollow = (userId, followerId) => {
  const ObjectId = require("mongodb").ObjectId;
  const o_userId = new ObjectId(userId);
  const o_followerId = new ObjectId(followerId);

  const query = { user: o_userId, follower: o_followerId };
  return follows.deleteOne(query);
};

exports.isFollowing = (userId, followerId) => {
  const ObjectId = require("mongodb").ObjectId;
  const o_userId = new ObjectId(userId);
  const o_followerId = new ObjectId(followerId);

  const query = { user: o_userId, follower: o_followerId };
  return follows.findOne(query);
};
