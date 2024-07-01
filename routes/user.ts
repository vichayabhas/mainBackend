import express from 'express';
import { register, login, getMe, updateSize, updateMode, getShertManageByCampId, updateProfile, updateBottle, changeModeToPee, updateSleep, getHelthIsue, checkTel, getUsers, getShertmanage, updateTimeOffset, getTimeOffset, updateHelth, } from '../controllers/user';

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
router.get('/getUser/params/:id', getUsers)
router.get('/getShertmanage/params/:id', getShertmanage)
router.put('/updateTimeOffset/', protect, updateTimeOffset)
router.get('/getTimeOffset/params/:id', getTimeOffset)
router.put('/updateHelth/', protect, updateHelth)

export default router;