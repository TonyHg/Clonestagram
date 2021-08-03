const dbUtils = require("../utils/dbUtils");
const db = dbUtils.getDb();
const avatars = db.collection("avatars");

exports.getUserAvatar = (id) => {
  const ObjectId = require("mongodb").ObjectId;
  const o_id = new ObjectId(id);

  const query = { user: o_id };
  return avatars.findOne(query);
};

exports.deleteUserAvatar = (id) => {
  const query = { user: id };
  return avatars.deleteMany(query);
};
