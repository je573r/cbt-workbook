const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/auth");

router.get("/", (req, res) => {
    res.render("index", { title: "Welcome to the Workbook App"});
});

router.get("/dashboard", authenticateJWT, (req, res) => {
    res.json({ message: `Welcome, ${req.user.name}!` });
});

module.exports = router;
