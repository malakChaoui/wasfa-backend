
const Post=require('../model/Post');
const User = require('../model/User');


const getSuggestions= async(req,res)=>{
    try{ 
        const { query, limit = 10, skip = 0 } = req.query;
      if(!query || query.trim()===""){
        return res.status(400).json({message:"Query is required"});}
        const UserId = req.user.id;
        if (!UserId) {
            return res.status(401).json({ message: "Unauthorized: User ID not found" });
        }
    
      const suggestions=await Post.find({medication:{$regex:query,$options:'i'},
      user: { $ne: UserId } })
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .populate('user','username phoneNumber address  pfpURL');
      const formattedSuggestions = suggestions.map(post => {
        const { _id, username, phoneNumber, pfpURL } = post.user || {};
        return {
            _id: post._id,
            user: _id,
            name: username,
            medication: post.medication,
            createdAt: post.createdAt,
            quantity: post.quantity,
            expiryDate: post.expiryDate,
            phoneNumber,
            note: post.note,
            imageURL: post.imageURL,
            address: post.address,
            pfpImageURL: pfpURL,
            location: post.location
        };
     });

     res.status(200).json(formattedSuggestions);
    
    }catch(error){
        console.error('Error in getSuggestions:', error);
        res.status(500).json({message:"Internal server error"});
    };
   
};
module.exports={getSuggestions};
