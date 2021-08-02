const Post = require("../models/post.model");
const PostRepository = require("../repositories/post.repository");
const UserRepository = require("../repositories/user.repository");

exports.create = (req, res, next) => {
  console.log(req.file);
  console.log(req.body);

  const ObjectId = require("mongodb").ObjectId;
  const o_id = new ObjectId(req.body.userId);

  let post = new Post({
    user: o_id,
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
