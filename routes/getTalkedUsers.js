const express=require('express');
const router=express.Router();
const getTalkedUsers=require('../chat/controller/getTalkedUsers');
const AccessVerify= require('../middleware/verifyJWT');
router.get('/',AccessVerify,getTalkedUsers.getTalkedUsers);
module.exports=router;