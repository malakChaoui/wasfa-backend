const User=require('../model/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const editPhoneNumber=require('./editPhoneNumber');
require('dotenv').config();


const registerNewUser =async (req,res)=>{
    const {username,password,certificatURL,phoneNumber,latitude,langitude,address}=req.body;
    if(!username || !password ||!certificatURL ||!phoneNumber ||!latitude ||!langitude ||!address)return res.status(400).json({'message':'All fields are required'});
    try{
        //encrypt the password
        const hashedPwd= await bcrypt.hash(password,10);

        //create and store the new user
        const user=new User({
            username,
            password: hashedPwd,
            certificatURL,
            phoneNumber: editPhoneNumber(phoneNumber),
            latitude,
            langitude,
            address
        });
        await user.save();

        
        //create JWTs
        const userID=user._id;
        const accessToken=jwt.sign(
            {
                "username":username,
                "userID":userID,
                "createdAT":Date.now()
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'1h'}
        );
        const refreshToken=jwt.sign(
            {
                "username":username,
                "userID":userID,
                "createdAT":Date.now()
            },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'1d'}
        );
        user.refreshToken=refreshToken;
        await user.save();
        //console.log(user);
        res.status(201).json({'message':`new user: ${username} was created`,'userID':`${user._id}`,refreshToken,accessToken});
    }catch(err){
        console.error('Error registering user:', err.message);
        res.status(500).json({ message: 'Server error during registration' });

    }

}
module.exports={registerNewUser};