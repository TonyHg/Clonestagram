const PostService = require("../services/post.service");
const LikeService = require("../services/like.service");
const CommentService = require("../services/comment.service");

exports.create = async (req, res, next) => {
  try {
    await PostService.createPost(
      req.body.userId,
      req.file,
      req.body.filename,
      req.body.description,
      req.body.uploadDate
    );
    res.send("Post created sucessfully");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const posts = await PostService.getAllPosts();
    res.send({ posts: posts });
  } catch {
    res.status(400).send("Error while fetching posts");
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await PostService.getPost(req.params.id);
    if (post) res.send({ status: true, message: "post found", post: post });
    else res.send({ status: false, message: "post not found" });
  } catch (err) {
    console.log(err);
    res.send({ status: false, message: "error while getting post" });
  }
};

exports.getFeed = async (req, res) => {
  try {
    const feed = await PostService.getFeed(req.params.id);
    res.send({ status: true, message: "feed found", posts: feed });
  } catch (err) {
    console.log(err);
    res.send({ status: false, message: "error while getting feed" });
  }
};

exports.getLikes = async (req, res) => {
  try {
    const likes = await LikeService.getLikes(req.params.id);
    res.send({ status: true, likes: likes.length });
  } catch (err) {
    console.log(err);
    res.send({ status: false, likes: 0 });
  }
};

exports.getLike = async (req, res) => {
  try {
    const like = await LikeService.getLike(req.body.userId, req.body.postId);
    if (like) res.send({ status: true, message: "Post is liked" });
    else res.send({ status: false, message: "post is not liked" });
  } catch (err) {
    console.log(err);
    res.send({ status: false, message: "error while fetching like" });
  }
};

exports.like = async (req, res) => {
  try {
    await LikeService.like(req.body.userId, req.body.postId);
    res.send({ status: true, message: "Post liked" });
  } catch (err) {
    console.log(err);
    res.send({ status: false, message: "Post not liked" });
  }
};

exports.unlike = async (req, res) => {
  try {
    await LikeService.unlike(req.body.userId, req.body.postId);
    res.send({ status: true, message: "Post unliked" });
  } catch (err) {
    console.log(err);
    res.send({ status: false, message: "Post not unliked" });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await CommentService.getComments(req.params.id);
    res.send({ status: true, comments: comments });
  } catch (err) {
    console.log(err);
    res.send({ status: false, comments: {} });
  }
};

exports.createComment = async (req, res) => {
  try {
    await CommentService.createComment(
      req.body.userId,
      req.body.postId,
      req.body.comment,
      req.body.uploadDate
    );
    res.send({ status: true, message: "Comment posted" });
  } catch (err) {
    console.log(err);
    res.send({ status: false, message: "Comment not posted" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    await CommentService.deleteComment(req.params.id);
    res.send({ status: true, message: "Comment deleted" });
  } catch (err) {
    res.send({ status: false, message: "Comment not deleted" });
  }
};
