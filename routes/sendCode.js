const express=require('express');
const router=express.Router();
const sendCode=require('../controllers/generateCode');
router.post('/',sendCode.sendVerificationCode);
module.exports=router;