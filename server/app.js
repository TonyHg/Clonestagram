const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const fs = require("fs");
const path = require("path");
const Loki = require("lokijs");

// Setup database connection
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://admin:Gh6nM6QhAvAxQYP@cluster0.uz537.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let mongoDB = process.env.MONGODB_URI || uri;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
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

const user = require("./routes/user.route");
const app = express();
app.use(cors());

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Models
// const Users = mongoose.model("users");
app.use("/api/user", user);

let port = 2048;

app.listen(port, () => {
  console.log("Server is up and running on port number " + port);
});
