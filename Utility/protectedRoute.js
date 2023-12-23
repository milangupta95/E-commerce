const jwt = require('jsonwebtoken');
require('dotenv').config();
const key = process.env.privateKey;
module.exports.protectedRoute = function(req,res,next) {
    let token = req.cookies.login;
    const payload = jwt.verify(token,key);
    if(payload) {
        const user_id = payload.data.id;
        req.user_id = user_id;
        next();
    } else {
        res.status(402).json({
            message: "You Must Logged In"
        })
    }
}