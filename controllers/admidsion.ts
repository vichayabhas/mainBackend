import Camp from "../models/Camp";
import { sendRes, swop } from "./setup";
import express from "express";
import { getUser } from "../middleware/auth";
import mongoose from "mongoose";
import Part from "../models/Part";
import { changePart, changePartRaw, getImpotentPartIdBCRP } from "./camp";
export async function interview(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { members, campId } = req.body
    const i = await interviewRaw(members, campId)
    if(i==0){
        sendRes(res,false)
        return
    }
    res.status(200).json({count:i})
}
async function interviewRaw(members: mongoose.Types.ObjectId[], campId: mongoose.Types.ObjectId) {
    const camp = await Camp.findById(campId)
    if (!camp) {
        return 0
    }
    var i = 0
    while (i < members.length) {
        camp.nongInterviewIds.set(members[i].toString(), camp.nongPendingIds.get(members[i].toString()))
        camp.nongPendingIds.delete(members[i++].toString())
    }
    await camp.updateOne({
        nongPendingIds: camp.nongPendingIds,
        nongInterviewIds: camp.nongInterviewIds
    })
    return i
}
async function passRaw(members: mongoose.Types.ObjectId[], campId: mongoose.Types.ObjectId) {
    const camp = await Camp.findById(campId)
    if (!camp) {
        return 0
    }
    var i = 0
    while (i < members.length) {
        camp.nongPassIds.set(members[i].toString(), camp.nongInterviewIds.get(members[i].toString()))
        camp.nongInterviewIds.delete(members[i++].toString())
        if (camp.registerModel === 'noPaid') {
            //camp.nongPaidIds.push(members[i - 1])
        }
    }
    await camp.updateOne({
        nongPassIds: camp.nongPassIds,
        nongInterviewIds: camp.nongInterviewIds,
        //nongPaidIds:camp.nongPaidIds
    })
    return i
}
export async function paid(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user = await getUser(req)
    const camp = await Camp.findById(req.params.id)
    if (!camp || !user || !camp.nongPassIds.has(user._id.toString())) {
        sendRes(res, false)
        return
    }
    if (camp.registerModel === 'noPaid') {
        camp.nongPassIds.delete(user._id.toString())
        await camp.updateOne({
            nongSureIds: swop(null, user._id, camp.nongSureIds),
            nongPassIds: camp.nongPassIds
        })

    } else {
        await camp.updateOne({ nongPaidIds: swop(null, user._id, camp.nongPaidIds) })
    }
}
async function sureRaw(members: mongoose.Types.ObjectId[], campId: mongoose.Types.ObjectId) {
    const camp = await Camp.findById(campId)
    if (!camp) {
        return 0
    }
    var {
        nongPaidIds,
        nongSureIds
    } = camp
    var i = 0
    while (i < members.length) {
        if (!camp.nongPaidIds.includes(members[i])) {
            i++
            continue
        }
        nongPaidIds = swop(members[i], null, nongPaidIds)
        nongSureIds.push(members[i++])
    }
    await camp.updateOne({
        nongPaidIds,
        nongSureIds
    })
    return i
}
export async function pass(req: express.Request, res: express.Response, next: express.NextFunction){
    const {campId,members}=req.body
    const camp=await Camp.findById(campId)
    if(!camp){
        sendRes(res,false)
        return
    }
    if(camp.registerModel!=='all'){
        await interviewRaw(members,campId)
    }
    const i = await passRaw(members, campId)
    if(i==0){
        sendRes(res,false)
        return
    }
    res.status(200).json({count:i})
}
export async function kick(req: express.Request, res: express.Response, next: express.NextFunction){
    const {partId,member}=req.body
    const part=await Part.findById(partId)
    if(!part){
        sendRes(res,false)
        return
    }
    const camp=await Camp.findById(part.campId)
    if(!camp){
        sendRes(res,false)
        return
    }
    const im=await getImpotentPartIdBCRP(camp._id)
    if(!im.includes(partId)){
        sendRes(res,false)
        return
    }
    await changePartRaw([member],im[3])

}
