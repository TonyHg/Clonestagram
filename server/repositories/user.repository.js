const dbUtils = require("../utils/dbUtils");
const db = dbUtils.getDb();

exports.getUserByEmail = (email) => {
  const users = db.collection("users");
  const query = { email: email };
  const user = users.findOne(query);
  return user;
};
