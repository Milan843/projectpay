const pool = require('../../../database')
const addDistributor = async (req, res, next) => {
    try {

        await pool.query("INSERT INTO distributors set ?",[req.body])
        
        res.status(200).json({ message: "Distributor added successfully" })

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error in add distributor")
    }

}
module.exports = { addDistributor }
