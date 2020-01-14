var Services = require('./../../../service/network');
const pool = require('./../../../config/database')
const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")
var _ = require("lodash");
const login = async (req, res, next) => {
    const { userName, password } = req.body

    try {
        const user = await pool.query(`SELECT * FROM mbillUsers WHERE userName= '${userName}'`)
        if (user.length === 0) {
            return Services._handleError(res, "Invalid credentials");
        }
        const isMatch = await bcryptjs.compare(password, user[0].password)
        if (!isMatch) {
            return Services._handleError(res, "Invalid credentials");
        }
        const id = await pool.query(`Select id From mbillUsers where userName='${userName}'`)
        const token = await jwt.sign({ id: id[0].id }, process.env.SECRET_KEY, { expiresIn: 36000 })
        return Services._response(res, { user, token }, "Login Successfully");

    } catch (error) {
        return Services._handleError(res, error);
    }
}
module.exports = { login }