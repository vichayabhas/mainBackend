import mongoose from "mongoose";
import { startSize } from "../controllers/setup";
const PartSchema = new mongoose.Schema({
    nameId: {
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
        default: startSize()
    },
    petoShertSize: {// size    count
        type: Map,
        default: startSize()
    },
    peeHaveBottle: {
        type: Number,
        default: 0
    },
    petoHaveBottle: {
        type: Number,
        default: 0
    },
    peeHaveBottleMapIds: {
        type: Map,
        default: new Map
    },
    petoHaveBottleMapIds: {
        type: Map,
        default: new Map
    },
    peeModelIds: {//peeCamp
        type: [String],
        default: []
    },
    petoModelId: {
        type: String
    },
    mapPeeCampIdByBaanId: {
        type: Map,
        default: new Map
    },
    peeShertManageIds: {
        type: [String],
        default: []
    },
    petoShertManageIds: {
        type: [String],
        default: []
    },
    actionPlanIds: {
        type: [String],
        default: []
    },
    workItemIds: {
        type: [String],
        default: []
    },
    placeId:{
        type:String
    }
})
export default mongoose.model('Part', PartSchema)