"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var LostAndFoundSchema = new mongoose_1.default.Schema({
    campId: {
        type: mongoose_1.default.Schema.ObjectId,
        default: null
    },
    type: {
        type: String,
        enum: ['lost', 'found'],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose_1.default.Schema.ObjectId,
        required: true
    },
    placeId: {
        type: mongoose_1.default.Schema.ObjectId,
        //required:true,
        default: null
    },
    buildingId: {
        type: mongoose_1.default.Schema.ObjectId,
        // required:true,
        default: null
    }
});
exports.default = mongoose_1.default.model('LostAndFound', LostAndFoundSchema);
