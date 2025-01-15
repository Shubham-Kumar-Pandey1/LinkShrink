// router/staticRouter.js
const express = require("express");
const router = express.Router();
const verifyAdmin = require("../middlewares/verifyAdmin");
const {
    handleWelcomeAdmin,
    handleWelcomeUser,
} = require("../controller/staticRouter");

router.get("/admin",verifyAdmin,handleWelcomeAdmin);
router.get("/", handleWelcomeUser);

module.exports = router;
