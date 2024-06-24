import express from "express";
import { addBaan, addCampName, addPart, addPartName, createBaanByGroup, createCamp, getAllRemainPartName, getCampNames, getPartNames, saveDeleteCamp, updateBaan, updateCamp, updatePart } from "../controllers/admin";
import { admin, pee, protect } from "../middleware/auth";

const router=express.Router()
router.get('/getCampNames/',getCampNames)
router.post('/createCamp/',protect,admin,createCamp)
router.post('/addCampName/params/:id',protect,admin,addCampName)
router.get('/getPartNames/',getPartNames)
router.post('/addPartName/params/:id',addPartName)
router.put('/updateCamp/params/:id',protect,updateCamp)
router.post('/addBaan/',protect,addBaan)
router.put('/updatePart/',protect,updatePart)
router.get('/getAllRemainPartName/params/:id',protect,pee,getAllRemainPartName)
router.post('/addPart/',protect,addPart)
router.post('/createBaanByGroup/params/:id',protect,createBaanByGroup)
router.put('/updateBaan/',protect,updateBaan)
router.delete('/saveDeleteCamp/params/:id',protect,saveDeleteCamp)
export default router/**import mongoose from "mongoose";
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