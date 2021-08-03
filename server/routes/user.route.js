const dbUtils = require("../utils/dbUtils");
const upload = dbUtils.getUpload();
const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.get("/users", userController.users);
router.get("/byEmail/:email", userController.user);
router.get("/byId/:id", userController.user);
router.post("/create", userController.create);
router.post("/login", userController.login);
router.delete("/delete/:id", userController.delete);
router.put("/update/:id", userController.update);
router.post("/avatar", upload.single("file"), userController.setAvatar);
router.get("/avatar/:id", userController.getAvatar);

module.exports = router;
