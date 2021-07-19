const express = require("express");
const bodyParser = require("body-parser");

// Setup database connection
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://admin:Gh6nM6QhAvAxQYP@cluster0.uz537.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let mongoDB = process.env.MONGODB_URI || uri;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const user = require("./routes/user.route");
const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/user", user);

let port = 2048;

app.listen(port, () => {
  console.log("Server is up and running on port number " + port);
});
