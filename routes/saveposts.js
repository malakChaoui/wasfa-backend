const express=require('express');
const router=express.Router();
const savePost=require('../post/controllers/savePoste');
const AccessVerify= require('../middleware/verifyJWT');
router.post('/',AccessVerify,savePost.savePost);
module.exports=router;