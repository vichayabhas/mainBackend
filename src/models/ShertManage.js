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
    size: {
        type: String,
        enum: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
        default: 'L'
    },
    campModelId: {
        type: mongoose_1.default.Schema.ObjectId
    },
    role: {
        type: String,
        enum: ['nong', 'pee', 'peto']
    },
    recive: {
        type: String,
        enum: ['baan', 'part']
    },
    recived: {
        type: Number,
        default: 0
    },
    haveBottle: {
        type: Boolean,
        default: false
    },
    sleepAtCamp: {
        type: Boolean,
        default: false
    }
});
exports.default = mongoose_1.default.model('ShertManage', PeeCampSchema);
