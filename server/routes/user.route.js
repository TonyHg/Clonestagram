const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.get("/users", userController.users);
router.get("/byEmail/:email", userController.user);
router.post("/create", userController.create);
router.post("/login", userController.login);

module.exports = router;
