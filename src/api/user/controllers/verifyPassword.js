const jwt = require("jsonwebtoken");
const pool = require("../../../database");
const mailer = require("../utils/mailer");
const bcryptjs = require("bcryptjs");

const verify = async (req, res, next) => {
    try {
        const decodedtoken = jwt.decode(req.params.token, process.env.SECRET_KEY);
        const id = decodedtoken.id;

        const user = await pool.query(`SELECT * FROM mbillUsers WHERE id= '${id}'`);

        if (user.length === 0) {
            return res.status(400).json({ msg: "User does not exist" });
        }

        const userEmail = user[0].email;

        const password = user[0].firstName + 2020;
        const verify =` Your temporary password is ${password}`;
        await mailer(userEmail, verify);

        const hashedpassword = await bcryptjs.hash(password, 8);
        await pool.query(
            `UPDATE mbillUsers SET password='${hashedpassword}' , confirmPassword='${password}' WHERE id= '${id}'`
        );

        res.json({ msg: "Mail Sent" });
    } catch (error) {
        res
            .status(500)
            .json({ msg: `server error in verify password  ${error.message}` });
    }
};
module.exports = { verify };