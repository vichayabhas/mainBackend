"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var auth_1 = require("../middleware/auth");
var randomThing_1 = require("../controllers/randomThing");
var router = express_1.default.Router();
router.get('/getAllBuilding/', randomThing_1.getAllBuilding);
router.post('/createBuilding/params/:id', auth_1.protect, auth_1.pee, randomThing_1.createBuilding);
router.get('/getPlaces/params/:id', randomThing_1.getPlaces);
router.get('/getPlace/params/:id', randomThing_1.getPlace);
router.post('/createPlace/', auth_1.protect, auth_1.pee, randomThing_1.createPlace);
router.get('/getBuilding/params/:id', randomThing_1.getBuilding);
router.get('/getLostAndFounds/', auth_1.protect, randomThing_1.getLostAndFounds);
router.post('/addLostAndFound/', auth_1.protect, randomThing_1.addLostAndFound);
exports.default = router;
