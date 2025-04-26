const User=require('../model/User');

const handlelogout = async (req,res)=>{
    // on client, also delete the access token
    const {userId,refreshToken} =req.body;
    if(!userId || !refreshToken)return res.sendStatus(201);// no content
   // Find user by ID
    const foundUser = await User.findById(userId).exec();
    if(!foundUser) return res.sendStatus(204);// success with no content
    // Check if the refresh token matches
    if (foundUser.refreshToken !== refreshToken) {
    return res.status(403).json({ message: 'Invalid refresh token' });}
     
   // Invalidate the token
   foundUser.refreshToken = '';
   await foundUser.save();
   console.log(`User ${foundUser.username} logged out.`);
    
    res.status(204).end();  
}
module.exports={handlelogout};