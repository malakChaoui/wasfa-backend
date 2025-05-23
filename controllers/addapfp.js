const User=require('../model/User');



const addpfpURL =async (req,res)=>{
    const {pfpURL}=req.body;
    const userid=req.user.id;
    if(!userid || !pfpURL)return res.status(400).json({'message':'All fields are required'});
     const foundUser = await User.findById(userid).exec();
     if (!foundUser) return res.status(404).json({ message: 'User not found' });
    try{
        //create and store the new user pfp
        foundUser.pfpURL=pfpURL;
        await foundUser.save();
        console.log('new user:',foundUser);
        res.status(201).json({'message':`new user: ${foundUser.username} add a new profile photo`});
    }catch(err){
        console.error('Error working with user:', err.message);
        res.status(500).json({ message: 'Server error during ...' });

    }

}
module.exports={addpfpURL};