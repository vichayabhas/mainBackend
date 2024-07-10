"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var PeeCampSchema = new mongoose_1.default.Schema({
    choiseAnswerIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    campId: {
        type: mongoose_1.default.Schema.ObjectId
    },
    mapAwnserIdByUserId: {
        type: Map,
        default: new Map()
    },
    quasion: {
        type: String
    },
    a: {
        type: String
    },
    b: {
        type: String
    },
    c: {
        type: String
    },
    d: {
        type: String
    },
    e: {
        type: String
    },
    score: {
        type: Number,
        default: 1
    },
    correct: {
        type: String,
        enum: ['A', 'B', 'C', 'D', 'E']
    }
});
exports.default = mongoose_1.default.model('ChoiseQuasion', PeeCampSchema);
