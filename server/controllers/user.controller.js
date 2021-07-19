const User = require("../models/user.model");

exports.users = (req, res) => {
  res.send("Send all users");
};

exports.createUser = (req, res, next) => {
  console.log(req.body);
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  user.save((err) => {
    if (err) {
      return next(err);
    }

    res.send("User created sucessfully");
  });
};
