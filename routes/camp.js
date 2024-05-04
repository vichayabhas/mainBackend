const express = require('express');

const router = express.Router();

const {protect, modePee, peto}=require('../middleware/auth');
const { getWorkingItems, createWorkingItem, getWorkingItem, updateWorkingItem, deleteWorkingItem } = require('../controllers/camp');



router.route('/workingItem/').get(protect,modePee,getWorkingItems).post(protect,modePee,createWorkingItem);
router.route('/workingItem/:id').get(protect,modePee,getWorkingItem).put(protect,modePee,updateWorkingItem).delete(protect,modePee,peto,deleteWorkingItem)


module.exports=router;





