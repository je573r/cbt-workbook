const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).render("signin", { title: "Signin", message: "Please log in to continue." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).render("signin", { title: "Signin", message: "Session expired. Please sign in again." });
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateJWT;

