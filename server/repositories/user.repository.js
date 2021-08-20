const dbUtils = require("../utils/dbUtils");
const db = dbUtils.getDb();
const crypto = require("crypto");

const users = db.collection("users");

exports.getAll = () => {
  return users.find().toArray();
};

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

exports.updateUserName = (id, name) => {
  const ObjectId = require("mongodb").ObjectId;
  const o_id = new ObjectId(id);

  const query = { _id: o_id };
  const newValues = { $set: { name: name } };
  return users.updateOne(query, newValues);
};

exports.updateUserPassword = (id, password) => {
  const ObjectId = require("mongodb").ObjectId;
  const o_id = new ObjectId(id);

  const query = { _id: o_id };
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 512, "sha512")
    .toString("hex");

  const newValues = { $set: { salt: salt, hash: hash } };
  return users.updateOne(query, newValues);
};

exports.search = (filter) => {
  const query = { name: { $regex: ".*" + filter + ".*", $options: "i" } };
  return users.find(query).toArray();
};
