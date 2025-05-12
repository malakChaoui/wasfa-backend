// This controller handles fetching messages for a specific chat.
// It retrieves messages from the database, sorts them by timestamp, and limits the number of messages returned.
const Message = require('../../model/Message');

const getMessages = async (req, res) => {
  const { chatId } = req.query;
  const { limit = 20, skip = 0 } = req.query; // Default limit to 20, skip to 0

  if (!chatId) {
    return res.status(400).json({ message: 'chatId is required' });
  }

  try {
    const messages = await Message.find({chat: chatId })
      .sort({ createdAt: -1 }) // Newest first (descending order)
      .skip(parseInt(skip)) // Skip the messages already loaded
      .limit(parseInt(limit)) // Limit to 20 messages
       .populate('sender', 'username')// Optional: populate sender info
       .select('text seen createdAt sender'); // Only return required fields

    const formatted = messages.map(msg => ({
      senderid: msg.sender._id,
      content: msg.text,
    }));

    res.status(200).json(formatted);
  } catch (err) {
    console.error(' Error fetching messages:', err);
    res.status(500).json({ message: 'Server error while fetching messages' });
  }
};

module.exports = { getMessages };
