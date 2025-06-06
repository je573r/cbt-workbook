const {sql} = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signin = async(req, res)=>{
    const userData = req.body;
    try {
        const result = await sql`SELECT * FROM users WHERE email = ${userData.email}`;
        if (!result[0]?.password) {
            res.json({ status: 'ERR' });
            return;
        }
            const hashedPassword = result[0].password;
            const matched = await bcrypt.compare(userData.password, hashedPassword);
            if(matched){
                const token = jwt.sign({
                    name:result[0].username,
                    email:result[0].email
                },process.env.JWT_SECRET);
                res.cookie("token", token);
                res.json({
                    status:200,
                    name:result[0].username
                })
            }
            else{
                res.json({
                    status:'ERR'
                })
            }
    }
    catch (error) {
        console.log('error', error);
        res.status(500).json({ status: 'ERR' });
    }
};
module.exports=signin;