"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var PeeCampSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.ObjectId
    },
    food: {
        type: String,
        default: ''
    },
    chronicDisease: {
        type: String,
        default: ''
    },
    medicine: {
        type: String,
        default: ''
    },
    extra: {
        type: String,
        default: ''
    },
    isWearing: {
        type: Boolean,
        default: false
    },
    spicy: {
        type: Boolean,
        default: false
    }
});
exports.default = mongoose_1.default.model('HelthIsue', PeeCampSchema);
