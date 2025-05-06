const Post = require('../../model/Post');
const User = require('../../model/User');

const unsavePost = async (req, res) => {
    const {postId} = req.body;
    const userId=req.user.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove the post from savedPosts
        user.savedPosts = user.savedPosts.filter(id => id.toString() !== postId);
        await user.save();

        res.json({ message: 'Post unsaved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'server error' });
    }
};
module.exports={unsavePost}