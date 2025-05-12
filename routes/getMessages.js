const express=require('express');
const router=express.Router();
const getmessages=require('../chat/controller/getMessages');
const AccessVerify= require('../middleware/verifyJWT');
router.get('/',AccessVerify,getmessages.getMessages);
module.exports=router;