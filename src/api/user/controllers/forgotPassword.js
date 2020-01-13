const pool = require('../../../database')
const mailer = require("../utils/mailer");
const jwt = require("jsonwebtoken");

const forgotPassword = async (req, res, next) => {
    try {
        const { email } = req.body
        const user = await pool.query(`SELECT * FROM mbillUsers WHERE email= '${email}'`)

        if (user.length === 0) {
            return res.status(400).send("Invalid credentials")
        }
        const id = await pool.query(`Select id From mbillUsers where email='${email}'`)

        const token = await jwt.sign({ id: id[0].id }, process.env.SECRET_KEY, { expiresIn: 36000 })

        const userEmail=user[0].email
        const verify = `Click on the link http://localhost:4000/verify/${token}`;
        await mailer(userEmail, verify);

        res.send('Mail has been sent your registered email.Please check and reset your password')
        next();
    } catch (e) {
        res.status(500).json({ msg: `Email does not exist ${e.message}` });
    }
};

module.exports = { forgotPassword };