const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://admin:Gh6nM6QhAvAxQYP@cluster0.uz537.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let mongoDB = process.env.MONGODB_URI || uri;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

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

const upload = multer({ storage });

console.log("dbUtils");

module.exports = {
  connectToDatabase: () => {},
  getDb: () => {
    return db;
  },
};
