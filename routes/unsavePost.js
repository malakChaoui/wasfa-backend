const express=require('express');
const router=express.Router();
const unsavePost=require('../post/controllers/unsavePost');
const AccessVerify= require('../middleware/verifyJWT');
router.post('/',AccessVerify,unsavePost.unsavePost);
module.exports=router;