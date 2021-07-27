const Post = require("../models/post.model");

exports.create = (req, res, next) => {
  let post = new Post({
    userId: req.body.userId,
    file: req.file,
    filename: req.body.filename,
    description: req.body.description,
    uploadDate: req.body.uploadDate,
  });

  post.save((err) => {
    if (err) {
      return next(err);
    }

    res.send("Post created sucessfully");
  });
};
