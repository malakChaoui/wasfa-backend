const express=require('express');
const router=express.Router();
const getme=require('../controllers/getmeController');
const AccessVerify= require('../middleware/verifyJWT');
router.get('/',AccessVerify,getme.getme);
module.exports=router;