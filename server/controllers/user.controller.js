const User = require("../models/user.model");
const UserRepository = require("../repositories/user.repository");
const PostRepository = require("../repositories/post.repository");
const AvatarRepository = require("../repositories/avatar.repository");
const FollowRepository = require("../repositories/follow.repository");
const LikeRepository = require("../repositories/like.repository");
const CommentRepository = require("../repositories/comment.repository");

const Avatar = require("../models/avatar.model");
const Follow = require("../models/follow.model");

exports.users = (req, res) => {
  res.send("Send all users");
};

exports.user = (req, res) => {
  UserRepository.getUserById(req.params.id)
    .then((user) => {
      PostRepository.getUserPosts(req.params.id)
        .then((posts) => {
          FollowRepository.getFollowers(req.params.id).then((followers) => {
            FollowRepository.getFollowings(req.params.id).then((followings) => {
              const userProfile = {
                user: {
                  _id: req.params.id,
                  name: user.name,
                  followers: followers.length,
                  following: followings.length,
                },
                posts: posts,
              };
              console.log(userProfile);
              res.send(userProfile);
            });
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(`User ${req.params.id} not found ${err}`));
};

exports.create = (req, res, next) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
  });

  user.setPassword(req.body.password);

  user.save((err) => {
    if (err) {
      return next(err);
    }

    this.login(req, res, next);
  });
};

exports.login = (req, res, next) => {
  UserRepository.getUserByEmail(req.body.email)
    .then((data) => {
      if (data !== null) {
        const user = new User({
          name: data.name,
          email: data.email,
          salt: data.salt,
          hash: data.hash,
        });
        if (user.validatePassword(req.body.password)) {
          res.send(user.toAuthJSON(data._id));
        } else {
          res.status(401).send("wrong email/password");
        }
      }
    })
    .catch((err) => res.status(401).send("wrong email/password"));
};

exports.delete = async (req, res, next) => {
  try {
    await LikeRepository.deleteUserLikes(req.params.id);
    await FollowRepository.deleteUserFollows(req.params.id);
    await CommentRepository.deleteUserComments(req.params.id);
    await PostRepository.deleteUserPosts(req.params.id);
    await UserRepository.deleteUser(req.params.id);
    res.send({ status: true, message: "Account deleted" });
  } catch (err) {
    console.log(err);
    res.send({ status: false, message: "Error while deleting account" });
  }
};

exports.update = (req, res, next) => {
  UserRepository.updateUserName(req.params.id, req.body.name)
    .then((username) => {
      UserRepository.updateUserPassword(req.params.id, req.body.password)
        .then((password) =>
          res.send({ status: true, message: "Update user successful" })
        )
        .catch((err) =>
          res.send({ status: false, message: "Update password failed" })
        );
    })
    .catch((err) => {
      console.log(err);
      res.send({ status: false, message: "Update username failed" });
    });
};

exports.setAvatar = (req, res, next) => {
  const ObjectId = require("mongodb").ObjectId;
  const o_id = new ObjectId(req.body.userId);

  let avatar = new Avatar({
    user: o_id,
    file: req.file,
    filename: req.body.filename,
  });

  AvatarRepository.deleteUserAvatar(o_id).then((data) => {
    avatar.save((err) => {
      if (err) {
        res.send({ status: false, message: "Avatar set failed" });
      } else {
        res.send({ status: true, message: "Avatar set sucessfully" });
      }
    });
  });
};

exports.getAvatar = (req, res) => {
  AvatarRepository.getUserAvatar(req.params.id)
    .then((avatar) => {
      if (avatar) res.send({ status: true, message: avatar.filename });
      else res.send({ status: false, message: "Avatar not found" });
    })
    .catch((err) => console.log(err));
};

exports.getFollowers = (req, res) => {
  FollowRepository.getFollowers(req.params.id)
    .then((data) => {
      const followers = data.map((f) => f.follower);
      req.send({ users: followers });
    })
    .catch((err) => console.log(err));
};

exports.getFollowings = (req, res) => {
  FollowRepository.getFollowings(req.params.id)
    .then((data) => {
      const followings = data.map((f) => f.user);
      req.send({ users: followings });
    })
    .catch((err) => console.log(err));
};

exports.follow = (req, res) => {
  const ObjectId = require("mongodb").ObjectId;
  const o_userId = new ObjectId(req.body.userId);
  const o_followerId = new ObjectId(req.body.followerId);

  const follow = new Follow({
    user: o_userId,
    follower: o_followerId,
  });

  follow.save((err) => {
    if (err) {
      res.send({ status: false, message: "Follow failed" });
    } else {
      res.send({ status: true, message: "Follow successful" });
    }
  });
};

exports.unfollow = (req, res) => {
  FollowRepository.unfollow(req.body.userId, req.body.followerId)
    .then((data) => {
      res.send({ status: true, message: "Unfollow successful" });
    })
    .catch((err) => {
      console.log(err);
      res.send({ status: false, message: "Unfollow failed" });
    });
};

exports.isFollowing = (req, res) => {
  FollowRepository.isFollowing(req.body.userId, req.body.followerId)
    .then((data) => {
      if (data) res.send({ status: true, message: "Is following" });
      else res.send({ status: false, message: "Not following" });
    })
    .catch((err) => console.log(err));
};

exports.search = (req, res) => {
  UserRepository.search(req.params.query)
    .then((data) => {
      res.send({ status: true, message: "Search success", users: data });
    })
    .catch((err) => {
      console.log(err);
      res.send({ status: false, message: "Error during search" });
    });
};
