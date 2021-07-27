const dbUtils = require("../utils/dbUtils");
const upload = dbUtils.getUpload();
const express = require("express");
const router = express.Router();

const postController = require("../controllers/post.controller");

router.post("/create", upload.single("media"), postController.create);

module.exports = router;
