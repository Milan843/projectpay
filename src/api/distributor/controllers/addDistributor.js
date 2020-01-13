const pool = require('../../../database')
const addDistributor = async (req, res, next) => {
    try {

        await pool.query("INSERT INTO distributors set ?",[req.body])
        
        res.status(200).json({ message: "Distributor added successfully" })

    } catch (error) {
        res.status(500).json(`Server error in reset password ${error.message}`);
    }

}
module.exports = { addDistributor }
