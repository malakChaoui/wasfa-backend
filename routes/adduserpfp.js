const express=require('express');
const router=express.Router();
const addpfp=require('../controllers/addapfp');
const AccessVerify= require('../middleware/verifyJWT');
router.post('/',AccessVerify,addpfp.addpfpURL);
module.exports=router;