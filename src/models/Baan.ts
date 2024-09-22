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
        type: mongoose.Schema.ObjectId,
        default: null
    },
    girlSleepPlaceId: {
        type: mongoose.Schema.ObjectId,
        default: null
    },
    nomalPlaceId: {
        type: mongoose.Schema.ObjectId,
        default: null
    },
    mapShertManageIdByUserId: {
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
    // nongHaveHelthIshueIds: {
    //     type: [mongoose.Schema.ObjectId],
    //     default: []
    // },
    // nongMapHelthIshueIdByUserId: {
    //     type: Map,
    //     default: new Map()
    // },
    // peeHaveHelthIshueIds: {
    //     type: [mongoose.Schema.ObjectId],
    //     default: []
    // },
    // peeMapHelthIshueIdByUserId: {
    //     type: Map,
    //     default: new Map()
    // }
    nongShertManageHaveHelthIshueIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    peeShertManageHaveHelthIshueIds: {
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