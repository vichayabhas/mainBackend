"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var setup_1 = require("../controllers/setup");
var PartSchema = new mongoose_1.default.Schema({
    nameId: {
        type: mongoose_1.default.Schema.ObjectId
    },
    campId: {
        type: mongoose_1.default.Schema.ObjectId
    },
    peeIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    petoIds: {
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
    peeShertSize: {
        type: Map,
        default: (0, setup_1.startSize)()
    },
    petoShertSize: {
        type: Map,
        default: (0, setup_1.startSize)()
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
    peeModelIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    petoModelId: {
        type: mongoose_1.default.Schema.ObjectId
    },
    mapPeeCampIdByBaanId: {
        type: Map,
        default: new Map
    },
    peeShertManageIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    petoShertManageIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    actionPlanIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    workItemIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    placeId: {
        type: mongoose_1.default.Schema.ObjectId
    },
    mapShertManageIdByUserId: {
        type: Map,
        default: new Map
    },
    partName: {
        type: String
    },
    peeSleepIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
});
exports.default = mongoose_1.default.model('Part', PartSchema);
