const express=require('express');
const router=express.Router();
const getsavedPosts=require('../post/controllers/getsavedposts');
const AccessVerify= require('../middleware/verifyJWT');
router.get('/',AccessVerify,getsavedPosts.getSavedPosts);
module.exports=router;