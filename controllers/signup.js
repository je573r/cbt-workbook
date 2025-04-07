const {sql} = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AuthRegister = async (req, res) => {
    const userData = req.body;
    try {
        const result = await sql`
            INSERT INTO USERS(name, email, photo_url, auth_type)
            VALUES (${userData.name}, ${userData.email}, ${userData.photo_url}, 'firebase')
        `;
            console.log(result.rows);
            res.json({
                status: 200
            });

        }
        catch(error) {
            console.log(error);
            res.send('err');
        }
};
const Register = async (req, res) => {
    const userData = req.body;
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    try {
        const result = await sql`
            INSERT INTO USERS(username, email, password, auth_type)
            VALUES (${userData.username}, ${userData.email}, ${hashedPassword}, 'local')
        `;
            console.log(result.rows);
            const token = jwt.sign(userData, process.env.JWT_SECRET);
            console.log(token);
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none"
            });
            res.json({
                status: 200
            });
        }
        catch(error) {
            console.log(error);
            res.json({
                status: 'ERR',
                error_code: error.code
            });
        } 
};
module.exports = { AuthRegister, Register };