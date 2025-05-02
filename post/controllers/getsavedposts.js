const User = require('../../model/User');


const getSavedPosts = async (req, res) => {
    const userid=req.user.id;
        if(!userid)return res.status(400).json({'message':'userid is required'});
        

    try {
        const user = await User.findById(userid).populate('savedPosts');
         if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ savedPosts: user.savedPosts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports={ getSavedPosts };
// This code defines a function `getSavedPosts` that retrieves the saved posts of a user from the database. It uses the user ID from the request parameters to find the user and populate their `savedPosts` field with the corresponding post data. If successful, it returns the saved posts; otherwise, it returns an error message.