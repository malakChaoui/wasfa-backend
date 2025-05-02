const User=require('../model/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const editPhoneNumber=require('./editPhoneNumber');
require('dotenv').config();

const handlelogin = async(req,res)=>{
    try{
    const {password,phoneNumber}=req.body;
    if(!password || !phoneNumber)return res.status(400).json({'message':'phoneNumber and password are required'});
    //check for valid user in db
    const phone=editPhoneNumber(phoneNumber);
    const foundUser=await User.findOne({phoneNumber:phone}).exec();
    if(!foundUser)return res.sendStatus(401);// Unauthorized
    console.log("user founded");
    //evalutae password
    const match = await bcrypt.compare(password,foundUser.password);
    if(match){
        const userID=foundUser._id;
        const username=foundUser.username;
      //create JWTs
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
         // Saving refrenshToken with current user
         foundUser.refreshToken=refreshToken;
         const result = await foundUser.save();
         console.log("user refresh token was created and saved");
         return res.json({'userID':`${foundUser._id}`,refreshToken,accessToken});
        } else{
        res.sendStatus(401);
    }
 }catch(err){
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
 }

}
module.exports={handlelogin};