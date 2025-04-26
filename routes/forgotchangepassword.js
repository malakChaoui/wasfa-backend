const express=require('express');
const router=express.Router();
const forgotchangPWD=require('../controllers/forgotpassword');
router.post('/',forgotchangPWD.forgotpassword);
module.exports=router;