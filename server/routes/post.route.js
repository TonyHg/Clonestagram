import { upload } from "../app";
const express = require("express");
const router = express.Router();

const postController = require("../controllers/post.controller");

router.post("/create", upload.single("media"), postController.createPost);

module.exports = router;
