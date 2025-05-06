const express=require('express');
const router=express.Router();
const getmyposts=require('../post/controllers/getmyposts');
const AccessVerify= require('../middleware/verifyJWT');
router.get('/',AccessVerify,getmyposts.getMyPosts);
module.exports=router;