const Comment = require("../models/comment.model");
const CommentRepository = require("../repositories/comment.repository");

const ObjectId = require("mongodb").ObjectId;

exports.getComments = async (postId) => {
  return await CommentRepository.getComments(postId);
};

exports.createComment = async (userId, postId, body, uploadDate) => {
  const o_userId = new ObjectId(userId);
  const o_postId = new ObjectId(postId);

  const comment = new Comment({
    user: o_userId,
    post: o_postId,
    comment: body,
    uploadDate: uploadDate,
  });

  return comment.save();
};

exports.deleteComment = async (commentId) => {
  return await CommentRepository.deleteComment(commentId);
};
