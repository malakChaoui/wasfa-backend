const express=require('express');
const router=express.Router();
const refresh=require('../controllers/refreshTokenController');
router.post('/',refresh.handleRefreshToken);
module.exports=router;