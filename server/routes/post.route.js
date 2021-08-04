const dbUtils = require("../utils/dbUtils");
const upload = dbUtils.getUpload();
const express = require("express");
const router = express.Router();

const postController = require("../controllers/post.controller");

router.post("/create", upload.single("file"), postController.create);
router.get("/getAll", postController.getAll);
router.get("/like/:id", postController.getLikes);
router.post("/isLiked", postController.getLike);
router.post("/like", postController.like);
router.post("/unlike", postController.unlike);

module.exports = router;
