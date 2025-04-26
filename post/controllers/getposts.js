const Post=require('../../model/Post');


const getPosts =async (req,res)=>{
    const {latitude,langitude,limit=10,skip=0}=req.body;
    if(!latitude || !langitude)return res.status(400).json({'message':'All fields are required'});
    try{
        const posts = await Post.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [langitude, latitude]
                    },
                }
            }
        })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }); // Sort by createdAt in descending order
        console.log(posts);
        res.status(200).json(posts);
    }catch(err){
        console.error('Error:', err.message);
        res.status(500).json({ message: 'Server error during.... ' });
    }
};
module.exports={getPosts};