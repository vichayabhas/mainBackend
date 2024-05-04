const { default: mongoose } = require("mongoose");
const { startSize } = require("../controllers/setup");


const PartSchema = new mongoose.Schema({
    name: {
        type: String
    },
    campId: {//camp
        type: String
    },
    peeIds: {//user
        type: [String],
        default: []
    },
    petoIds: {//user
        type: [String],
        default: []
    },
    peeHelthIsueIds: {//helth
        type: [String],
        default: []
    },
    petoHelthIsueIds: {//helth
        type: [String],
        default: []
    },
    peeShertSize: {// size    count
        type: Map,
        default: startSize
    },
    petoShertSize: {// size    count
        type: Map,
        default: startSize
    },
    peeHaveBottle: {
        type: Number,
        default: 0
    },
    petoHaveBottle: {
        type: Number,
        default: 0
    },
    nongHaveBottleMapIds:{
        type:Map,
        default:new Map
    },
    peeHaveBottleMapIds:{
        type:Map,
        default:new Map
    },
    petoHaveBottleMapIds:{
        type:Map,
        default:new Map
    },
    peeModelIds:{//peeCamp
        type:[String],
        default:[]
    },
    petoModelId:{
        type:String
    },
    mapPeeCampIdByBaanId:{
        type:Map,
        default:new Map
    },
    mapSizeByPeeId:{
        type:Map,
        default:new Map
    },
    mapSizeByPetoId:{
        type:Map,
        default:new Map
    },
    peeShertManageIds:{
        type:[String],
        default:[]
    },
    petoShertManageIds:{
        type:[String],
        default:[]
    },
    actionPlanIds:{
        type:[String],
        default:[]
    },
    workItemIds:{
        type:[String],
        default:[]
    }
})
module.exports = mongoose.model('Part', PartSchema)