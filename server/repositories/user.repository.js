const dbUtils = require("../utils/dbUtils");
const db = dbUtils.getDb();

exports.getUserByEmail = (email) => {
  const users = db.collection("users");
  const query = { email: email };
  const user = users.findOne(query);
  return user;
};

exports.getUserById = (id) => {
  const ObjectId = require("mongodb").ObjectId;
  const o_id = new ObjectId(id);

  const users = db.collection("users");
  const query = { _id: o_id };
  const user = users.findOne(query);
  return user;
};
