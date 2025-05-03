const Post=require('../../model/Post');


const getPosts =async (req,res)=>{
    const {latitude,langitude,limit=10,skip=0}=req.query;
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
        .sort({ createdAt: -1 })// Sort by createdAt in descending order
        .populate('user','username phoneNumber address  pfpURL'); 
        //console.log(posts);
        const formattedPosts = posts.map(post => {
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

        res.status(200).json(formattedPosts);
    }catch(err){
        console.error('Error:', err.message);
        res.status(500).json({ message: 'Server error during.... ' });
    }
};
module.exports={getPosts};