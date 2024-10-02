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
    peeHeathIssueIds: {//helth
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    petoHeathIssueIds: {//helth
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    peeShirtSize: {// size    count
        type: Map,
        default: startSize()
    },
    petoShirtSize: {// size    count
        type: Map,
        default: startSize()
    },
    // peeHaveBottle: {
    //     type: Number,
    //     default: 0
    // },
    // petoHaveBottle: {
    //     type: Number,
    //     default: 0
    // },
    // peeHaveBottleMapIds: {
    //     type: Map,
    //     default: new Map
    // },
    // petoHaveBottleMapIds: {
    //     type: Map,
    //     default: new Map
    // },
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
    peeCampMemberCardIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    petoCampMemberCardIds: {
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
    mapCampMemberCardIdByUserId: {
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
    isAuth: {
        type: Boolean,
        required: true
    },
    // peeHaveHeathIssueIds: {
    //     type: [mongoose.Schema.ObjectId],
    //     default: []
    // },
    // peeMapHeathIssueIdByUserId: {
    //     type: Map,
    //     default: new Map()
    // },
    // petoHaveHeathIssueIds: {
    //     type: [mongoose.Schema.ObjectId],
    //     default: []
    // },
    // petoMapHeathIssueIdByUserId: {
    //     type: Map,
    //     default: new Map()
    // },
    petoSleepIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    peeCampMemberCardHaveHeathIssueIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    petoCampMemberCardHaveHeathIssueIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    peeHaveBottleIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    petoHaveBottleIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
})
export default mongoose.model('Part', PartSchema)