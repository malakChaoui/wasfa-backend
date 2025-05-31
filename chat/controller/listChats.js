
const Chat = require('../../model/Chat');
const User = require('../../model/User');

const getChatList = async (req, res) => {
  const userId = req.user.id; // or from req.body/user param

  try {
    const chats = await Chat.find({
      $or: [{ user1: userId }, { user2: userId }]
    })
      .populate('lastMessage')
      .populate('user1', 'username pfpURL phoneNumber address')
      .populate('user2', 'username pfpURL phoneNumber address')
      .lean();

    const chatList = chats.map(chat => {
      const isUser1 = chat.user1._id.toString() === userId;
      const otherUser = isUser1 ? chat.user2 : chat.user1;

      return {
        chatId: chat._id,
        user: {
          _id: otherUser._id,
          username: otherUser.username,
          pfpURL: otherUser.pfpURL,
          phoneNumber: otherUser.phoneNumber,
          address: otherUser.address,
        },
        lastMessage: chat.lastMessage,
        //time:Math.floor((Date.now() - new Date(chat.lastMessage.createdAt).getTime())/(1000*60)) ,
        time: chat.lastMessage
         ? Math.floor((Date.now() - new Date(chat.lastMessage.createdAt).getTime()) / (1000 * 60))
         : null,
      };
    });

    // Sort by lastActivity descending
    chatList.sort((a, b) => b.time - a.time);

    res.status(200).json(chatList);
  } catch (err) {
    console.error(' Error fetching chat list:', err);
    res.status(500).json({ message: 'Server error while fetching chat list' });
  }
};

module.exports = { getChatList };
