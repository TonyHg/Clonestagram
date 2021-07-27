const User = require("../models/user.model");
const UserRepository = require("../repositories/user.repository");

exports.users = (req, res) => {
  res.send("Send all users");
};

exports.user = (req, res) => {
  UserRepository.getUserByEmail(req.params.email)
    .then((data) => res.send(data))
    .then((err) => console.log(`User ${req.params.email} not found`));
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

    res.send("User created sucessfully");
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
          res.send(user.toAuthJSON());
        }
        res.status(501).send("wrong email/password");
      }
    })
    .then((err) => res.status(501).send("wrong email/password"));
};
