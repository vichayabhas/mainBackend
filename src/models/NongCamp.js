"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var PeeCampSchema = new mongoose_1.default.Schema({
    campId: {
        type: mongoose_1.default.Schema.ObjectId
    },
    baanId: {
        type: mongoose_1.default.Schema.ObjectId
    },
    nongIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    nongShertManageIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    mapNongCampIdByUserId: {
        type: Map,
        default: new Map
    }
});
exports.default = mongoose_1.default.model('NongCamp', PeeCampSchema);
