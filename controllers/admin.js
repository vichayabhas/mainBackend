const Baan = require("../models/Baan")
const Camp = require("../models/Camp")
const NongCamp = require("../models/NongCamp")
const Part = require("../models/Part")
const PeeCamp = require("../models/PeeCamp")
const PetoCamp = require("../models/PetoCamp")

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
        part.peeModelIds.push(peeCamp._id)
        baan.peeModelIds.push(peeCamp._id)
        camp.peeModelIds.push(peeCamp._id)
        baan.mapPeeCampIdByPartId.set(partId, peeCamp._id)
        part.mapPeeCampIdByBaanId.set(baan._id, peeCamp._id)
    })
    camp.baanIds.push(baan._id)
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
        baan.mapPeeCampIdByPartId.set(part._id, peeCamp._id)
        part.mapPeeCampIdByBaanId.set(baanId, peeCamp._id)
    })
    res.status(201).json({ success: true, data: part })
}
exports.updateBaanName = async (req, res, next) => {
    try {
        const { name, fullName, baanId } = req.body
        const baan = await Baan.findByIdAndUpdate(baanId, { name, fullName })
        res.status(200).json({
            success: true,
            data: baan
        })
    } catch (err) {
        res.status(400).json({ success: false })
    }
}