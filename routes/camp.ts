import express from 'express';

const router = express.Router();

import { protect, modePee, peto } from '../middleware/auth';
import { getWorkingItems, createWorkingItem, getWorkingItem, updateWorkingItem, deleteWorkingItem } from '../controllers/camp';



router.route('/workingItem/').get(protect,modePee,getWorkingItems).post(protect,modePee,createWorkingItem);
router.route('/workingItem/:id').get(protect,modePee,getWorkingItem).put(protect,modePee,updateWorkingItem).delete(protect,modePee,peto,deleteWorkingItem)


export default router;





