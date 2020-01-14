var Services = require('./../../../service/network');
var _ = require("lodash");
const jwt = require("jsonwebtoken")
module.exports = function (req, res, next) {
    const token = req.header("x-auth-token")
    if (!token) {
        return Services._handleError(res, error, "No token,authorization failed" );
    }
    try {
        const decoded = jwt.verify(token, "thisisjwt")
        req.id = decoded.id  
        next()

    } catch (error) {
        return Services._handleError(res, error, "Token is not valid");
    }
}