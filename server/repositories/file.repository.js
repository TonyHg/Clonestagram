const dbUtils = require("../utils/dbUtils");
const mongoose = require("mongoose");
const db = dbUtils.getDb();
// const gfs = dbUtils.getGfs();
const Grid = require("gridfs-stream");

exports.getFileStream = async (name, res) => {
  let gfs = Grid(db.db, mongoose.mongo);
  gfs.collection("uploads");
  const file = await gfs.files.findOne({ filename: name });
  return { contentType: file.contentType, rs: gfs.createReadStream(name) };
};
