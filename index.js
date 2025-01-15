// index.js
const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const path = require("path");
const PORT = 8000;
// Ensure that each router is imported directly as the default export
const urlRouter = require("./router/url");
const userRouter = require("./router/staticRouter");
const authRouter = require("./router/auth");
// Connection to DATABASE
const { connectMongoDb } = require("./connection");
connectMongoDb("mongodb://127.0.0.1:27017/URL-INFO")
    .then(() => console.log("DATABASE connected Successfully"));
// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// ROUTER
app.use("/urlShortener", userRouter);
app.use("/", urlRouter);
app.use("/auth", authRouter);
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT} : http://localhost:${PORT}/urlShortener`);
});