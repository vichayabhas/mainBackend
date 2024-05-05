const ActionPlan = require("../models/ActionPlan")
const Baan = require("../models/Baan")
const Camp = require("../models/Camp")
const CampStyle = require("../models/CampStyle")
const HelthIsue = require("../models/HelthIsue")
const NameContainer = require("../models/NameContainer")
const NongCamp = require("../models/NongCamp")
const Part = require("../models/Part")
const PeeCamp = require("../models/PeeCamp")
const PetoCamp = require("../models/PetoCamp")
const ShertManage = require("../models/ShertManage")
const User = require("../models/User")
const WorkItem = require("../models/WorkItem")
const { swop } = require("./setup")
exports.addBaan = async (req, res, next) => {
    const { campId, name, fullName } = req.body
    const baan = await Baan.create({ campId, name, fullName })
    const nongCamp = await NongCamp.create({ campId, baanId: baan._id })
    baan.updateOne({ nongModelId: nongCamp._id })
    const camp = await Camp.findById(campId)
    camp.nongModelIds.push(nongCamp._id)
    camp.partIds.forEach(async (partId) => {
        const part = await Part.findById(partId)
        const peeCamp = await PeeCamp.create({ campId, baanId: baan._id, partId })
        setDefalse(peeCamp._id)
        part.peeModelIds.push(peeCamp._id)
        baan.peeModelIds.push(peeCamp._id)
        camp.peeModelIds.push(peeCamp._id)
        baan.mapPeeCampIdByPartId.set(partId, peeCamp._id)
        part.mapPeeCampIdByBaanId.set(baan._id, peeCamp._id)
    })
    const campStyle = await CampStyle.create({ refId: baan._id, types: 'baan' })
    camp.baanIds.push(baan._id)
    baan.updateOne({ styleId: campStyle._id })
    res.status(201).json({ success: true, data: baan })
}
exports.addPart = async (req, res, next) => {
    const { campId, nameId } = req.body
    const part = await Part.create({ campId, nameId })
    const camp = await Camp.findById(campId)
    const petoCamp = await PetoCamp.create({ campId, partId: part._id })
    camp.petoModelIds.push(petoCamp._id)
    camp.partIds.push(part._id)
    part.updateOne({ petoModelId: petoCamp._id })
    camp.baanIds.forEach(async (baanId) => {
        const baan = await Baan.findById(baanId)
        const peeCamp = await PeeCamp.create({ baanId, campId, partId: part._id })
        baan.peeModelIds.push(peeCamp._id)
        camp.peeModelIds.push(peeCamp._id)
        part.peeModelIds.push(peeCamp._id)
        setDefalse(peeCamp._id)
        baan.mapPeeCampIdByPartId.set(part._id, peeCamp._id)
        part.mapPeeCampIdByBaanId.set(baanId, peeCamp._id)
    })
    res.status(201).json({ success: true, data: part })
}
exports.updateBaan = async (req, res, next) => {
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
    peeCamp.mapArrayStringNumberByName.set(name[0], peeCamp.arrayString1)
    peeCamp.mapArrayStringNumberByName.set(name[1], peeCamp.arrayString2)
    peeCamp.mapArrayStringNumberByName.set(name[2], peeCamp.arrayString3)
    peeCamp.mapArrayStringNumberByName.set(name[3], peeCamp.arrayString4)
    peeCamp.mapArrayStringNumberByName.set(name[4], peeCamp.arrayString5)
    peeCamp.mapMapNumberByName.set(name[5], peeCamp.map1)
    peeCamp.mapMapNumberByName.set(name[6], peeCamp.map2)
    peeCamp.mapMapNumberByName.set(name[7], peeCamp.map3)
    peeCamp.mapMapNumberByName.set(name[8], peeCamp.map4)
    peeCamp.mapMapNumberByName.set(name[9], peeCamp.map5)
}
exports.createCamp = async (req, res, next) => {
    try {
        const { nameId, round, dateStart, dateEnd, boardIds } = req.body
        const camp = await Camp.create({ nameId, round, dateStart, dateEnd, boardIds })
        const campStyle = await CampStyle.create({ refId: camp._id, types: 'camp' })
        camp.updateOne({ campStyleId: campStyle._id })
        boardIds.forEach(async (boardId) => {
            const user = await User.findById(boardId)
            user.authorizeIds.push(camp._id)
        })
        const nameContainer = await NameContainer.findById(nameId)
        nameContainer.campIds.push(camp._id)
        res.status(201).json({ success: true, data: camp })
    } catch (err) {
        res.status(400).json({ success: false })
    }
}
exports.deleteCamp = async (req, res, next) => {
    try {
        const campId = req.params.id
        const camp = await Camp.findById(campId)
        camp.peeShertManageIds.forEach(async (peeShertManageId) => {
            await ShertManage.findByIdAndDelete(peeShertManageId)
        })
        camp.nongShertManageIds.forEach(async (peeShertManageId) => {
            await ShertManage.findByIdAndDelete(peeShertManageId)
        })
        camp.petoShertManageIds.forEach(async (peeShertManageId) => {
            await ShertManage.findByIdAndDelete(peeShertManageId)
        })
        camp.boardIds.forEach(async (boardId) => {
            const user = await User.findById(boardId)
            const news = swop(camp._id, null, user.authorizeIds)
            user.updateOne({ authorizeIds: news })
        })
        camp.nongModelIds.forEach(async (nongModelId) => {
            const nongCamp = await NongCamp.findById(nongModelId)
            nongCamp.nongIds.forEach(async (userId) => {
                const user = await User.findById(userId)
                const nongCampIds = swop(nongCamp._id, null, user.nongCampIds)
                user.updateOne({ nongCampIds })
            })
            nongCamp.deleteOne()
        })
        camp.peeModelIds.forEach(async (nongModelId) => {
            const nongCamp = await PeeCamp.findById(nongModelId)
            nongCamp.peeIds.forEach(async (userId) => {
                const user = await User.findById(userId)
                const peeCampIds = swop(nongCamp._id, null, user.peeCampIds)
                user.updateOne({ peeCampIds })
            })
            nongCamp.deleteOne()
        })
        camp.petoModelIds.forEach(async (nongModelId) => {
            const nongCamp = await PetoCamp.findById(nongModelId)
            nongCamp.petoIds.forEach(async (userId) => {
                const user = await User.findById(userId)
                const petoCampIds = swop(nongCamp._id, null, user.petoCampIds)
                user.updateOne({ petoCampIds })
            })
            nongCamp.deleteOne()
        })
        camp.baanIds.forEach(async (baanId) => {
            const baan = await Baan.findById(baanId)
            await CampStyle.findByIdAndDelete(baan.styleId)
            baan.deleteOne()
        })
        await CampStyle.findByIdAndDelete(camp.campStyleId)
        camp.nongHelthIsueIds.forEach(async (helthueId) => {
            const helthIsue = await HelthIsue.findById(helthueId)
            const user = await User.findById(helthIsue.userId)
            if (!user.helthIsueId.localeCompare(helthueId)) {
                helthIsue.deleteOne()
            }
        })
        camp.peeHelthIsueIds.forEach(async (helthueId) => {
            const helthIsue = await HelthIsue.findById(helthueId)
            const user = await User.findById(helthIsue.userId)
            if (!user.helthIsueId.localeCompare(helthueId)) {
                helthIsue.deleteOne()
            }
        })
        camp.petoHelthIsueIds.forEach(async (helthueId) => {
            const helthIsue = await HelthIsue.findById(helthueId)
            const user = await User.findById(helthIsue.userId)
            if (!user.helthIsueId.localeCompare(helthueId)) {
                helthIsue.deleteOne()
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
        const campIds=swop(campId,null,name.campIds)
        name.updateOne({campIds})
        camp.deleteOne()
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(400).json({ success: false })
    }
}