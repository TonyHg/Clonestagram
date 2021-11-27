const UserService = require("../services/user.service");
const AvatarService = require("../services/avatar.service");
const FollowService = require("../services/follow.service");

exports.users = (req, res) => {
  res.send("Send all users");
};

exports.user = async (req, res, next) => {
  try {
    const userProfile = await UserService.getUserProfile(req.params.id);
    res.send(userProfile);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const sessionJwt = await UserService.signup(
      req.body.name,
      req.body.email,
      req.body.password
    );
    if (sessionJwt === undefined) res.status(401).send("wrong email/password");
    res.send(sessionJwt);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const sessionJwt = await UserService.login(
      req.body.email,
      req.body.password
    );
    if (sessionJwt === null) res.status(401).send("wrong email/password");
    res.send(sessionJwt);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    await UserService.deleteUser(req.params.id);
    res.send({ status: true, message: "Account deleted" });
  } catch (err) {
    console.log(err);
    res.send({ status: false, message: "Error while deleting account" });
  }
};

exports.update = async (req, res, next) => {
  try {
    await UserService.updateUserCredentials(
      req.params.id,
      req.body.name,
      req.body.password
    );
    res.send({ status: true, message: "Update user successful" });
  } catch (err) {
    console.log(err);
    res.send({ status: false, message: "Update username/password failed" });
  }
};

exports.setAvatar = async (req, res, next) => {
  try {
    await AvatarService.setUserAvatar(
      req.body.userId,
      req.file,
      req.body.filename
    );
    res.send({ status: true, message: "Avatar set sucessfully" });
  } catch (err) {
    console.log(err);
    res.send({ status: false, message: "Avatar set failed" });
  }
};

exports.getAvatar = async (req, res, next) => {
  try {
    const avatar = await AvatarService.getUserAvatar(req.params.id);
    if (avatar) res.send({ status: true, message: avatar.filename });
    else res.send({ status: false, message: "Avatar not found" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getFollowers = async (req, res, next) => {
  try {
    const followers = await FollowService.getFollowers(req.params.id);
    res.send({ users: followers });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getFollowings = async (req, res, next) => {
  try {
    const followings = await FollowService.getFollowings(req.params.id);
    res.send({ users: followings });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.follow = async (req, res) => {
  try {
    await FollowService.follow(req.body.userId, req.body.followerId);
    res.send({ status: true, message: "Follow successful" });
  } catch (err) {
    console.log(err);
    res.send({ status: false, message: "Follow failed" });
  }
};

exports.unfollow = async (req, res) => {
  try {
    await FollowService.unfollow(req.body.userId, req.body.followerId);
    res.send({ status: true, message: "Unfollow successful" });
  } catch (err) {
    console.log(err);
    res.send({ status: false, message: "Unfollow failed" });
  }
};

exports.isFollowing = async (req, res, next) => {
  try {
    if (await FollowService.isFollowing(req.body.userId, req.body.followerId))
      res.send({ status: true, message: "Is following" });
    else res.send({ status: false, message: "Not following" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getSuggestion = async (req, res) => {
  try {
    const suggestion = await UserService.getSuggestion(req.params.id);
    res.send({
      status: true,
      message: "Suggestion",
      users: suggestion,
    });
  } catch (err) {
    console.log(err);
    res.send({ status: false, message: "Suggestion failed" });
  }
};

exports.search = async (req, res) => {
  try {
    const users = await UserService.search(req.params.query);
    if (users)
      res.send({ status: true, message: "Search success", users: users });
    else res.send({ status: true, message: "Search success", users: [] });
  } catch (err) {
    console.log(err);
    res.send({ status: false, message: "Error during search" });
  }
};
