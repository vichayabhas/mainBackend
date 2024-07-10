import express from "express";
import { pee, protect } from "../middleware/auth";
import { createBuilding, createPlace, getAllBuilding, getBuilding, getLostAndFounds, getPlace, getPlaces } from "../controllers/randomThing";


const router = express.Router()
router.get('/getAllBuilding/', getAllBuilding)
router.post('/createBuilding/params/:id', protect, pee, createBuilding)
router.get('/getPlaces/params/:id', getPlaces)
router.get('/getPlace/params/:id', getPlace)
router.post('/createPlace/', protect, pee, createPlace)
router.get('/getBuilding/params/:id', getBuilding)
router.get('/getLostAndFounds/',protect,getLostAndFounds)
export default router