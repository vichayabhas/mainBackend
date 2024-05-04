const Baan = require("../models/Baan").default
const Camp = require("../models/Camp").default
const NongCamp = require("../models/NongCamp").default
const Part = require("../models/Part").default
const PeeCamp = require("../models/PeeCamp").default
const PetoCamp = require("../models/PetoCamp").default

exports.addBaan=async(req,res,next)=>{
    const {campId,name}=req.body
    const baan=await Baan.create({campId,name})
    const nongCamp= await NongCamp.create({campId,baanId:baan._id})
    baan.updateOne({nongModelId:nongCamp._id})
    const camp= await Camp.findById(campId)
    camp.campModelIds.push(nongCamp._id)
    camp.partIds.forEach(async (partId) => {
        const part = await Part.findById(partId)
        const peeCamp=await PeeCamp.create({campId,baanId:baan._id,partId})
        part.peeModelIds.push(peeCamp._id)
        baan.peeModelIds.push(peeCamp._id)
        camp.campModelIds.push(peeCamp._id)
        baan.mapPeeCampIdByPartId.set(partId,peeCamp._id)
        part.mapPeeCampIdByBaanId.set(baan._id,peeCamp._id)
    })
    camp.baanIds.push(baan._id)
    res.status(201).json({success:true,data:baan})
}
exports.addPart=async(req,res,next)=>{
    const{campId,name}=req.body
    const part=await Part.create({campId,name})
    const camp=await Camp.findById(campId)
    const petoCamp=await PetoCamp.create({campId,partId:part._id})
    camp.campModelIds.push(petoCamp._id)
    camp.partIds.push(part._id)
    camp.baanIds.forEach(async (baanId)=>{
        const baan=await Baan.findById(baanId)
        const peeCamp=await PeeCamp.create({baanId,campId,partId:part._id})
        baan.peeModelIds.push(peeCamp._id)
        camp.campModelIds.push(peeCamp._id)
        part.peeModelIds.push(peeCamp._id)
        baan.mapPeeCampIdByPartId.set(part._id,peeCamp._id)
        part.mapPeeCampIdByBaanId.set(baanId,peeCamp._id)
    })
    res.status(201).json({success:true,data:part})
}