const express=require('express');
const router=express.Router();
const register=require('../controllers/registerControll');
router.post('/',register.registerNewUser);
module.exports=router;