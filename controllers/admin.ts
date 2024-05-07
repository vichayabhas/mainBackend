import ActionPlan from "../models/ActionPlan"
import Baan from "../models/Baan"
import Camp from "../models/Camp"
import CampStyle from "../models/CampStyle"
import HelthIsue from "../models/HelthIsue"
import NameContainer from "../models/NameContainer"
import NongCamp from "../models/NongCamp"
import Part from "../models/Part"
import PeeCamp from "../models/PeeCamp"
import PetoCamp from "../models/PetoCamp"
import ShertManage from "../models/ShertManage"
import User from "../models/User"
import WorkItem from "../models/WorkItem"
import { swop } from "./setup"
import { NextFunction } from 'express'
import express from "express";
// exports.addBaan        authorize
// exports.addPart        authorize
// exports.updateBaan
// exports.createCamp
// exports.deleteCamp                       params id
export async function addBaan(req: express.Request, res: express.Response, next: NextFunction) {
    try{
        const { campId, name, fullName } = req.body
    const baan = await Baan.create({ campId, name, fullName })
    const nongCamp = await NongCamp.create({ campId, baanId: baan._id })
    baan.updateOne({ nongModelId: nongCamp._id })
    const camp = await Camp.findById(campId)
    if(!camp){
        return
    }
    camp.nongModelIds.push(nongCamp._id.toString())
    camp.partIds.forEach(async (partId) => {
        const part = await Part.findById(partId)
        const peeCamp = await PeeCamp.create({ campId, baanId: baan._id, partId })
        setDefalse(peeCamp._id)
        if(!part){
            return
        }
        part.peeModelIds.push(peeCamp._id.toString())
        baan.peeModelIds.push(peeCamp._id.toString())
        camp.peeModelIds.push(peeCamp._id.toString())
        baan.mapPeeCampIdByPartId.set(partId, peeCamp._id)
        part.mapPeeCampIdByBaanId.set(baan._id.toString(), peeCamp._id)
    })
    const campStyle = await CampStyle.create({ refId: baan._id, types: 'baan' })
    camp.baanIds.push(baan._id.toString())
    baan.updateOne({ styleId: campStyle._id })
    res.status(201).json({ success: true, data: baan })
    }catch{
        
    }
    
}
export async function addPart(req: express.Request, res: express.Response, next: NextFunction) {
    const { campId, nameId } = req.body
    const part = await Part.create({ campId, nameId })
    const camp = await Camp.findById(campId)
    const petoCamp = await PetoCamp.create({ campId, partId: part._id })
    if(!camp){
        return
    }
    camp.petoModelIds.push(petoCamp._id.toString())
    camp.partIds.push(part._id.toString())
    part.updateOne({ petoModelId: petoCamp._id })
    camp.baanIds.forEach(async (baanId) => {
        const baan = await Baan.findById(baanId)
        if(!baan){
            return
        }
        const peeCamp = await PeeCamp.create({ baanId, campId, partId: part._id })
        baan.peeModelIds.push(peeCamp._id.toString())
        camp.peeModelIds.push(peeCamp._id.toString())
        part.peeModelIds.push(peeCamp._id.toString())
        setDefalse(peeCamp._id)
        baan.mapPeeCampIdByPartId.set(part._id.toString(), peeCamp._id)
        part.mapPeeCampIdByBaanId.set(baanId, peeCamp._id)
    })
    res.status(201).json({ success: true, data: part })
}
export async function updateBaan(req: express.Request, res: express.Response, next: NextFunction) {
    try {
        const { name, fullName, baanId, link } = req.body
        const baan = await Baan.findByIdAndUpdate(baanId, { name, fullName, link })
        res.status(200).json({
            success: true,
            data: baan
        })
    } catch (err) {
        res.status(400).json({ success: false })
    }
}
async function setDefalse(peeCampId) {
    const name = ['arrayString1', 'arrayString2', 'arrayString3', 'arrayString4', 'arrayString5', 'map1', 'map2', 'map3', 'map4', 'map5']
    const peeCamp = await PeeCamp.findById(peeCampId)
    peeCamp?.mapArrayStringNumberByName.set(name[0], peeCamp.arrayString1)
    peeCamp?.mapArrayStringNumberByName.set(name[1], peeCamp.arrayString2)
    peeCamp?.mapArrayStringNumberByName.set(name[2], peeCamp.arrayString3)
    peeCamp?.mapArrayStringNumberByName.set(name[3], peeCamp.arrayString4)
    peeCamp?.mapArrayStringNumberByName.set(name[4], peeCamp.arrayString5)
    peeCamp?.mapMapNumberByName.set(name[5], peeCamp.map1)
    peeCamp?.mapMapNumberByName.set(name[6], peeCamp.map2)
    peeCamp?.mapMapNumberByName.set(name[7], peeCamp.map3)
    peeCamp?.mapMapNumberByName.set(name[8], peeCamp.map4)
    peeCamp?.mapMapNumberByName.set(name[9], peeCamp.map5)
}
export async function createCamp(req: express.Request, res: express.Response, next: NextFunction) {
    try {
        const { nameId, round, dateStart, dateEnd, boardIds } = req.body
        const camp = await Camp.create({ nameId, round, dateStart, dateEnd, boardIds })
        const campStyle = await CampStyle.create({ refId: camp._id, types: 'camp' })
        camp.updateOne({ campStyleId: campStyle._id })
        boardIds.forEach(async (boardId:string) => {
            const user = await User.findById(boardId)
            user?.authorizeIds.push(camp._id.toString())
        })
        const nameContainer = await NameContainer.findById(nameId)
        nameContainer?.campIds.push(camp._id.toString())
        res.status(201).json({ success: true, data: camp })
    } catch (err) {
        res.status(400).json({ success: false })
    }
}
export async function deleteCamp(req: express.Request, res: express.Response, next: NextFunction) {
    try {
        const campId = req.params.id
        const camp = await Camp.findById(campId)
        if(!camp){
            return res.status(400).json({success:false})
        }
        camp.peeShertManageIds.forEach(async (peeShertManageId) => {
            await ShertManage.findByIdAndDelete(peeShertManageId)
        })
        camp.nongShertManageIds.forEach(async (peeShertManageId) => {
            await ShertManage.findByIdAndDelete(peeShertManageId)
        })
        camp.petoShertManageIds.forEach(async (peeShertManageId) => {
            await ShertManage.findByIdAndDelete(peeShertManageId)
        })
        camp.boardIds.forEach(async (boardId:string) => {
            const user = await User.findById(boardId)
            const news = swop(camp._id.toString(), null, user?.authorizeIds as string[])
            user?.updateOne({ authorizeIds: news })
        })
        camp.nongModelIds.forEach(async (nongModelId) => {
            const nongCamp = await NongCamp.findById(nongModelId)
            nongCamp?.nongIds.forEach(async (userId) => {
                const user = await User.findById(userId)
                const nongCampIds = swop(nongCamp._id.toString(), null, user?.nongCampIds as string[])
                user?.updateOne({ nongCampIds })
            })
            nongCamp?.deleteOne()
        })
        camp.peeModelIds.forEach(async (nongModelId) => {
            const nongCamp = await PeeCamp.findById(nongModelId)
            nongCamp?.peeIds.forEach(async (userId) => {
                const user = await User.findById(userId)
                const peeCampIds = swop(nongCamp._id.toString(), null, user?.peeCampIds as string[])
                user?.updateOne({ peeCampIds })
            })
            nongCamp?.deleteOne()
        })
        camp.petoModelIds.forEach(async (nongModelId) => {
            const nongCamp = await PetoCamp.findById(nongModelId)
            nongCamp?.petoIds.forEach(async (userId) => {
                const user = await User.findById(userId)
                const petoCampIds = swop(nongCamp._id.toString(), null, user?.petoCampIds as string[])
                user?.updateOne({ petoCampIds })
            })
            nongCamp?.deleteOne()
        })
        camp.baanIds.forEach(async (baanId) => {
            const baan = await Baan.findById(baanId)
            await CampStyle.findByIdAndDelete(baan?.styleId)
            baan?.deleteOne()
        })
        await CampStyle.findByIdAndDelete(camp.campStyleId)
        camp.nongHelthIsueIds.forEach(async (helthueId) => {
            const helthIsue = await HelthIsue.findById(helthueId)
            const user = await User.findById(helthIsue?.userId)
            if (user?.helthIsueId.localeCompare(helthueId)) {
                helthIsue?.deleteOne()
            }
        })
        camp.peeHelthIsueIds.forEach(async (helthueId) => {
            const helthIsue = await HelthIsue.findById(helthueId)
            const user = await User.findById(helthIsue?.userId)
            if (!user?.helthIsueId.localeCompare(helthueId)) {
                helthIsue?.deleteOne()
            }
        })
        camp.petoHelthIsueIds.forEach(async (helthueId) => {
            const helthIsue = await HelthIsue.findById(helthueId)
            const user = await User.findById(helthIsue?.userId)
            if (!user?.helthIsueId.localeCompare(helthueId)) {
                helthIsue?.deleteOne()
            }
        })
        camp.partIds.forEach(async (partId) => {
            await Part.findByIdAndDelete(partId)
        })
        camp.workItemIds.forEach(async (workItemId) => {
            await WorkItem.findByIdAndDelete(workItemId)
        })
        camp.actionPlanIds.forEach(async (actionPlanId) => {
            await ActionPlan.findByIdAndDelete(actionPlanId)
        })
        const name=await NameContainer.findById(camp.nameId)
        const campIds=swop(campId,null,name?.campIds as string[])
        name?.updateOne({campIds})
        camp.deleteOne()
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(400).json({ success: false })
    }
}