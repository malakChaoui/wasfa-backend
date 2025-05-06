const Post = require('../../model/Post');

const getMyPosts = async (req, res) => {
    const userId = req.user.id;

    if (!userId) return res.status(400).json({ message: 'User ID is required' });

    try {
        const posts = await Post.find({ user: userId })
            .populate('user', 'username phoneNumber pfpURL address')
            .sort({ createdAt: -1 });

        if (!posts || posts.length === 0) {
            return res.status(200).json([]); // Or 404 with a message if you prefer
        }

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
    } catch (error) {
        console.error('Error in getMyPosts:', error.message);
        res.status(500).json({ message: 'Server error while retrieving posts' });
    }
};

module.exports = { getMyPosts };
