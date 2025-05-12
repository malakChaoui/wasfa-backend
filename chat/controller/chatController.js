const Chat = require('../../model/Chat');

exports.getOrCreateChat = async (req, res) => {
  try {
    const { userId } = req.body; // The other user's ID (receiver)
    const currentUserId = req.user.id; 

    // Sort user IDs to avoid duplicate chats
    const [user1, user2] = [currentUserId.toString(), userId.toString()].sort();

    // Check if chat already exists
    let chat = await Chat.findOne({ user1, user2 });

    if (!chat) {
      // Create chat if not found
      chat = await Chat.create({ user1, user2 });
    }

    res.json(chat);
  } catch (error) {
    console.error('Error in getOrCreateChat:', error);
    res.status(500).json({ error: 'Failed to get or create chat' });
  }
};

