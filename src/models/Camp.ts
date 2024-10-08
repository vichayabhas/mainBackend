import mongoose from "mongoose";
import { startSize } from "../controllers/setup";

const campSchema = new mongoose.Schema({
    nameId: {//nameContainer
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    round: {
        type: Number,
        required: true,
    },
    dateStart: {
        type: Date,
        required: true,
    },
    dateEnd: {
        type: Date,
        required: true,
    },
    boardIds: {//user            
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    peeIds: {//user
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    nongIds: {//user
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    partIds: {//part           
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    petoIds: {//user
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    authorizeIds: {//user
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    nongHeathIssueIds: {//helth
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
    dataLock: {
        type: Boolean,
        default: false
    },
    nongShirtSize: {// size    count
        type: Map,
        //value:Number,
        //key:('S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'),
        default: startSize()
    },
    peeShirtSize: {// size    count
        type: Map,
        default: startSize()
    },
    petoShirtSize: {// size    count
        type: Map,
        default: startSize()
    },
    nongModelIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    peeModelIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    petoModelIds: {
        type: [mongoose.Schema.ObjectId],
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
    // petoHaveBottle: {
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
    // petoHaveBottleMapIds: {
    //     type: Map,
    //     default: new Map<mongoose.ObjectId, boolean>()
    // },
    nongSureIds: {//user
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    baanIds: {//baan
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    nongCampMemberCardIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    peeCampMemberCardIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    petoCampMemberCardIds: {
        type: [mongoose.Schema.ObjectId],
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
        type: mongoose.Schema.ObjectId
    },
    actionPlanIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    workItemIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    nongPaidIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    nongInterviewIds: {
        type: Map,
        default: new Map<mongoose.ObjectId, string>()
    },
    registerModel: {
        type: String,
        enum: ['noPaid', 'noInterview', 'all']
    },
    lostAndFoundIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    memberStructure: {
        type: String,
        enum: ['nong->highSchool,pee->1year,peto->2upYear', 'nong->highSchool,pee->2upYear', 'nong->1year,pee->2upYear', 'nong->highSchool,pee->allYear', 'allYearMix']
    },
    logoUrl: {
        type: String
    },
    mapCampMemberCardIdByUserId: {
        type: Map,
        default: new Map
    },
    peeLock: {
        type: Boolean,
        default: false
    },
    registerSheetLink: {
        type: String,
        default: null
    },
    outRoundIds: {//น้องที่ตกรอบ
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    campName: {
        type: String,
        required: true,
    },
    nongSleepIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    peeSleepIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    nongSleepModel: {
        type: String,
        enum: ['นอนทุกคน', 'เลือกได้ว่าจะค้างคืนหรือไม่', 'ไม่มีการค้างคืน'],
        required: true,
    },
    peeSleepModel: {
        type: String,
        enum: ['นอนทุกคน', 'เลือกได้ว่าจะค้างคืนหรือไม่', 'ไม่มีการค้างคืน'],
        required: true,
    },
    groupRefMap: {
        type: Map,
        default: new Map
    },
    baanBoardId: {
        type: mongoose.Schema.ObjectId
    },
    partNameIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    ready: {
        type: [{
            type: String,
            enum: ['A', 'B', 'C', 'Dog', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T']
        }],
        default: []
    },
    partBoardId: {
        type: mongoose.Schema.ObjectId
    },
    partCoopId: {
        type: mongoose.Schema.ObjectId
    },
    partRegisterId: {
        type: mongoose.Schema.ObjectId
    },
    partPeeBaanId: {
        type: mongoose.Schema.ObjectId
    },
    choiseAnswerIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    quasionIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    groupName: {
        type: String,
        default: 'บ้าน'
    },
    peeDataLock: {
        type: Boolean,
        default: false
    },
    petoDataLock: {
        type: Boolean,
        default: false
    },
    haveCloth: {
        type: Boolean,
        default: true
    },
    actionPlanOffset: {
        type: Number,
        default: 0
    },
    nongMapIdLtoG: {
        type: Map,
        default: new Map<number, mongoose.Types.ObjectId>()
    },
    peeMapIdLtoG: {
        type: Map,
        default: new Map<number, mongoose.Types.ObjectId>()
    },
    nongMapIdGtoL: {
        type: Map,
        default: new Map<mongoose.Types.ObjectId, number>()
    },
    peeMapIdGtoL: {
        type: Map,
        default: new Map<mongoose.Types.ObjectId, number>()
    },
    currentNong: {
        type: Number,
        default: 0
    },
    currentPee: {
        type: Number,
        default: 0
    },
    mdTime: {
        type: Date,
        default: new Date(Date.now())
    },
    partWelfareId: {
        type: mongoose.Schema.ObjectId
    },
    partMedId: {
        type: mongoose.Schema.ObjectId
    },
    partPlanId: {
        type: mongoose.Schema.ObjectId
    },
    allPetoChatIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    petoSleepIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    nongCampMemberCardHaveHeathIssueIds: {
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
    nongHaveBottleIds: {
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
    partPrStudioId:{
        type:mongoose.Types.ObjectId
    },
})
export default mongoose.model('Camp', campSchema)

















