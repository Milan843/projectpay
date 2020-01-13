const jwt = require("jsonwebtoken");
const pool = require('../../../database')
const bcryptjs = require("bcryptjs")
const mailer = require("../utils/mailer");
const signup = async (req, res, next) => {
    try {
        const { personalDetails, shopDetails, paymentDetails } = req.body

        const email = await pool.query(`Select email FROM mbillUsers WHERE email='${shopDetails.email}'`)
        // console.log(email);

        if (email.length !== 0) {
            return res.status(400).send("User already exists.")
        }


        personalDetails.password = await bcryptjs.hash(personalDetails.password, 8)


        await pool.query("INSERT INTO mbillUsers set ?", [{ ...personalDetails, ...shopDetails, ...paymentDetails }])

        const user = await pool.query(`Select id,email From mbillUsers where email='${shopDetails.email}'`)
        const token = await jwt.sign({ id:user[0].id}, "thisisjwt", { expiresIn: 36000 })
        const verify = `Click on link to verify your account http://localhost:4000/verifyemail/${token}`;
        const Email = user[0].email;
        await mailer(Email,verify);
        res.status(200).json({ message: "Verification link has been sent your registered email .Please check and verify it" })

    } catch (error) {
        res.status(500).json({ msg: `Server error in signup ${e.message}` });
    }

}
module.exports = { signup }

