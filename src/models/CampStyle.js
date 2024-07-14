"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var PeeCampSchema = new mongoose_1.default.Schema({
    refId: {
        type: mongoose_1.default.Schema.ObjectId
    },
    types: {
        type: String,
        enum: ['camp', 'baan']
    }
});
exports.default = mongoose_1.default.model('CampStyle', PeeCampSchema);
