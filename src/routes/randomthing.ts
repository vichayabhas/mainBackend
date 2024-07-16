import express from "express";
import { isPass, pee, protect } from "../middleware/auth";
import { addLostAndFound, createBuilding, createPlace, getAllBuilding, getBuilding, getLostAndFounds, getPlace, getPlaces, getShowPlace } from "../controllers/randomThing";


const router = express.Router()
router.get('/getAllBuilding/', getAllBuilding)
router.post('/createBuilding/params/:id', protect, pee, createBuilding)
router.get('/getPlaces/params/:id', getPlaces)
router.get('/getPlace/params/:id', getPlace)
router.post('/createPlace/', protect, pee, createPlace)
router.get('/getBuilding/params/:id', getBuilding)
router.get('/getLostAndFounds/', protect, getLostAndFounds)
router.post('/addLostAndFound/', protect, addLostAndFound)
router.get('/getShowPlace/params/:id',getShowPlace)
export default router