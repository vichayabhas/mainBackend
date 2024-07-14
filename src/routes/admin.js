"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var admin_1 = require("../controllers/admin");
var auth_1 = require("../middleware/auth");
var router = express_1.default.Router();
router.get('/getCampNames/', admin_1.getCampNames);
router.post('/createCamp/', auth_1.protect, auth_1.admin, admin_1.createCamp);
router.post('/addCampName/params/:id', auth_1.protect, auth_1.admin, admin_1.addCampName);
router.get('/getPartNames/', admin_1.getPartNames);
router.post('/addPartName/params/:id', admin_1.addPartName);
router.put('/updateCamp/params/:id', auth_1.protect, admin_1.updateCamp);
router.post('/addBaan/', auth_1.protect, admin_1.addBaan);
router.put('/updatePart/', auth_1.protect, admin_1.updatePart);
router.get('/getAllRemainPartName/params/:id', auth_1.protect, auth_1.pee, admin_1.getAllRemainPartName);
router.post('/addPart/', auth_1.protect, admin_1.addPart);
router.post('/createBaanByGroup/params/:id', auth_1.protect, admin_1.createBaanByGroup);
router.put('/updateBaan/', auth_1.protect, admin_1.updateBaan);
router.delete('/saveDeleteCamp/params/:id', auth_1.protect, admin_1.saveDeleteCamp);
router.post('/afterVisnuToPee/', auth_1.protect, auth_1.admin, admin_1.afterVisnuToPee);
router.post('/peeToPeto/', auth_1.protect, auth_1.admin, admin_1.peeToPeto);
exports.default = router; /**import mongoose from "mongoose";
import { UpdateCamp } from "../../../interface";
import { backendUrl } from "@/components/setup";

export default async function updateCamp(update:UpdateCamp,id:mongoose.Types.ObjectId,token:string){
    const response = await fetch(`${backendUrl}/updateCamp/params/${id}`, {
        method: "PUT",cache: "no-store",
        headers: {
          "Content-Type": "application/json",
    
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(
          update
    
          //{email,gender,haveBottle,lastname,name,nickname,password,shertSize,tel}
        ),
      });
      return await response.json();
} */
