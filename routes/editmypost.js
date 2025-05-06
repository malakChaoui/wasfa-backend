const express=require('express');
const router=express.Router();
const editpost=require('../post/controllers/editpost');
const AccessVerify= require('../middleware/verifyJWT');
router.post('/',AccessVerify,editpost.editPost);
module.exports=router;