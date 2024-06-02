import mongoose from "mongoose";
import { startSize } from "../controllers/setup";
const BaanSchema = new mongoose.Schema({
    name: {
        type: String
    },
    fullName: {
        type: String
    },
    campId: {//camp
        type: mongoose.Schema.ObjectId
    },
    peeIds: {//user
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    nongIds: {//user
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    nongHelthIsueIds: {//helth
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    peeHelthIsueIds: {//helth
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    nongShertSize: {// size    count
        type: Map,
        default: startSize()
    },
    peeShertSize: {// size    count
        type: Map,
        default: startSize()
    },
    songIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    nongHaveBottle: {
        type: Number,
        default: 0
    },
    peeHaveBottle: {
        type: Number,
        default: 0
    },
    nongHaveBottleMapIds: {
        type: Map,
        default: new Map<mongoose.ObjectId,boolean>()
    },
    peeHaveBottleMapIds: {
        type: Map,
        default: new Map<mongoose.ObjectId,boolean>()
    },
    mapPeeCampIdByPartId: {
        type: Map,
        default: new Map<mongoose.ObjectId,mongoose.ObjectId>()
    },
    peeModelIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    nongModelId: {
        type: mongoose.Schema.ObjectId
    },
    nongShertManageIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    peeShertManageIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    link: {
        type: String
    },
    styleId: {
        type: mongoose.Schema.ObjectId
    },
    boySleepPlaceId: {
        type: mongoose.Schema.ObjectId
    },
    girlSleepPlaceId: {
        type: mongoose.Schema.ObjectId
    },
    nomalPlaceId: {
        type: mongoose.Schema.ObjectId
    },
    mapShertManageIdByUserId:{
        type: Map,
        default: new Map<mongoose.ObjectId,mongoose.ObjectId>()
    }
})
export default mongoose.model('Baan', BaanSchema)