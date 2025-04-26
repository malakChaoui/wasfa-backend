const express=require('express');
const router=express.Router();
const verifyCode=require('../controllers/verifyCode');
router.post('/',verifyCode.verifyOTP);
module.exports=router;