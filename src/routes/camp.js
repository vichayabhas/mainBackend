"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var auth_1 = require("../middleware/auth");
var camp_1 = require("../controllers/camp");
var admidsion_1 = require("../controllers/admidsion");
router.get('/getCamps/', camp_1.getCamps);
router.get('/getCampName/params/:id', camp_1.getCampName);
router.get('/getCamp/params/:id', camp_1.getCamp);
router.get('/nongCamp/params/:id', camp_1.getNongCamp);
router.get('/peeCamp/params/:id', camp_1.getPeeCamp);
router.get('/PetoCamp/params/:id', camp_1.getPetoCamp);
router.get('/baan/params/:id', camp_1.getBaan);
router.get('/part/params/:id', camp_1.getPart);
router.get('/partName/params/:id', camp_1.getPartName);
router.post('/nongRegisterCamp/', auth_1.protect, camp_1.nongRegister);
router.post('/staffRegisterCamp/params/:id', auth_1.protect, auth_1.pee, camp_1.staffRegister);
router.get('/getNongsFromBaanId/params/:id', camp_1.getNongsFromBaanId);
router.get('/getPeesFromBaanId/params/:id', camp_1.getPeesFromBaanId);
router.get('/getPeesFromPartId/params/:id', camp_1.getPeesFromPartId);
router.get('/getPetosFromPartId/params/:id', camp_1.getPetosFromPartId);
router.get('/getBaans/params/:id', camp_1.getBaans);
router.get('/getActionPlans/', auth_1.protect, auth_1.pee, camp_1.getActionPlans);
router.get('/getActionPlanByPartId/params/:id', auth_1.protect, auth_1.pee, camp_1.getActionPlanByPartId);
router.post('/createActionPlan/', auth_1.protect, auth_1.pee, camp_1.createActionPlan);
router.get('/getActionPlan/params/:id', auth_1.protect, auth_1.pee, camp_1.getActionPlan);
router.put('/updateActionPlan/params/:id', auth_1.protect, auth_1.pee, camp_1.updateActionPlan);
router.delete('/deleteActionPlan/params/:id', auth_1.protect, auth_1.pee, camp_1.deleteActionPlan);
router.post('/createWorkingItem/', auth_1.protect, auth_1.pee, camp_1.createWorkingItem);
router.get('/getWorkingItems/', auth_1.protect, auth_1.pee, camp_1.getWorkingItems);
router.get('/getWorkingItemByPartId/params/:id', auth_1.protect, auth_1.pee, camp_1.getWorkingItemByPartId);
router.get('/getWorkingItem/params/:id', auth_1.protect, auth_1.pee, camp_1.getWorkingItem);
router.put('/updateWorkingItem/params/:id', auth_1.protect, auth_1.pee, camp_1.updateWorkingItem);
router.delete('/deleteWorkingItem/params/:id', auth_1.protect, auth_1.pee, camp_1.deleteWorkingItem);
router.get('/getShowRegisters/params/:id', auth_1.protect, auth_1.pee, camp_1.getShowRegisters);
router.post('/interview/', auth_1.protect, auth_1.pee, admidsion_1.interview);
router.post('/pass/', auth_1.protect, auth_1.pee, admidsion_1.pass);
router.post('/sure/', auth_1.protect, auth_1.pee, admidsion_1.sure);
router.post('/paid/params/:id', auth_1.protect, admidsion_1.paid);
router.post('/add/nong/', auth_1.protect, auth_1.pee, camp_1.addNong);
router.post('/add/pee/', auth_1.protect, auth_1.pee, camp_1.addPee);
router.post('/kick/pee/', auth_1.protect, auth_1.pee, admidsion_1.kickPee);
router.post('/kick/nong/', auth_1.protect, auth_1.pee, admidsion_1.kickNong);
router.post('/changeBaan/', auth_1.protect, auth_1.pee, camp_1.changeBaan);
router.post('/changePart/', auth_1.protect, auth_1.pee, camp_1.changePart);
router.get('/getAllUserCamp/', auth_1.protect, camp_1.getAllUserCamp);
exports.default = router;
//'getNongsFromBaanId' | 'getPeesFromBaanId' | 'getPeesFromPartId' | 'getPetosFromPartId'