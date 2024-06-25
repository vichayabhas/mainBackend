import express from 'express';
import { register, login, getMe, updateSize, updateMode, getShertManageByCampId, updateProfile, updateBottle, changeModeToPee, updateSleep, getHelthIsue, checkTel, getUsers, getShertmanage, } from '../controllers/user';

const router = express.Router();

import { protect, pee, isPass } from '../middleware/auth';

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe)
router.put('/updateSize/params/:id', protect, updateSize)
router.put('/updateMode/', protect, pee, updateMode)
router.get('/shertManagebyCampId/params/:id', getShertManageByCampId)
router.put('/updateProfile/', protect, updateProfile)
router.put('/updateBottle/', protect, updateBottle)
router.post('/changeModeToPee/params/:id', protect, pee, changeModeToPee)
router.put('/updateSleep/', protect, updateSleep)
router.get('/getHelthIsue/params/:id', getHelthIsue)
router.get('/checkTel/params/:id', protect, checkTel)
router.get('/getUser/params/:id',isPass, getUsers)
router.get('/getShertmanage/params/:id',getShertmanage)

export default router;