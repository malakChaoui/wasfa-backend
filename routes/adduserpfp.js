const express=require('express');
const router=express.Router();
const addpfp=require('../controllers/addapfp');
router.post('/',addpfp.addpfpURL);
module.exports=router;