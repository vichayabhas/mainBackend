import express from "express";
import { Group } from "../models/intreface";
import { getUser } from "../middleware/auth";
import { sendRes } from "./setup";
export async function peeBypass(req:express.Request,res:express.Response,next:express.NextFunction){
    const {studentId,group}:{studentId:string,group:Group}=req.body
    const user=await getUser(req)
    if(!user){
        sendRes(res,false)
        return
    }
    await user.updateOne({
        studentId,
        group,
        fridayActEn:true,
        role:'pee',
        mode:'pee'
    })
}