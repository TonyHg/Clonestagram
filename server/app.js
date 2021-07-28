const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const Loki = require("lokijs");

// Setup database connection
const dbUtils = require("./utils/dbUtils");
dbUtils.connectToDatabase();

const user = require("./routes/user.route");
const post = require("./routes/post.route");
const app = express();
app.use(cors());

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Models
// const Users = mongoose.model("users");
app.use("/api/user", user);
app.use("/api/post", post);

let port = 2048;

app.listen(port, () => {
  console.log("Server is up and running on port number " + port);
});
