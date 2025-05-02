const User=require('../model/User');



const getme =async (req,res)=>{
    const userid=req.user.id;
    if(!userid)return res.status(400).json({'message':'All fields are required'});
    try{
        const foundUser = await User.findById(userid).exec();
     if (!foundUser) return res.status(404).json({ message: 'User not found' });
        res.json({
            name: foundUser.username,
            phone: foundUser.phoneNumber,
            address: foundUser.address,
            langitude: foundUser.langitude,
            latitude: foundUser.latitude,
            pfpURL: foundUser.pfpURL,
            
          });
    }catch(err){
        console.error('Error getting user:', err.message);
        res.status(500).json({ message: 'Server error during ...' });

    }

}
module.exports={getme};