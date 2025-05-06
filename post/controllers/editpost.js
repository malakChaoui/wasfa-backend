const Post = require('../../model/Post');


const editPost = async (req, res) => {
    const { postId, imageURL, medication, quantity, expiryDate, note } = req.body;
    const userid = req.user.id;

    if (!postId) return res.status(400).json({ message: 'Post ID is required' });

    try {
        const post = await Post.findById(postId);

        if (!post) return res.status(404).json({ message: 'Post not found' });

        // Ensure that the logged-in user owns the post
        if (post.user.toString() !== userid) {
            return res.status(403).json({ message: 'Unauthorized to edit this post' });
        }

        // Update allowed fields if provided
        if (imageURL !== undefined) post.imageURL = imageURL;
        if (medication !== undefined) post.medication = medication;
        if (quantity !== undefined) post.quantity = quantity;
        if (expiryDate !== undefined) post.expiryDate = expiryDate;
        if (note !== undefined) post.note = note;

        await post.save();

        res.status(200).json({ message: 'Post updated successfully' });
    } catch (error) {
        console.error('Error in editPost:', error.message);
        res.status(500).json({ message: 'Server error during update' });
    }
};

module.exports = { editPost };