import express from 'express';

const router = express.Router();

import { protect, pee, isPass } from '../middleware/auth';
import { getCamps, getCampName, getCamp, getNongCamp, getPeeCamp, getBaan, getPart, getPartName, nongRegister, staffRegister, getNongsFromBaanId, getPeesFromBaanId, getPeesFromPartId, getPetosFromPartId, getBaans, getActionPlans, getActionPlanByPartId, createActionPlan, getActionPlan, updateActionPlan, deleteActionPlan, createWorkingItem, getWorkingItems, getWorkingItemByPartId, getWorkingItem, updateWorkingItem, deleteWorkingItem, getPetoCamp } from '../controllers/camp';




router.get('/getCamps/', getCamps)
router.get('/getCampName/params/:id', getCampName)
router.get('/getCamp/params/:id', getCamp)
router.get('/nongCamp/params/:id', getNongCamp)
router.get('/peeCamp/params/:id', getPeeCamp)
router.get('/PetoCamp/params/:id',getPetoCamp)
router.get('/baan/params/:id', getBaan)
router.get('/part/params/:id', getPart)
router.get('/partName/params/:id', getPartName)
router.post('/nongRegisterCamp/', protect, nongRegister)
router.post('/staffRegisterCamp/params/:id', protect, pee, staffRegister)
router.get('/getNongsFromBaanId/params/:id', getNongsFromBaanId)
router.get('/getPeesFromBaanId/params/:id', getPeesFromBaanId)
router.get('/getPeesFromPartId/params/:id', getPeesFromPartId)
router.get('/getPetosFromPartId/params/:id', getPetosFromPartId)
router.get('/getBaans/params/:id', getBaans)
router.get('/getActionPlans/', protect, pee, getActionPlans)
router.get('/getActionPlanByPartId/params/:id', protect, pee, getActionPlanByPartId)
router.post('/createActionPlan/', protect, pee, createActionPlan)
router.get('/getActionPlan/params/:id', protect, pee, getActionPlan)
router.put('/updateActionPlan/params/:id', protect, pee, updateActionPlan)
router.delete('/deleteActionPlan/params/:id', protect, pee, deleteActionPlan)
router.post('/createWorkingItem/', protect, pee, createWorkingItem)
router.get('/getWorkingItems/', protect, pee, getWorkingItems)
router.get('/getWorkingItemByPartId/params/:id', protect, pee, getWorkingItemByPartId)
router.get('/getWorkingItem/params/:id', protect, pee, getWorkingItem)
router.put('/updateWorkingItem/params/:id', protect, pee, updateWorkingItem)
router.delete('/deleteWorkingItem/params/:id',protect,pee,deleteWorkingItem)
export default router;



//'getNongsFromBaanId' | 'getPeesFromBaanId' | 'getPeesFromPartId' | 'getPetosFromPartId'

