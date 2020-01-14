var Services = require('./../../../service/network');
const jwt = require("jsonwebtoken");
const pool = require('./../../../config/database')
const bcryptjs = require("bcryptjs")
const mailer = require("../../../utils/mailer");
var _ = require("lodash");
const signup = async (req, res, next) => {
    try {
        const { personalDetails, shopDetails, paymentDetails ,socialId,registerType} = req.body

        const email = await pool.query(`Select email FROM mbillUsers WHERE email='${shopDetails.email}'`)
        // console.log(email);

        if (email.length !== 0) {
            return Services._handleError(res, "User already exists");
        }


        personalDetails.password = await bcryptjs.hash(personalDetails.password, 8)


        await pool.query("INSERT INTO mbillUsers set ?", [{ ...personalDetails, ...shopDetails, ...paymentDetails ,socialId,registerType}])

        const user = await pool.query(`Select id,email From mbillUsers where email='${shopDetails.email}'`)
        const token = await jwt.sign({ id: user[0].id }, process.env.SECRET_KEY, { expiresIn: 36000 })
        const verify = `Click on link to verify your account http://localhost:4000/verifyemail/${token}`;
        const Email = user[0].email;
       // await mailer(Email,verify);
        Services._response(res, {},"Verification link has been sent your registered email .Please check and verify it");

    } catch (error) {
        Services._handleError(res, error.message);
    }

}
module.exports = { signup }

