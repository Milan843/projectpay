const pool = require('../../../database')
const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")
const login = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const user = await pool.query(`SELECT * FROM mbillUsers WHERE email= '${email}'`)
        if (user.length === 0) {
            return res.status(400).send("Invalid credentials")
        }
        const isMatch = await bcryptjs.compare(password, user[0].password)
        if (!isMatch) {
            return res.status(400).send("Invalid credentials")
        }
        const id =await pool.query(`Select id From mbillUsers where email='${email}'`)
        const token = await jwt.sign({ id: id[0].id }, process.env.SECRET_KEY, { expiresIn: 36000 })

        res.json({ user ,token})

    } catch (error) {
        res.status(500).json({ msg: `Server error in login ${error.message}` });
    }
}
module.exports = { login }