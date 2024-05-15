import express from 'express';

const router = express.Router();

import { protect, modePee, peto } from '../middleware/auth';
import { getWorkingItems, createWorkingItem, getWorkingItem, updateWorkingItem, deleteWorkingItem, getCamps, getCampName, getCamp, getNongCamp, getPeeCamp, getBaan, getPart, getPartName } from '../controllers/camp';




router.route('/workingItem/').get(protect,modePee,getWorkingItems).post(protect,modePee,createWorkingItem);
router.route('/workingItem/:id').get(protect,modePee,getWorkingItem).put(protect,modePee,updateWorkingItem).delete(protect,modePee,peto,deleteWorkingItem)
router.get('/getCamp/',getCamps)
router.get('/getCampName/params/:id',getCampName)
router.get('/getCamp/params/:id',getCamp)
router.get('/nongCamp/params/:id',getNongCamp)
router.get('/peeCamp/params/:id',getPeeCamp)
router.get('/baan/params/:id',getBaan)
router.get('/part/params/:id',getPart)
router.get('/partName/params/:id',getPartName)

export default router;





