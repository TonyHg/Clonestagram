const Post = require("../models/post.model");
const PostRepository = require("../repositories/post.repository");

const Like = require("../models/like.model");
const LikeRepository = require("../repositories/like.repository");

const Comment = require("../models/comment.model");
const CommentRepository = require("../repositories/comment.repository");

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

exports.getPost = (req, res) => {
  PostRepository.getPost(req.params.id)
    .then((data) => {
      if (data) res.send({ status: true, message: "post found", post: data });
      else res.send({ status: false, message: "post not found" });
    })
    .catch((err) => {
      console.log(err);
      res.send({ status: false, message: "error while getting post" });
    });
};

exports.getLikes = (req, res) => {
  LikeRepository.getLikes(req.params.id)
    .then((data) => {
      res.send({ status: true, likes: data.length });
    })
    .catch((err) => {
      console.log(err);
      res.send({ status: false, likes: 0 });
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

exports.getComments = (req, res) => {
  CommentRepository.getComments(req.params.id)
    .then((data) => {
      res.send({ status: true, comments: data });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createComment = (req, res) => {
  const ObjectId = require("mongodb").ObjectId;
  const o_userId = new ObjectId(req.body.userId);
  const o_postId = new ObjectId(req.body.postId);

  const comment = new Comment({
    user: o_userId,
    post: o_postId,
    comment: req.body.comment,
    uploadDate: req.body.uploadDate,
  });

  comment.save((err) => {
    if (err) res.send({ status: false, message: "Comment not posted" });
    else res.send({ status: true, message: "Comment posted" });
  });
};

exports.deleteComment = (req, res) => {
  CommentRepository.deleteComment(req.params.id)
    .then((data) => {
      res.send({ status: true, message: "Comment deleted" });
    })
    .catch((err) => {
      res.send({ status: false, message: "Comment not deleted" });
    });
};
