const pool = require('../../../database')
const jwt = require("jsonwebtoken");
const verifyEmail = async (req, res, next) => {

    try {
        const decodedtoken = jwt.decode(req.params.token, process.env.SECRET_KEY);
        const id = decodedtoken.id;

        const user = await pool.query(`SELECT * FROM mbillUsers WHERE id= '${id}'`);

        if (user.length === 0) {
            return res.status(400).json({ msg: "Invalid data" });
        }
        if (user[0].isEmailVerified === 1) {
            return res.status(400).json({ msg: "Invalid Link" })
        }

        await pool.query(`UPDATE mbillUsers SET isEmailVerified=1 WHERE id='${id}'`)

        res.status(200).send("Email Verified Successfully");


    } catch (e) {
        res.status(500).json({msg:`Server error in email verification ${e.message}`});
    }
};
module.exports = { verifyEmail };