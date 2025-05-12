const express=require('express');
const router=express.Router();
const getChatList=require('../chat/controller/listChats');
const AccessVerify= require('../middleware/verifyJWT');
router.get('/',AccessVerify,getChatList.getChatList);
module.exports=router;