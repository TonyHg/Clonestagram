const Post = require("../models/post.model");

exports.create = (req, res, next) => {
  let post = new Post({
    userId: req.body.userId,
    media: req.body.media,
    description: req.body.description,
    creationDate: req.body.creationDate,
  });

  post.save((err) => {
    if (err) {
      return next(err);
    }

    res.send("Post created sucessfully");
  });
};
