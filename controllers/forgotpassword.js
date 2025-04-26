//forgotpassword.js
const bcrypt=require('bcrypt');
const editPhoneNumber=require('./editPhoneNumber');
const User=require('../model/User');

const forgotpassword= async(req,res)=>{
    const {phoneNumber,newpassword} =req.body;
    if(!newpassword) return res.status(400).json({'message':'password is required'});
    try{
        const phoneNmb=editPhoneNumber(phoneNumber);
        //checking if the user existed 
        const exist= await User.findOne({ phoneNumber: phoneNmb}).exec();
        if(!exist)return  res.status(400).json({'message':'no user with this number'}); 
           // changing the user password
          //encrypt the password
           const hashedPwd= await bcrypt.hash(newpassword,10);
           exist.password=hashedPwd;
           await exist.save();
           return res.status(200).json({ message: 'Password updated successfully' });
    }catch(error){
        console.error(' verification failed',error.message);
        res.status(401).json({ error:'error have accured'});
    }

}
module.exports={forgotpassword}