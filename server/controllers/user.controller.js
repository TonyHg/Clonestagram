const User = require("../models/user.model");
const UserRepository = require("../repositories/user.repository");
const PostRepository = require("../repositories/post.repository");
const AvatarRepository = require("../repositories/avatar.repository");

const Avatar = require("../models/avatar.model");

exports.users = (req, res) => {
  res.send("Send all users");
};

exports.user = (req, res) => {
  UserRepository.getUserById(req.params.id)
    .then((user) => {
      PostRepository.getUserPosts(req.params.id)
        .then((posts) => {
          const userProfile = {
            user: user.name,
            posts: posts,
          };
          console.log(userProfile);
          res.send(userProfile);
        })
        .catch((err) => console.log("Error while fetching"));
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

exports.delete = (req, res, next) => {
  PostRepository.deleteUserPosts(req.params.id)
    .then((ret) => {
      UserRepository.deleteUser(req.params.id)
        .then((data) => {
          res.send({ status: true, message: "Account deleted" });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
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
