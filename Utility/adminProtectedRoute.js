const jwt = require('jsonwebtoken');
require('dotenv').config();
const key = process.env.privateKey;
module.exports.adminprotectedRoute = function(req,res,next) {
    let token = req.cookies.login;
    const payload = jwt.verify(token,key);
    if(payload) {
        const user_id = payload.data.id;
        req.user_id = user_id;
        if(payload.data.role === "admin") {
            next();
        } else {
            res.status(402).json({
                message : "Only Admin Can Access"
            })
        }
    } else {
        res.status(402).json({
            message: "You Must Logged In"
        })
    }
}