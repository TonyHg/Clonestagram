const dbUtils = require("../utils/dbUtils");
const mongoose = require("mongoose");
const db = dbUtils.getDb();
// const gfs = dbUtils.getGfs();
const Grid = require("gridfs-stream");

exports.getFile = (name, res) => {
  let gfs = Grid(db.db, mongoose.mongo);
  gfs.collection("uploads");
  gfs.files.findOne({ filename: name }, (err, file) => {
    if (err) {
      console.log(err);
      return false;
    }
    if (!file) {
      return false;
    } else {
      res.setHeader("content-type", file.contentType);
      const readstream = gfs.createReadStream(name);
      return readstream.pipe(res);
    }
  });
};
