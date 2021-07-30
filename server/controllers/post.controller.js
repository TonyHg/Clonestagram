const Post = require("../models/post.model");
const PostRepository = require("../repositories/post.repository");

exports.create = (req, res, next) => {
  console.log(req.file);
  console.log(req.body);
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

exports.getAll = async (req, res, next) => {
  try {
    const posts = await PostRepository.getAllPost();
    res.send({ posts: posts });
  } catch {
    res.status(400).send("Error while fetching posts");
  }
};
