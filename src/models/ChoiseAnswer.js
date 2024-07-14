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
    quasionId: {
        type: mongoose_1.default.Schema.ObjectId
    },
    campId: {
        type: mongoose_1.default.Schema.ObjectId
    },
    answer: {
        type: String,
        enum: ['A', 'B', 'C', 'D', 'E', null],
        default: null
    },
    score: {
        type: Number,
        default: 0
    },
    correct: {
        type: String,
        enum: ['A', 'B', 'C', 'D', 'E']
    }
});
exports.default = mongoose_1.default.model('ChoiseAnswer', PeeCampSchema);
