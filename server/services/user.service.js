const User = require("../models/user.model");
const UserRepository = require("../repositories/user.repository");
const PostRepository = require("../repositories/post.repository");
const FollowRepository = require("../repositories/follow.repository");
const LikeRepository = require("../repositories/like.repository");
const CommentRepository = require("../repositories/comment.repository");

exports.getUserProfile = async (userId) => {
  try {
    const user = await UserRepository.getUserById(userId);
    const posts = await PostRepository.getUserPosts(userId);
    const followers = await FollowRepository.getFollowers(userId);
    const followings = await FollowRepository.getFollowings(userId);

    const userProfile = {
      user: {
        _id: userId,
        name: user.name,
        followers: followers.length,
        following: followings.length,
      },
      posts: posts,
    };

    return userProfile;
  } catch (err) {
    console.log(`User ${userId} not found ${err}`);
  }
};

exports.createUser = async (name, email, password) => {
  let user = new User({
    name: name,
    email: email,
  });

  user.setPassword(password);

  return user.save();
};

exports.signup = async (name, email, password) => {
  try {
    await this.createUser(name, email, password);
    const sessionJwt = this.login(email, password);
    return sessionJwt;
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (email, password) => {
  const user = await UserRepository.getUserByEmail(email);
  if (user !== null) {
    const userModel = new User({
      name: user.name,
      email: user.email,
      salt: user.salt,
      hash: user.hash,
    });

    if (userModel.validatePassword(password)) {
      return userModel.toAuthJSON(user._id);
    }
  }
  return null;
};

exports.deleteUser = async (userId) => {
  await LikeRepository.deleteUserLikes(userId);
  await FollowRepository.deleteUserFollows(userId);
  await CommentRepository.deleteUserComments(userId);
  await PostRepository.deleteUserPosts(userId);
  await UserRepository.deleteUser(userId);
};

exports.updateUserCredentials = async (userId, name, password) => {
  await UserRepository.updateUserName(userId, name);
  await UserRepository.updateUserPassword(userId, password);
};

exports.getSuggestion = async (userId) => {
  const users = await UserRepository.getAll();
  const suggestion = [];
  for (const user of users) {
    if (user._id == userId) continue;
    const isFollowing = await FollowRepository.isFollowing(user._id, userId);
    if (!isFollowing) {
      suggestion.push({ _id: user._id, name: user.name });
    }
  }
  return suggestion;
};

exports.search = async (query) => {
  const matchedUsers = await UserRepository.search(query);
  if (matchedUsers) {
    return matchedUsers.map((user) => {
      return { _id: user._id, name: user.name };
    });
  }
  return nul;
};
