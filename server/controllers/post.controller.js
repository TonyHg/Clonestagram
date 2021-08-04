const Post = require("../models/post.model");
const PostRepository = require("../repositories/post.repository");
const LikeRepository = require("../repositories/like.repository");

const Like = require("../models/like.model");

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

exports.getLikes = (req, res) => {
  LikeRepository.getLikes(req.params.id)
    .then((data) => {
      res.send(data.length);
    })
    .catch((err) => {
      console.log(err);
      res.send(0);
    });
};

exports.getLike = (req, res) => {
  LikeRepository.getLike(req.body.userId, req.body.postId)
    .then((data) => {
      if (data) res.send({ status: true, message: "Post is liked" });
      else res.send({ status: false, message: "post is not liked" });
    })
    .catch((err) => {
      console.log(err);
      res.send({ status: false, message: "error while fetching like" });
    });
};

exports.like = (req, res) => {
  const ObjectId = require("mongodb").ObjectId;
  const o_userId = new ObjectId(req.body.userId);
  const o_postId = new ObjectId(req.body.postId);

  const like = new Like({
    user: o_userId,
    post: o_postId,
  });

  like.save((err) => {
    if (err) res.send({ status: false, message: "Post not liked" });
    else res.send({ status: true, message: "Post liked" });
  });
};

exports.unlike = (req, res) => {
  LikeRepository.unlike(req.body.userId, req.body.postId)
    .then((data) => {
      res.send({ status: true, message: "Post unliked" });
    })
    .catch((err) => {
      console.log(err);
      res.send({ status: false, message: "Post not unliked" });
    });
};
