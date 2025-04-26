const express=require('express');
const router=express.Router();
const getPostes=require('../post/controllers/getposts');
router.post('/',getPostes.getPosts);
module.exports=router;