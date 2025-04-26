const express=require('express');
const router=express.Router();
const addPost=require('../post/controllers/addpost');
router.post('/',addPost.addNewPost);
module.exports=router;