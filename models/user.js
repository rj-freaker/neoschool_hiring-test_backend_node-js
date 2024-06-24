const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: [true, 'Username is not unique']
    },
    passWord: {
        type: String,
        required: true,
        minLength: [6, 'Password Length should be at least 8']
    }
},
{timestamps: true});

userSchema.methods.comparePassword = async function(userPassword){
    try{

        const isMatch = await bcrypt.compare(userPassword, this.passWord);
        return isMatch;
    }catch(err){
        console.log('Error occured in Password matching');
        console.log("Error is : ",err);
    }
};

userSchema.pre('save' , async function(next) {
    const user = this;

    if(!user.isModified('passWord', this.passWord)) return next();
    try{
        const salt= await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.passWord, salt);

        user.passWord = hashPassword;
        next();
    }
    catch(err){
        console.log("Some error occured in hashing password");
        return next(err);
    }
})


const User = mongoose.model('user',userSchema);
module.exports = User;