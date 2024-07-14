"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var PeeCampSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    placeIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    actionPlanIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    fridayActIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    lostAndFoundIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    boySleepBaanIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    girlSleepBaanIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    normalBaanIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    partIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    }
});
exports.default = mongoose_1.default.model('Building', PeeCampSchema);
