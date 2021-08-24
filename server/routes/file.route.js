const dbUtils = require("../utils/dbUtils");
const express = require("express");
const router = express.Router();

const fileController = require("../controllers/file.controller");

router.get("/file/:name", fileController.getFile);
router.get("/getAll", fileController.getAll);

module.exports = router;
