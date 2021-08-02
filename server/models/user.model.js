const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY || "secret";

let UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
});

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

UserSchema.methods.validatePassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      email: this.email,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    },
    SECRET_KEY
  );
};

UserSchema.methods.toAuthJSON = function (id) {
  return {
    _id: id,
    email: this.email,
    token: this.generateJWT(),
  };
};

module.exports = mongoose.model("User", UserSchema);
