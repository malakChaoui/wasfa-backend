const express=require('express');
const router=express.Router();
const getPostes=require('../post/controllers/getposts');
router.get('/',getPostes.getPosts);
module.exports=router;