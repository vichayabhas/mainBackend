import express from 'express';

const router = express.Router();

import { protect, modePee, peto, pee } from '../middleware/auth';
import { getWorkingItems, createWorkingItem, getWorkingItem, updateWorkingItem, deleteWorkingItem, getCamps, getCampName, getCamp, getNongCamp, getPeeCamp, getBaan, getPart, getPartName, nongRegister, staffRegister, getNongsFromBaanId, getPeesFromBaanId, getPeesFromPartId, getPetosFromPartId, getBaans } from '../controllers/camp';




router.route('/workingItem/').get(protect, modePee, getWorkingItems).post(protect, modePee, createWorkingItem);
router.route('/workingItem/:id').get(protect, modePee, getWorkingItem).put(protect, modePee, updateWorkingItem).delete(protect, modePee, peto, deleteWorkingItem)
router.get('/getCamps/', getCamps)
router.get('/getCampName/params/:id', getCampName)
router.get('/getCamp/params/:id', getCamp)
router.get('/nongCamp/params/:id', getNongCamp)
router.get('/peeCamp/params/:id', getPeeCamp)
router.get('/baan/params/:id', getBaan)
router.get('/part/params/:id', getPart)
router.get('/partName/params/:id', getPartName)
router.post('/nongRegisterCamp/', protect, nongRegister)
router.post('/staffRegisterCamp/params/:id', protect, pee, staffRegister)
router.get('/getNongsFromBaanId/params/:id', getNongsFromBaanId)
router.get('/getPeesFromBaanId/params/:id', getPeesFromBaanId)
router.get('/getPeesFromPartId/params/:id', getPeesFromPartId)
router.get('/getPetosFromPartId/params/:id', getPetosFromPartId)
router.get('/getBaans/params/:id',getBaans)
//(`${backendUrl}/camp/getBaans/params/${campId}`)
export default router;



//'getNongsFromBaanId' | 'getPeesFromBaanId' | 'getPeesFromPartId' | 'getPetosFromPartId'

