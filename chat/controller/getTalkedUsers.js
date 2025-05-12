const Chat = require('../../model/Chat');

const getTalkedUsers = async (req, res) => {
  const userId = req.user.id;
  const usernameQuery = req.query.username?.toLowerCase() || '';

  try {
    const chats = await Chat.find({
      $or: [{ user1: userId }, { user2: userId }]
    })
      .populate('user1', 'username pfpURL address')
      .populate('user2', 'username pfpURL address');

    const usersWithChatId = chats.map(chat => {
      const isUser1 = chat.user1._id.toString() === userId;
      const otherUser = !isUser1 ? chat.user2 : chat.user1;

      return {
        chatId: chat._id,
        user: {
          _id: otherUser._id,
          username: otherUser.username,
          pfpURL: otherUser.pfpURL,
          address: otherUser.address
        }
      };
    });

    // Deduplicate based on user ID
    const uniqueMap = new Map();
    for (const item of usersWithChatId) {
      const key = item.user._id.toString();
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, item);
      }
    }

    let uniqueUsersWithChatId = Array.from(uniqueMap.values());

    // 🔍 Filter by username query if provided
    if (usernameQuery) {
      uniqueUsersWithChatId = uniqueUsersWithChatId.filter(item =>
        item.user.username.toLowerCase().includes(usernameQuery)
      );
    }

    res.status(200).json(uniqueUsersWithChatId);
  } catch (err) {
    console.error('Error fetching talked users:', err);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
};

module.exports = { getTalkedUsers };
