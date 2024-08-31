import mongoose from "mongoose";
import { startSize } from "../controllers/setup";
const PartSchema = new mongoose.Schema({
    nameId: {
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    campId: {//camp
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    peeIds: {//user
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    petoIds: {//user
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    peeHelthIsueIds: {//helth
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    petoHelthIsueIds: {//helth
        type: [mongoose.Schema.ObjectId],
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
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    petoModelId: {
        type: mongoose.Schema.ObjectId
    },
    mapPeeCampIdByBaanId: {
        type: Map,
        default: new Map
    },
    peeShertManageIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    petoShertManageIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    actionPlanIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    workItemIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    placeId: {
        type: mongoose.Schema.ObjectId
    },
    mapShertManageIdByUserId: {
        type: Map,
        default: new Map
    },
    partName: {
        type: String,
        required: true,
    },
    peeSleepIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    chatIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
})
export default mongoose.model('Part', PartSchema)