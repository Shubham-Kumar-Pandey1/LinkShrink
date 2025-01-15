const jwt = require("jsonwebtoken");

function verifyAdmin(req, res, next) {
    const cook = req.cookies.auth_token; // Get the token from cookies
    if (!cook) {
        return res.redirect("/auth/login");
    }

    // Verify the token
    jwt.verify(cook, "Bankai@123", (err, user) => {
        if (err || user.username !== "admin@gmail.com") {
            return res.status(403).send("Access denied. Admin only.");
        }
        req.user = user; // Attach user to request object for downstream use
        next(); // Proceed to the route handler
    });
}

module.exports = verifyAdmin;