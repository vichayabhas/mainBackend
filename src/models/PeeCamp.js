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
    partId: {
        type: mongoose_1.default.Schema.ObjectId
    },
    baanId: {
        type: mongoose_1.default.Schema.ObjectId
    }, peeIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    peeShertManageIds: {
        type: [mongoose_1.default.Schema.ObjectId],
        default: []
    },
    arrayString1: {
        type: [String],
        default: []
    },
    arrayString2: {
        type: [String],
        default: []
    },
    arrayString3: {
        type: [String],
        default: []
    },
    arrayString4: {
        type: [String],
        default: []
    },
    arrayString5: {
        type: [String],
        default: []
    },
    map1: {
        type: Map,
        default: new Map
    },
    map2: {
        type: Map,
        default: new Map
    },
    map3: {
        type: Map,
        default: new Map
    },
    map4: {
        type: Map,
        default: new Map
    },
    map5: {
        type: Map,
        default: new Map
    },
    mapArrayStringNumberByName: {
        type: Map,
        default: new Map
    },
    mapMapNumberByName: {
        type: Map,
        default: new Map
    },
    varibleNames: {
        type: [String],
        default: ['arrayString1', 'arrayString2', 'arrayString3', 'arrayString4', 'arrayString5', 'map1', 'map2', 'map3', 'map4', 'map5']
    }
});
exports.default = mongoose_1.default.model('PeeCamp', PeeCampSchema);
