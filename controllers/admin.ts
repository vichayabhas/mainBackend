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
import { CreateCamp, InterBaanFront, InterCampBack, InterShertManage, UpdateCamp, UpdateBaan, Group, MyMap } from "../models/intreface"
import { calculate, conBaanBackToFront, conCampBackToFront, conPartBackToFront, removeDupicate, sendRes, swop } from "./setup"
import express from "express";
import Song from "../models/Song"
import PartNameContainer from '../models/PartNameContainer'
import Place from "../models/Place"
import { getUser } from "../middleware/auth"
import Building from "../models/Building"
import LostAndFound from "../models/LostAndFound"
import { addPeeRaw, addPetoRaw, changeBaanRaw } from "./camp"
import mongoose from "mongoose"
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
export async function addBaan(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user = await getUser(req)
    const { campId, name } = req.body
    const camp: InterCampBack | null = await Camp.findById(campId)
    if (!camp) {
        sendRes(res, false)
        return
    }
    if (user?.role != 'admin' && !user?.authorizeIds.includes(camp._id)) {
        return res.status(403).json({ success: false })
    }
    const baan = await addBaanRaw(camp, name, null)
    res.status(201).json(baan)
}//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export async function addBaanRaw(camp: InterCampBack, name: string,
    groupRef: 'A' | 'B' | 'C' | 'Dog' | 'E' | 'F' | 'G' | 'H' | 'J' | 'K' | 'L' | 'M' | 'N' | 'P' | 'Q' | 'R' | 'S' | 'T' | null): Promise<InterBaanFront> {
    // const camp = await Camp.findById(campId)
    // if (!camp) {
    //     return null
    // }
    const baan = await Baan.create({ campId: camp._id, name })
    const nongCamp = await NongCamp.create({ campId: camp._id, baanId: baan._id })
    var i = 0
    while (i < camp.partIds.length) {
        const partId = camp.partIds[i]
        const part = await Part.findById(partId)
        const peeCamp = await PeeCamp.create({ campId: camp._id, baanId: baan._id, partId })
        setDefalse(peeCamp._id)
        baan.peeModelIds.push(peeCamp._id)
        await part?.updateOne({ peeModelIds: swop(null, peeCamp._id, part.peeModelIds) })
        camp.peeModelIds.push(peeCamp._id)
        baan.mapPeeCampIdByPartId.set(partId.toString(), peeCamp._id)
        part?.mapPeeCampIdByBaanId.set(baan.id, peeCamp._id)
        await part?.updateOne({ mapPeeCampIdByBaanId: part.mapPeeCampIdByBaanId })
        i = i + 1
    }
    await Camp.findByIdAndUpdate(camp._id, { nongModelIds: swop(null, nongCamp._id, camp.nongModelIds), baanIds: swop(null, baan._id, camp.baanIds), peeModelIds: camp.peeModelIds })
    const campStyle = await CampStyle.create({ refId: baan._id, types: 'baan' })
    await baan.updateOne({ styleId: campStyle._id, mapPeeCampIdByPartId: baan.mapPeeCampIdByPartId, nongModelId: nongCamp._id, peeModelIds: baan.peeModelIds })
    return (conBaanBackToFront(baan.toObject()))
}
export async function addPart(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { campId, nameId } = req.body
    const camp = await Camp.findById(campId)
    const user = await getUser(req)
    const partNameContainer = await PartNameContainer.findById(nameId)
    if (!camp || !partNameContainer) {
        sendRes(res, false)
        return
    }
    if (user?.role != 'admin' && !user?.authorizeIds.includes(camp?._id)) {
        return res.status(403).json({ success: false })
    }
    const part = await Part.create({ campId: camp._id, nameId })
    await partNameContainer.updateOne({ partIds: swop(null, part._id, partNameContainer.partIds) })
    partNameContainer.partIds.push(part._id)
    partNameContainer.campIds.push(camp._id)
    await partNameContainer.updateOne({ partIds: partNameContainer.partIds, campIds: partNameContainer.campIds })
    const petoCamp = await PetoCamp.create({ campId, partId: part._id })
    var i = 0
    while (i < camp.baanIds.length) {
        const baanId = camp.baanIds[i++]
        const baan = await Baan.findById(baanId)
        if (!baan) {
            continue
        }
        const peeCamp = await PeeCamp.create({ baanId, campId, partId: part._id })
        await baan?.updateOne({ peeModelIds: swop(null, peeCamp._id, baan.peeModelIds) })
        camp.peeModelIds.push(peeCamp._id)
        part.peeModelIds.push(peeCamp._id)
        setDefalse(peeCamp.id)
        baan.mapPeeCampIdByPartId.set(part._id.toString(), peeCamp._id)
        part.mapPeeCampIdByBaanId.set(baanId.toString(), peeCamp._id)
        await baan?.updateOne({ mapPeeCampIdByPartId: baan.mapPeeCampIdByPartId })
    }
    await camp.updateOne({
        partIds: swop(null, part._id, camp.partIds),
        petoModelIds: swop(null, petoCamp._id, camp.petoModelIds),
        peeModelIds: camp.peeModelIds,
        partNameIds: swop(null, partNameContainer._id, camp.partNameIds)
    })
    await part.updateOne({
        petoModelId: petoCamp._id,
        mapPeeCampIdByBaanId: part.mapPeeCampIdByBaanId,
        peeModelIds: part.peeModelIds,
        partName: `${partNameContainer?.name} ${camp.campName}`
    })
    res.status(201).json(conPartBackToFront(part.toObject()))
}
export async function updateBaan(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        var { name, fullName, baanId, link, girlSleepPlaceId, boySleepPlaceId, nomalPlaceId }: UpdateBaan = req.body
        const baan = await Baan.findById(baanId)
        if (!baan) {
            sendRes(res, false)
            return
        }
        const user = await getUser(req)
        if (user?.role != 'admin' && !user?.authorizeIds.includes(baan.campId as mongoose.Types.ObjectId)) {
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
            name = baan.name as string
        }
        if (!fullName) {
            fullName = baan.fullName as string | null
        }
        if (!link) {
            link = baan.link as string | null
        }
        const boyNewB = await Building.findById(boyNewP?.buildingId)
        const boyOldB = await Building.findById(boyOldP?.buildingId)
        const girlNewB = await Building.findById(girlNewP?.buildingId)
        const girlOldB = await Building.findById(girlOldP?.buildingId)
        const normalNewB = await Building.findById(normalNewP?.buildingId)
        const normalOldB = await Building.findById(normalOldP?.buildingId)
        await boyNewP?.updateOne({ boySleepBaanIds: swop(null, baan._id, boyNewP.boySleepBaanIds) })
        await girlNewP?.updateOne({ girlSleepBaanIds: swop(null, baan._id, girlNewP.girlSleepBaanIds) })
        await normalNewP?.updateOne({ normalBaanIds: swop(null, baan._id, normalNewP.normalBaanIds) })
        await boyOldP?.updateOne({ boySleepBaanIds: swop(baan._id, null, boyOldP.boySleepBaanIds) })
        await girlOldP?.updateOne({ girlSleepBaanIds: swop(baan._id, null, girlOldP.girlSleepBaanIds) })
        await normalOldP?.updateOne({ normalBaanIds: swop(baan._id, null, normalOldP.normalBaanIds) })
        await boyNewB?.updateOne({ boySleepBaanIds: swop(null, baan._id, boyNewB.boySleepBaanIds) })
        await girlNewB?.updateOne({ girlSleepBaanIds: swop(null, baan._id, girlNewB.girlSleepBaanIds) })
        await normalNewB?.updateOne({ normalBaanIds: swop(null, baan._id, normalNewB.normalBaanIds) })
        await boyOldB?.updateOne({ boySleepBaanIds: swop(baan._id, null, boyOldB.boySleepBaanIds) })
        await girlOldB?.updateOne({ girlSleepBaanIds: swop(baan._id, null, girlOldB.girlSleepBaanIds) })
        await normalOldB?.updateOne({ normalBaanIds: swop(baan._id, null, normalOldB.normalBaanIds) })
        await baan?.updateOne({ name, fullName, link, girlSleepPlaceId: girlNewP?._id, boySleepPlaceId: boyNewP?._id, nomalPlaceId: normalNewP?._id })
        res.status(200).json(conBaanBackToFront(baan.toObject()))
    } catch (err) {
        res.status(400).json({ success: false })
    }
}
export async function updatePart(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const { placeId, partId } = req.body
        const baan = await Part.findById(partId)
        if (!baan) {
            sendRes(res, false)
            return
        }
        const user = await getUser(req)
        if (user?.role != 'admin' && !user?.authorizeIds.includes(baan.campId as mongoose.Types.ObjectId)) {
            return res.status(401).json({ success: false })
        }
        await baan?.updateOne({ placeId })
        res.status(200).json(conPartBackToFront(baan.toObject()))
    } catch (err) {
        res.status(400).json({ success: false })
    }
}
async function setDefalse(peeCampId: mongoose.Types.ObjectId) {
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
        const createCamp: CreateCamp = req.body
        const camp = await Camp.create(createCamp)
        const campStyle = await CampStyle.create({ refId: camp._id, types: 'camp' })
        await camp.updateOne({ campStyleId: campStyle._id })
        const nameContainer = await NameContainer.findById(createCamp.nameId)
        if (!nameContainer) {
            sendRes(res, false)
            return
        }
        await nameContainer?.updateOne({ campIds: swop(null, camp._id, nameContainer.campIds) })
        var partNameContainer = await PartNameContainer.findOne({ name: 'board' })
        if (!partNameContainer) {
            partNameContainer = await PartNameContainer.create({ name: 'board' })
        }
        //console.log('hjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
        //console.log(`${partNameContainer.name} ${camp.campName}`)
        const part = await Part.create({ nameId: partNameContainer._id, campId: camp._id, partName: `${partNameContainer.name} ${nameContainer.name} ${camp.round}` })
        await partNameContainer.updateOne({
            campIds: swop(null, camp._id, partNameContainer.campIds),
            partIds: swop(null, part._id, partNameContainer.partIds),
        })
        const petoCamp = await PetoCamp.create({ partId: part._id, campId: camp._id })
        await camp.updateOne({
            partIds: [part._id],
            petoModelIds: [petoCamp._id],
            campName: `${nameContainer.name} ${camp.round}`,
            baanBordId: null,
            partNameIds: [partNameContainer._id]
        })
        await part.updateOne({ petoModelId: petoCamp._id })
        var i = 0
        while (i < createCamp.boardIds.length) {
            const boardId = createCamp.boardIds[i++]
            const user = await User.findById(boardId)
            if (!user) {
                continue
            }
            await user.updateOne({ authorizeIds: swop(null, camp._id, user.authorizeIds) })

        }

        if (createCamp.memberStructre == 'nong->highSchool,pee->1year,peto->2upYear') {
            await addPetoRaw(createCamp.boardIds, part._id, res)
        } else {
            const newCamp: InterCampBack | null = await Camp.findById(camp._id)
            if (!newCamp) {
                sendRes(res, false)
                return
            }
            const baan = await addBaanRaw(newCamp, 'board', null)
            i = 0
            while (i < createCamp.boardIds.length) {
                camp.peePassIds.set(createCamp.boardIds[i++].toString(), part._id)
            }
            await camp.updateOne({ peePassIds: camp.peePassIds, baanBordId: baan._id })

            await addPeeRaw(createCamp.boardIds, baan._id)

        }
        res.status(201).json(conCampBackToFront(camp.toObject()))
    } catch (err) {
        console.log(err)
        res.status(400).json({ success: false })
    }
}
export async function forceDeleteCamp(req: express.Request, res: express.Response, next: express.NextFunction) {
    const campId = req.params.id
    await forceDeleteCampRaw(new mongoose.Types.ObjectId(campId), res)
}
async function forceDeleteCampRaw(campId: mongoose.Types.ObjectId, res: express.Response | null) {
    try {
        const camp = await Camp.findById(campId)
        if (!camp) {
            return res?.status(400).json({ success: false })
        }
        await CampStyle.findByIdAndDelete(camp.campStyleId)
        var i = 0
        while (i < camp.peeShertManageIds.length) {
            await ShertManage.findByIdAndDelete(camp.peeShertManageIds[i++])
        }
        i = 0
        while (i < camp.nongShertManageIds.length) {
            await ShertManage.findByIdAndDelete(camp.nongShertManageIds[i++])
        }
        i = 0
        while (i < camp.petoShertManageIds.length) {
            await ShertManage.findByIdAndDelete(camp.petoShertManageIds[i++])
        }
        i = 0
        while (i < camp.boardIds.length) {
            const user = await User.findById(camp.boardIds[i++])
            if (!user) {
                continue
            }
            const news = swop(camp._id, null, user.authorizeIds)
            await user.updateOne({ authorizeIds: news })
        }
        i = 0
        while (i < camp.nongModelIds.length) {
            const nongCamp = await NongCamp.findById(camp.nongModelIds[i++])
            if (!nongCamp) {
                continue
            }
            var j = 0
            while (j < nongCamp.nongIds.length) {
                const user = await User.findById(nongCamp.nongIds[j++])
                if (!user) {
                    continue
                }
                await user.updateOne({ nongCampIds: swop(nongCamp._id, null, user.nongCampIds) })
            }
        }
        i = 0
        while (i < camp.peeModelIds.length) {
            const peeCamp = await PeeCamp.findById(camp.peeModelIds[i++])
            if (!peeCamp) {
                continue
            }
            var j = 0
            while (j < peeCamp.peeIds.length) {
                const user = await User.findById(peeCamp.peeIds[j++])
                if (!user) {
                    continue
                }
                await user.updateOne({ peeCampIds: swop(peeCamp._id, null, user.peeCampIds) })
            }
        }
        i = 0
        while (i < camp.petoModelIds.length) {
            const petoCamp = await PetoCamp.findById(camp.petoModelIds[i++])
            if (!petoCamp) {
                continue
            }
            var j = 0
            while (j < petoCamp.petoIds.length) {
                const user = await User.findById(petoCamp.petoIds[j++])
                if (!user) {
                    continue
                }
                await user.updateOne({ petoCampIds: swop(petoCamp._id, null, user.petoCampIds) })
            }
        }
        i = 0
        while (i < camp.baanIds.length) {
            const baan = await Baan.findById(camp.baanIds[i++])
            if (!baan) {
                continue
            }
            var j = 0
            while (j < baan.songIds.length) {
                const song = await Song.findById(baan.songIds[j++])
                if (!song) {
                    continue
                }
                await song.updateOne({ baanIds: swop(baan._id, null, song.baanIds) })
            }
            await CampStyle.findByIdAndDelete(baan.styleId)
            await baan.deleteOne()
        }
        await CampStyle.findByIdAndDelete(camp.campStyleId)
        i = 0
        while (i < camp.nongHelthIsueIds.length) {
            const helthIsue = await HelthIsue.findById(camp.nongHelthIsueIds[i++])
            if (!helthIsue) {
                continue
            }
            const user = await User.findById(helthIsue.userId)
            if (!user) {
                continue
            }
            if (user.helthIsueId !== (helthIsue._id)) {
                await helthIsue.deleteOne()
            }
        }
        i = 0
        while (i < camp.peeHelthIsueIds.length) {
            const helthIsue = await HelthIsue.findById(camp.peeHelthIsueIds[i++])
            if (!helthIsue) {
                continue
            }
            const user = await User.findById(helthIsue.userId)
            if (!user) {
                continue
            }
            if (user.helthIsueId !== (helthIsue._id)) {
                await helthIsue.deleteOne()
            }
        }
        i = 0
        while (i < camp.petoHelthIsueIds.length) {
            const helthIsue = await HelthIsue.findById(camp.petoHelthIsueIds[i++])
            if (!helthIsue) {
                continue
            }
            const user = await User.findById(helthIsue.userId)
            if (!user) {
                continue
            }
            if (user.helthIsueId !== (helthIsue._id)) {
                await helthIsue.deleteOne()
            }
        }
        i = 0
        while (i < camp.partIds.length) {
            await Part.findByIdAndDelete(camp.partIds[i++])
        }
        i = 0
        while (i < camp.workItemIds.length) {
            await WorkItem.findByIdAndDelete(camp.workItemIds[i++])
        }
        i = 0
        while (i < camp.actionPlanIds.length) {
            const actionPlan = await ActionPlan.findById(camp.actionPlanIds[i++])
            if (!actionPlan) {
                continue
            }
            var j = 0
            while (j < actionPlan.placeIds.length) {
                const place = await Place.findById(actionPlan.placeIds[j++])
                if (!place) {
                    continue
                }
                await place.updateOne({ actionPlanIds: swop(actionPlan._id, null, place.actionPlanIds) })
                const building = await Building.findById(place.buildingId)
                if (!building) {
                    continue
                }
                await building.updateOne({ actionPlanIds: swop(actionPlan._id, null, building.actionPlanIds) })
            }
        }
        i = 0
        while (i < camp.lostAndFoundIds.length) {
            await LostAndFound.findByIdAndUpdate(camp.lostAndFoundIds[i++], { campId: null })
        }
        const name = await NameContainer.findById(camp.nameId)
        if (name) {
            await name.updateOne({ campIds: swop(camp._id, null, name.campIds) })
        }
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
    if (camp.nongPaidIds.length || camp.nongPassIds.size || camp.nongInterviewIds.size || (camp.peeIds.length + camp.petoIds.length > camp.boardIds.length) || camp.partIds.length > 1 || camp.baanIds.length > 1 || camp.peePassIds.size) {
        return res.status(400).json({ success: false, message: 'this camp is not save to delete' })
    }
    forceDeleteCampRaw(camp._id, res)
}
export async function addCampName(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const name = await NameContainer.create({ name: req.params.id })
        res.status(201).json(name)
    } catch (err) {
        console.log(err)
        sendRes(res, false)
    }

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
    if (!name) {
        sendRes(res, false)
        return
    }
    var i = 0
    while (i < name.campIds.length) {
        await forceDeleteCampRaw(name.campIds[i++], null)
    }
    await name.deleteOne()
    res.status(200).json({ success: true })
}
export async function forceDeleteBaan(req: express.Request, res: express.Response, next: express.NextFunction) {
    const baan = await Baan.findById(req.params.id)
    if (!baan) {
        sendRes(res, false)
        return
    }
    const camp = await Camp.findById(baan.campId)
    if (!camp) {
        sendRes(res, false)
        return
    }
    var nongIds = camp.nongIds
    var nongShertManageIds = camp.nongShertManageIds
    var peeShertManageIds = camp.peeShertManageIds
    var peeModelIds = camp.peeModelIds
    var peeIds = camp.peeIds
    var peeHelthIsueIds = camp.peeHelthIsueIds
    var nongHelthIsueIds = camp.nongHelthIsueIds
    var i = 0
    while (i < baan.nongShertManageIds.length) {
        const shertManage = await ShertManage.findById(baan.nongShertManageIds[i++])
        if (!shertManage) {
            continue
        }
        const user = await User.findById(shertManage.userId)
        await user?.updateOne({
            shertManageIds: swop(shertManage._id, null, user.shertManageIds)
        })
        nongShertManageIds = swop(shertManage._id, null, nongShertManageIds)
        shertManage?.deleteOne()
    }
    i = 0
    while (i < baan.peeShertManageIds.length) {
        const shertManage: InterShertManage | null = await ShertManage.findById(baan.peeShertManageIds[i++])
        if (!shertManage) {
            return
        }
        const peeCamp = await PeeCamp.findById(shertManage.campModelId)
        if (!peeCamp) {
            continue
        }
        const part = await Part.findById(peeCamp.partId)
        const user = await User.findById(shertManage.userId)
        if (!user || !part) {
            continue
        }
        await user.updateOne({ shertManageIds: swop(shertManage._id, null, user.shertManageIds) })
        peeShertManageIds = swop(shertManage._id, null, peeShertManageIds)
        part.peeShertSize.set(shertManage.size, calculate(part.peeShertSize.get(shertManage.size), 0, 1))
        await part.updateOne({ peeShertManageIds: swop(shertManage._id, null, part.peeShertManageIds), peeShertSize: part.peeShertSize })
        await ShertManage.findByIdAndDelete(shertManage._id)
    }
    i = 0
    while (i < baan.nongHelthIsueIds.length) {
        const helthIsue = await HelthIsue.findById(baan.nongHelthIsueIds[i++])
        if (!helthIsue) {
            continue
        }
        const user = await User.findById(helthIsue.userId)
        if (!user) {
            continue
        }
        nongHelthIsueIds = swop(helthIsue?._id, null, nongHelthIsueIds)
        if (user.helthIsueId !== (helthIsue._id)) {
            await helthIsue.deleteOne()
        }
    }
    i = 0
    while (i < baan.peeHelthIsueIds.length) {
        const helthIsue = await HelthIsue.findById(baan.peeHelthIsueIds[i++])
        if (!helthIsue) {
            continue
        }
        const user = await User.findById(helthIsue.userId)
        if (!user) {
            continue
        }
        peeHelthIsueIds = swop(helthIsue._id, null, peeHelthIsueIds)
        const shertManage = await ShertManage.findById(baan.mapShertManageIdByUserId.get(user.id))
        if (!shertManage) {
            continue
        }
        const peeCamp = await PeeCamp.findById(shertManage.campModelId)
        if (!peeCamp) {
            continue
        }
        const part = await Part.findById(peeCamp.partId)
        if (!part) {
            continue
        }
        await part.updateOne({ peeHelthIsueIds: swop(helthIsue._id, null, part.peeHelthIsueIds) })
        if (user?.helthIsueId !== (helthIsue?._id)) {
            await helthIsue?.deleteOne()
        }
    }
    i = 0
    while (i < baan.songIds.length) {
        const song = await Song.findById(baan.songIds[i++])
        await song?.updateOne({ baanIds: swop(baan._id, null, song.baanIds) })
    }
    i = 0
    while (i < baan.peeModelIds.length) {
        const peeCamp = await PeeCamp.findById(baan.peeModelIds[i++])
        if (!peeCamp) {
            continue
        }
        const part = await Part.findById(peeCamp.partId)
        if (!part) {
            continue
        }
        var j = 0
        while (j < peeCamp.peeIds.length) {
            const user = await User.findById(peeCamp.peeIds[j++])
            if (!user) {
                continue
            }
            if (user.haveBottle) {
                await part.updateOne({ peeHaveBottle: part.peeHaveBottle - 1 })
            }
            const peeCampIds = swop(peeCamp._id, null, user.peeCampIds)
            const p = swop(user._id, null, part.peeIds)
            await part.updateOne({ peeIds: p })
            peeIds = swop(user?._id, null, peeIds)
            camp.peeHaveBottleMapIds.delete(user.id)
            await user.updateOne({ peeCampIds })
        }
        peeModelIds = swop(peeCamp._id, null, peeModelIds)
        await peeCamp.deleteOne()
    }
    const nongCamp = await NongCamp.findById(baan.nongModelId)
    if (!nongCamp) {
        sendRes(res, false)
        return
    }
    i = 0
    while (i < nongCamp.nongIds.length) {
        const user = await User.findById(nongCamp.nongIds[i++])
        if (!user) {
            continue
        }
        await user.updateOne({ nongCampIds: swop(nongCamp._id, null, user.nongCampIds) })
        nongIds = swop(user._id, null, nongIds)
        camp.nongHaveBottleMapIds.delete(user.id)
    }
    await nongCamp?.deleteOne()
    camp.nongShertSize.forEach((v, k) => {
        camp.nongShertSize.set(k, calculate(v, 0, baan.nongShertSize.get(k)))
    })
    const boyP = await Place.findById(baan.boySleepPlaceId)
    if (boyP) {
        await boyP.updateOne({ boySleepBaanIds: swop(baan._id, null, boyP.boySleepBaanIds) })
        const boyB = await Building.findById(boyP.buildingId)
        if (boyB) {
            await boyB.updateOne({ boySleepBaanIds: swop(baan._id, null, boyB.boySleepBaanIds) })
        }
    }
    const girlP = await Place.findById(baan.girlSleepPlaceId)
    if (girlP) {
        await girlP.updateOne({ girlSleepBaanIds: swop(baan._id, null, girlP.girlSleepBaanIds) })
        const girlB = await Building.findById(girlP.buildingId)
        if (girlB) {
            await girlB.updateOne({ girlSleepBaanIds: swop(baan._id, null, girlB.girlSleepBaanIds) })
        }
    }
    const normalP = await Place.findById(baan?.nomalPlaceId)
    if (normalP) {
        await normalP.updateOne({ normalBaanIds: swop(baan._id, null, normalP.normalBaanIds) })
        const normalB = await Building.findById(normalP.buildingId)
        if (normalB) {
            await normalB.updateOne({ normalBaanIds: swop(baan._id, null, normalB.normalBaanIds) })
        }
    }
    camp.peeShertSize.forEach((v, k) => {
        camp.peeShertSize.set(k, calculate(v, 0, baan?.peeShertSize.get(k)))
    })
    await camp.updateOne({
        peeHaveBottle: calculate(camp.peeHaveBottle, 0, baan.peeHaveBottle),
        nongHaveBottle: calculate(camp.nongHaveBottle, 0, baan.nongHaveBottle),
        nongIds,
        nongHaveBottleMapIds: camp.nongHaveBottleMapIds,
        nongShertSize: camp.nongShertSize,
        peeIds,
        peeHaveBottleMapIds: camp.peeHaveBottleMapIds,
        peeModelIds,
        peeShertSize: camp.peeShertSize,
        peeShertManageIds,
        nongShertManageIds,
        baanIds: swop(baan._id, null, camp.baanIds),
        nongModelIds: swop(baan.nongModelId as mongoose.Types.ObjectId, null, camp.nongModelIds)
    })
    await CampStyle.findByIdAndDelete(baan.styleId)
    await baan.deleteOne()
    res.status(200).json({ success: true })
}
export async function saveDeleteBaan(req: express.Request, res: express.Response, next: express.NextFunction) {
    const baan = await Baan.findById(req.params.id)
    if (!baan) {
        sendRes(res, false)
        return
    }
    const camp = await Camp.findById(baan.campId)
    const user = await getUser(req)
    if (!camp || !user) {
        sendRes(res, false)
        return
    }
    if (user.role != 'admin' && !user.authorizeIds.includes(camp._id)) {
        return res.status(401).json({ success: false })
    }
    if (baan.nongIds.length || baan.peeIds.length || baan.songIds.length) {
        return res.status(400).json({ success: false, message: 'this baan is not save to delete' })
    }
    var peeModelIds = camp.peeModelIds
    var i = 0
    while (i < baan.peeModelIds.length) {
        const peeCamp = await PeeCamp.findById(baan.peeModelIds[i++])
        if (!peeCamp) {
            continue
        }
        peeModelIds = swop(peeCamp._id, null, peeModelIds)
        peeCamp.deleteOne()
    }
    const boyP = await Place.findById(baan.boySleepPlaceId)
    if (boyP) {
        await boyP.updateOne({ boySleepBaanIds: swop(baan._id, null, boyP.boySleepBaanIds) })
        const boyB = await Building.findById(boyP.buildingId)
        if (boyB) {
            await boyB.updateOne({ boySleepBaanIds: swop(baan._id, null, boyB.boySleepBaanIds) })
        }
    }
    const girlP = await Place.findById(baan.girlSleepPlaceId)
    if (girlP) {
        await girlP.updateOne({ girlSleepBaanIds: swop(baan._id, null, girlP.girlSleepBaanIds) })
        const girlB = await Building.findById(girlP.buildingId)
        if (girlB) {
            await girlB.updateOne({ girlSleepBaanIds: swop(baan._id, null, girlB.girlSleepBaanIds) })
        }
    }
    const normalP = await Place.findById(baan?.nomalPlaceId)
    if (normalP) {
        await normalP.updateOne({ normalBaanIds: swop(baan._id, null, normalP.normalBaanIds) })
        const normalB = await Building.findById(normalP.buildingId)
        if (normalB) {
            await normalB.updateOne({ normalBaanIds: swop(baan._id, null, normalB.normalBaanIds) })
        }
    }
    await camp.updateOne({ nongModelIds: swop(baan.nongModelId as mongoose.Types.ObjectId, null, camp.nongModelIds), peeModelIds })
    await NongCamp.findByIdAndDelete(baan.nongModelId)
    await CampStyle.findByIdAndDelete(baan.styleId)
    await baan.deleteOne()
    res.status(200).json({ success: true })
}
export async function saveDeletePart(req: express.Request, res: express.Response, next: express.NextFunction) {
    const part = await Part.findById(req.params.id)
    if (!part) {
        sendRes(res, false)
        return
    }
    const camp = await Camp.findById(part.campId)
    const user = await getUser(req)
    if (!camp || !user) {
        sendRes(res, false)
        return
    }
    if (user.role != 'admin' && !user.authorizeIds.includes(camp._id)) {
        return res.status(401).json({ success: false })
    }
    if (part.petoIds.length || part.peeIds.length || part.actionPlanIds.length || part.workItemIds.length) {
        return res.status(400).json({ success: false, message: 'this baan is not save to delete' })
    }
    var i = 0
    while (i < part.peeModelIds.length) {
        const peeCamp = await PeeCamp.findById(part.peeModelIds[i++])
        if (!peeCamp) {
            continue
        }
        camp.updateOne({ peeModelIds: swop(peeCamp._id, null, camp.peeModelIds) })
        peeCamp?.deleteOne()
    }
    camp.updateOne({ petoModelIds: swop(part.petoModelId as mongoose.Types.ObjectId, null, camp.petoModelIds) })
    await NongCamp.findByIdAndDelete(part?.petoModelId)
    part.deleteOne()
    res.status(200).json({ success: true })
}
export async function forceDeletePart(req: express.Request, res: express.Response, next: express.NextFunction) {
    forceDeletePartRaw(new mongoose.Types.ObjectId(req.params.id))
    res.status(200).json({ success: true })
}
async function forceDeletePartRaw(partId: mongoose.Types.ObjectId) {
    const part = await Part.findById(partId)
    if (!part) {
        return
    }
    const camp = await Camp.findById(part.campId)
    if (!camp) {
        return
    }
    var petoShertManageIds = camp.petoShertManageIds
    var peeShertManageIds = camp.peeShertManageIds
    var actionPlanIds = camp.actionPlanIds
    var petoIds = camp.petoIds
    var peeIds = camp.peeIds
    var peeModelIds = camp.peeModelIds
    var workItemIds = camp.workItemIds
    var peeHelthIsueIds = camp.peeHelthIsueIds
    var petoHelthIsueIds = camp.petoHelthIsueIds
    var i = 0
    while (i < part.petoHelthIsueIds.length) {
        const helthIsue = await HelthIsue.findById(part.petoHelthIsueIds[i++])
        if (!helthIsue) {
            continue
        }
        petoHelthIsueIds = swop(helthIsue._id, null, petoHelthIsueIds)
        const user = await User.findById(helthIsue.userId)
        if (!user) {
            continue
        }
        if (user.helthIsueId !== (helthIsue._id)) {
            await helthIsue.deleteOne()
        }
    }
    i = 0
    while (i < part.peeHelthIsueIds.length) {
        const helthIsue = await HelthIsue.findById(part.peeHelthIsueIds[i++])
        if (!helthIsue) {
            continue
        }
        peeHelthIsueIds = swop(helthIsue._id, null, peeHelthIsueIds)
        const user = await User.findById(helthIsue.userId)
        if (!user) {
            continue
        }
        const shertManage = await ShertManage.findById(part.mapShertManageIdByUserId.get(user.id))
        if (!shertManage) {
            continue
        }
        const peeCamp = await PeeCamp.findById(shertManage.campModelId)
        if (!peeCamp) {
            continue
        }
        const baan = await Baan.findById(peeCamp.baanId)
        if (!baan) {
            continue
        }
        await baan.updateOne({ peeHelthIsueIds: swop(helthIsue._id, null, baan.peeHelthIsueIds) })
        if (user.helthIsueId !== (helthIsue._id)) {
            await helthIsue.deleteOne()
        }
    }
    camp?.petoShertSize.forEach((v, k) => {
        camp.petoShertSize.set(k, calculate(v, 0, part?.petoShertSize.get(k)))
    })
    camp?.peeShertSize.forEach((v, k) => {
        camp.peeShertSize.set(k, calculate(v, 0, part?.peeShertSize.get(k)))
    })
    i = 0
    while (i < part.actionPlanIds.length) {
        const actionPlan = await ActionPlan.findById(part.actionPlanIds[i++])
        if (!actionPlan) {
            continue
        }
        var j = 0
        while (j < actionPlan.placeIds.length) {
            const place = await Place.findById(actionPlan.placeIds[j++])
            if (!place) {
                continue
            }
            await place.updateOne({ actionPlanIds: swop(actionPlan._id, null, place.actionPlanIds) })
            const building = await Building.findById(place.buildingId)
            if (!building) {
                continue
            }
            await building.updateOne({ actionPlanIds: swop(actionPlan._id, null, building.actionPlanIds) })
        }
        actionPlanIds = swop(actionPlan._id, null, actionPlanIds)
    }
    i = 0
    while (i < part.workItemIds.length) {
        const workItem = await WorkItem.findById(part.workItemIds[i++])
        if (!workItem) {
            continue
        }
        if (workItem.fromId) {
            const from = await WorkItem.findById(workItem.fromId)
            if (from) {
                await from.updateOne({ linkOutIds: swop(workItem._id, null, from.linkOutIds) })
            }
        }
        workItemIds = swop(workItem?._id, null, workItemIds)
        await deleteWorkingItemRaw(workItem._id)
    }

    i = 0
    while (i < part.petoShertManageIds.length) {
        const shertManage = await ShertManage.findById(part.petoShertManageIds[i++])
        if (!shertManage) {
            continue
        }
        const user = await User.findById(shertManage.userId)
        if (!user) {
            continue
        }
        await user.updateOne({
            shertManageIds: swop(shertManage._id, null, user.shertManageIds)
        })
        petoShertManageIds = swop(shertManage._id, null, petoShertManageIds)
        shertManage?.deleteOne()
    }
    i = 0
    while (i < part.peeShertManageIds.length) {
        const shertManage = await ShertManage.findById(part.peeShertManageIds[i++])
        if (!shertManage) {
            continue
        }
        const user = await User.findById(shertManage.userId)
        if (!user) {
            continue
        }
        await user?.updateOne({
            shertManageIds: swop(shertManage._id, null, user.shertManageIds)
        })
        peeShertManageIds = swop(shertManage._id, null, peeShertManageIds)
        const peeCamp = await PeeCamp.findById(shertManage.campModelId)
        if (!peeCamp) {
            continue
        }
        const baan = await Baan.findById(peeCamp.baanId)
        if (!baan) {
            continue
        }
        baan.updateOne({ peeShertManageIds: swop(shertManage?._id, null, part.peeShertManageIds) })
        baan.peeShertSize.set(shertManage.size as string, calculate(baan.peeShertSize.get(shertManage.size as string), 0, 1))
        await shertManage.deleteOne()
        await baan.updateOne({ peeShertSize: baan.peeShertSize })
    }
    i = 0
    while (i < part.peeModelIds.length) {
        const peeCamp = await PeeCamp.findById(part.peeModelIds[i++])
        if (!peeCamp) {
            continue
        }
        const baan = await Baan.findById(peeCamp.baanId)
        if (!baan) {
            continue
        }
        var j = 0
        while (j < peeCamp.peeIds.length) {
            const user = await User.findById(peeCamp.peeIds[j++])
            if (!user) {
                continue
            }
            if (user.haveBottle) {
                await baan?.updateOne({ peeHaveBottle: baan.peeHaveBottle - 1 })
            }


            await baan.updateOne({ peeIds: swop(user._id, null, baan.peeIds) })
            peeIds = swop(user._id, null, peeIds)
            await user.updateOne({ peeCampIds: swop(peeCamp._id, null, user.peeCampIds) })
            camp.peeHaveBottleMapIds.delete(user.id)
        }
        peeModelIds = swop(peeCamp._id, null, peeModelIds)
        await peeCamp.deleteOne()
    }
    const petoCamp = await PetoCamp.findById(part.petoModelId)
    if (!petoCamp) {
        return
    }
    while (i < petoCamp?.petoIds.length) {
        const user = await User.findById(petoCamp.petoIds)
        if (!user) {
            continue
        }
        petoIds = swop(user._id, null, petoIds)
        await user.updateOne({ petoCampIds: swop(petoCamp._id, null, user.petoCampIds) })
        camp.petoHaveBottleMapIds.delete(user.id)
    }
    petoCamp.deleteOne()
    await camp.updateOne({
        partIds: swop(part._id, null, camp.partIds),
        petoModelIds: swop(part.petoModelId as mongoose.Types.ObjectId, null, camp.petoModelIds),
        peeHaveBottle: calculate(camp.peeHaveBottle, 0, part.peeHaveBottle),
        petoHaveBottle: calculate(camp.petoHaveBottle, 0, part.petoHaveBottle),
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
    await part.deleteOne()
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
    if (!partNameContainer) {
        sendRes(res, false)
        return
    }
    var i = 0
    while (i < partNameContainer.partIds.length) {
        await forceDeletePartRaw(partNameContainer.partIds[i++])
    }
    res.status(200).json({ success: true })
}
export async function addAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { userIds }: { userIds: string[] } = req.body
    var i = 0
    while (i < userIds.length) {
        await User.findByIdAndUpdate(userIds[i++], { role: 'admin', fridayActEn: true, fridayAuth: true })
    }
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
    const { campId, userIds }: { campId: string, userIds: string[] } = req.body
    const camp = await Camp.findById(campId)
    if (!camp) {
        sendRes(res, false)
        return
    }
    var i = 0
    while (i < userIds.length) {
        const user = await User.findById(userIds[i++])
        if (!user) {
            continue
        }
        await user.updateOne({ authorizeIds: swop(null, camp._id, user.authorizeIds) })
        camp.boardIds.push(user._id)
    }
    await camp.updateOne({ boardIds: camp.boardIds })
    res.status(200).json({ success: true })
}
export async function removeBoard(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { campId, userId } = req.body
    const camp = await Camp.findById(campId)
    const user = await User.findById(userId)
    if (!user || !camp) {
        sendRes(res, false)
        return
    }
    await camp?.updateOne({ boardIds: swop(user._id, null, camp.boardIds) })
    await user?.updateOne({ authorizeIds: swop(camp._id, null, user.authorizeIds) })
    sendRes(res, true)
}
export async function updateCamp(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user = await getUser(req)
    const camp = await Camp.findById(req.params.id)
    if (!camp) {
        sendRes(res, false)
        return
    }
    if ((user?.role != 'admin' && !user?.authorizeIds.includes(camp._id))) {
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
export async function createBaanByGroup(req: express.Request, res: express.Response, next: express.NextFunction) {
    const camp: InterCampBack | null = await Camp.findById(req.params.id)
    if (!camp) {
        sendRes(res, false)
        return
    }
    const allGroup: Group[] = ['A', 'B', 'C', 'Dog', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T']
    //var baans: Map<'A' | 'B' | 'C' | 'Dog' | 'E' | 'F' | 'G' | 'H' | 'J' | 'K' | 'L' | 'M' | 'N' | 'P' | 'Q' | 'R' | 'S' | 'T', InterBaanFront> = new Map<'A' | 'B' | 'C' | 'Dog' | 'E' | 'F' | 'G' | 'H' | 'J' | 'K' | 'L' | 'M' | 'N' | 'P' | 'Q' | 'R' | 'S' | 'T', InterBaanFront>()
    var memberMap = new Map<Group, mongoose.Types.ObjectId[]>()
    var i = 0
    while (i < 18) {
        memberMap.set(allGroup[i++], [])
        //const baan=await addBaanRaw(camp,allGroup[i])
        //baans.set(allGroup[i++],baan)
    }
    i = 0
    var members: mongoose.Types.ObjectId[] = []
    camp.peePassIds.forEach((v, k) => {
        members.push(k)
    })
    while (i < members.length) {
        const user = await User.findById(members[i++])
        if (!user || !user.group) {
            continue
        }
        memberMap.get(user.group)?.push(user._id)
    }
    i = 0
    while (i < 18) {
        const baan = await addBaanRaw(camp, allGroup[i], allGroup[i])
        camp.groupRefMap.set(allGroup[i],baan._id)
        await addPeeRaw(memberMap.get(allGroup[i++]) as mongoose.Types.ObjectId[], baan._id)
    }
    i = 0
    const baan = await Baan.findById(camp.baanBordId)
    if (!baan) {
        sendRes(res, false)
        return
    }
    const buf = baan.peeIds.map((e) => (e))
    while (i < buf.length) {
        const user = await User.findById(buf[i++])
        if (!user || !user.group) {
            continue
        }
        const baanId: mongoose.Types.ObjectId = camp.groupRefMap.get(user.group) as mongoose.Types.ObjectId
        await changeBaanRaw([user._id], baanId, res)
    }
    sendRes(res, true)
}
async function deleteWorkingItemRaw(workItemId: mongoose.Types.ObjectId) {
    const workItem = await WorkItem.findById(workItemId)
    if (!workItem) {
        return
    }
    const camp = await Camp.findById(workItem.campId)
    const part = await Part.findById(workItem.partId)
    if (!camp || !part) {
        return
    }
    await part.updateOne({ workItemIds: swop(workItem._id, null, part.workItemIds) })
    await camp.updateOne({ workItemIds: swop(workItem._id, null, camp.workItemIds) })
    var i = 0
    while (i < workItem.linkOutIds.length) {
        if (workItem.linkOutIds[i++]) {
            await deleteWorkingItemRaw(workItem.linkOutIds[i - 1])
        }
    }
    await workItem.deleteOne()
}
export async function getPartNames(req: express.Request, res: express.Response, next: express.NextFunction) {
    const partNames = await PartNameContainer.find()
    res.status(200).json(partNames)
}
export async function addAllGroup(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { campId, group }: { campId: mongoose.Types.ObjectId, group: Group } = req.body
    const camp = await Camp.findById(campId)
    const user = await getUser(req)
    if (!camp || !user || !camp.boardIds.includes(user._id)) {
        sendRes(res, false)
        return
    }
    if (!camp.ready.includes(group)) {
        sendRes(res, false)
        return
    }
    const { ready } = camp
    ready.push(group)
    await camp.updateOne({ ready })
    if (ready.length < 18) {
        sendRes(res, true)
        return
    }
    var i = 0
    while (i < camp.baanIds.length) {
        const baan = await Baan.findById(camp.baanIds[i++])
        if (!baan || !baan.groupRef) {
            continue
        }
        var j = 0
        while (j < baan.nongIds.length) {
            const user = await User.findById(baan.nongIds[j++])
            await user?.updateOne({ group: baan.groupRef })
        }
    }
}
export async function getAllRemainPartName(req: express.Request, res: express.Response, next: express.NextFunction) {
    const camp = await Camp.findById(req.params.id)
    if (!camp) {
        sendRes(res, false)
        return
    }
    const partNameContainers = await PartNameContainer.find()
    const partNameIds = partNameContainers.map((partNameContainer) => (partNameContainer._id))
    const buf = removeDupicate(partNameIds, camp.partNameIds)
    var i = 0
    const out: MyMap[] = []
    while (i < buf.length) {
        const partNameContainer = await PartNameContainer.findById(buf[i++])
        if (!partNameContainer) {
            continue
        }
        const { _id: key, name } = partNameContainer
        const value = name as string
        out.push({ key, value })
    }
    res.status(200).json(out)
}
