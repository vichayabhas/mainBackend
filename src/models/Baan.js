"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var setup_1 = require("../controllers/setup");
var BaanSchema = new mongoose_1.default.Schema({
    name: {
        type: String
    },
    fullName: {
        type: String
    },
    campId: {
        type: mongoose_1.default.Schema.ObjectId
    },
    peeIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    nongIds: {
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
    nongShertSize: {
        type: Map,
        default: (0, setup_1.startSize)()
    },
    peeShertSize: {
        type: Map,
        default: (0, setup_1.startSize)()
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
    nongHaveBottleMapIds: {
        type: Map,
        default: new Map()
    },
    peeHaveBottleMapIds: {
        type: Map,
        default: new Map()
    },
    mapPeeCampIdByPartId: {
        type: Map,
        default: new Map()
    },
    peeModelIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    nongModelId: {
        type: mongoose_1.default.Schema.ObjectId
    },
    nongShertManageIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    peeShertManageIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    link: {
        type: String
    },
    styleId: {
        type: mongoose_1.default.Schema.ObjectId
    },
    boySleepPlaceId: {
        type: mongoose_1.default.Schema.ObjectId,
        default: null
    },
    girlSleepPlaceId: {
        type: mongoose_1.default.Schema.ObjectId,
        default: null
    },
    nomalPlaceId: {
        type: mongoose_1.default.Schema.ObjectId,
        default: null
    },
    mapShertManageIdByUserId: {
        type: Map,
        default: new Map()
    },
    groupRef: {
        type: String,
        enum: ['A', 'B', 'C', 'Dog', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', null],
        default: null
    }, nongSleepIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    peeSleepIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
});
exports.default = mongoose_1.default.model('Baan', BaanSchema);
