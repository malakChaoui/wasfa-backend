require('dotenv').config();
const express=require('express');
const app=express();
http=require('http');
const WebSocket = require('ws');
const cors = require('cors');
const mongoose=require('mongoose');
const connectDB=require('./config/connectDB');
const sendMessage = require('./chat/controller/messageHandler');
const PORT= process.env.PORT || 3700;
const server = http.createServer(app);
const wss =new WebSocket.Server({server});
const Chat = require('./model/Chat');
const User = require('./model/User');


app.use(cors());
//connect to mongoDB
connectDB();

// Track connected clients and their chat rooms
const clients = new Map(); // socket => chatId


//buitt-in middleware to handle urlencoded data
// in other words , form data
//content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({extended:false}));

//built-in middleware for json
app.use(express.json());

//apload routes
app.use('/verifyCode',require('./routes/verify'));
app.use('/registerNewUser',require('./routes/register'));
app.use('/login',require('./routes/login'));
app.use('/refresh',require('./routes/refresh'));
app.use('/logout',require('./routes/logout'));
app.use('/addPost',require('./routes/addpost'));
app.use('/addpfp',require('./routes/adduserpfp'));
app.use('/sendCode',require('./routes/sendCode'));
app.use('/getSuggestions',require('./routes/suggest'));
app.use('/save-new-pwd',require('./routes/forgotchangepassword'));
app.use('/verify-to-changepwd',require('./routes/verifyForgottenPWD'));
app.use('/getPosts',require('./routes/getPostes'));
app.use('/savePost',require('./routes/saveposts'));
app.use('/get-saved-posts',require('./routes/getsavedpostes'));
app.use('/get-me',require('./routes/Getme'));
app.use('/get-my-posts',require('./routes/getmyposts'));
app.use('/edit-post',require('./routes/editmypost'));
app.use('/deletePost',require('./routes/deletePost'));
app.use('/unsavePost',require('./routes/unsavePost'));
app.use('/get-or-create-chat',require('./routes/chat'));
app.use('/getMessages',require('./routes/getMessages'));
app.use('/get-chat-list',require('./routes/getChatList'));



wss.on('connection', (socket) => {
  console.log('🟢 Client connected');
  
  socket.on('message', async (data) => {
    try {
      const msg = JSON.parse(data); // Expecting: { type, payload }
       // Handle joining a chat room
      if (msg.type === 'join') {
        const { chatId } = msg.payload;
        clients.set(socket, chatId);
        console.log(`Client joined chat ${chatId}`);
      }
      // Handle sending a message
      else if (msg.type === 'sendMessage') {
        const { chatId, senderId, text } = msg.payload;

        // Save message in DB
        const message = await sendMessage({ chatId, senderId, text });
        // Broadcast to everyone in the same chat
        for (const [clientSocket, roomId] of clients.entries()) {
          if (roomId === chatId && clientSocket.readyState === WebSocket.OPEN) {
            clientSocket.send(JSON.stringify({
              type: 'newMessage',
              payload: message
            }));
          }
        }
       const chat = await Chat.findById(chatId)
        .populate('user1', 'username pfpURL')
        .populate('user2', 'username pfpURL')
        .populate('lastMessage');

         const isUser1 = chat.user1._id.toString() === senderId;
         const receiver = !isUser1 ? chat.user2 : chat.user1;

// This is the new chat preview item
const updatedChatItem = {
  chatId: chat._id,
  user: {
    _id: receiver._id,
    username: receiver.username,
    pfpURL: receiver.pfpURL
  },
  lastMessage: chat.lastMessage.text,
  time:Math.floor((Date.now() - new Date(chat.lastMessage.createdAt).getTime())/(1000*60)) ,
};

// Broadcast chat list update
for (const [clientSocket, roomId] of clients.entries()) {
  if (roomId === chatId && clientSocket.readyState === WebSocket.OPEN) {
    clientSocket.send(JSON.stringify({
      type: 'chatListUpdate',
      payload: updatedChatItem
    }));
  }
}

      }
    } catch (err) {
      console.error(' Error handling message:', err);
      socket.send(JSON.stringify({ type: 'error', payload: 'Invalid message format' }));
    }
  });
  

   socket.on('close', () => {
    console.log('🔴 Client disconnected');
    clients.delete(socket);
   });
});

mongoose.connection.once('open',()=>{
    console.log('connected to mongoDB');
    server.listen(PORT,()=>console.log(`server running on port ${PORT}`));
});