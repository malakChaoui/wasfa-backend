const User=require('../model/User');
const jwt=require('jsonwebtoken');

const handleRefreshToken = async(req,res)=>{
    try{
    const {refreshToken}=req.body;
    if(!refreshToken)return res.json({'message':'no refreshToken available'});
    //check for valid user in db
    const foundUser=await User.findOne({ refreshToken }).exec();
    if(!foundUser)return res.status(403).json({ 'message': 'Invalid refresh token (user not found)' });
    //evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded)=>{
            if(err || foundUser._id.toHexString() !== decoded.userID) return res.status(403).json({'message':'not found'});
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
            res.json({accessToken})
        }
    );
  }catch(err){
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
   
}
module.exports={handleRefreshToken};