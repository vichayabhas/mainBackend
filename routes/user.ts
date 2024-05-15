import express from 'express';
import { register, login, getMe, updateSize, updateMode } from '../controllers/user';

const router =express.Router();

import { protect, pee } from '../middleware/auth';
import { createCamp } from '../controllers/admin';

router.post('/register',register);
router.post('/login',login);
router.get('/me',protect,getMe)
router.put('/updateProfile',protect,updateSize)
router.put('/updateMode',protect,pee,updateMode)
router.post('/camp',createCamp)
export default router;