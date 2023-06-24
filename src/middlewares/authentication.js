const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.authenticateUser = (req, res, next) => {
    if(!req.headers.authorization){
        res.status(401).json({message: "authorization header required"})
    }
    let splittedHeader = req.headers.authorization.split(' ');
    if(splittedHeader[0] != "Bearer") {
        res.status(401).json({message: 'authorization format is Bearer <token>'})
    }
    let token = splittedHeader[1];
    return jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken)=>{
        if(err) return res.status(500).json({err})
        if (!decodedToken){
            res.status(401).json({message: "invalid authorization token. please login"})
        }
        req.user = decodedToken;
        next()
    });

}