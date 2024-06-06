import express from "express";
import { addBaan, addCampName, addPartName, createCamp, getCampNames, getPartNames, updateCamp } from "../controllers/admin";
import { admin, protect } from "../middleware/auth";

const router=express.Router()
router.get('/getCampNames/',getCampNames)
router.post('/createCamp/',protect,admin,createCamp)
router.post('/addCampName/params/:id',protect,admin,addCampName)
router.get('/getPartNames/',getPartNames)
router.post('/addPartName/params/:id',addPartName)
router.put('/updateCamp/params/:id',protect,updateCamp)
router.post('/addBaan/',protect,addBaan)
export default router