const Post = require('../../model/Post');
const User = require('../../model/User');

const deletePost = async (req, res) => {
    try {
        const  {id}  = req.params;
      const userId = req.user.id;  
      const post = await Post.findById(id); 
     

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      // Check if the logged-in user is the owner of the post
      if (post.user.toString() !== userId) {
        return res.status(403).json({ message: 'Unauthorized: Not your post' });
      }
  
      const deletedPost = await Post.findByIdAndDelete(id);
  
      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
  
      await User.updateMany(
        { savedPosts: id },            
        { $pull: { savedPosts: id } }  
      );
  
      res.status(200).json({
        message: ' Post deleted successfully'
      });
  
    } catch (error) {
      console.error(' error deletePost', error);
      res.status(500).json({ message: 'server error', error });
    }
  };
  
module.exports = { deletePost };