import express from 'express';
import { register, login, getMe, updateSize, updateMode } from '../controllers/user';

const router =express.Router();

import { protect, pee } from '../middleware/auth';

router.post('/register',register);
router.post('/login',login);
router.get('/me',protect,getMe)
router.put('/updateProfile',protect,updateSize)
router.put('/updateMode',protect,pee,updateMode)
export default router;