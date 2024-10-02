import mongoose from "mongoose";
import { startSize } from "../controllers/setup";
const BaanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
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
    nongIds: {//user
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    nongHeathIssueIds: {//heath
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    peeHeathIssueIds: {//helth
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    nongShirtSize: {// size    count
        type: Map,
        default: startSize()
    },
    peeShirtSize: {// size    count
        type: Map,
        default: startSize()
    },
    songIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    // nongHaveBottle: {
    //     type: Number,
    //     default: 0
    // },
    // peeHaveBottle: {
    //     type: Number,
    //     default: 0
    // },
    // nongHaveBottleMapIds: {
    //     type: Map,
    //     default: new Map<mongoose.ObjectId, boolean>()
    // },
    // peeHaveBottleMapIds: {
    //     type: Map,
    //     default: new Map<mongoose.ObjectId, boolean>()
    // },
    mapPeeCampIdByPartId: {
        type: Map,
        default: new Map<mongoose.ObjectId, mongoose.ObjectId>()
    },
    peeModelIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    nongModelId: {
        type: mongoose.Schema.ObjectId
    },
    nongCampMemberCardIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    peeCampMemberCardIds: {
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
        type: mongoose.Schema.ObjectId,
        default: null
    },
    girlSleepPlaceId: {
        type: mongoose.Schema.ObjectId,
        default: null
    },
    normalPlaceId: {
        type: mongoose.Schema.ObjectId,
        default: null
    },
    mapCampMemberCardIdByUserId: {
        type: Map,
        default: new Map<mongoose.ObjectId, mongoose.ObjectId>()
    },
    groupRef: {
        type: String,
        enum: ['A', 'B', 'C', 'Dog', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'null'],
        default: 'null'
    }, nongSleepIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    peeSleepIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    chatIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    mdTime: {
        type: Date,
        default: new Date(Date.now())
    },
    peeChatIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    nongChatIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    nongSendMessage: {
        type: Boolean,
        default: false
    },
    // nongHaveHeathIssueIds: {
    //     type: [mongoose.Schema.ObjectId],
    //     default: []
    // },
    // nongMapHeathIssueIdByUserId: {
    //     type: Map,
    //     default: new Map()
    // },
    // peeHaveHeathIssueIds: {
    //     type: [mongoose.Schema.ObjectId],
    //     default: []
    // },
    // peeMapHeathIssueIdByUserId: {
    //     type: Map,
    //     default: new Map()
    // }
    nongCampMemberCardHaveHeathIssueIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    peeCampMemberCardHaveHeathIssueIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    nongHaveBottleIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    peeHaveBottleIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },

})
export default mongoose.model('Baan', BaanSchema)