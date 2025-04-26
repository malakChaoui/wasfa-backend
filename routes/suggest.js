const express=require('express');
const router=express.Router();
const suggest=require('../controllers/suggestions');
router.post('/',suggest.getSuggestions);
module.exports=router;