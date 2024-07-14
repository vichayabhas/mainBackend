"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var PeeCampSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.ObjectId,
        required: true
    },
    day: {
        type: Number,
        default: 0
    },
    hour: {
        type: Number,
        default: 0
    },
    minute: {
        type: Number,
        default: 0
    }
});
exports.default = mongoose_1.default.model('TimeOffset', PeeCampSchema);
