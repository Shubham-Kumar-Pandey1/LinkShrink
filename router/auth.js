const express = require("express");
const router = express.Router();
const  {handleWelcomeUser,handleCreateUser} = require("../controller/auth")

router.route("/login")
.get((req,res)=>{
    res.render("login")})
.post(handleWelcomeUser);

router.route("/signup")
.get((req,res)=>{res.render("signup")})
.post(handleCreateUser);

module.exports = router