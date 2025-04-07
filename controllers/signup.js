const { sql } = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AuthRegister = async (req, res) => {
    const userData = req.body;
    client.query(`INSERT INTO USERS(name,email,photo_url,auth_type) VALUES($1,$2,$3,$4)`, [userData.name, userData.email, userData.photo_url, 'firebase'], (error, result) => {
        if (!error) {
            res.json({
                status: 200
            });

        }
        else {
            console.log(error);
            res.send('err');
        }

    });
}

const Register = async (req, res) => {
    const userData = req.body;

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const result = await sql`INSERT INTO USERS(username,email,password,auth_type) VALUES(${userData.username},${userData.email},${hashedPassword},'local')`;
    try {
        const token = jwt.sign(userData, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
        res.json({
            status: 200
        });
    }
    catch (err) { console.error(err); }


}
module.exports = { AuthRegister, Register };