const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const key = process.env.Secret_KEY;

const generateToken  = (payload) => {
    return jwt.sign(payload, key, {expiresIn: '1800s'});
}

function jwtMiddleware(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null){
        return res.status(400).json({message:"token is missing"});
    }

    jwt.verify(token , key, (err,decoded) => {
        if(err) return res.status(401).json({message: "invalid token"});
        req.user = decoded;
        next();
    });
    
}

module.exports = {generateToken, jwtMiddleware};