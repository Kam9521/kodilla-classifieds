const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");
const upload = require("../middleware/upload.middleware");

router.post("/register", upload.single("avatar"), authController.register);

router.post("/login", authController.login);

router.get("/user", authController.getUser);

router.delete("/logout", authController.logout);

module.exports = router;
