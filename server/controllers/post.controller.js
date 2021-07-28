const Post = require("../models/post.model");

exports.create = (req, res, next) => {
  console.log(req.file);
  console.log(req.body);
  let post = new Post({
    userId: req.body.userId,
    file: req.file,
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
