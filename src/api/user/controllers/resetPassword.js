const bcryptjs = require("bcryptjs");
const pool = require('../../../database')
const resetPassword = async (req, res, next) => {

    try {
        const decodedtoken = jwt.decode(req.params.token,"secretKey")
        const { id } = decodedtoken;
        let { newPassword, confirmPassword} = req.body
        const user = await pool.query(`SELECT * FROM mbillUsers WHERE id= '${id}'`)
        if (user.length === 0) {
            return res.status(400).send("Token Invalid")
        }

        newPassword = await bcryptjs.hash(newPassword, 8);

        await pool.query(`UPDATE mbillUsers SET password='${newPassword}' , confirmPassword='${confirmPassword}' WHERE id='${id}'`)

        res.status(200).send("Password changed successfully");


    } catch (e) {
        res.status(500).json("Server error in reset password");
    }
};
module.exports = { resetPassword };
