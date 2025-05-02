const express=require('express');
const router=express.Router();
const suggest=require('../controllers/suggestions');
router.get('/',suggest.getSuggestions);
module.exports=router;