"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var PartSchema = new mongoose_1.default.Schema({
    name: {
        type: String
    },
    campIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    baanIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    auther: {
        type: String
    },
    time: {
        type: Number
    },
    link: {
        type: String
    },
    userLikeIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    }
});
exports.default = mongoose_1.default.model('Song', PartSchema);
