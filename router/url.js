const express = require("express");
const router = express.Router();
const {
    handleGetUserData,
    handleCreateNewUser
} = require("../controller/url");

router.route("/")
.post(handleCreateNewUser)

router.route("/:id")
.get(handleGetUserData)


module.exports = router;