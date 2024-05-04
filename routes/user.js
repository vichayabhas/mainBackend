const express=require('express');
const {register, login,getMe, updateSize, updateMode}=require('../controllers/user');

const router =express.Router();

const {protect,  pee}=require('../middleware/auth');

router.post('/register',register);
router.post('/login',login);
router.get('/me',protect,getMe)
router.put('/updateProfile',protect,updateSize)
router.put('/updateMode',protect,pee,updateMode)
module.exports=router;