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

module.exports = router;
