import express from 'express';
import { register, login, getMe, updateSize, updateMode, getShertManageByCampId, updateProfile, updateBottle, changeModeToPee, } from '../controllers/user';

const router = express.Router();

import { protect, pee } from '../middleware/auth';
import { createCamp } from '../controllers/admin';

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe)
router.put('/updateSize/params/:id', protect, updateSize)
router.put('/updateMode/', protect, pee, updateMode)
//router.post('/camp/', createCamp)
router.get('/shertManagebyCampId/params/:id', getShertManageByCampId)
router.put('/updateProfile/', protect, updateProfile)
router.put('/updateBottle/', protect, updateBottle)
router.post('/changeModeToPee/params/:id',protect,pee,changeModeToPee)

export default router;