var Services = require('./../../../service/network');
const bcryptjs = require("bcryptjs");
const pool = require('./../../../config/database')
var _ = require("lodash");
const resetPassword = async (req, res, next) => {

    try {
        const decodedtoken = jwt.decode(req.params.token,"secretKey")
        const { id } = decodedtoken;
        let { newPassword, confirmPassword} = req.body
        const user = await pool.query(`SELECT * FROM mbillUsers WHERE id= '${id}'`)
        if (user.length === 0) {
            return Services._handleError(res, error, "Token Invalid");
        }
    

        newPassword = await bcryptjs.hash(newPassword, 8);

        await pool.query(`UPDATE mbillUsers SET password='${newPassword}' , confirmPassword='${confirmPassword}' WHERE id='${id}'`)

        return Services._response(res, "Password Set succesfully");


    } catch (error) {
        return Services._handleError(res, error,"Server error in reset password");
    }
};
module.exports = { resetPassword };
