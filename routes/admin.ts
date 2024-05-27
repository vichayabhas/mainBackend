import express from "express";
import { addCampName, createCamp, getCampNames } from "../controllers/admin";
import { admin, protect } from "../middleware/auth";

const router=express.Router()
router.get('/getCampNames/',getCampNames)
router.post('/createCamp/',protect,admin,createCamp)
router.post('/addCampName/params/:id',protect,admin,addCampName)
export default router