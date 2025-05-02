const express=require('express');
const router=express.Router();
const addPost=require('../post/controllers/addpost');
const AccessVerify= require('../middleware/verifyJWT');
router.post('/',AccessVerify,addPost.addNewPost);
module.exports=router;