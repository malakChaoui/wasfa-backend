const Message = require('../../model/Message');
const Chat = require('../../model/Chat');

const sendMessage = async ({ chatId, senderId, text }) => {
  try {
    // 1. Create message in the database
    const message = await Message.create({
      chat: chatId,
      sender: senderId,
      text: text,
    });

    // 2. Update the lastMessage field in the chat document
    await Chat.findByIdAndUpdate(chatId, {
      lastMessage: message._id,
    });

    // Return the created message
    return message;
  } catch (error) {
    throw new Error('Failed to send message: ' + error.message);
  }
};

module.exports = sendMessage;
