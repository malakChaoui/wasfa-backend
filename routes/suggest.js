const express=require('express');
const router=express.Router();
const suggest=require('../controllers/suggestions');
const AccessVerify= require('../middleware/verifyJWT');
router.get('/',AccessVerify,suggest.getSuggestions);
module.exports=router;