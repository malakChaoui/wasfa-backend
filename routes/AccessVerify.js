const express=require('express');
const router=express.Router();
const verifyAcc=require('../middleware/verifyJWT');
router.get('/',verifyAcc.verifyJwt);
module.exports=router;