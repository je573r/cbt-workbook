const express = require("express");
const router = express.Router();
const { AuthRegister, Register } = require("../controllers/signup");
const signin = require("../controllers/signin");

router.get("/signup", (req, res) => {
    res.render("signup", { title: "Signup" });
});

router.get("/signin", (req, res) => {
    res.render("signin", { title: "Signin" });
});

router.post("/bsignup", Register);
router.post("/bsignin", signin);
router.post("/oauth", AuthRegister);

module.exports = router;
