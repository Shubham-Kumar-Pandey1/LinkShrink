const authModel= require("../model/auth");
const jwt = require("jsonwebtoken");
async function handleWelcomeUser(req, res) {
    const { username } = req.body;

    // Find user in the database
    const user = await authModel.findOne({ username: username });
    if (user) {
        // Generate a JWT token
        const token = jwt.sign({ username: username }, "Bankai@123");

        // Set the token as a cookie
        await res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
            sameSite: 'Strict'
        });
        // Redirect to URL shortener page
        return res.redirect("/urlShortener");
    } else {
        return res.render("signup");
    }
}


async function handleCreateUser(req, res) {
    const { username, password } = req.body;

    // Create the user in the database (assuming 'authModel.create' works as expected)
    const user = await authModel.create({
        username: username,
        password: password,
    });

    // Generate a JWT token
    const token = jwt.sign({ username: user.username },"Bankai@123", );

    // Set the token as a cookie
    await res.cookie('auth_token', token, {
        httpOnly: true,  // Helps prevent XSS attacks
        secure: process.env.NODE_ENV === 'production',  // Only send cookie over HTTPS in production
        expires: new Date(Date.now() + 3600000),  // Set expiration time (1 hour)
        sameSite: 'Strict'  // Prevent cross-site request forgery
    });
    // Redirect the user to the home page
    return res.redirect('/urlShortener');
}

module.exports = {
    handleWelcomeUser,
    handleCreateUser,
}