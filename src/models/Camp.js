"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var setup_1 = require("../controllers/setup");
var campSchema = new mongoose_1.default.Schema({
    nameId: {
        type: mongoose_1.default.Schema.ObjectId,
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
    boardIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    peeIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    nongIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    partIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    petoIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    authorizeIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    nongHelthIsueIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    peeHelthIsueIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    petoHelthIsueIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    dataLock: {
        type: Boolean,
        default: false
    },
    nongShertSize: {
        type: Map,
        //value:Number,
        //key:('S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'),
        default: (0, setup_1.startSize)()
    },
    peeShertSize: {
        type: Map,
        default: (0, setup_1.startSize)()
    },
    petoShertSize: {
        type: Map,
        default: (0, setup_1.startSize)()
    },
    nongModelIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    peeModelIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    petoModelIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    nongPendingIds: {
        type: Map,
        default: new Map
    },
    nongPassIds: {
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
    songIds: {
        type: [mongoose_1.default.Schema.ObjectId],
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
        default: new Map()
    },
    peeHaveBottleMapIds: {
        type: Map,
        default: new Map()
    },
    petoHaveBottleMapIds: {
        type: Map,
        default: new Map()
    },
    nongSureIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    baanIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    nongShertManageIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    peeShertManageIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    petoShertManageIds: {
        type: [mongoose_1.default.Schema.ObjectId],
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
        type: mongoose_1.default.Schema.ObjectId
    },
    actionPlanIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    workItemIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    nongPaidIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    nongInterviewIds: {
        type: Map,
        default: new Map()
    },
    registerModel: {
        type: String,
        enum: ['noPaid', 'noInterview', 'all']
    },
    lostAndFoundIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    memberStructre: {
        type: String,
        enum: ['nong->highSchool,pee->1year,peto->2upYear', 'nong->highSchool,pee->2upYear', 'nong->1year,pee->2upYear', 'nong->highSchool,pee->allYear', 'allYearMix']
    },
    logoUrl: {
        type: String
    },
    mapShertManageIdByUserId: {
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
    outRoundIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    campName: {
        type: String,
        required: true,
    },
    nongSleepIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    peeSleepIds: {
        type: [mongoose_1.default.Schema.ObjectId],
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
    baanBordId: {
        type: mongoose_1.default.Schema.ObjectId
    },
    partNameIds: {
        type: [mongoose_1.default.Schema.ObjectId],
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
        type: mongoose_1.default.Schema.ObjectId
    },
    partCoopId: {
        type: mongoose_1.default.Schema.ObjectId
    },
    partRegiterId: {
        type: mongoose_1.default.Schema.ObjectId
    },
    partPeeBaanId: {
        type: mongoose_1.default.Schema.ObjectId
    },
    choiseAnswerIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    quasionIds: {
        type: [mongoose_1.default.Schema.ObjectId],
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
    }
});
exports.default = mongoose_1.default.model('Camp', campSchema);
