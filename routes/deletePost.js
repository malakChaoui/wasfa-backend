const express=require('express');
const router=express.Router();
const deletePost=require('../post/controllers/delitepost');
const AccessVerify= require('../middleware/verifyJWT');
router.delete('/:id',AccessVerify,deletePost.deletePost);
module.exports=router;