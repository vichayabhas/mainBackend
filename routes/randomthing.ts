import express from "express";
import { pee, protect } from "../middleware/auth";
import { createBuilding, getAllBuilding, getPlaces } from "../controllers/randomThing";


const router=express.Router()
router.get('/getAllBuilding/',getAllBuilding)
router.post('/createBuilding/params/:id',protect,pee,createBuilding)
router.get('/getPlaces/params/:id',getPlaces)
export default router