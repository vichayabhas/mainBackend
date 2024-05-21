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
import { InterBaanBack, InterCampBack, InterPartBack, InterShertManage, UpdateCamp } from "../models/intreface"
import { calculate, conBaanBackToFront, conCampBackToFront, conPartBackToFront, sendRes, swop } from "./setup"
import express from "express";
import Song from "../models/Song"
import PartNameContainer from '../models/PartNameContainer'
import Place from "../models/Place"
import { getUser } from "../middleware/auth"
import Building from "../models/Building"
import LostAndFound from "../models/LostAndFound"
import { addPetoRaw } from "./camp"
// export async function addBaan
// export async function addPart
// export async function updateBaan
// export async function createCamp
// export async function forceDeleteCamp
// export async function saveDeleteCamp
// export async function addCampName
// export async function saveDeleteCampName
// export async function forceDeleteCampName
// export async function forceDeleteBaan
// export async function saveDeleteBaan
// export async function saveDeletePart
// export async function forceDeletePart
// export async function addPartName
// export async function saveDeletePartName
// export async function forceDeletePartName
// export async function addAdmin
// export async function getAllAdmin
// export async function downRole
// export async function addMoreBoard
// export async function removeBoard
// export async function createPlace
// export async function saveDeletePlace
// export async function saveDeleteBuilding
export async function addBaan(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user = await getUser(req)
    const { campId, name, fullName } = req.body
    const camp = await Camp.findById(campId)
    if (user?.role != 'admin' && !user?.authorizeIds.includes(camp?.id)) {
        return res.status(403).json({ success: false })
    }
    const baan = await Baan.create({ campId, name, fullName })
    const nongCamp = await NongCamp.create({ campId, baanId: baan._id })
    camp?.partIds.forEach(async (partId) => {
        const part = await Part.findById(partId)
        const peeCamp = await PeeCamp.create({ campId, baanId: baan.id, partId })
        setDefalse(peeCamp.id)
        baan.peeModelIds.push(peeCamp.id)
        await part?.updateOne({ peeModelIds: swop(null, peeCamp.id, part.peeModelIds) })
        camp.peeModelIds.push(peeCamp.id)
        baan.mapPeeCampIdByPartId.set(partId, peeCamp.id)
        part?.mapPeeCampIdByBaanId.set(baan.id, peeCamp.id)
        await part?.updateOne({ mapPeeCampIdByBaanId: part.mapPeeCampIdByBaanId })
    })
    await camp?.updateOne({ nongModelIds: swop(null, nongCamp.id, camp.nongModelIds), baanIds: swop(null, baan.id, camp.baanIds), peeModelIds: camp.peeModelIds })
    const campStyle = await CampStyle.create({ refId: baan._id, types: 'baan' })
    await baan.updateOne({ styleId: campStyle.id, mapPeeCampIdByPartId: baan.mapPeeCampIdByPartId, nongModelId: nongCamp.id, peeModelIds: baan.peeModelIds })
    res.status(201).json(conBaanBackToFront(baan as InterBaanBack))
}
export async function addPart(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { campId, nameId } = req.body
    const camp = await Camp.findById(campId)
    const user = await getUser(req)
    if (user?.role != 'admin' && !user?.authorizeIds.includes(camp?.id)) {
        return res.status(403).json({ success: false })
    }
    const part = await Part.create({ campId, nameId })
    const petoCamp = await PetoCamp.create({ campId, partId: part.id })
    camp?.baanIds.forEach(async (baanId) => {
        const baan = await Baan.findById(baanId)
        const peeCamp = await PeeCamp.create({ baanId, campId, partId: part._id })
        await baan?.updateOne({ peeModelIds: swop(null, peeCamp.id, baan.peeModelIds) })
        camp.peeModelIds.push(peeCamp.id)
        part.peeModelIds.push(peeCamp.id)
        setDefalse(peeCamp._id.toString())
        baan?.mapPeeCampIdByPartId.set(part._id.toString(), peeCamp._id)
        part.mapPeeCampIdByBaanId.set(baanId, peeCamp._id)
        await baan?.updateOne({ mapPeeCampIdByPartId: baan.mapPeeCampIdByPartId })
    })
    await camp?.updateOne({ partIds: swop(null, part.id, camp.partIds), petoModelIds: swop(null, petoCamp.id, camp.petoModelIds), peeModelIds: camp.peeModelIds })
    await part.updateOne({ petoModelId: petoCamp.id, mapPeeCampIdByBaanId: part.mapPeeCampIdByBaanId, peeModelIds: part.peeModelIds })
    res.status(201).json(conPartBackToFront(part as InterPartBack))
}
export async function updateBaan(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        var { name, fullName, baanId, link, girlSleepPlaceId, boySleepPlaceId, nomalPlaceId } = req.body
        const baan = await Baan.findById(baanId)
        const user = await getUser(req)
        if (user?.role != 'admin' && !user?.authorizeIds.includes(baan?.campId as string)) {
            return res.status(401).json({ success: false })
        }
        var boyNewP = await Place.findById(boySleepPlaceId)
        var girlNewP = await Place.findById(girlSleepPlaceId)
        var normalNewP = await Place.findById(nomalPlaceId)
        const boyOldP = await Place.findById(baan?.boySleepPlaceId)
        const girlOldP = await Place.findById(baan?.girlSleepPlaceId)
        const normalOldP = await Place.findById(baan?.nomalPlaceId)
        if (!boyNewP) {
            boyNewP = boyOldP
        }
        if (!girlNewP) {
            girlNewP = girlOldP
        }
        if (!normalNewP) {
            normalNewP = normalOldP
        }
        if (!name) {
            name = baan?.name
        }
        if (!fullName) {
            fullName = baan?.fullName
        }
        if (!link) {
            link = baan?.link
        }
        const boyNewB = await Building.findById(boyNewP?.buildingId)
        const boyOldB = await Building.findById(boyOldP?.buildingId)
        const girlNewB = await Building.findById(girlNewP?.buildingId)
        const girlOldB = await Building.findById(girlOldP?.buildingId)
        const normalNewB = await Building.findById(normalNewP?.buildingId)
        const normalOldB = await Building.findById(normalOldP?.buildingId)
        await boyNewP?.updateOne({ boySleepBaanIds: swop(null, baan?.id, boyNewP.boySleepBaanIds) })
        await girlNewP?.updateOne({ girlSleepBaanIds: swop(null, baan?.id, girlNewP.girlSleepBaanIds) })
        await normalNewP?.updateOne({ normalBaanIds: swop(null, baan?.id, normalNewP.normalBaanIds) })
        await boyOldP?.updateOne({ boySleepBaanIds: swop(baan?.id, null, boyOldP.boySleepBaanIds) })
        await girlOldP?.updateOne({ girlSleepBaanIds: swop(baan?.id, null, girlOldP.girlSleepBaanIds) })
        await normalOldP?.updateOne({ normalBaanIds: swop(baan?.id, null, normalOldP.normalBaanIds) })
        await boyNewB?.updateOne({ boySleepBaanIds: swop(null, baan?.id, boyNewB.boySleepBaanIds) })
        await girlNewB?.updateOne({ girlSleepBaanIds: swop(null, baan?.id, girlNewB.girlSleepBaanIds) })
        await normalNewB?.updateOne({ normalBaanIds: swop(null, baan?.id, normalNewB.normalBaanIds) })
        await boyOldB?.updateOne({ boySleepBaanIds: swop(baan?.id, null, boyOldB.boySleepBaanIds) })
        await girlOldB?.updateOne({ girlSleepBaanIds: swop(baan?.id, null, girlOldB.girlSleepBaanIds) })
        await normalOldB?.updateOne({ normalBaanIds: swop(baan?.id, null, normalOldB.normalBaanIds) })
        await baan?.updateOne({ name, fullName, link, girlSleepPlaceId: girlNewP?.id, boySleepPlaceId: boyNewP?.id, nomalPlaceId: normalNewP?.id })
        res.status(200).json(conBaanBackToFront(baan as InterBaanBack))
    } catch (err) {
        res.status(400).json({ success: false })
    }
}
export async function updatePart(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const { placeId, partId } = req.body
        const baan = await Part.findById(partId)
        const user = await getUser(req)
        if (user?.role != 'admin' && !user?.authorizeIds.includes(baan?.campId as string)) {
            return res.status(401).json({ success: false })
        }
        await baan?.updateOne({ placeId })
        res.status(200).json(conPartBackToFront(baan as InterPartBack))
    } catch (err) {
        res.status(400).json({ success: false })
    }
}
async function setDefalse(peeCampId: string) {
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
    await peeCamp?.updateOne({ mapMapNumberByName: peeCamp.mapMapNumberByName, mapArrayStringNumberByName: peeCamp.mapArrayStringNumberByName })
}
export async function createCamp(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const { nameId, round, dateStart, dateEnd, boardIds, registerSheetLink, memberStructre } = req.body
        const camp = await Camp.create({ nameId, round, dateStart, dateEnd, boardIds, registerSheetLink, memberStructre })
        const campStyle = await CampStyle.create({ refId: camp._id, types: 'camp' })
        await camp.updateOne({ campStyleId: campStyle.id })
        const nameContainer = await NameContainer.findById(nameId)
        await nameContainer?.updateOne({ campIds: swop(null, camp.id, nameContainer.campIds) })
        var partNameContainer = await PartNameContainer.findOne({ name: 'board' })
        if (!partNameContainer) {
            partNameContainer = await PartNameContainer.create({ name: 'board' })
        }
        const part = await Part.create({ nameId: partNameContainer.id, campId: camp.id })
        await partNameContainer.updateOne({
            campIds: swop(null, camp.id, partNameContainer.campIds),
            partIds: swop(null, part.id, partNameContainer.partIds)
        })
        const petoCamp = await PetoCamp.create({ partId: part.id, campId: camp.id })
        await camp.updateOne({
            partIds: [part.id],
            petoModelIds: [petoCamp.id],
        })
        await part.updateOne({ petoModelId: petoCamp.id })
        boardIds.forEach(async (boardId: string) => {
            const user = await User.findById(boardId)
            await user?.updateOne({ authorizeIds: swop(null, camp.id, user.authorizeIds) })
        })
        addPetoRaw(boardIds, part.id)
        res.status(201).json(conCampBackToFront(camp as InterCampBack))
    } catch (err) {
        res.status(400).json({ success: false })
    }
}
export async function forceDeleteCamp(req: express.Request, res: express.Response, next: express.NextFunction) {
    const campId = req.params.id
    await forceDeleteCampRaw(campId, res)
}
async function forceDeleteCampRaw(campId: string, res: express.Response | null) {
    try {
        const camp = await Camp.findById(campId)
        if (!camp) {
            return res?.status(400).json({ success: false })
        }
        await CampStyle.findByIdAndDelete(camp.campStyleId)
        camp.peeShertManageIds.forEach(async (peeShertManageId) => {
            await ShertManage.findByIdAndDelete(peeShertManageId)
        })
        camp.nongShertManageIds.forEach(async (peeShertManageId) => {
            await ShertManage.findByIdAndDelete(peeShertManageId)
        })
        camp.petoShertManageIds.forEach(async (peeShertManageId) => {
            await ShertManage.findByIdAndDelete(peeShertManageId)
        })
        camp.boardIds.forEach(async (boardId: string) => {
            const user = await User.findById(boardId)
            const news = swop(camp._id.toString(), null, user?.authorizeIds as string[])
            await user?.updateOne({ authorizeIds: news })
        })
        camp.nongModelIds.forEach(async (nongModelId) => {
            const nongCamp = await NongCamp.findById(nongModelId)
            nongCamp?.nongIds.forEach(async (userId) => {
                const user = await User.findById(userId)
                const nongCampIds = swop(nongCamp._id.toString(), null, user?.nongCampIds as string[])
                await user?.updateOne({ nongCampIds })
            })
            await nongCamp?.deleteOne()
        })
        camp.peeModelIds.forEach(async (nongModelId) => {
            const nongCamp = await PeeCamp.findById(nongModelId)
            nongCamp?.peeIds.forEach(async (userId) => {
                const user = await User.findById(userId)
                const peeCampIds = swop(nongCamp._id.toString(), null, user?.peeCampIds as string[])
                await user?.updateOne({ peeCampIds })
            })
            await nongCamp?.deleteOne()
        })
        camp.petoModelIds.forEach(async (nongModelId) => {
            const nongCamp = await PetoCamp.findById(nongModelId)
            nongCamp?.petoIds.forEach(async (userId) => {
                const user = await User.findById(userId)
                const petoCampIds = swop(nongCamp._id.toString(), null, user?.petoCampIds as string[])
                user?.updateOne({ petoCampIds })
            })
            await nongCamp?.deleteOne()
        })
        camp.baanIds.forEach(async (baanId) => {
            const baan = await Baan.findById(baanId)
            baan?.songIds.forEach(async (songId) => {
                const song = await Song.findById(songId)
                await song?.updateOne({ baanIds: swop(baan.id, null, song.baanIds) })
            })
            await CampStyle.findByIdAndDelete(baan?.styleId)
            await baan?.deleteOne()
        })
        await CampStyle.findByIdAndDelete(camp.campStyleId)
        camp.nongHelthIsueIds.forEach(async (helthueId) => {
            const helthIsue = await HelthIsue.findById(helthueId)
            const user = await User.findById(helthIsue?.userId)
            if (user?.helthIsueId.localeCompare(helthueId)) {
                await helthIsue?.deleteOne()
            }
        })
        camp.peeHelthIsueIds.forEach(async (helthueId) => {
            const helthIsue = await HelthIsue.findById(helthueId)
            const user = await User.findById(helthIsue?.userId)
            if (user?.helthIsueId.localeCompare(helthueId)) {
                await helthIsue?.deleteOne()
            }
        })
        camp.petoHelthIsueIds.forEach(async (helthueId) => {
            const helthIsue = await HelthIsue.findById(helthueId)
            const user = await User.findById(helthIsue?.userId)
            if (user?.helthIsueId.localeCompare(helthueId)) {
                await helthIsue?.deleteOne()
            }
        })
        camp.partIds.forEach(async (partId) => {
            await Part.findByIdAndDelete(partId)
        })
        camp.workItemIds.forEach(async (workItemId) => {
            await WorkItem.findByIdAndDelete(workItemId)
        })
        camp.actionPlanIds.forEach(async (actionPlanId) => {
            const actionPlan = await ActionPlan.findById(actionPlanId)
            actionPlan?.placeIds.forEach(async (placeId: string) => {
                const place = await Place.findById(placeId)
                await place?.updateOne({ actionPlanIds: swop(actionPlan.id, null, place.actionPlanIds) })
                const building = await Building.findById(place?.buildingId)
                await building?.updateOne({ actionPlanIds: swop(actionPlan.id, null, building.actionPlanIds) })
            })
        })
        const name = await NameContainer.findById(camp.nameId)
        camp.lostAndFoundIds.forEach(async (id) => {
            await LostAndFound.findByIdAndUpdate(id, { campId: null })
        })
        const campIds = swop(campId, null, name?.campIds as string[])
        await name?.updateOne({ campIds })
        await camp.deleteOne()
        res?.status(200).json({ success: true })
    } catch (error) {
        res?.status(400).json({ success: false })
    }
}
export async function saveDeleteCamp(req: express.Request, res: express.Response, next: express.NextFunction) {
    const campId: string = req.params.id
    const camp: InterCampBack | null = await Camp.findById(campId)
    if (!camp) {
        return res.status(400).json({
            success: false,
            message: 'no camp'
        })
    }
    if (camp.nongPaidIds.length || camp.nongPassIds.size || camp.nongInterviewIds.size || camp.peeIds.length || camp.partIds.length || camp.baanIds.length) {
        return res.status(400).json({ success: false, message: 'this camp is not save to delete' })

    }
    camp.boardIds.forEach(async (boardId: string) => {
        const user = await User.findById(boardId)
        const news = swop(camp.id, null, user?.authorizeIds as string[])
        await user?.updateOne({ authorizeIds: news })
    })
    await CampStyle.findByIdAndDelete(camp.campStyleId)
    await Camp.findByIdAndDelete(campId)
    const name = await NameContainer.findById(camp.nameId)
    const campIds = swop(campId, null, name?.campIds as string[])
    await name?.updateOne({ campIds })
    res.status(200).json({ success: true })
}
export async function addCampName(req: express.Request, res: express.Response, next: express.NextFunction) {
    const name = await NameContainer.create({ name: req.params.id })
    res.status(201).json(name)
}
export async function saveDeleteCampName(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const hospital = await NameContainer.findById(req.params.id)
        res.status(400).json({
            success: false
        });
        if (hospital?.campIds.length) {
            return res.status(400).json({ success: false, massage: 'this not safe to delete' })
        }
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch {
        res.status(400).json({
            success: false
        });
    }
}
export async function forceDeleteCampName(req: express.Request, res: express.Response, next: express.NextFunction) {
    const name = await NameContainer.findById(req.params.id)
    name?.campIds.forEach(async (campId: string) => {
        await forceDeleteCampRaw(campId, null)
    })
    await name?.deleteOne()
    res.status(200).json({ success: true })
}
export async function forceDeleteBaan(req: express.Request, res: express.Response, next: express.NextFunction) {
    const baan = await Baan.findById(req.params.id)
    const camp = await Camp.findById(baan?.campId)
    var nongIds: string[] = camp?.nongIds as string[]
    var nongShertManageIds = camp?.nongShertManageIds as string[]
    var peeShertManageIds = camp?.peeShertManageIds as string[]
    var peeModelIds = camp?.peeModelIds as string[]
    var peeIds = camp?.peeIds as string[]
    var peeHelthIsueIds = camp?.peeHelthIsueIds as string[]
    var nongHelthIsueIds = camp?.nongHelthIsueIds as string[]
    baan?.nongShertManageIds.forEach(async (shertmanageId) => {
        const shertManage = await ShertManage.findById(shertmanageId)
        const user = await User.findById(shertManage?.userId)
        await user?.updateOne({
            shertManageIds: swop(shertmanageId, null, user.shertManageIds)
        })
        nongShertManageIds = swop(shertmanageId, null, nongShertManageIds)
        shertManage?.deleteOne()
    })
    baan?.peeShertManageIds.forEach(async (shertmanageId) => {
        const shertManage: InterShertManage | null = await ShertManage.findById(shertmanageId)
        if (!shertManage) {
            return
        }
        const user = await User.findById(shertManage?.userId)
        await user?.updateOne({ shertManageIds: swop(shertmanageId, null, user.shertManageIds) })
        peeShertManageIds = swop(shertmanageId, null, peeShertManageIds)
        const peeCamp = await PeeCamp.findById(shertManage?.campModelId)
        const part = await Part.findById(peeCamp?.partId)
        part?.peeShertSize.set(shertManage.size, calculate(part.peeShertSize.get(shertManage.size), 0, 1))
        await part?.updateOne({ peeShertManageIds: swop(shertManage.id, null, part.peeShertManageIds), peeShertSize: part.peeShertSize })
        await ShertManage.findByIdAndDelete(shertManage.id)
    })
    baan?.nongHelthIsueIds.forEach(async (helthueId) => {
        const helthIsue = await HelthIsue.findById(helthueId)
        const user = await User.findById(helthIsue?.userId)
        nongHelthIsueIds = swop(helthIsue?.id, null, nongHelthIsueIds)
        if (user?.helthIsueId.localeCompare(helthueId)) {
            await helthIsue?.deleteOne()
        }
    })
    baan?.peeHelthIsueIds.forEach(async (helthueId) => {
        const helthIsue = await HelthIsue.findById(helthueId)
        const user = await User.findById(helthIsue?.userId)
        peeHelthIsueIds = swop(helthIsue?.id, null, peeHelthIsueIds)
        const shertManage = await ShertManage.findById(baan.mapShertManageIdByUserId.get(user?.id))
        const peeCamp = await PeeCamp.findById(shertManage?.campModelId)
        const part = await Part.findById(peeCamp?.partId)
        await part?.updateOne({ peeHelthIsueIds: swop(helthIsue?.id, null, part.peeHelthIsueIds) })
        if (user?.helthIsueId.localeCompare(helthueId)) {
            await helthIsue?.deleteOne()
        }
    })
    baan?.songIds.forEach(async (songId) => {
        const song = await Song.findById(songId)
        await song?.updateOne({ baanIds: swop(baan.id, null, song.baanIds) })
    })
    baan?.peeModelIds.forEach(async (nongModelId) => {
        const nongCamp = await PeeCamp.findById(nongModelId)
        const part = await Part.findById(nongCamp?.partId)
        nongCamp?.peeIds.forEach(async (userId) => {
            const user = await User.findById(userId)
            if (user?.haveBottle) {
                await part?.updateOne({ peeHaveBottle: part.peeHaveBottle - 1 })
            }
            const peeCampIds = swop(nongCamp.id, null, user?.peeCampIds as string[])
            const p = swop(user?.id, null, part?.peeIds as string[])
            await part?.updateOne({ peeIds: p })
            peeIds = swop(user?.id, null, peeIds)
            camp?.peeHaveBottleMapIds.delete(user?.id)
            await user?.updateOne({ peeCampIds })
        })
        peeModelIds = swop(nongModelId, null, peeModelIds)
        await nongCamp?.deleteOne()
    })
    const nongCamp = await NongCamp.findById(baan?.nongModelId)
    nongCamp?.nongIds.forEach(async (userId) => {
        const user = await User.findById(userId)
        const nongCampIds = swop(nongCamp.id, null, user?.nongCampIds as string[])
        await user?.updateOne({ nongCampIds })
        nongIds = swop(user?.id, null, nongIds)
        camp?.nongHaveBottleMapIds.delete(user?.id)
    })
    await nongCamp?.deleteOne()
    camp?.nongShertSize.forEach((v, k) => {
        camp.nongShertSize.set(k, calculate(v, 0, baan?.nongShertSize.get(k)))
    })
    const boyP = await Place.findById(baan?.boySleepPlaceId)
    await boyP?.updateOne({ boySleepBaanIds: swop(baan?.id, null, boyP.boySleepBaanIds) })
    const boyB = await Building.findById(boyP?.buildingId)
    await boyB?.updateOne({ boySleepBaanIds: swop(baan?.id, null, boyB.boySleepBaanIds) })
    const girlP = await Place.findById(baan?.girlSleepPlaceId)
    await girlP?.updateOne({ girlSleepBaanIds: swop(baan?.id, null, girlP.girlSleepBaanIds) })
    const girlB = await Building.findById(girlP?.buildingId)
    await girlB?.updateOne({ girlSleepBaanIds: swop(baan?.id, null, girlB.girlSleepBaanIds) })
    const normalP = await Place.findById(baan?.nomalPlaceId)
    await normalP?.updateOne({ normalBaanIds: swop(baan?.id, null, normalP.normalBaanIds) })
    const normalB = await Building.findById(normalP?.buildingId)
    await normalB?.updateOne({ normalBaanIds: swop(baan?.id, null, normalB.normalBaanIds) })
    camp?.peeShertSize.forEach((v, k) => {
        camp.peeShertSize.set(k, calculate(v, 0, baan?.peeShertSize.get(k)))
    })
    await camp?.updateOne({
        peeHaveBottle: calculate(camp.peeHaveBottle, 0, baan?.peeHaveBottle),
        nongHaveBottle: calculate(camp.nongHaveBottle, 0, baan?.nongHaveBottle),
        nongIds,
        nongHaveBottleMapIds: camp.nongHaveBottleMapIds,
        nongShertSize: camp.nongShertSize,
        peeIds,
        peeHaveBottleMapIds: camp.peeHaveBottleMapIds,
        peeModelIds,
        peeShertSize: camp.peeShertSize,
        peeShertManageIds,
        nongShertManageIds,
        baanIds: swop(baan?.id, null, camp.baanIds),
        nongModelIds: swop(baan?.nongModelId as string, null, camp.nongModelIds)
    })
    await CampStyle.findByIdAndDelete(baan?.styleId)
    await baan?.deleteOne()
    res.status(200).json({ success: true })
}
export async function saveDeleteBaan(req: express.Request, res: express.Response, next: express.NextFunction) {
    const baan = await Baan.findById(req.params.id)
    const camp = await Camp.findById(baan?.campId)
    const user = await getUser(req)
    if (user?.role != 'admin' && !user?.authorizeIds.includes(camp?.id)) {
        return res.status(401).json({ success: false })
    }
    if (baan?.nongIds.length || baan?.peeIds.length || baan?.songIds.length) {
        return res.status(400).json({ success: false, message: 'this baan is not save to delete' })
    }
    var peeModelIds = camp?.peeModelIds as string[]
    baan?.peeModelIds.forEach(async (peeModelId) => {
        const peeCamp = await PeeCamp.findById(peeModelId)
        peeModelIds = swop(peeCamp?.id, null, peeModelIds)
        peeCamp?.deleteOne()
    })
    const boyP = await Place.findById(baan?.boySleepPlaceId)
    await boyP?.updateOne({ boySleepBaanIds: swop(baan?.id, null, boyP.boySleepBaanIds) })
    const boyB = await Building.findById(boyP?.buildingId)
    await boyB?.updateOne({ boySleepBaanIds: swop(baan?.id, null, boyB.boySleepBaanIds) })
    const girlP = await Place.findById(baan?.girlSleepPlaceId)
    await girlP?.updateOne({ girlSleepBaanIds: swop(baan?.id, null, girlP.girlSleepBaanIds) })
    const girlB = await Building.findById(girlP?.buildingId)
    await girlB?.updateOne({ girlSleepBaanIds: swop(baan?.id, null, girlB.girlSleepBaanIds) })
    const normalP = await Place.findById(baan?.nomalPlaceId)
    await normalP?.updateOne({ normalBaanIds: swop(baan?.id, null, normalP.normalBaanIds) })
    const normalB = await Building.findById(normalP?.buildingId)
    await normalB?.updateOne({ normalBaanIds: swop(baan?.id, null, normalB.normalBaanIds) })
    await camp?.updateOne({ nongModelIds: swop(baan?.nongModelId as string, null, camp.nongModelIds), peeModelIds })
    await NongCamp.findByIdAndDelete(baan?.nongModelId)
    await CampStyle.findByIdAndDelete(baan?.styleId)
    await baan?.deleteOne()
    res.status(200).json({ success: true })
}
export async function saveDeletePart(req: express.Request, res: express.Response, next: express.NextFunction) {
    const part = await Part.findById(req.params.id)
    const camp = await Camp.findById(part?.campId)
    if (part?.petoIds.length || part?.peeIds.length || part?.actionPlanIds.length || part?.workItemIds.length) {
        return res.status(400).json({ success: false, message: 'this baan is not save to delete' })
    }
    part?.peeModelIds.forEach(async (peeModelId) => {
        const peeCamp = await PeeCamp.findById(peeModelId)
        camp?.updateOne({ peeModelIds: swop(peeCamp?.id, null, camp.peeModelIds) })
        peeCamp?.deleteOne()
    })
    camp?.updateOne({ petoModelIds: swop(part?.petoModelId as string, null, camp.petoModelIds) })
    await NongCamp.findByIdAndDelete(part?.petoModelId)
    part?.deleteOne()
    res.status(200).json({ success: true })
}
export async function forceDeletePart(req: express.Request, res: express.Response, next: express.NextFunction) {
    forceDeletePartRaw(req.params.id)
    res.status(200).json({ success: true })
}
async function forceDeletePartRaw(partId: string) {
    const part = await Part.findById(partId)
    const camp = await Camp.findById(part?.campId)
    var petoShertManageIds = camp?.petoShertManageIds as string[]
    var peeShertManageIds = camp?.peeShertManageIds as string[]
    var actionPlanIds = camp?.actionPlanIds as string[]
    var petoIds = camp?.petoIds as string[]
    var peeIds = camp?.peeIds as string[]
    var peeModelIds = camp?.peeModelIds as string[]
    var workItemIds = camp?.workItemIds as string[]
    var peeHelthIsueIds = camp?.peeHelthIsueIds as string[]
    var petoHelthIsueIds = camp?.petoHelthIsueIds as string[]
    part?.petoShertManageIds.forEach(async (shertmanageId) => {
        const shertManage = await ShertManage.findById(shertmanageId)
        const user = await User.findById(shertManage?.userId)
        await user?.updateOne({
            shertManageIds: swop(shertmanageId, null, user.shertManageIds)
        })
        petoShertManageIds = swop(shertmanageId, null, petoShertManageIds)
        shertManage?.deleteOne()
    })
    part?.peeShertManageIds.forEach(async (shertmanageId) => {
        const shertManage = await ShertManage.findById(shertmanageId)
        const user = await User.findById(shertManage?.userId)
        user?.updateOne({ shertManageIds: swop(shertmanageId, null, user.shertManageIds) })
        peeShertManageIds = swop(shertmanageId, null, peeShertManageIds)
        const peeCamp = await PeeCamp.findById(shertManage?.campModelId)
        const baan = await Baan.findById(peeCamp?.baanId)
        baan?.updateOne({ peeShertManageIds: swop(shertManage?.id, null, part.peeShertManageIds) })
        baan?.peeShertSize.set(shertManage?.size as string, calculate(baan.peeShertSize.get(shertManage?.size as string), 0, 1))
        await shertManage?.deleteOne()
        await baan?.updateOne({ peeShertSize: baan.peeShertSize })
    })
    part?.petoHelthIsueIds.forEach(async (helthueId) => {
        const helthIsue = await HelthIsue.findById(helthueId)
        petoHelthIsueIds = swop(helthIsue?.id, null, petoHelthIsueIds)
        const user = await User.findById(helthIsue?.userId)
        if (user?.helthIsueId.localeCompare(helthueId)) {
            await helthIsue?.deleteOne()
        }
    })
    part?.peeHelthIsueIds.forEach(async (helthueId) => {
        const helthIsue = await HelthIsue.findById(helthueId)
        const user = await User.findById(helthIsue?.userId)
        peeHelthIsueIds = swop(helthIsue?.id, null, peeHelthIsueIds)
        const shertManage = await ShertManage.findById(part.mapShertManageIdByUserId.get(user?.id))
        const peeCamp = await PeeCamp.findById(shertManage?.campModelId)
        const baan = await Baan.findById(peeCamp?.baanId)
        await baan?.updateOne({ peeHelthIsueIds: swop(helthIsue?.id, null, baan.peeHelthIsueIds) })
        if (user?.helthIsueId.localeCompare(helthueId)) {
            helthIsue?.deleteOne()
        }
    })
    part?.peeModelIds.forEach(async (nongModelId) => {
        const nongCamp = await PeeCamp.findById(nongModelId)
        const baan = await Baan.findById(nongCamp?.baanId)
        nongCamp?.peeIds.forEach(async (userId) => {
            const user = await User.findById(userId)
            if (user?.haveBottle) {
                await baan?.updateOne({ peeHaveBottle: baan.peeHaveBottle - 1 })
            }
            const peeCampIds = swop(nongCamp._id.toString(), null, user?.peeCampIds as string[])
            const p = swop(user?.id, null, baan?.peeIds as string[])
            await baan?.updateOne({ peeIds: p })
            peeIds = swop(user?.id, null, peeIds)
            await user?.updateOne({ peeCampIds })
            camp?.peeHaveBottleMapIds.delete(user?.id)
        })
        peeModelIds = swop(nongModelId, null, peeModelIds)
        await nongCamp?.deleteOne()
    })
    const petoCamp = await PetoCamp.findById(part?.petoModelId)
    petoCamp?.petoIds.forEach(async (userId) => {
        const user = await User.findById(userId)

        user?.updateOne({ petoCampIds: swop(petoCamp.id, null, user.petoCampIds) })
        petoIds = swop(user?.id, null, petoIds)

        camp?.petoHaveBottleMapIds.delete(user?.id)
    })

    petoCamp?.deleteOne()
    camp?.petoShertSize.forEach((v, k) => {
        camp.petoShertSize.set(k, calculate(v, 0, part?.petoShertSize.get(k)))
    })
    camp?.peeShertSize.forEach((v, k) => {
        camp.peeShertSize.set(k, calculate(v, 0, part?.peeShertSize.get(k)))
    })
    part?.actionPlanIds.forEach(async (id) => {
        const actionPlan = await ActionPlan.findById(id)
        actionPlan?.placeIds.forEach(async (placeId: string) => {
            const place = await Place.findById(placeId)
            await place?.updateOne({ actionPlanIds: swop(actionPlan.id, null, place.actionPlanIds) })
            const building = await Building.findById(place?.buildingId)
            await building?.updateOne({ actionPlanIds: swop(actionPlan.id, null, building.actionPlanIds) })
        })
        actionPlanIds = swop(id, null, actionPlanIds)
    })
    part?.workItemIds.forEach(async (id) => {
        const workItem = await WorkItem.findById(id)
        if (workItem?.fromId != 'init') {
            const from = await WorkItem.findById(workItem?.fromId)
            await from?.updateOne({ linkOutIds: swop(id, null, from.linkOutIds) })
        }
        workItemIds = swop(workItem?.id, null, workItemIds)
        await deleteWorkingItemRaw(id)
    })
    await camp?.updateOne({
        partIds: swop(part?.id, null, camp.partIds),
        petoModelIds: swop(part?.petoModelId as string, null, camp.petoModelIds),
        peeHaveBottle: calculate(camp.peeHaveBottle, 0, part?.peeHaveBottle),
        petoHaveBottle: calculate(camp.petoHaveBottle, 0, part?.petoHaveBottle),
        petoHaveBottleMapIds: camp.petoHaveBottleMapIds,
        peeHaveBottleMapIds: camp.peeHaveBottleMapIds,
        petoShertSize: camp.petoShertSize,
        petoShertManageIds,
        peeShertManageIds,
        peeModelIds,
        actionPlanIds,
        petoIds,
        peeIds,
        workItemIds,
        peeHelthIsueIds,
        petoHelthIsueIds
    })
    await part?.deleteOne()

}
async function deleteWorkingItemRaw(workItemId: string) {
    const workItem = await WorkItem.findById(workItemId)
    const camp = await Camp.findById(workItem?.campId)
    const part = await Part.findById(workItem?.partId)
    await part?.updateOne({ workItemIds: swop(workItem?.id, null, part.workItemIds) })
    await camp?.updateOne({ workItemIds: swop(workItem?.id, null, camp.workItemIds) })
    workItem?.linkOutIds.forEach(async (outId) => {
        if (outId != 'end') {
            await deleteWorkingItemRaw(outId)
        }
    })
    await workItem?.deleteOne()
}
export async function addPartName(req: express.Request, res: express.Response, next: express.NextFunction) {
    const name = await PartNameContainer.create({ name: req.params.id })
    res.status(201).json(name)
}
export async function saveDeletePartName(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const hospital = await PartNameContainer.findById(req.params.id)
        res.status(400).json({
            success: false
        });
        if (hospital?.campIds.length) {
            return res.status(400).json({ success: false, massage: 'this not safe to delete' })
        }
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch {
        res.status(400).json({
            success: false
        });
    }
}
export async function forceDeletePartName(req: express.Request, res: express.Response, next: express.NextFunction) {
    const partNameContainer = await PartNameContainer.findById(req.params.id)
    partNameContainer?.partIds.forEach(async (id) => {
        await forceDeletePartRaw(id)
    })
    res.status(200).json({ success: true })
}
export async function addAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { userIds } = req.body
    const userIdsbuf: string[] = userIds
    userIdsbuf.forEach(async (userId: string) => {
        const user = await User.findById(userId)
        await user?.updateOne({ role: 'admin', fridayActEn: true })
    })
    res.status(200).json({ success: true })
}
export async function getAllAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
    const users = await User.find({ role: 'admin' })
    res.status(200).json(users)
}
export async function downRole(req: express.Request, res: express.Response, next: express.NextFunction) {
    const users = await User.find({ role: 'admin' })
    if (users.length == 1) {
        sendRes(res, false)
        return
    }
    const user = await getUser(req)
    await user?.updateOne({ role: req.params.id })
    res.status(200).json({ success: true })
}
export async function addMoreBoard(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { campId, userIds } = req.body
    const camp = await Camp.findById(campId)
    userIds.forEach(async (userId: string) => {
        const user = await User.findById(userId)
        await user?.updateOne({ authorizeIds: swop(null, camp?.id, user.authorizeIds) })
        camp?.boardIds.push(user?.id)
    });
    await camp?.updateOne({ boardIds: camp.boardIds })
    res.status(200).json({ success: true })
}
export async function removeBoard(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { campId, userId } = req.body
    const camp = await Camp.findById(campId)
    const user = await User.findById(userId)
    await camp?.updateOne({ boardIds: swop(user?.id, null, camp.boardIds) })
    await user?.updateOne({ authorizeIds: swop(camp?.id, null, user.authorizeIds) })
    sendRes(res, true)
}
export async function createPlace(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { room, buildingId } = req.body
    const place = await Place.create({ room, buildingId })
    const building = await Building.findById(buildingId)
    await building?.updateOne({ placeIds: swop(null, place.id, building.placeIds) })
    res.status(201).json(place)
}
export async function saveDeletePlace(req: express.Request, res: express.Response, next: express.NextFunction) {
    const place = await Place.findById(req.params.id)
    if (place?.actionPlanIds.length || place?.boySleepBaanIds.length || place?.girlSleepBaanIds.length || place?.normalBaanIds.length || place?.fridayActIds.length || place?.partIds.length || place?.lostAndFoundIds.length) {
        return res.status(400).json({ success: false })
    }
    await place?.deleteOne()
    res.status(200).json({ success: true })
}
export async function createBuilding(req: express.Request, res: express.Response, next: express.NextFunction) {
    const building = await Building.create({ name: req.params.id })
    res.status(201).json(building)
}
export async function saveDeleteBuilding(req: express.Request, res: express.Response, next: express.NextFunction) {
    const building = await Building.findById(req.params.id)
    if (building?.placeIds.length) {
        return res.status(400).json({ success: false })
    }
    await building?.deleteOne()
    sendRes(res, true)
}
export async function updateCamp(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user = await getUser(req)
    const camp = await Camp.findById(req.params.id)
    if ((user?.role != 'admin' && !user?.authorizeIds.includes(camp?.id))) {
        return res.status(403).json({ success: false })
    }
    if (!camp) {
        sendRes(res, false)
        return
    }
    const update: UpdateCamp = req.body
    await camp.updateOne(update)
    res.status(200).json(camp)
}
export async function getCampNames(req: express.Request, res: express.Response, next: express.NextFunction) {
    const nameContainers = await NameContainer.find()
    res.status(200).json(nameContainers)
}