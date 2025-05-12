const express = require('express');
const router = express.Router();
const chatController = require('../chat/controller/chatController');
const AccessVerify= require('../middleware/verifyJWT');

// Create or get a 1-to-1 chat
router.post('/', AccessVerify, chatController.getOrCreateChat);

module.exports = router;
