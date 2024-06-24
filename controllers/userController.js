const User = require('../models/user');
const {generateToken, jwtMiddleware} = require('../jwtAuthenticator');

exports.signup = async (req,res) => {
    try{
        const userData = req.body;
        const newUser = new User(userData);
        const response = await newUser.save();
        const payload = {
            id : response.id
        }
        const token = generateToken(payload);

        res.status(200).json({
            response : response,
            token : token,
            message: "Signup successful"
        })
    }
    catch(err){
        res.status(500).json({
            error : err,
            message:"some error occured during signup"
        });
    }
}

exports.signIn = async (req,res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({userName: username});

        if(!user || !(await user.comparePassword(password))) return res.status(401).josn({message: "user is not registered or password is incorrect"});
        
        const payload = {
            id : user.id
        }

        const token = generateToken(payload);

        res.status(200).json({
            token: token,
            message: "Login successfully"
        });
    }
    catch(err){
        res.status(500).json({
            error : err,
            message:"some error occured during login"
        });
    }
}

exports.profile = async (req,res) => {
    try{
        const userData = req.user;
        const userId = userData.id;
        const user = await User.findById(userId);
        
        if(!user) return res.status(400).json({message: "User is not registered"});

        res.status(200).json({user});
    }
    catch(err){
        res.status(500).json({
            error : err,
            message:"some error occured getting profile"
        });
    }
}