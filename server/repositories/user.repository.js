const dbUtils = require("../utils/dbUtils");
const db = dbUtils.getDb();

const users = db.collection("users");

exports.getUserByEmail = (email) => {
  const query = { email: email };
  const user = users.findOne(query);
  return user;
};

exports.getUserById = (id) => {
  const ObjectId = require("mongodb").ObjectId;
  const o_id = new ObjectId(id);

  const query = { _id: o_id };
  const user = users.findOne(query);
  console.log(user);
  return user;
};

exports.deleteUser = (id) => {
  const ObjectId = require("mongodb").ObjectId;
  const o_id = new ObjectId(id);

  const query = { _id: o_id };
  return users.deleteOne(query);
};
