const bcryptjs = require("bcryptjs");
const pool = require('../../../database')
const changePassword = async (req, res, next) => {
    
    try {
        let { currentPassword, newPassword, confirmPassword }=req.body
        const user = await pool.query(`SELECT * FROM mbillUsers WHERE id= '${req.id}'`)
        if (user.length === 0) {
            return res.status(400).send("Invalid credentials")
        }
       
            // Check password
        const isMatch = await bcryptjs.compare(currentPassword, user[0].password)
        if (!isMatch) {
            return res.status(400).send("Invalid credentials")
        }

           
                newPassword = await bcryptjs.hash(newPassword, 8);

                await pool.query(`UPDATE mbillUsers SET password='${newPassword}' , confirmPassword='${confirmPassword}' WHERE id='${req.id}'`)

                res.status(200).send( "Password changed successfully");
           
        
    } catch (e) {
        res.status(500).json({ msg: `Server error in Chenge Password ${e.message}` });
    }
};
module.exports = { changePassword };