const Post=require('../../model/Post');
const User=require('../../model/User');


const addNewPost =async (req,res)=>{
    const {imageURL,medication,quantity,expiryDate,note,userid}=req.body;
    if(!imageURL || !medication ||!quantity ||!expiryDate ||!userid)return res.status(400).json({'message':'All fields are required'});
    const foundUser = await User.findById(userid).exec();
    if (!foundUser) return res.status(404).json({ message: 'User not found' });
    try{
        //create and store the new post
        const post=new Post({
           user:foundUser._id,
           medication,
           quantity,
           expiryDate,
           note,
           imageURL,
           location:{
            type: 'Point',
            coordinates:[foundUser.langitude,foundUser.latitude]
           },
           address:foundUser.address,
        });
        await post.save();
        

        res.status(201).json({ message: 'New post created', post });
    }catch(err){
        console.error('Error:', err.message);
        res.status(500).json({ message: 'Server error during.... ' });

    }

}
module.exports={addNewPost};