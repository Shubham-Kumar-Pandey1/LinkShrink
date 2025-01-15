const cookieParser = require("cookie-parser");
const urlModel = require("../model/url");
const authModel= require("../model/auth");
const jwt = require("jsonwebtoken");
async function handleWelcomeAdmin(req, res) {
    try {
        const data = await urlModel.find({});
        res.render("admin", { allData: data });
    } catch (err) {
        console.error("Error fetching admin data:", err);
        res.status(500).send("Internal Server Error");
    }
}


async function handleWelcomeUser(req, res) {
    const cook = req.cookies.auth_token;  // Get the token from cookies

    if (!cook) {
        return res.redirect("/auth/signup");  
    }

    // Verify the JWT token
    jwt.verify(cook,"Bankai@123", (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Invalid token." });
        } else {
            // Token is valid, render the home page
            res.render("home", { user: user });
        }
    });
}

module.exports = {
    handleWelcomeAdmin,
    handleWelcomeUser,
}