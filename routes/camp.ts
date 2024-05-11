import express from 'express';

const router = express.Router();

import { protect, modePee, peto } from '../middleware/auth';
import { getWorkingItems, createWorkingItem, getWorkingItem, updateWorkingItem, deleteWorkingItem } from '../controllers/camp';
import { startSize } from '../controllers/setup';



router.route('/workingItem/').get(protect,modePee,getWorkingItems).post(protect,modePee,createWorkingItem);
router.route('/workingItem/:id').get(protect,modePee,getWorkingItem).put(protect,modePee,updateWorkingItem).delete(protect,modePee,peto,deleteWorkingItem)
router.get('/mock/',(req:express.Request,res:express.Response,next:express.NextFunction)=>{
    const nongShertSize=startSize
    nongShertSize.set('S',7)
    nongShertSize.set('3XL',2)
    nongShertSize.set('L',85)
    nongShertSize.set('M',32)
    nongShertSize.set('XL',51)
    nongShertSize.set('XXL',35)
    res.status(200).json({nongShertSize})

})

export default router;





