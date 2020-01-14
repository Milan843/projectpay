var Services= require('./../../../service/network')
const pool = require('./../../../config/database')
var _ = require("lodash");
const addDistributor = async (req, res, next) => {
    try {

        await pool.query("INSERT INTO distributors set ?", [req.body]).then(function (newRequest) {
            return Services._response(res, newRequest, "Distributor added successfully");
        }).catch(function (err) {
            return Services._handleError(res, err);
        })
        
    } catch (error) {
        return Services._handleError(res, error);
     }

}
module.exports = { addDistributor }
