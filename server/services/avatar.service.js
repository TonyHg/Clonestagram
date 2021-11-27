const AvatarRepository = require("../repositories/avatar.repository");

const Avatar = require("../models/avatar.model");
const ObjectId = require("mongodb").ObjectId;

exports.setUserAvatar = async (userId, file, filename) => {
  const o_id = new ObjectId(userId);

  let avatar = new Avatar({
    user: o_id,
    file: file,
    filename: filename,
  });

  await AvatarRepository.deleteUserAvatar(o_id);
  avatar.save();
};

exports.getUserAvatar = async (userId) => {
  return await AvatarRepository.getUserAvatar(userId);
};
