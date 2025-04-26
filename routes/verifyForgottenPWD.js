const express=require('express');
const router=express.Router();
const verifyPWDCode=require('../controllers/verifyForgottenPWD');
router.post('/',verifyPWDCode.verifyForgottenOTP);
module.exports=router;