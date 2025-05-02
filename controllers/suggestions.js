const Post=require('../model/Post');

const getSuggestions= async(req,res)=>{
    try{ 
        const { query, limit = 10, skip = 0 } = req.query;
      if(!query || query.trim()===""){
        return res.status(400).json({message:"Query is required"});
    }
    const suggestions=await Post.find({medication:{$regex:query,$options:'i'}})
    .limit(parseInt(limit))
    .skip(parseInt(skip));
    res.status(200).json(suggestions);
    }catch(error){
        res.status(500).json({message:"Internal server error"});
    };
   
};
module.exports={getSuggestions};