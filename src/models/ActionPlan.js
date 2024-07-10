"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var HospitalSchema = new mongoose_1.default.Schema({
    action: {
        type: String
    },
    partId: {
        type: mongoose_1.default.Schema.ObjectId
    },
    campId: {
        type: mongoose_1.default.Schema.ObjectId
    },
    placeIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    start: {
        type: Date
    },
    end: {
        type: Date
    },
    headId: {
        type: mongoose_1.default.Schema.ObjectId
    },
    body: {
        type: String,
        default: ''
    },
    partName: {
        type: String,
    }
});
exports.default = mongoose_1.default.model('ActionPlan', HospitalSchema);
