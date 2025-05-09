const express=require('express');
const router=express.Router();
const getPostes=require('../post/controllers/getposts');
const AccessVerify= require('../middleware/verifyJWT');
router.get('/',AccessVerify,getPostes.getPosts);
module.exports=router;