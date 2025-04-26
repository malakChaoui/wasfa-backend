const express=require('express');
const router=express.Router();
const login=require('../controllers/loginControll');
router.post('/',login.handlelogin);
module.exports=router;