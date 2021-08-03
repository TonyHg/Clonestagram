const User = require("../models/user.model");
const UserRepository = require("../repositories/user.repository");
const PostRepository = require("../repositories/post.repository");

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
