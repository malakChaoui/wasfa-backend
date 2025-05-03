const User = require('../../model/User');


const savePost = async (req, res) => {
    const {postId} = req.body;
   const  userId=req.user.id;
    if (!userId || !postId) {
        return res.status(400).json({ message:'userId and postId are required' });
    }
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'user not found' });

        if (user.savedPosts.includes(postId)) {
            return res.status(400).json({ message: 'post already saved' });
        }

        user.savedPosts.push(postId);
        await user.save();
        res.status(201).json({ message: 'post saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'error accured' });
    }
};
module.exports={ savePost };
// This code defines a function `savePost` that saves a post ID to a user's saved posts array in the database. It first checks if the user exists, and if so, it pushes the post ID into the `savedPosts` array and saves the user document. If successful, it responds with a success message; otherwise, it returns an error message.