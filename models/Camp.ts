import mongoose from "mongoose";
import { startSize } from "../controllers/setup";

const campSchema = new mongoose.Schema({
    nameId: {//nameContainer
        type: String
    },
    round: {
        type: Number
    },
    dateStart: {
        type: Date
    },
    dateEnd: {
        type: Date
    },
    boardIds: {//user            
        type: [String],
        default: []
    },
    peeIds: {//user
        type: [String],
        default: []
    },
    nongIds: {//user
        type: [String],
        default: []
    },
    partIds: {//part           
        type: [String],
        default: []
    },
    petoIds: {//user
        type: [String],
        default: []
    },
    authorizeIds: {//user
        type: [String],
        default: []
    },
    nongHelthIsueIds: {//helth
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
    dataLock: {
        type: Boolean,
        default: false
    },
    nongShertSize: {// size    count
        type: Map,
        //value:Number,
        //key:('S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'),
        default: startSize()
    },
    peeShertSize: {// size    count
        type: Map,
        default: startSize()
    },
    petoShertSize: {// size    count
        type: Map,
        default: startSize()
    },
    nongModelIds: {
        type: [String],
        default: []
    },
    peeModelIds: {
        type: [String],
        default: []
    },
    petoModelIds: {
        type: [String],
        default: []
    },
    nongPendingIds: {//user
        type: Map,
        default: new Map
    },
    nongPassIds: {//user    link
        type: Map,
        default: new Map
    },
    open: {
        type: Boolean,
        default: true
    },
    peePassIds: {
        type: Map,
        default: new Map
    },
    songIds: {//song
        type: [String],
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
    petoHaveBottle: {
        type: Number,
        default: 0
    },
    nongHaveBottleMapIds: {
        type: Map,
        default: new Map
    },
    peeHaveBottleMapIds: {
        type: Map,
        default: new Map
    },
    petoHaveBottleMapIds: {
        type: Map,
        default: new Map
    },
    nongSureIds: {//user
        type: [String],
        default: []
    },
    baanIds: {//baan
        type: [String],
        default: []
    },
    nongShertManageIds: {
        type: [String],
        default: []
    },
    peeShertManageIds: {
        type: [String],
        default: []
    },
    petoShertManageIds: {
        type: [String],
        default: []
    },
    link: {
        type: String
    },
    allDone: {
        type: Boolean,
        default: false
    },
    lockChangePickup: {
        type: Boolean,
        default: false
    },
    pictureUrls: {
        type: [String],
        default: []
    },
    campStyleId: {
        type: String
    },
    actionPlanIds: {
        type: [String],
        default: []
    },
    workItemIds: {
        type: [String],
        default: []
    },
    nongPaidIds: {
        type: [String],
        default: []
    },
    nongInterviewIds: {
        type: Map,
        default: new Map
    },
    registerModel: {
        type: String,
        enum: ['noPaid', 'noInterview', 'all']
    },
    lostAndFoundIds:{
        type: [String],
        default: []      
    },
    havePeto: {
        type: Boolean,
        default: true
    }
})
export default mongoose.model('Camp', campSchema)

















