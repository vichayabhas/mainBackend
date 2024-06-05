import express from "express";
import { addCampName, addPartName, createCamp, getCampNames, getPartNames } from "../controllers/admin";
import { admin, protect } from "../middleware/auth";

const router=express.Router()
router.get('/getCampNames/',getCampNames)
router.post('/createCamp/',protect,admin,createCamp)
router.post('/addCampName/params/:id',protect,admin,addCampName)
router.get('/getPartNames/',getPartNames)
router.post('/addPartName/params/:id',addPartName)
export default router