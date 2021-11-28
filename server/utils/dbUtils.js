const multer = require("multer");
const crypto = require("crypto");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://admin:Gh6nM6QhAvAxQYP@cluster0.uz537.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let mongoDB = process.env.MONGODB_URI || uri;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
let gfs;
db.once("open", () => {
  gfs = Grid(db.db, mongoose.mongo);
  gfs.collection("uploads");
});

const storage = new GridFsStorage({
  url: mongoDB,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
  }
};

let upload = multer({ storage: storage, fileFilter: fileFilter });

console.log("dbUtils");

module.exports = {
  connectToDatabase: () => {},
  getDb: () => {
    return db;
  },
  getUpload: () => {
    return upload;
  },
  getStorage: () => {
    return storage;
  },
  getGfs: () => {
    return gfs;
  },
};
