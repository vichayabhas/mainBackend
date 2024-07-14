"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBaan = addBaan;
exports.addBaanRaw = addBaanRaw;
exports.addPart = addPart;
exports.updateBaan = updateBaan;
exports.updatePart = updatePart;
exports.createCamp = createCamp;
exports.forceDeleteCamp = forceDeleteCamp;
exports.saveDeleteCamp = saveDeleteCamp;
exports.addCampName = addCampName;
exports.saveDeleteCampName = saveDeleteCampName;
exports.forceDeleteCampName = forceDeleteCampName;
exports.forceDeleteBaan = forceDeleteBaan;
exports.saveDeleteBaan = saveDeleteBaan;
exports.saveDeletePart = saveDeletePart;
exports.forceDeletePart = forceDeletePart;
exports.addPartName = addPartName;
exports.saveDeletePartName = saveDeletePartName;
exports.forceDeletePartName = forceDeletePartName;
exports.addAdmin = addAdmin;
exports.getAllAdmin = getAllAdmin;
exports.downRole = downRole;
exports.addMoreBoard = addMoreBoard;
exports.removeBoard = removeBoard;
exports.updateCamp = updateCamp;
exports.getCampNames = getCampNames;
exports.createBaanByGroup = createBaanByGroup;
exports.deleteWorkingItemRaw = deleteWorkingItemRaw;
exports.getPartNames = getPartNames;
exports.addAllGroup = addAllGroup;
exports.getAllRemainPartName = getAllRemainPartName;
exports.peeToPeto = peeToPeto;
exports.afterVisnuToPee = afterVisnuToPee;
var ActionPlan_1 = __importDefault(require("../models/ActionPlan"));
var Baan_1 = __importDefault(require("../models/Baan"));
var Camp_1 = __importDefault(require("../models/Camp"));
var CampStyle_1 = __importDefault(require("../models/CampStyle"));
var HelthIsue_1 = __importDefault(require("../models/HelthIsue"));
var NameContainer_1 = __importDefault(require("../models/NameContainer"));
var NongCamp_1 = __importDefault(require("../models/NongCamp"));
var Part_1 = __importDefault(require("../models/Part"));
var PeeCamp_1 = __importDefault(require("../models/PeeCamp"));
var PetoCamp_1 = __importDefault(require("../models/PetoCamp"));
var ShertManage_1 = __importDefault(require("../models/ShertManage"));
var User_1 = __importDefault(require("../models/User"));
var WorkItem_1 = __importDefault(require("../models/WorkItem"));
var setup_1 = require("./setup");
var Song_1 = __importDefault(require("../models/Song"));
var PartNameContainer_1 = __importDefault(require("../models/PartNameContainer"));
var Place_1 = __importDefault(require("../models/Place"));
var auth_1 = require("../middleware/auth");
var Building_1 = __importDefault(require("../models/Building"));
var LostAndFound_1 = __importDefault(require("../models/LostAndFound"));
var camp_1 = require("./camp");
var mongoose_1 = __importDefault(require("mongoose"));
// export async function addBaan
// export async function addPart
// export async function updateBaan
// export async function createCamp
// export async function forceDeleteCamp
// export async function saveDeleteCamp
// export async function addCampName
// export async function saveDeleteCampName
// export async function forceDeleteCampName
// export async function forceDeleteBaan
// export async function saveDeleteBaan
// export async function saveDeletePart
// export async function forceDeletePart
// export async function addPartName
// export async function saveDeletePartName
// export async function forceDeletePartName
// export async function addAdmin
// export async function getAllAdmin
// export async function downRole
// export async function addMoreBoard
// export async function removeBoard
function addBaan(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, _a, campId, name, camp, baan;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 1:
                    user = _b.sent();
                    _a = req.body, campId = _a.campId, name = _a.name;
                    return [4 /*yield*/, Camp_1.default.findById(campId)];
                case 2:
                    camp = _b.sent();
                    if (!camp) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    if (!user || (user.role != 'admin' && !user.authPartIds.includes(camp.partBoardId))) {
                        return [2 /*return*/, res.status(403).json({ success: false })];
                    }
                    return [4 /*yield*/, addBaanRaw(camp, name, null)];
                case 3:
                    baan = _b.sent();
                    res.status(201).json(baan);
                    return [2 /*return*/];
            }
        });
    });
} //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function addBaanRaw(camp, name, groupRef) {
    return __awaiter(this, void 0, void 0, function () {
        var baan, nongCamp, i, partId, part, peeCamp, campStyle;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Baan_1.default.create({ campId: camp._id, name: name, groupRef: groupRef })];
                case 1:
                    baan = _a.sent();
                    return [4 /*yield*/, NongCamp_1.default.create({ campId: camp._id, baanId: baan._id })];
                case 2:
                    nongCamp = _a.sent();
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < camp.partIds.length)) return [3 /*break*/, 8];
                    partId = camp.partIds[i];
                    return [4 /*yield*/, Part_1.default.findById(partId)];
                case 4:
                    part = _a.sent();
                    return [4 /*yield*/, PeeCamp_1.default.create({ campId: camp._id, baanId: baan._id, partId: partId })];
                case 5:
                    peeCamp = _a.sent();
                    setDefalse(peeCamp._id);
                    baan.peeModelIds.push(peeCamp._id);
                    return [4 /*yield*/, (part === null || part === void 0 ? void 0 : part.updateOne({ peeModelIds: (0, setup_1.swop)(null, peeCamp._id, part.peeModelIds) }))];
                case 6:
                    _a.sent();
                    camp.peeModelIds.push(peeCamp._id);
                    baan.mapPeeCampIdByPartId.set(partId.toString(), peeCamp._id);
                    part === null || part === void 0 ? void 0 : part.mapPeeCampIdByBaanId.set(baan.id, peeCamp._id);
                    return [4 /*yield*/, (part === null || part === void 0 ? void 0 : part.updateOne({ mapPeeCampIdByBaanId: part.mapPeeCampIdByBaanId }))];
                case 7:
                    _a.sent();
                    i = i + 1;
                    return [3 /*break*/, 3];
                case 8: return [4 /*yield*/, Camp_1.default.findByIdAndUpdate(camp._id, { nongModelIds: (0, setup_1.swop)(null, nongCamp._id, camp.nongModelIds), baanIds: (0, setup_1.swop)(null, baan._id, camp.baanIds), peeModelIds: camp.peeModelIds })];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, CampStyle_1.default.create({ refId: baan._id, types: 'baan' })];
                case 10:
                    campStyle = _a.sent();
                    return [4 /*yield*/, baan.updateOne({ styleId: campStyle._id, mapPeeCampIdByPartId: baan.mapPeeCampIdByPartId, nongModelId: nongCamp._id, peeModelIds: baan.peeModelIds })];
                case 11:
                    _a.sent();
                    return [2 /*return*/, ((0, setup_1.conBaanBackToFront)(baan.toObject()))];
            }
        });
    });
}
function addPart(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, campId, nameId, user, camp, part, newPart;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, campId = _a.campId, nameId = _a.nameId;
                    return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 1:
                    user = _b.sent();
                    return [4 /*yield*/, Camp_1.default.findById(campId)];
                case 2:
                    camp = _b.sent();
                    if (!user || !camp) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Part_1.default.findById(camp === null || camp === void 0 ? void 0 : camp.partBoardId)];
                case 3:
                    part = _b.sent();
                    if (user.role != 'admin' && !(part === null || part === void 0 ? void 0 : part.peeIds.includes(user._id)) && !(part === null || part === void 0 ? void 0 : part.petoIds.includes(user._id))) {
                        return [2 /*return*/, res.status(403).json({ success: false })];
                    }
                    return [4 /*yield*/, addPartRaw(camp._id, nameId)];
                case 4:
                    newPart = _b.sent();
                    if (!newPart) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    res.status(201).json((0, setup_1.conPartBackToFront)(newPart));
                    return [2 /*return*/];
            }
        });
    });
}
function addPartRaw(campId, nameId) {
    return __awaiter(this, void 0, void 0, function () {
        var camp, partNameContainer, part, petoCamp, i, baanId, baan, peeCamp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Camp_1.default.findById(campId)];
                case 1:
                    camp = _a.sent();
                    return [4 /*yield*/, PartNameContainer_1.default.findById(nameId)];
                case 2:
                    partNameContainer = _a.sent();
                    if (!camp || !partNameContainer) {
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, Part_1.default.create({ campId: camp._id, nameId: nameId })
                        //await partNameContainer.updateOne({ partIds: swop(null, part._id, partNameContainer.partIds) })
                    ];
                case 3:
                    part = _a.sent();
                    //await partNameContainer.updateOne({ partIds: swop(null, part._id, partNameContainer.partIds) })
                    partNameContainer.partIds.push(part._id);
                    partNameContainer.campIds.push(camp._id);
                    return [4 /*yield*/, partNameContainer.updateOne({ partIds: partNameContainer.partIds, campIds: partNameContainer.campIds })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, PetoCamp_1.default.create({ campId: campId, partId: part._id })];
                case 5:
                    petoCamp = _a.sent();
                    i = 0;
                    _a.label = 6;
                case 6:
                    if (!(i < camp.baanIds.length)) return [3 /*break*/, 11];
                    baanId = camp.baanIds[i++];
                    return [4 /*yield*/, Baan_1.default.findById(baanId)];
                case 7:
                    baan = _a.sent();
                    if (!baan) {
                        return [3 /*break*/, 6];
                    }
                    return [4 /*yield*/, PeeCamp_1.default.create({ baanId: baanId, campId: campId, partId: part._id })];
                case 8:
                    peeCamp = _a.sent();
                    return [4 /*yield*/, (baan === null || baan === void 0 ? void 0 : baan.updateOne({ peeModelIds: (0, setup_1.swop)(null, peeCamp._id, baan.peeModelIds) }))];
                case 9:
                    _a.sent();
                    camp.peeModelIds.push(peeCamp._id);
                    part.peeModelIds.push(peeCamp._id);
                    setDefalse(peeCamp.id);
                    baan.mapPeeCampIdByPartId.set(part._id.toString(), peeCamp._id);
                    part.mapPeeCampIdByBaanId.set(baanId.toString(), peeCamp._id);
                    return [4 /*yield*/, (baan === null || baan === void 0 ? void 0 : baan.updateOne({ mapPeeCampIdByPartId: baan.mapPeeCampIdByPartId }))];
                case 10:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 11: return [4 /*yield*/, camp.updateOne({
                        partIds: (0, setup_1.swop)(null, part._id, camp.partIds),
                        petoModelIds: (0, setup_1.swop)(null, petoCamp._id, camp.petoModelIds),
                        peeModelIds: camp.peeModelIds,
                        partNameIds: (0, setup_1.swop)(null, partNameContainer._id, camp.partNameIds)
                    })];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, part.updateOne({
                            petoModelId: petoCamp._id,
                            mapPeeCampIdByBaanId: part.mapPeeCampIdByBaanId,
                            peeModelIds: part.peeModelIds,
                            partName: "".concat(partNameContainer === null || partNameContainer === void 0 ? void 0 : partNameContainer.name, " ").concat(camp.campName)
                        })];
                case 13:
                    _a.sent();
                    return [2 /*return*/, part.toObject()];
            }
        });
    });
}
function updateBaan(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name, fullName, baanId, link, girlSleepPlaceId, boySleepPlaceId, nomalPlaceId, baan, camp, user, s;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, name = _a.name, fullName = _a.fullName, baanId = _a.baanId, link = _a.link, girlSleepPlaceId = _a.girlSleepPlaceId, boySleepPlaceId = _a.boySleepPlaceId, nomalPlaceId = _a.nomalPlaceId;
                    return [4 /*yield*/, Baan_1.default.findById(baanId)];
                case 1:
                    baan = _b.sent();
                    if (!baan) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(baan.campId)];
                case 2:
                    camp = _b.sent();
                    return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 3:
                    user = _b.sent();
                    if (!user || !camp || (user.role != 'admin' && !user.authPartIds.includes(camp.partBoardId) && !user.authPartIds.includes(camp.partCoopId))) {
                        return [2 /*return*/, res.status(401).json({ success: false })];
                    }
                    return [4 /*yield*/, updateBaanRaw({ name: name, fullName: fullName, baanId: baanId, link: link, girlSleepPlaceId: girlSleepPlaceId, boySleepPlaceId: boySleepPlaceId, nomalPlaceId: nomalPlaceId })];
                case 4:
                    s = _b.sent();
                    (0, setup_1.sendRes)(res, s);
                    return [2 /*return*/];
            }
        });
    });
}
function updateBaanRaw(update) {
    return __awaiter(this, void 0, void 0, function () {
        var name, fullName, baanId, link, girlSleepPlaceId, boySleepPlaceId, nomalPlaceId, baan, camp, boyNewP, girlNewP, normalNewP, boyOldP, girlOldP, normalOldP, boyNewB, boyOldB, girlNewB, girlOldB, normalNewB, normalOldB, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 28, , 29]);
                    name = update.name, fullName = update.fullName, baanId = update.baanId, link = update.link, girlSleepPlaceId = update.girlSleepPlaceId, boySleepPlaceId = update.boySleepPlaceId, nomalPlaceId = update.nomalPlaceId;
                    return [4 /*yield*/, Baan_1.default.findById(baanId)];
                case 1:
                    baan = _a.sent();
                    if (!baan) {
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(baan.campId)];
                case 2:
                    camp = _a.sent();
                    if (!camp) {
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, Place_1.default.findById(boySleepPlaceId)];
                case 3:
                    boyNewP = _a.sent();
                    return [4 /*yield*/, Place_1.default.findById(girlSleepPlaceId)];
                case 4:
                    girlNewP = _a.sent();
                    return [4 /*yield*/, Place_1.default.findById(nomalPlaceId)];
                case 5:
                    normalNewP = _a.sent();
                    return [4 /*yield*/, Place_1.default.findById(baan === null || baan === void 0 ? void 0 : baan.boySleepPlaceId)];
                case 6:
                    boyOldP = _a.sent();
                    return [4 /*yield*/, Place_1.default.findById(baan === null || baan === void 0 ? void 0 : baan.girlSleepPlaceId)];
                case 7:
                    girlOldP = _a.sent();
                    return [4 /*yield*/, Place_1.default.findById(baan === null || baan === void 0 ? void 0 : baan.nomalPlaceId)];
                case 8:
                    normalOldP = _a.sent();
                    return [4 /*yield*/, Building_1.default.findById(boyNewP === null || boyNewP === void 0 ? void 0 : boyNewP.buildingId)];
                case 9:
                    boyNewB = _a.sent();
                    return [4 /*yield*/, Building_1.default.findById(boyOldP === null || boyOldP === void 0 ? void 0 : boyOldP.buildingId)];
                case 10:
                    boyOldB = _a.sent();
                    return [4 /*yield*/, Building_1.default.findById(girlNewP === null || girlNewP === void 0 ? void 0 : girlNewP.buildingId)];
                case 11:
                    girlNewB = _a.sent();
                    return [4 /*yield*/, Building_1.default.findById(girlOldP === null || girlOldP === void 0 ? void 0 : girlOldP.buildingId)];
                case 12:
                    girlOldB = _a.sent();
                    return [4 /*yield*/, Building_1.default.findById(normalNewP === null || normalNewP === void 0 ? void 0 : normalNewP.buildingId)];
                case 13:
                    normalNewB = _a.sent();
                    return [4 /*yield*/, Building_1.default.findById(normalOldP === null || normalOldP === void 0 ? void 0 : normalOldP.buildingId)];
                case 14:
                    normalOldB = _a.sent();
                    return [4 /*yield*/, (boyOldP === null || boyOldP === void 0 ? void 0 : boyOldP.updateOne({ boySleepBaanIds: (0, setup_1.swop)(baan._id, null, boyOldP.boySleepBaanIds) }))];
                case 15:
                    _a.sent();
                    return [4 /*yield*/, (girlOldP === null || girlOldP === void 0 ? void 0 : girlOldP.updateOne({ girlSleepBaanIds: (0, setup_1.swop)(baan._id, null, girlOldP.girlSleepBaanIds) }))];
                case 16:
                    _a.sent();
                    return [4 /*yield*/, (normalOldP === null || normalOldP === void 0 ? void 0 : normalOldP.updateOne({ normalBaanIds: (0, setup_1.swop)(baan._id, null, normalOldP.normalBaanIds) }))];
                case 17:
                    _a.sent();
                    return [4 /*yield*/, (boyNewP === null || boyNewP === void 0 ? void 0 : boyNewP.updateOne({ boySleepBaanIds: (0, setup_1.swop)(null, baan._id, boyNewP.boySleepBaanIds) }))];
                case 18:
                    _a.sent();
                    return [4 /*yield*/, (girlNewP === null || girlNewP === void 0 ? void 0 : girlNewP.updateOne({ girlSleepBaanIds: (0, setup_1.swop)(null, baan._id, girlNewP.girlSleepBaanIds) }))];
                case 19:
                    _a.sent();
                    return [4 /*yield*/, (normalNewP === null || normalNewP === void 0 ? void 0 : normalNewP.updateOne({ normalBaanIds: (0, setup_1.swop)(null, baan._id, normalNewP.normalBaanIds) }))];
                case 20:
                    _a.sent();
                    return [4 /*yield*/, (boyOldB === null || boyOldB === void 0 ? void 0 : boyOldB.updateOne({ boySleepBaanIds: (0, setup_1.swop)(baan._id, null, boyOldB.boySleepBaanIds) }))];
                case 21:
                    _a.sent();
                    return [4 /*yield*/, (girlOldB === null || girlOldB === void 0 ? void 0 : girlOldB.updateOne({ girlSleepBaanIds: (0, setup_1.swop)(baan._id, null, girlOldB.girlSleepBaanIds) }))];
                case 22:
                    _a.sent();
                    return [4 /*yield*/, (normalOldB === null || normalOldB === void 0 ? void 0 : normalOldB.updateOne({ normalBaanIds: (0, setup_1.swop)(baan._id, null, normalOldB.normalBaanIds) }))];
                case 23:
                    _a.sent();
                    return [4 /*yield*/, (boyNewB === null || boyNewB === void 0 ? void 0 : boyNewB.updateOne({ boySleepBaanIds: (0, setup_1.swop)(null, baan._id, boyNewB.boySleepBaanIds) }))];
                case 24:
                    _a.sent();
                    return [4 /*yield*/, (girlNewB === null || girlNewB === void 0 ? void 0 : girlNewB.updateOne({ girlSleepBaanIds: (0, setup_1.swop)(null, baan._id, girlNewB.girlSleepBaanIds) }))];
                case 25:
                    _a.sent();
                    return [4 /*yield*/, (normalNewB === null || normalNewB === void 0 ? void 0 : normalNewB.updateOne({ normalBaanIds: (0, setup_1.swop)(null, baan._id, normalNewB.normalBaanIds) }))
                        //console.log(normalNewB)
                    ];
                case 26:
                    _a.sent();
                    //console.log(normalNewB)
                    return [4 /*yield*/, (baan === null || baan === void 0 ? void 0 : baan.updateOne({ name: name, fullName: fullName, link: link, girlSleepPlaceId: girlNewP === null || girlNewP === void 0 ? void 0 : girlNewP._id, boySleepPlaceId: boyNewP === null || boyNewP === void 0 ? void 0 : boyNewP._id, nomalPlaceId: normalNewP === null || normalNewP === void 0 ? void 0 : normalNewP._id }))];
                case 27:
                    //console.log(normalNewB)
                    _a.sent();
                    return [2 /*return*/, true];
                case 28:
                    err_1 = _a.sent();
                    return [2 /*return*/, false];
                case 29: return [2 /*return*/];
            }
        });
    });
}
function updatePart(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, placeId, partId, part, camp, user, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    _a = req.body, placeId = _a.placeId, partId = _a.partId;
                    return [4 /*yield*/, Part_1.default.findById(partId)];
                case 1:
                    part = _b.sent();
                    if (!part) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(part.campId)];
                case 2:
                    camp = _b.sent();
                    return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 3:
                    user = _b.sent();
                    if (!user || !camp || (user.role != 'admin' && !user.authPartIds.includes(camp.partBoardId) && !user.authPartIds.includes(camp.partCoopId))) {
                        return [2 /*return*/, res.status(401).json({ success: false })];
                    }
                    return [4 /*yield*/, part.updateOne({ placeId: placeId })];
                case 4:
                    _b.sent();
                    res.status(200).json((0, setup_1.conPartBackToFront)(part.toObject()));
                    return [3 /*break*/, 6];
                case 5:
                    err_2 = _b.sent();
                    res.status(400).json({ success: false });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function setDefalse(peeCampId) {
    return __awaiter(this, void 0, void 0, function () {
        var name, peeCamp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = ['arrayString1', 'arrayString2', 'arrayString3', 'arrayString4', 'arrayString5', 'map1', 'map2', 'map3', 'map4', 'map5'];
                    return [4 /*yield*/, PeeCamp_1.default.findById(peeCampId)];
                case 1:
                    peeCamp = _a.sent();
                    peeCamp === null || peeCamp === void 0 ? void 0 : peeCamp.mapArrayStringNumberByName.set(name[0], peeCamp.arrayString1);
                    peeCamp === null || peeCamp === void 0 ? void 0 : peeCamp.mapArrayStringNumberByName.set(name[1], peeCamp.arrayString2);
                    peeCamp === null || peeCamp === void 0 ? void 0 : peeCamp.mapArrayStringNumberByName.set(name[2], peeCamp.arrayString3);
                    peeCamp === null || peeCamp === void 0 ? void 0 : peeCamp.mapArrayStringNumberByName.set(name[3], peeCamp.arrayString4);
                    peeCamp === null || peeCamp === void 0 ? void 0 : peeCamp.mapArrayStringNumberByName.set(name[4], peeCamp.arrayString5);
                    peeCamp === null || peeCamp === void 0 ? void 0 : peeCamp.mapMapNumberByName.set(name[5], peeCamp.map1);
                    peeCamp === null || peeCamp === void 0 ? void 0 : peeCamp.mapMapNumberByName.set(name[6], peeCamp.map2);
                    peeCamp === null || peeCamp === void 0 ? void 0 : peeCamp.mapMapNumberByName.set(name[7], peeCamp.map3);
                    peeCamp === null || peeCamp === void 0 ? void 0 : peeCamp.mapMapNumberByName.set(name[8], peeCamp.map4);
                    peeCamp === null || peeCamp === void 0 ? void 0 : peeCamp.mapMapNumberByName.set(name[9], peeCamp.map5);
                    return [4 /*yield*/, (peeCamp === null || peeCamp === void 0 ? void 0 : peeCamp.updateOne({ mapMapNumberByName: peeCamp.mapMapNumberByName, mapArrayStringNumberByName: peeCamp.mapArrayStringNumberByName }))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function createCamp(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, nameId, round, dateStart, dateEnd, boardIds, registerModel, memberStructre, nongSleepModel, peeSleepModel, nameContainer, camp, campStyle, partNameContainer, partNameContainerCoop, partNameContainerRegis, partNameContainerPeeBaan, part, petoCamp, i, boardId, user, coop, regis, peeBaan, newCamp, baan, err_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 38, , 39]);
                    _a = req.body, nameId = _a.nameId, round = _a.round, dateStart = _a.dateStart, dateEnd = _a.dateEnd, boardIds = _a.boardIds, registerModel = _a.registerModel, memberStructre = _a.memberStructre, nongSleepModel = _a.nongSleepModel, peeSleepModel = _a.peeSleepModel;
                    return [4 /*yield*/, NameContainer_1.default.findById(nameId)];
                case 1:
                    nameContainer = _b.sent();
                    if (!nameContainer) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Camp_1.default.create({
                            nameId: nameId,
                            round: round,
                            dateStart: dateStart,
                            dateEnd: dateEnd,
                            boardIds: boardIds,
                            registerModel: registerModel,
                            memberStructre: memberStructre,
                            nongSleepModel: nongSleepModel,
                            peeSleepModel: peeSleepModel,
                            campName: "".concat(nameContainer.name, " ").concat(round)
                        })];
                case 2:
                    camp = _b.sent();
                    return [4 /*yield*/, CampStyle_1.default.create({ refId: camp._id, types: 'camp' })];
                case 3:
                    campStyle = _b.sent();
                    return [4 /*yield*/, camp.updateOne({ campStyleId: campStyle._id })];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, (nameContainer === null || nameContainer === void 0 ? void 0 : nameContainer.updateOne({ campIds: (0, setup_1.swop)(null, camp._id, nameContainer.campIds) }))];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, PartNameContainer_1.default.findOne({ name: 'board' })];
                case 6:
                    partNameContainer = _b.sent();
                    if (!!partNameContainer) return [3 /*break*/, 8];
                    return [4 /*yield*/, PartNameContainer_1.default.create({ name: 'board' })];
                case 7:
                    partNameContainer = _b.sent();
                    _b.label = 8;
                case 8: return [4 /*yield*/, PartNameContainer_1.default.findOne({ name: 'ประสาน' })];
                case 9:
                    partNameContainerCoop = _b.sent();
                    if (!!partNameContainerCoop) return [3 /*break*/, 11];
                    return [4 /*yield*/, PartNameContainer_1.default.create({ name: 'ประสาน' })];
                case 10:
                    partNameContainerCoop = _b.sent();
                    _b.label = 11;
                case 11: return [4 /*yield*/, PartNameContainer_1.default.findOne({ name: 'ทะเบียน' })];
                case 12:
                    partNameContainerRegis = _b.sent();
                    if (!!partNameContainerRegis) return [3 /*break*/, 14];
                    return [4 /*yield*/, PartNameContainer_1.default.create({ name: 'ทะเบียน' })];
                case 13:
                    partNameContainerRegis = _b.sent();
                    _b.label = 14;
                case 14: return [4 /*yield*/, PartNameContainer_1.default.findOne({ name: 'พี่บ้าน' })];
                case 15:
                    partNameContainerPeeBaan = _b.sent();
                    if (!!partNameContainerPeeBaan) return [3 /*break*/, 17];
                    return [4 /*yield*/, PartNameContainer_1.default.create({ name: 'พี่บ้าน' })];
                case 16:
                    partNameContainerPeeBaan = _b.sent();
                    _b.label = 17;
                case 17: return [4 /*yield*/, Part_1.default.create({ nameId: partNameContainer._id, campId: camp._id, partName: "".concat(partNameContainer.name, " ").concat(nameContainer.name, " ").concat(camp.round) })];
                case 18:
                    part = _b.sent();
                    return [4 /*yield*/, partNameContainer.updateOne({
                            campIds: (0, setup_1.swop)(null, camp._id, partNameContainer.campIds),
                            partIds: (0, setup_1.swop)(null, part._id, partNameContainer.partIds),
                        })];
                case 19:
                    _b.sent();
                    return [4 /*yield*/, PetoCamp_1.default.create({ partId: part._id, campId: camp._id })];
                case 20:
                    petoCamp = _b.sent();
                    return [4 /*yield*/, camp.updateOne({
                            partIds: [part._id],
                            petoModelIds: [petoCamp._id],
                            campName: "".concat(nameContainer.name, " ").concat(camp.round),
                            baanBordId: null,
                            partBoardId: part._id,
                            partNameIds: [partNameContainer._id]
                        })];
                case 21:
                    _b.sent();
                    return [4 /*yield*/, part.updateOne({ petoModelId: petoCamp._id })];
                case 22:
                    _b.sent();
                    i = 0;
                    _b.label = 23;
                case 23:
                    if (!(i < boardIds.length)) return [3 /*break*/, 26];
                    boardId = boardIds[i++];
                    return [4 /*yield*/, User_1.default.findById(boardId)];
                case 24:
                    user = _b.sent();
                    if (!user) {
                        return [3 /*break*/, 23];
                    }
                    return [4 /*yield*/, user.updateOne({
                            authorizeIds: (0, setup_1.swop)(null, camp._id, user.authorizeIds),
                            authPartIds: (0, setup_1.swop)(null, part._id, user.authPartIds)
                        })];
                case 25:
                    _b.sent();
                    return [3 /*break*/, 23];
                case 26: return [4 /*yield*/, addPartRaw(camp._id, partNameContainerCoop._id)];
                case 27:
                    coop = _b.sent();
                    return [4 /*yield*/, addPartRaw(camp._id, partNameContainerRegis._id)];
                case 28:
                    regis = _b.sent();
                    return [4 /*yield*/, addPartRaw(camp._id, partNameContainerPeeBaan._id)];
                case 29:
                    peeBaan = _b.sent();
                    if (!coop || !regis || !peeBaan) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, camp.updateOne({
                            partCoopId: coop._id,
                            partRegiterId: regis._id,
                            partPeeBaanId: peeBaan._id
                        })];
                case 30:
                    _b.sent();
                    if (!(memberStructre == 'nong->highSchool,pee->1year,peto->2upYear')) return [3 /*break*/, 32];
                    return [4 /*yield*/, (0, camp_1.addPetoRaw)(boardIds, part._id, res)];
                case 31:
                    _b.sent();
                    return [3 /*break*/, 37];
                case 32: return [4 /*yield*/, Camp_1.default.findById(camp._id)];
                case 33:
                    newCamp = _b.sent();
                    if (!newCamp) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, addBaanRaw(newCamp, 'board', null)];
                case 34:
                    baan = _b.sent();
                    i = 0;
                    while (i < boardIds.length) {
                        camp.peePassIds.set(boardIds[i++].toString(), part._id);
                    }
                    return [4 /*yield*/, camp.updateOne({ peePassIds: camp.peePassIds, baanBordId: baan._id })];
                case 35:
                    _b.sent();
                    return [4 /*yield*/, (0, camp_1.addPeeRaw)(boardIds, baan._id)];
                case 36:
                    _b.sent();
                    _b.label = 37;
                case 37:
                    res.status(201).json((0, setup_1.conCampBackToFront)(camp.toObject()));
                    return [3 /*break*/, 39];
                case 38:
                    err_3 = _b.sent();
                    console.log(err_3);
                    res.status(400).json({ success: false });
                    return [3 /*break*/, 39];
                case 39: return [2 /*return*/];
            }
        });
    });
}
function forceDeleteCamp(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var campId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    campId = req.params.id;
                    return [4 /*yield*/, forceDeleteCampRaw(new mongoose_1.default.Types.ObjectId(campId), res)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function forceDeleteCampRaw(campId, res) {
    return __awaiter(this, void 0, void 0, function () {
        var camp, i, shertManage, user, shertManage, user, shertManage, user, user, news, nongCamp, j, user, peeCamp, j, user, petoCamp, j, user, baan, j, song, helthIsue, user, helthIsue, user, helthIsue, user, part, partNameContainer, actionPlan, j, place, building, name_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 104, , 105]);
                    return [4 /*yield*/, Camp_1.default.findById(campId)];
                case 1:
                    camp = _a.sent();
                    if (!camp) {
                        return [2 /*return*/, res === null || res === void 0 ? void 0 : res.status(400).json({ success: false })];
                    }
                    return [4 /*yield*/, CampStyle_1.default.findByIdAndDelete(camp.campStyleId)];
                case 2:
                    _a.sent();
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < camp.peeShertManageIds.length)) return [3 /*break*/, 8];
                    return [4 /*yield*/, ShertManage_1.default.findById(camp.peeShertManageIds[i++])];
                case 4:
                    shertManage = _a.sent();
                    return [4 /*yield*/, User_1.default.findById(shertManage === null || shertManage === void 0 ? void 0 : shertManage.userId)];
                case 5:
                    user = _a.sent();
                    if (!user || !shertManage) {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, user.updateOne({ shertManageIds: (0, setup_1.swop)(shertManage._id, null, user.shertManageIds), filterIds: (0, setup_1.swop)(camp._id, null, user.filterIds), registerIds: (0, setup_1.swop)(camp._id, null, user.registerIds) })];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, shertManage.deleteOne()];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 8:
                    i = 0;
                    _a.label = 9;
                case 9:
                    if (!(i < camp.nongShertManageIds.length)) return [3 /*break*/, 14];
                    return [4 /*yield*/, ShertManage_1.default.findById(camp.nongShertManageIds[i++])];
                case 10:
                    shertManage = _a.sent();
                    return [4 /*yield*/, User_1.default.findById(shertManage === null || shertManage === void 0 ? void 0 : shertManage.userId)];
                case 11:
                    user = _a.sent();
                    if (!user || !shertManage) {
                        return [3 /*break*/, 9];
                    }
                    return [4 /*yield*/, user.updateOne({ shertManageIds: (0, setup_1.swop)(shertManage._id, null, user.shertManageIds) })];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, shertManage.deleteOne()];
                case 13:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 14:
                    i = 0;
                    _a.label = 15;
                case 15:
                    if (!(i < camp.petoShertManageIds.length)) return [3 /*break*/, 20];
                    return [4 /*yield*/, ShertManage_1.default.findById(camp.petoShertManageIds[i++])];
                case 16:
                    shertManage = _a.sent();
                    return [4 /*yield*/, User_1.default.findById(shertManage === null || shertManage === void 0 ? void 0 : shertManage.userId)];
                case 17:
                    user = _a.sent();
                    if (!user || !shertManage) {
                        return [3 /*break*/, 15];
                    }
                    return [4 /*yield*/, user.updateOne({ shertManageIds: (0, setup_1.swop)(shertManage._id, null, user.shertManageIds), filterIds: (0, setup_1.swop)(camp._id, null, user.filterIds), registerIds: (0, setup_1.swop)(camp._id, null, user.registerIds) })];
                case 18:
                    _a.sent();
                    return [4 /*yield*/, shertManage.deleteOne()];
                case 19:
                    _a.sent();
                    return [3 /*break*/, 15];
                case 20:
                    i = 0;
                    _a.label = 21;
                case 21:
                    if (!(i < camp.boardIds.length)) return [3 /*break*/, 24];
                    return [4 /*yield*/, User_1.default.findById(camp.boardIds[i++])];
                case 22:
                    user = _a.sent();
                    if (!user) {
                        return [3 /*break*/, 21];
                    }
                    news = (0, setup_1.swop)(camp._id, null, user.authorizeIds);
                    return [4 /*yield*/, user.updateOne({
                            authorizeIds: news,
                            authPartIds: (0, setup_1.swop)(camp.partBoardId, null, user.authPartIds)
                        })];
                case 23:
                    _a.sent();
                    return [3 /*break*/, 21];
                case 24:
                    i = 0;
                    _a.label = 25;
                case 25:
                    if (!(i < camp.nongModelIds.length)) return [3 /*break*/, 32];
                    return [4 /*yield*/, NongCamp_1.default.findById(camp.nongModelIds[i++])];
                case 26:
                    nongCamp = _a.sent();
                    if (!nongCamp) {
                        return [3 /*break*/, 25];
                    }
                    j = 0;
                    _a.label = 27;
                case 27:
                    if (!(j < nongCamp.nongIds.length)) return [3 /*break*/, 30];
                    return [4 /*yield*/, User_1.default.findById(nongCamp.nongIds[j++])];
                case 28:
                    user = _a.sent();
                    if (!user) {
                        return [3 /*break*/, 27];
                    }
                    return [4 /*yield*/, user.updateOne({ nongCampIds: (0, setup_1.swop)(nongCamp._id, null, user.nongCampIds) })];
                case 29:
                    _a.sent();
                    return [3 /*break*/, 27];
                case 30: return [4 /*yield*/, nongCamp.deleteOne()];
                case 31:
                    _a.sent();
                    return [3 /*break*/, 25];
                case 32:
                    i = 0;
                    _a.label = 33;
                case 33:
                    if (!(i < camp.peeModelIds.length)) return [3 /*break*/, 40];
                    return [4 /*yield*/, PeeCamp_1.default.findById(camp.peeModelIds[i++])];
                case 34:
                    peeCamp = _a.sent();
                    if (!peeCamp) {
                        return [3 /*break*/, 33];
                    }
                    j = 0;
                    _a.label = 35;
                case 35:
                    if (!(j < peeCamp.peeIds.length)) return [3 /*break*/, 38];
                    return [4 /*yield*/, User_1.default.findById(peeCamp.peeIds[j++])];
                case 36:
                    user = _a.sent();
                    if (!user) {
                        return [3 /*break*/, 35];
                    }
                    return [4 /*yield*/, user.updateOne({ peeCampIds: (0, setup_1.swop)(peeCamp._id, null, user.peeCampIds) })];
                case 37:
                    _a.sent();
                    return [3 /*break*/, 35];
                case 38: return [4 /*yield*/, peeCamp.deleteOne()];
                case 39:
                    _a.sent();
                    return [3 /*break*/, 33];
                case 40:
                    i = 0;
                    _a.label = 41;
                case 41:
                    if (!(i < camp.petoModelIds.length)) return [3 /*break*/, 48];
                    return [4 /*yield*/, PetoCamp_1.default.findById(camp.petoModelIds[i++])];
                case 42:
                    petoCamp = _a.sent();
                    if (!petoCamp) {
                        return [3 /*break*/, 41];
                    }
                    j = 0;
                    _a.label = 43;
                case 43:
                    if (!(j < petoCamp.petoIds.length)) return [3 /*break*/, 46];
                    return [4 /*yield*/, User_1.default.findById(petoCamp.petoIds[j++])];
                case 44:
                    user = _a.sent();
                    if (!user) {
                        return [3 /*break*/, 43];
                    }
                    return [4 /*yield*/, user.updateOne({ petoCampIds: (0, setup_1.swop)(petoCamp._id, null, user.petoCampIds) })];
                case 45:
                    _a.sent();
                    return [3 /*break*/, 43];
                case 46: return [4 /*yield*/, petoCamp.deleteOne()];
                case 47:
                    _a.sent();
                    return [3 /*break*/, 41];
                case 48:
                    i = 0;
                    _a.label = 49;
                case 49:
                    if (!(i < camp.baanIds.length)) return [3 /*break*/, 58];
                    return [4 /*yield*/, Baan_1.default.findById(camp.baanIds[i++])];
                case 50:
                    baan = _a.sent();
                    if (!baan) {
                        return [3 /*break*/, 49];
                    }
                    j = 0;
                    _a.label = 51;
                case 51:
                    if (!(j < baan.songIds.length)) return [3 /*break*/, 54];
                    return [4 /*yield*/, Song_1.default.findById(baan.songIds[j++])];
                case 52:
                    song = _a.sent();
                    if (!song) {
                        return [3 /*break*/, 51];
                    }
                    return [4 /*yield*/, song.updateOne({ baanIds: (0, setup_1.swop)(baan._id, null, song.baanIds) })];
                case 53:
                    _a.sent();
                    return [3 /*break*/, 51];
                case 54: return [4 /*yield*/, updateBaanRaw({
                        name: "",
                        fullName: null,
                        baanId: baan._id,
                        link: null,
                        girlSleepPlaceId: null,
                        boySleepPlaceId: null,
                        nomalPlaceId: null
                    })];
                case 55:
                    _a.sent();
                    return [4 /*yield*/, CampStyle_1.default.findByIdAndDelete(baan.styleId)];
                case 56:
                    _a.sent();
                    return [4 /*yield*/, baan.deleteOne()];
                case 57:
                    _a.sent();
                    return [3 /*break*/, 49];
                case 58: return [4 /*yield*/, CampStyle_1.default.findByIdAndDelete(camp.campStyleId)];
                case 59:
                    _a.sent();
                    i = 0;
                    _a.label = 60;
                case 60:
                    if (!(i < camp.nongHelthIsueIds.length)) return [3 /*break*/, 65];
                    return [4 /*yield*/, HelthIsue_1.default.findById(camp.nongHelthIsueIds[i++])];
                case 61:
                    helthIsue = _a.sent();
                    if (!helthIsue) {
                        return [3 /*break*/, 60];
                    }
                    return [4 /*yield*/, User_1.default.findById(helthIsue.userId)];
                case 62:
                    user = _a.sent();
                    if (!user) {
                        return [3 /*break*/, 60];
                    }
                    if (!(user.helthIsueId !== (helthIsue._id))) return [3 /*break*/, 64];
                    return [4 /*yield*/, helthIsue.deleteOne()];
                case 63:
                    _a.sent();
                    _a.label = 64;
                case 64: return [3 /*break*/, 60];
                case 65:
                    i = 0;
                    _a.label = 66;
                case 66:
                    if (!(i < camp.peeHelthIsueIds.length)) return [3 /*break*/, 71];
                    return [4 /*yield*/, HelthIsue_1.default.findById(camp.peeHelthIsueIds[i++])];
                case 67:
                    helthIsue = _a.sent();
                    if (!helthIsue) {
                        return [3 /*break*/, 66];
                    }
                    return [4 /*yield*/, User_1.default.findById(helthIsue.userId)];
                case 68:
                    user = _a.sent();
                    if (!user) {
                        return [3 /*break*/, 66];
                    }
                    if (!(user.helthIsueId !== (helthIsue._id))) return [3 /*break*/, 70];
                    return [4 /*yield*/, helthIsue.deleteOne()];
                case 69:
                    _a.sent();
                    _a.label = 70;
                case 70: return [3 /*break*/, 66];
                case 71:
                    i = 0;
                    _a.label = 72;
                case 72:
                    if (!(i < camp.petoHelthIsueIds.length)) return [3 /*break*/, 77];
                    return [4 /*yield*/, HelthIsue_1.default.findById(camp.petoHelthIsueIds[i++])];
                case 73:
                    helthIsue = _a.sent();
                    if (!helthIsue) {
                        return [3 /*break*/, 72];
                    }
                    return [4 /*yield*/, User_1.default.findById(helthIsue.userId)];
                case 74:
                    user = _a.sent();
                    if (!user) {
                        return [3 /*break*/, 72];
                    }
                    if (!(user.helthIsueId !== (helthIsue._id))) return [3 /*break*/, 76];
                    return [4 /*yield*/, helthIsue.deleteOne()];
                case 75:
                    _a.sent();
                    _a.label = 76;
                case 76: return [3 /*break*/, 72];
                case 77:
                    i = 0;
                    _a.label = 78;
                case 78:
                    if (!(i < camp.partIds.length)) return [3 /*break*/, 83];
                    return [4 /*yield*/, Part_1.default.findById(camp.partIds[i++])];
                case 79:
                    part = _a.sent();
                    if (!part) {
                        return [3 /*break*/, 78];
                    }
                    return [4 /*yield*/, PartNameContainer_1.default.findById(part === null || part === void 0 ? void 0 : part.nameId)];
                case 80:
                    partNameContainer = _a.sent();
                    return [4 /*yield*/, (partNameContainer === null || partNameContainer === void 0 ? void 0 : partNameContainer.updateOne({
                            partIds: (0, setup_1.swop)(part._id, null, partNameContainer.partIds),
                            campIds: (0, setup_1.swop)(camp._id, null, partNameContainer.campIds)
                        }))];
                case 81:
                    _a.sent();
                    return [4 /*yield*/, part.deleteOne()];
                case 82:
                    _a.sent();
                    return [3 /*break*/, 78];
                case 83:
                    i = 0;
                    _a.label = 84;
                case 84:
                    if (!(i < camp.workItemIds.length)) return [3 /*break*/, 86];
                    return [4 /*yield*/, WorkItem_1.default.findByIdAndDelete(camp.workItemIds[i++])];
                case 85:
                    _a.sent();
                    return [3 /*break*/, 84];
                case 86:
                    i = 0;
                    _a.label = 87;
                case 87:
                    if (!(i < camp.actionPlanIds.length)) return [3 /*break*/, 96];
                    return [4 /*yield*/, ActionPlan_1.default.findById(camp.actionPlanIds[i++])];
                case 88:
                    actionPlan = _a.sent();
                    if (!actionPlan) {
                        return [3 /*break*/, 87];
                    }
                    j = 0;
                    _a.label = 89;
                case 89:
                    if (!(j < actionPlan.placeIds.length)) return [3 /*break*/, 94];
                    return [4 /*yield*/, Place_1.default.findById(actionPlan.placeIds[j++])];
                case 90:
                    place = _a.sent();
                    if (!place) {
                        return [3 /*break*/, 89];
                    }
                    return [4 /*yield*/, place.updateOne({ actionPlanIds: (0, setup_1.swop)(actionPlan._id, null, place.actionPlanIds) })];
                case 91:
                    _a.sent();
                    return [4 /*yield*/, Building_1.default.findById(place.buildingId)];
                case 92:
                    building = _a.sent();
                    if (!building) {
                        return [3 /*break*/, 89];
                    }
                    return [4 /*yield*/, building.updateOne({ actionPlanIds: (0, setup_1.swop)(actionPlan._id, null, building.actionPlanIds) })];
                case 93:
                    _a.sent();
                    return [3 /*break*/, 89];
                case 94: return [4 /*yield*/, actionPlan.deleteOne()];
                case 95:
                    _a.sent();
                    return [3 /*break*/, 87];
                case 96:
                    i = 0;
                    _a.label = 97;
                case 97:
                    if (!(i < camp.lostAndFoundIds.length)) return [3 /*break*/, 99];
                    return [4 /*yield*/, LostAndFound_1.default.findByIdAndUpdate(camp.lostAndFoundIds[i++], { campId: null })];
                case 98:
                    _a.sent();
                    return [3 /*break*/, 97];
                case 99: return [4 /*yield*/, NameContainer_1.default.findById(camp.nameId)];
                case 100:
                    name_1 = _a.sent();
                    if (!name_1) return [3 /*break*/, 102];
                    return [4 /*yield*/, name_1.updateOne({ campIds: (0, setup_1.swop)(camp._id, null, name_1.campIds) })];
                case 101:
                    _a.sent();
                    _a.label = 102;
                case 102: return [4 /*yield*/, camp.deleteOne()];
                case 103:
                    _a.sent();
                    res === null || res === void 0 ? void 0 : res.status(200).json({ success: true });
                    return [3 /*break*/, 105];
                case 104:
                    error_1 = _a.sent();
                    res === null || res === void 0 ? void 0 : res.status(400).json({ success: false });
                    return [3 /*break*/, 105];
                case 105: return [2 /*return*/];
            }
        });
    });
}
function saveDeleteCamp(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var campId, camp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    campId = req.params.id;
                    return [4 /*yield*/, Camp_1.default.findById(campId)];
                case 1:
                    camp = _a.sent();
                    if (!camp) {
                        return [2 /*return*/, res.status(400).json({
                                success: false,
                                message: 'no camp'
                            })];
                    }
                    if (camp.nongPaidIds.length || camp.nongPassIds.size || camp.nongInterviewIds.size || (camp.peeIds.length + camp.petoIds.length > camp.boardIds.length) || camp.partIds.length > 4 || camp.baanIds.length > 19 || camp.peePassIds.size) {
                        return [2 /*return*/, res.status(400).json({ success: false, message: 'this camp is not save to delete' })];
                    }
                    forceDeleteCampRaw(camp._id, res);
                    return [2 /*return*/];
            }
        });
    });
}
function addCampName(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var name_2, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, NameContainer_1.default.create({ name: req.params.id })];
                case 1:
                    name_2 = _a.sent();
                    res.status(201).json(name_2);
                    return [3 /*break*/, 3];
                case 2:
                    err_4 = _a.sent();
                    console.log(err_4);
                    (0, setup_1.sendRes)(res, false);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function saveDeleteCampName(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var hospital, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, NameContainer_1.default.findById(req.params.id)];
                case 1:
                    hospital = _b.sent();
                    res.status(400).json({
                        success: false
                    });
                    if (hospital === null || hospital === void 0 ? void 0 : hospital.campIds.length) {
                        return [2 /*return*/, res.status(400).json({ success: false, massage: 'this not safe to delete' })];
                    }
                    res.status(200).json({
                        success: true,
                        data: {}
                    });
                    return [3 /*break*/, 3];
                case 2:
                    _a = _b.sent();
                    res.status(400).json({
                        success: false
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function forceDeleteCampName(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var name, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, NameContainer_1.default.findById(req.params.id)];
                case 1:
                    name = _a.sent();
                    if (!name) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < name.campIds.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, forceDeleteCampRaw(name.campIds[i++], null)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 2];
                case 4: return [4 /*yield*/, name.deleteOne()];
                case 5:
                    _a.sent();
                    res.status(200).json({ success: true });
                    return [2 /*return*/];
            }
        });
    });
}
function forceDeleteBaan(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var baan, camp, nongIds, nongShertManageIds, peeShertManageIds, peeModelIds, peeIds, peeHelthIsueIds, nongHelthIsueIds, i, shertManage, user, shertManage, peeCamp, part, user, helthIsue, user, helthIsue, user, shertManage, peeCamp, part, song, peeCamp, part, j, user, peeCampIds, p, nongCamp, user, boyP, boyB, girlP, girlB, normalP, normalB;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Baan_1.default.findById(req.params.id)];
                case 1:
                    baan = _a.sent();
                    if (!baan) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(baan.campId)];
                case 2:
                    camp = _a.sent();
                    if (!camp) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    nongIds = camp.nongIds;
                    nongShertManageIds = camp.nongShertManageIds;
                    peeShertManageIds = camp.peeShertManageIds;
                    peeModelIds = camp.peeModelIds;
                    peeIds = camp.peeIds;
                    peeHelthIsueIds = camp.peeHelthIsueIds;
                    nongHelthIsueIds = camp.nongHelthIsueIds;
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < baan.nongShertManageIds.length)) return [3 /*break*/, 7];
                    return [4 /*yield*/, ShertManage_1.default.findById(baan.nongShertManageIds[i++])];
                case 4:
                    shertManage = _a.sent();
                    if (!shertManage) {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, User_1.default.findById(shertManage.userId)];
                case 5:
                    user = _a.sent();
                    return [4 /*yield*/, (user === null || user === void 0 ? void 0 : user.updateOne({
                            shertManageIds: (0, setup_1.swop)(shertManage._id, null, user.shertManageIds)
                        }))];
                case 6:
                    _a.sent();
                    nongShertManageIds = (0, setup_1.swop)(shertManage._id, null, nongShertManageIds);
                    shertManage === null || shertManage === void 0 ? void 0 : shertManage.deleteOne();
                    return [3 /*break*/, 3];
                case 7:
                    i = 0;
                    _a.label = 8;
                case 8:
                    if (!(i < baan.peeShertManageIds.length)) return [3 /*break*/, 16];
                    return [4 /*yield*/, ShertManage_1.default.findById(baan.peeShertManageIds[i++])];
                case 9:
                    shertManage = _a.sent();
                    if (!shertManage) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, PeeCamp_1.default.findById(shertManage.campModelId)];
                case 10:
                    peeCamp = _a.sent();
                    if (!peeCamp) {
                        return [3 /*break*/, 8];
                    }
                    return [4 /*yield*/, Part_1.default.findById(peeCamp.partId)];
                case 11:
                    part = _a.sent();
                    return [4 /*yield*/, User_1.default.findById(shertManage.userId)];
                case 12:
                    user = _a.sent();
                    if (!user || !part) {
                        return [3 /*break*/, 8];
                    }
                    return [4 /*yield*/, user.updateOne({ shertManageIds: (0, setup_1.swop)(shertManage._id, null, user.shertManageIds) })];
                case 13:
                    _a.sent();
                    peeShertManageIds = (0, setup_1.swop)(shertManage._id, null, peeShertManageIds);
                    part.peeShertSize.set(shertManage.size, (0, setup_1.calculate)(part.peeShertSize.get(shertManage.size), 0, 1));
                    return [4 /*yield*/, part.updateOne({ peeShertManageIds: (0, setup_1.swop)(shertManage._id, null, part.peeShertManageIds), peeShertSize: part.peeShertSize })];
                case 14:
                    _a.sent();
                    return [4 /*yield*/, ShertManage_1.default.findByIdAndDelete(shertManage._id)];
                case 15:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 16:
                    i = 0;
                    _a.label = 17;
                case 17:
                    if (!(i < baan.nongHelthIsueIds.length)) return [3 /*break*/, 22];
                    return [4 /*yield*/, HelthIsue_1.default.findById(baan.nongHelthIsueIds[i++])];
                case 18:
                    helthIsue = _a.sent();
                    if (!helthIsue) {
                        return [3 /*break*/, 17];
                    }
                    return [4 /*yield*/, User_1.default.findById(helthIsue.userId)];
                case 19:
                    user = _a.sent();
                    if (!user) {
                        return [3 /*break*/, 17];
                    }
                    nongHelthIsueIds = (0, setup_1.swop)(helthIsue === null || helthIsue === void 0 ? void 0 : helthIsue._id, null, nongHelthIsueIds);
                    if (!(user.helthIsueId !== (helthIsue._id))) return [3 /*break*/, 21];
                    return [4 /*yield*/, helthIsue.deleteOne()];
                case 20:
                    _a.sent();
                    _a.label = 21;
                case 21: return [3 /*break*/, 17];
                case 22:
                    i = 0;
                    _a.label = 23;
                case 23:
                    if (!(i < baan.peeHelthIsueIds.length)) return [3 /*break*/, 32];
                    return [4 /*yield*/, HelthIsue_1.default.findById(baan.peeHelthIsueIds[i++])];
                case 24:
                    helthIsue = _a.sent();
                    if (!helthIsue) {
                        return [3 /*break*/, 23];
                    }
                    return [4 /*yield*/, User_1.default.findById(helthIsue.userId)];
                case 25:
                    user = _a.sent();
                    if (!user) {
                        return [3 /*break*/, 23];
                    }
                    peeHelthIsueIds = (0, setup_1.swop)(helthIsue._id, null, peeHelthIsueIds);
                    return [4 /*yield*/, ShertManage_1.default.findById(baan.mapShertManageIdByUserId.get(user.id))];
                case 26:
                    shertManage = _a.sent();
                    if (!shertManage) {
                        return [3 /*break*/, 23];
                    }
                    return [4 /*yield*/, PeeCamp_1.default.findById(shertManage.campModelId)];
                case 27:
                    peeCamp = _a.sent();
                    if (!peeCamp) {
                        return [3 /*break*/, 23];
                    }
                    return [4 /*yield*/, Part_1.default.findById(peeCamp.partId)];
                case 28:
                    part = _a.sent();
                    if (!part) {
                        return [3 /*break*/, 23];
                    }
                    return [4 /*yield*/, part.updateOne({ peeHelthIsueIds: (0, setup_1.swop)(helthIsue._id, null, part.peeHelthIsueIds) })];
                case 29:
                    _a.sent();
                    if (!((user === null || user === void 0 ? void 0 : user.helthIsueId) !== (helthIsue === null || helthIsue === void 0 ? void 0 : helthIsue._id))) return [3 /*break*/, 31];
                    return [4 /*yield*/, (helthIsue === null || helthIsue === void 0 ? void 0 : helthIsue.deleteOne())];
                case 30:
                    _a.sent();
                    _a.label = 31;
                case 31: return [3 /*break*/, 23];
                case 32:
                    i = 0;
                    _a.label = 33;
                case 33:
                    if (!(i < baan.songIds.length)) return [3 /*break*/, 36];
                    return [4 /*yield*/, Song_1.default.findById(baan.songIds[i++])];
                case 34:
                    song = _a.sent();
                    return [4 /*yield*/, (song === null || song === void 0 ? void 0 : song.updateOne({ baanIds: (0, setup_1.swop)(baan._id, null, song.baanIds) }))];
                case 35:
                    _a.sent();
                    return [3 /*break*/, 33];
                case 36:
                    i = 0;
                    _a.label = 37;
                case 37:
                    if (!(i < baan.peeModelIds.length)) return [3 /*break*/, 48];
                    return [4 /*yield*/, PeeCamp_1.default.findById(baan.peeModelIds[i++])];
                case 38:
                    peeCamp = _a.sent();
                    if (!peeCamp) {
                        return [3 /*break*/, 37];
                    }
                    return [4 /*yield*/, Part_1.default.findById(peeCamp.partId)];
                case 39:
                    part = _a.sent();
                    if (!part) {
                        return [3 /*break*/, 37];
                    }
                    j = 0;
                    _a.label = 40;
                case 40:
                    if (!(j < peeCamp.peeIds.length)) return [3 /*break*/, 46];
                    return [4 /*yield*/, User_1.default.findById(peeCamp.peeIds[j++])];
                case 41:
                    user = _a.sent();
                    if (!user) {
                        return [3 /*break*/, 40];
                    }
                    if (!user.haveBottle) return [3 /*break*/, 43];
                    return [4 /*yield*/, part.updateOne({ peeHaveBottle: part.peeHaveBottle - 1 })];
                case 42:
                    _a.sent();
                    _a.label = 43;
                case 43:
                    peeCampIds = (0, setup_1.swop)(peeCamp._id, null, user.peeCampIds);
                    p = (0, setup_1.swop)(user._id, null, part.peeIds);
                    return [4 /*yield*/, part.updateOne({ peeIds: p })];
                case 44:
                    _a.sent();
                    peeIds = (0, setup_1.swop)(user === null || user === void 0 ? void 0 : user._id, null, peeIds);
                    camp.peeHaveBottleMapIds.delete(user.id);
                    return [4 /*yield*/, user.updateOne({ peeCampIds: peeCampIds })];
                case 45:
                    _a.sent();
                    return [3 /*break*/, 40];
                case 46:
                    peeModelIds = (0, setup_1.swop)(peeCamp._id, null, peeModelIds);
                    return [4 /*yield*/, peeCamp.deleteOne()];
                case 47:
                    _a.sent();
                    return [3 /*break*/, 37];
                case 48: return [4 /*yield*/, NongCamp_1.default.findById(baan.nongModelId)];
                case 49:
                    nongCamp = _a.sent();
                    if (!nongCamp) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    i = 0;
                    _a.label = 50;
                case 50:
                    if (!(i < nongCamp.nongIds.length)) return [3 /*break*/, 53];
                    return [4 /*yield*/, User_1.default.findById(nongCamp.nongIds[i++])];
                case 51:
                    user = _a.sent();
                    if (!user) {
                        return [3 /*break*/, 50];
                    }
                    return [4 /*yield*/, user.updateOne({ nongCampIds: (0, setup_1.swop)(nongCamp._id, null, user.nongCampIds) })];
                case 52:
                    _a.sent();
                    nongIds = (0, setup_1.swop)(user._id, null, nongIds);
                    camp.nongHaveBottleMapIds.delete(user.id);
                    return [3 /*break*/, 50];
                case 53: return [4 /*yield*/, (nongCamp === null || nongCamp === void 0 ? void 0 : nongCamp.deleteOne())];
                case 54:
                    _a.sent();
                    camp.nongShertSize.forEach(function (v, k) {
                        camp.nongShertSize.set(k, (0, setup_1.calculate)(v, 0, baan.nongShertSize.get(k)));
                    });
                    return [4 /*yield*/, Place_1.default.findById(baan.boySleepPlaceId)];
                case 55:
                    boyP = _a.sent();
                    if (!boyP) return [3 /*break*/, 59];
                    return [4 /*yield*/, boyP.updateOne({ boySleepBaanIds: (0, setup_1.swop)(baan._id, null, boyP.boySleepBaanIds) })];
                case 56:
                    _a.sent();
                    return [4 /*yield*/, Building_1.default.findById(boyP.buildingId)];
                case 57:
                    boyB = _a.sent();
                    if (!boyB) return [3 /*break*/, 59];
                    return [4 /*yield*/, boyB.updateOne({ boySleepBaanIds: (0, setup_1.swop)(baan._id, null, boyB.boySleepBaanIds) })];
                case 58:
                    _a.sent();
                    _a.label = 59;
                case 59: return [4 /*yield*/, Place_1.default.findById(baan.girlSleepPlaceId)];
                case 60:
                    girlP = _a.sent();
                    if (!girlP) return [3 /*break*/, 64];
                    return [4 /*yield*/, girlP.updateOne({ girlSleepBaanIds: (0, setup_1.swop)(baan._id, null, girlP.girlSleepBaanIds) })];
                case 61:
                    _a.sent();
                    return [4 /*yield*/, Building_1.default.findById(girlP.buildingId)];
                case 62:
                    girlB = _a.sent();
                    if (!girlB) return [3 /*break*/, 64];
                    return [4 /*yield*/, girlB.updateOne({ girlSleepBaanIds: (0, setup_1.swop)(baan._id, null, girlB.girlSleepBaanIds) })];
                case 63:
                    _a.sent();
                    _a.label = 64;
                case 64: return [4 /*yield*/, Place_1.default.findById(baan === null || baan === void 0 ? void 0 : baan.nomalPlaceId)];
                case 65:
                    normalP = _a.sent();
                    if (!normalP) return [3 /*break*/, 69];
                    return [4 /*yield*/, normalP.updateOne({ normalBaanIds: (0, setup_1.swop)(baan._id, null, normalP.normalBaanIds) })];
                case 66:
                    _a.sent();
                    return [4 /*yield*/, Building_1.default.findById(normalP.buildingId)];
                case 67:
                    normalB = _a.sent();
                    if (!normalB) return [3 /*break*/, 69];
                    return [4 /*yield*/, normalB.updateOne({ normalBaanIds: (0, setup_1.swop)(baan._id, null, normalB.normalBaanIds) })];
                case 68:
                    _a.sent();
                    _a.label = 69;
                case 69:
                    camp.peeShertSize.forEach(function (v, k) {
                        camp.peeShertSize.set(k, (0, setup_1.calculate)(v, 0, baan === null || baan === void 0 ? void 0 : baan.peeShertSize.get(k)));
                    });
                    return [4 /*yield*/, camp.updateOne({
                            peeHaveBottle: (0, setup_1.calculate)(camp.peeHaveBottle, 0, baan.peeHaveBottle),
                            nongHaveBottle: (0, setup_1.calculate)(camp.nongHaveBottle, 0, baan.nongHaveBottle),
                            nongIds: nongIds,
                            nongHaveBottleMapIds: camp.nongHaveBottleMapIds,
                            nongShertSize: camp.nongShertSize,
                            peeIds: peeIds,
                            peeHaveBottleMapIds: camp.peeHaveBottleMapIds,
                            peeModelIds: peeModelIds,
                            peeShertSize: camp.peeShertSize,
                            peeShertManageIds: peeShertManageIds,
                            nongShertManageIds: nongShertManageIds,
                            baanIds: (0, setup_1.swop)(baan._id, null, camp.baanIds),
                            nongModelIds: (0, setup_1.swop)(baan.nongModelId, null, camp.nongModelIds)
                        })];
                case 70:
                    _a.sent();
                    return [4 /*yield*/, CampStyle_1.default.findByIdAndDelete(baan.styleId)];
                case 71:
                    _a.sent();
                    return [4 /*yield*/, baan.deleteOne()];
                case 72:
                    _a.sent();
                    res.status(200).json({ success: true });
                    return [2 /*return*/];
            }
        });
    });
}
function saveDeleteBaan(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var baan, camp, user, peeModelIds, i, peeCamp, boyP, boyB, girlP, girlB, normalP, normalB;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Baan_1.default.findById(req.params.id)];
                case 1:
                    baan = _a.sent();
                    if (!baan) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(baan.campId)];
                case 2:
                    camp = _a.sent();
                    return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 3:
                    user = _a.sent();
                    if (!camp || !user) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    if (!user || (user.role != 'admin' && !user.authPartIds.includes(camp.partBoardId))) {
                        return [2 /*return*/, res.status(403).json({ success: false })];
                    }
                    if (baan.nongIds.length || baan.peeIds.length || baan.songIds.length) {
                        return [2 /*return*/, res.status(400).json({ success: false, message: 'this baan is not save to delete' })];
                    }
                    peeModelIds = camp.peeModelIds;
                    i = 0;
                    _a.label = 4;
                case 4:
                    if (!(i < baan.peeModelIds.length)) return [3 /*break*/, 6];
                    return [4 /*yield*/, PeeCamp_1.default.findById(baan.peeModelIds[i++])];
                case 5:
                    peeCamp = _a.sent();
                    if (!peeCamp) {
                        return [3 /*break*/, 4];
                    }
                    peeModelIds = (0, setup_1.swop)(peeCamp._id, null, peeModelIds);
                    peeCamp.deleteOne();
                    return [3 /*break*/, 4];
                case 6: return [4 /*yield*/, Place_1.default.findById(baan.boySleepPlaceId)];
                case 7:
                    boyP = _a.sent();
                    if (!boyP) return [3 /*break*/, 11];
                    return [4 /*yield*/, boyP.updateOne({ boySleepBaanIds: (0, setup_1.swop)(baan._id, null, boyP.boySleepBaanIds) })];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, Building_1.default.findById(boyP.buildingId)];
                case 9:
                    boyB = _a.sent();
                    if (!boyB) return [3 /*break*/, 11];
                    return [4 /*yield*/, boyB.updateOne({ boySleepBaanIds: (0, setup_1.swop)(baan._id, null, boyB.boySleepBaanIds) })];
                case 10:
                    _a.sent();
                    _a.label = 11;
                case 11: return [4 /*yield*/, Place_1.default.findById(baan.girlSleepPlaceId)];
                case 12:
                    girlP = _a.sent();
                    if (!girlP) return [3 /*break*/, 16];
                    return [4 /*yield*/, girlP.updateOne({ girlSleepBaanIds: (0, setup_1.swop)(baan._id, null, girlP.girlSleepBaanIds) })];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, Building_1.default.findById(girlP.buildingId)];
                case 14:
                    girlB = _a.sent();
                    if (!girlB) return [3 /*break*/, 16];
                    return [4 /*yield*/, girlB.updateOne({ girlSleepBaanIds: (0, setup_1.swop)(baan._id, null, girlB.girlSleepBaanIds) })];
                case 15:
                    _a.sent();
                    _a.label = 16;
                case 16: return [4 /*yield*/, Place_1.default.findById(baan === null || baan === void 0 ? void 0 : baan.nomalPlaceId)];
                case 17:
                    normalP = _a.sent();
                    if (!normalP) return [3 /*break*/, 21];
                    return [4 /*yield*/, normalP.updateOne({ normalBaanIds: (0, setup_1.swop)(baan._id, null, normalP.normalBaanIds) })];
                case 18:
                    _a.sent();
                    return [4 /*yield*/, Building_1.default.findById(normalP.buildingId)];
                case 19:
                    normalB = _a.sent();
                    if (!normalB) return [3 /*break*/, 21];
                    return [4 /*yield*/, normalB.updateOne({ normalBaanIds: (0, setup_1.swop)(baan._id, null, normalB.normalBaanIds) })];
                case 20:
                    _a.sent();
                    _a.label = 21;
                case 21: return [4 /*yield*/, camp.updateOne({ nongModelIds: (0, setup_1.swop)(baan.nongModelId, null, camp.nongModelIds), peeModelIds: peeModelIds })];
                case 22:
                    _a.sent();
                    return [4 /*yield*/, NongCamp_1.default.findByIdAndDelete(baan.nongModelId)];
                case 23:
                    _a.sent();
                    return [4 /*yield*/, CampStyle_1.default.findByIdAndDelete(baan.styleId)];
                case 24:
                    _a.sent();
                    return [4 /*yield*/, baan.deleteOne()];
                case 25:
                    _a.sent();
                    res.status(200).json({ success: true });
                    return [2 /*return*/];
            }
        });
    });
}
function saveDeletePart(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var part, camp, user, i, peeCamp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Part_1.default.findById(req.params.id)];
                case 1:
                    part = _a.sent();
                    if (!part) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(part.campId)];
                case 2:
                    camp = _a.sent();
                    return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 3:
                    user = _a.sent();
                    if (!camp || !user) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    if (!user || (user.role != 'admin' && !user.authPartIds.includes(camp.partBoardId))) {
                        return [2 /*return*/, res.status(403).json({ success: false })];
                    }
                    if (part.petoIds.length || part.peeIds.length || part.actionPlanIds.length || part.workItemIds.length) {
                        return [2 /*return*/, res.status(400).json({ success: false, message: 'this baan is not save to delete' })];
                    }
                    i = 0;
                    _a.label = 4;
                case 4:
                    if (!(i < part.peeModelIds.length)) return [3 /*break*/, 6];
                    return [4 /*yield*/, PeeCamp_1.default.findById(part.peeModelIds[i++])];
                case 5:
                    peeCamp = _a.sent();
                    if (!peeCamp) {
                        return [3 /*break*/, 4];
                    }
                    camp.updateOne({ peeModelIds: (0, setup_1.swop)(peeCamp._id, null, camp.peeModelIds) });
                    peeCamp === null || peeCamp === void 0 ? void 0 : peeCamp.deleteOne();
                    return [3 /*break*/, 4];
                case 6:
                    camp.updateOne({ petoModelIds: (0, setup_1.swop)(part.petoModelId, null, camp.petoModelIds) });
                    return [4 /*yield*/, NongCamp_1.default.findByIdAndDelete(part === null || part === void 0 ? void 0 : part.petoModelId)];
                case 7:
                    _a.sent();
                    part.deleteOne();
                    res.status(200).json({ success: true });
                    return [2 /*return*/];
            }
        });
    });
}
function forceDeletePart(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            forceDeletePartRaw(new mongoose_1.default.Types.ObjectId(req.params.id));
            res.status(200).json({ success: true });
            return [2 /*return*/];
        });
    });
}
function forceDeletePartRaw(partId) {
    return __awaiter(this, void 0, void 0, function () {
        var part, camp, petoShertManageIds, peeShertManageIds, actionPlanIds, petoIds, peeIds, peeModelIds, workItemIds, peeHelthIsueIds, petoHelthIsueIds, i, helthIsue, user, helthIsue, user, shertManage, peeCamp, baan, actionPlan, j, place, building, workItem, from, shertManage, user, shertManage, user, peeCamp, baan, peeCamp, baan, j, user, petoCamp, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Part_1.default.findById(partId)];
                case 1:
                    part = _a.sent();
                    if (!part) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(part.campId)];
                case 2:
                    camp = _a.sent();
                    if (!camp) {
                        return [2 /*return*/];
                    }
                    petoShertManageIds = camp.petoShertManageIds;
                    peeShertManageIds = camp.peeShertManageIds;
                    actionPlanIds = camp.actionPlanIds;
                    petoIds = camp.petoIds;
                    peeIds = camp.peeIds;
                    peeModelIds = camp.peeModelIds;
                    workItemIds = camp.workItemIds;
                    peeHelthIsueIds = camp.peeHelthIsueIds;
                    petoHelthIsueIds = camp.petoHelthIsueIds;
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < part.petoHelthIsueIds.length)) return [3 /*break*/, 8];
                    return [4 /*yield*/, HelthIsue_1.default.findById(part.petoHelthIsueIds[i++])];
                case 4:
                    helthIsue = _a.sent();
                    if (!helthIsue) {
                        return [3 /*break*/, 3];
                    }
                    petoHelthIsueIds = (0, setup_1.swop)(helthIsue._id, null, petoHelthIsueIds);
                    return [4 /*yield*/, User_1.default.findById(helthIsue.userId)];
                case 5:
                    user = _a.sent();
                    if (!user) {
                        return [3 /*break*/, 3];
                    }
                    if (!(user.helthIsueId !== (helthIsue._id))) return [3 /*break*/, 7];
                    return [4 /*yield*/, helthIsue.deleteOne()];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: return [3 /*break*/, 3];
                case 8:
                    i = 0;
                    _a.label = 9;
                case 9:
                    if (!(i < part.peeHelthIsueIds.length)) return [3 /*break*/, 18];
                    return [4 /*yield*/, HelthIsue_1.default.findById(part.peeHelthIsueIds[i++])];
                case 10:
                    helthIsue = _a.sent();
                    if (!helthIsue) {
                        return [3 /*break*/, 9];
                    }
                    peeHelthIsueIds = (0, setup_1.swop)(helthIsue._id, null, peeHelthIsueIds);
                    return [4 /*yield*/, User_1.default.findById(helthIsue.userId)];
                case 11:
                    user = _a.sent();
                    if (!user) {
                        return [3 /*break*/, 9];
                    }
                    return [4 /*yield*/, ShertManage_1.default.findById(part.mapShertManageIdByUserId.get(user.id))];
                case 12:
                    shertManage = _a.sent();
                    if (!shertManage) {
                        return [3 /*break*/, 9];
                    }
                    return [4 /*yield*/, PeeCamp_1.default.findById(shertManage.campModelId)];
                case 13:
                    peeCamp = _a.sent();
                    if (!peeCamp) {
                        return [3 /*break*/, 9];
                    }
                    return [4 /*yield*/, Baan_1.default.findById(peeCamp.baanId)];
                case 14:
                    baan = _a.sent();
                    if (!baan) {
                        return [3 /*break*/, 9];
                    }
                    return [4 /*yield*/, baan.updateOne({ peeHelthIsueIds: (0, setup_1.swop)(helthIsue._id, null, baan.peeHelthIsueIds) })];
                case 15:
                    _a.sent();
                    if (!(user.helthIsueId !== (helthIsue._id))) return [3 /*break*/, 17];
                    return [4 /*yield*/, helthIsue.deleteOne()];
                case 16:
                    _a.sent();
                    _a.label = 17;
                case 17: return [3 /*break*/, 9];
                case 18:
                    camp === null || camp === void 0 ? void 0 : camp.petoShertSize.forEach(function (v, k) {
                        camp.petoShertSize.set(k, (0, setup_1.calculate)(v, 0, part === null || part === void 0 ? void 0 : part.petoShertSize.get(k)));
                    });
                    camp === null || camp === void 0 ? void 0 : camp.peeShertSize.forEach(function (v, k) {
                        camp.peeShertSize.set(k, (0, setup_1.calculate)(v, 0, part === null || part === void 0 ? void 0 : part.peeShertSize.get(k)));
                    });
                    i = 0;
                    _a.label = 19;
                case 19:
                    if (!(i < part.actionPlanIds.length)) return [3 /*break*/, 27];
                    return [4 /*yield*/, ActionPlan_1.default.findById(part.actionPlanIds[i++])];
                case 20:
                    actionPlan = _a.sent();
                    if (!actionPlan) {
                        return [3 /*break*/, 19];
                    }
                    j = 0;
                    _a.label = 21;
                case 21:
                    if (!(j < actionPlan.placeIds.length)) return [3 /*break*/, 26];
                    return [4 /*yield*/, Place_1.default.findById(actionPlan.placeIds[j++])];
                case 22:
                    place = _a.sent();
                    if (!place) {
                        return [3 /*break*/, 21];
                    }
                    return [4 /*yield*/, place.updateOne({ actionPlanIds: (0, setup_1.swop)(actionPlan._id, null, place.actionPlanIds) })];
                case 23:
                    _a.sent();
                    return [4 /*yield*/, Building_1.default.findById(place.buildingId)];
                case 24:
                    building = _a.sent();
                    if (!building) {
                        return [3 /*break*/, 21];
                    }
                    return [4 /*yield*/, building.updateOne({ actionPlanIds: (0, setup_1.swop)(actionPlan._id, null, building.actionPlanIds) })];
                case 25:
                    _a.sent();
                    return [3 /*break*/, 21];
                case 26:
                    actionPlanIds = (0, setup_1.swop)(actionPlan._id, null, actionPlanIds);
                    return [3 /*break*/, 19];
                case 27:
                    i = 0;
                    _a.label = 28;
                case 28:
                    if (!(i < part.workItemIds.length)) return [3 /*break*/, 34];
                    return [4 /*yield*/, WorkItem_1.default.findById(part.workItemIds[i++])];
                case 29:
                    workItem = _a.sent();
                    if (!workItem) {
                        return [3 /*break*/, 28];
                    }
                    if (!workItem.fromId) return [3 /*break*/, 32];
                    return [4 /*yield*/, WorkItem_1.default.findById(workItem.fromId)];
                case 30:
                    from = _a.sent();
                    if (!from) return [3 /*break*/, 32];
                    return [4 /*yield*/, from.updateOne({ linkOutIds: (0, setup_1.swop)(workItem._id, null, from.linkOutIds) })];
                case 31:
                    _a.sent();
                    _a.label = 32;
                case 32:
                    workItemIds = (0, setup_1.swop)(workItem === null || workItem === void 0 ? void 0 : workItem._id, null, workItemIds);
                    return [4 /*yield*/, deleteWorkingItemRaw(workItem._id)];
                case 33:
                    _a.sent();
                    return [3 /*break*/, 28];
                case 34:
                    i = 0;
                    _a.label = 35;
                case 35:
                    if (!(i < part.petoShertManageIds.length)) return [3 /*break*/, 39];
                    return [4 /*yield*/, ShertManage_1.default.findById(part.petoShertManageIds[i++])];
                case 36:
                    shertManage = _a.sent();
                    if (!shertManage) {
                        return [3 /*break*/, 35];
                    }
                    return [4 /*yield*/, User_1.default.findById(shertManage.userId)];
                case 37:
                    user = _a.sent();
                    if (!user) {
                        return [3 /*break*/, 35];
                    }
                    return [4 /*yield*/, user.updateOne({
                            shertManageIds: (0, setup_1.swop)(shertManage._id, null, user.shertManageIds)
                        })];
                case 38:
                    _a.sent();
                    petoShertManageIds = (0, setup_1.swop)(shertManage._id, null, petoShertManageIds);
                    shertManage === null || shertManage === void 0 ? void 0 : shertManage.deleteOne();
                    return [3 /*break*/, 35];
                case 39:
                    i = 0;
                    _a.label = 40;
                case 40:
                    if (!(i < part.peeShertManageIds.length)) return [3 /*break*/, 48];
                    return [4 /*yield*/, ShertManage_1.default.findById(part.peeShertManageIds[i++])];
                case 41:
                    shertManage = _a.sent();
                    if (!shertManage) {
                        return [3 /*break*/, 40];
                    }
                    return [4 /*yield*/, User_1.default.findById(shertManage.userId)];
                case 42:
                    user = _a.sent();
                    if (!user) {
                        return [3 /*break*/, 40];
                    }
                    return [4 /*yield*/, (user === null || user === void 0 ? void 0 : user.updateOne({
                            shertManageIds: (0, setup_1.swop)(shertManage._id, null, user.shertManageIds)
                        }))];
                case 43:
                    _a.sent();
                    peeShertManageIds = (0, setup_1.swop)(shertManage._id, null, peeShertManageIds);
                    return [4 /*yield*/, PeeCamp_1.default.findById(shertManage.campModelId)];
                case 44:
                    peeCamp = _a.sent();
                    if (!peeCamp) {
                        return [3 /*break*/, 40];
                    }
                    return [4 /*yield*/, Baan_1.default.findById(peeCamp.baanId)];
                case 45:
                    baan = _a.sent();
                    if (!baan) {
                        return [3 /*break*/, 40];
                    }
                    baan.updateOne({ peeShertManageIds: (0, setup_1.swop)(shertManage === null || shertManage === void 0 ? void 0 : shertManage._id, null, part.peeShertManageIds) });
                    baan.peeShertSize.set(shertManage.size, (0, setup_1.calculate)(baan.peeShertSize.get(shertManage.size), 0, 1));
                    return [4 /*yield*/, shertManage.deleteOne()];
                case 46:
                    _a.sent();
                    return [4 /*yield*/, baan.updateOne({ peeShertSize: baan.peeShertSize })];
                case 47:
                    _a.sent();
                    return [3 /*break*/, 40];
                case 48:
                    i = 0;
                    _a.label = 49;
                case 49:
                    if (!(i < part.peeModelIds.length)) return [3 /*break*/, 60];
                    return [4 /*yield*/, PeeCamp_1.default.findById(part.peeModelIds[i++])];
                case 50:
                    peeCamp = _a.sent();
                    if (!peeCamp) {
                        return [3 /*break*/, 49];
                    }
                    return [4 /*yield*/, Baan_1.default.findById(peeCamp.baanId)];
                case 51:
                    baan = _a.sent();
                    if (!baan) {
                        return [3 /*break*/, 49];
                    }
                    j = 0;
                    _a.label = 52;
                case 52:
                    if (!(j < peeCamp.peeIds.length)) return [3 /*break*/, 58];
                    return [4 /*yield*/, User_1.default.findById(peeCamp.peeIds[j++])];
                case 53:
                    user = _a.sent();
                    if (!user) {
                        return [3 /*break*/, 52];
                    }
                    if (!user.haveBottle) return [3 /*break*/, 55];
                    return [4 /*yield*/, (baan === null || baan === void 0 ? void 0 : baan.updateOne({ peeHaveBottle: baan.peeHaveBottle - 1 }))];
                case 54:
                    _a.sent();
                    _a.label = 55;
                case 55: return [4 /*yield*/, baan.updateOne({ peeIds: (0, setup_1.swop)(user._id, null, baan.peeIds) })];
                case 56:
                    _a.sent();
                    peeIds = (0, setup_1.swop)(user._id, null, peeIds);
                    return [4 /*yield*/, user.updateOne({ peeCampIds: (0, setup_1.swop)(peeCamp._id, null, user.peeCampIds) })];
                case 57:
                    _a.sent();
                    camp.peeHaveBottleMapIds.delete(user.id);
                    return [3 /*break*/, 52];
                case 58:
                    peeModelIds = (0, setup_1.swop)(peeCamp._id, null, peeModelIds);
                    return [4 /*yield*/, peeCamp.deleteOne()];
                case 59:
                    _a.sent();
                    return [3 /*break*/, 49];
                case 60: return [4 /*yield*/, PetoCamp_1.default.findById(part.petoModelId)];
                case 61:
                    petoCamp = _a.sent();
                    if (!petoCamp) {
                        return [2 /*return*/];
                    }
                    _a.label = 62;
                case 62:
                    if (!(i < (petoCamp === null || petoCamp === void 0 ? void 0 : petoCamp.petoIds.length))) return [3 /*break*/, 65];
                    return [4 /*yield*/, User_1.default.findById(petoCamp.petoIds)];
                case 63:
                    user = _a.sent();
                    if (!user) {
                        return [3 /*break*/, 62];
                    }
                    petoIds = (0, setup_1.swop)(user._id, null, petoIds);
                    return [4 /*yield*/, user.updateOne({ petoCampIds: (0, setup_1.swop)(petoCamp._id, null, user.petoCampIds) })];
                case 64:
                    _a.sent();
                    camp.petoHaveBottleMapIds.delete(user.id);
                    return [3 /*break*/, 62];
                case 65:
                    petoCamp.deleteOne();
                    return [4 /*yield*/, camp.updateOne({
                            partIds: (0, setup_1.swop)(part._id, null, camp.partIds),
                            petoModelIds: (0, setup_1.swop)(part.petoModelId, null, camp.petoModelIds),
                            peeHaveBottle: (0, setup_1.calculate)(camp.peeHaveBottle, 0, part.peeHaveBottle),
                            petoHaveBottle: (0, setup_1.calculate)(camp.petoHaveBottle, 0, part.petoHaveBottle),
                            petoHaveBottleMapIds: camp.petoHaveBottleMapIds,
                            peeHaveBottleMapIds: camp.peeHaveBottleMapIds,
                            petoShertSize: camp.petoShertSize,
                            petoShertManageIds: petoShertManageIds,
                            peeShertManageIds: peeShertManageIds,
                            peeModelIds: peeModelIds,
                            actionPlanIds: actionPlanIds,
                            petoIds: petoIds,
                            peeIds: peeIds,
                            workItemIds: workItemIds,
                            peeHelthIsueIds: peeHelthIsueIds,
                            petoHelthIsueIds: petoHelthIsueIds
                        })];
                case 66:
                    _a.sent();
                    return [4 /*yield*/, part.deleteOne()];
                case 67:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function addPartName(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var name;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, PartNameContainer_1.default.create({ name: req.params.id })];
                case 1:
                    name = _a.sent();
                    res.status(201).json(name);
                    return [2 /*return*/];
            }
        });
    });
}
function saveDeletePartName(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var hospital, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, PartNameContainer_1.default.findById(req.params.id)];
                case 1:
                    hospital = _b.sent();
                    res.status(400).json({
                        success: false
                    });
                    if (hospital === null || hospital === void 0 ? void 0 : hospital.campIds.length) {
                        return [2 /*return*/, res.status(400).json({ success: false, massage: 'this not safe to delete' })];
                    }
                    res.status(200).json({
                        success: true,
                        data: {}
                    });
                    return [3 /*break*/, 3];
                case 2:
                    _a = _b.sent();
                    res.status(400).json({
                        success: false
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function forceDeletePartName(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var partNameContainer, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, PartNameContainer_1.default.findById(req.params.id)];
                case 1:
                    partNameContainer = _a.sent();
                    if (!partNameContainer) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < partNameContainer.partIds.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, forceDeletePartRaw(partNameContainer.partIds[i++])];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 2];
                case 4:
                    res.status(200).json({ success: true });
                    return [2 /*return*/];
            }
        });
    });
}
function addAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var userIds, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userIds = req.body.userIds;
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < userIds.length)) return [3 /*break*/, 3];
                    return [4 /*yield*/, User_1.default.findByIdAndUpdate(userIds[i++], { role: 'admin', fridayActEn: true, fridayAuth: true })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 1];
                case 3:
                    res.status(200).json({ success: true });
                    return [2 /*return*/];
            }
        });
    });
}
function getAllAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, User_1.default.find({ role: 'admin' })];
                case 1:
                    users = _a.sent();
                    res.status(200).json(users);
                    return [2 /*return*/];
            }
        });
    });
}
function downRole(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var users, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, User_1.default.find({ role: 'admin' })];
                case 1:
                    users = _a.sent();
                    if (users.length == 1) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 2:
                    user = _a.sent();
                    return [4 /*yield*/, (user === null || user === void 0 ? void 0 : user.updateOne({ role: req.params.id }))];
                case 3:
                    _a.sent();
                    res.status(200).json({ success: true });
                    return [2 /*return*/];
            }
        });
    });
}
function addMoreBoard(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, campId, userIds, camp, i, user;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, campId = _a.campId, userIds = _a.userIds;
                    return [4 /*yield*/, Camp_1.default.findById(campId)];
                case 1:
                    camp = _b.sent();
                    if (!camp) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    i = 0;
                    _b.label = 2;
                case 2:
                    if (!(i < userIds.length)) return [3 /*break*/, 5];
                    return [4 /*yield*/, User_1.default.findById(userIds[i++])];
                case 3:
                    user = _b.sent();
                    if (!user) {
                        return [3 /*break*/, 2];
                    }
                    return [4 /*yield*/, user.updateOne({
                            authorizeIds: (0, setup_1.swop)(null, camp._id, user.authorizeIds),
                            authPartIds: (0, setup_1.swop)(null, camp.partBoardId, user.authPartIds)
                        })];
                case 4:
                    _b.sent();
                    camp.boardIds.push(user._id);
                    return [3 /*break*/, 2];
                case 5: return [4 /*yield*/, camp.updateOne({ boardIds: camp.boardIds })];
                case 6:
                    _b.sent();
                    res.status(200).json({ success: true });
                    return [2 /*return*/];
            }
        });
    });
}
function removeBoard(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, campId, userId, camp, user;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, campId = _a.campId, userId = _a.userId;
                    return [4 /*yield*/, Camp_1.default.findById(campId)];
                case 1:
                    camp = _b.sent();
                    return [4 /*yield*/, User_1.default.findById(userId)];
                case 2:
                    user = _b.sent();
                    if (!user || !camp) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, (camp === null || camp === void 0 ? void 0 : camp.updateOne({ boardIds: (0, setup_1.swop)(user._id, null, camp.boardIds) }))];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, (user === null || user === void 0 ? void 0 : user.updateOne({
                            authorizeIds: (0, setup_1.swop)(camp._id, null, user.authorizeIds),
                            authPartIds: (0, setup_1.swop)(camp.partBoardId, null, user.authPartIds)
                        }))];
                case 4:
                    _b.sent();
                    (0, setup_1.sendRes)(res, true);
                    return [2 /*return*/];
            }
        });
    });
}
function updateCamp(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, camp, update;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, Camp_1.default.findById(req.params.id)];
                case 2:
                    camp = _a.sent();
                    if (!camp) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    if (!user || (user.role != 'admin' && !user.authPartIds.includes(camp.partBoardId))) {
                        return [2 /*return*/, res.status(403).json({ success: false })];
                    }
                    update = req.body;
                    return [4 /*yield*/, camp.updateOne(update)];
                case 3:
                    _a.sent();
                    res.status(200).json(camp);
                    return [2 /*return*/];
            }
        });
    });
}
function getCampNames(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var nameContainers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, NameContainer_1.default.find()];
                case 1:
                    nameContainers = _a.sent();
                    res.status(200).json(nameContainers);
                    return [2 /*return*/];
            }
        });
    });
}
function createBaanByGroup(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var camp, allGroup, memberMap, i, members, user, baan_1, baan, buf, user, baanId;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Camp_1.default.findById(req.params.id)];
                case 1:
                    camp = _b.sent();
                    if (!camp) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    allGroup = ['A', 'B', 'C', 'Dog', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T'];
                    memberMap = new Map();
                    i = 0;
                    while (i < 18) {
                        memberMap.set(allGroup[i++], []);
                        //const baan=await addBaanRaw(camp,allGroup[i])
                        //baans.set(allGroup[i++],baan)
                    }
                    i = 0;
                    members = [];
                    camp.peePassIds.forEach(function (v, k) {
                        members.push(k);
                    });
                    _b.label = 2;
                case 2:
                    if (!(i < members.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, User_1.default.findById(members[i++])];
                case 3:
                    user = _b.sent();
                    if (!user || !user.group) {
                        return [3 /*break*/, 2];
                    }
                    (_a = memberMap.get(user.group)) === null || _a === void 0 ? void 0 : _a.push(user._id);
                    return [3 /*break*/, 2];
                case 4:
                    i = 0;
                    _b.label = 5;
                case 5:
                    if (!(i < 18)) return [3 /*break*/, 8];
                    return [4 /*yield*/, addBaanRaw(camp, allGroup[i], allGroup[i])];
                case 6:
                    baan_1 = _b.sent();
                    camp.groupRefMap.set(allGroup[i], baan_1._id);
                    return [4 /*yield*/, (0, camp_1.addPeeRaw)(memberMap.get(allGroup[i++]), baan_1._id)];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 8:
                    i = 0;
                    return [4 /*yield*/, Baan_1.default.findById(camp.baanBordId)];
                case 9:
                    baan = _b.sent();
                    if (!baan) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    buf = baan.peeIds.map(function (e) { return (e); });
                    _b.label = 10;
                case 10:
                    if (!(i < buf.length)) return [3 /*break*/, 13];
                    return [4 /*yield*/, User_1.default.findById(buf[i++])];
                case 11:
                    user = _b.sent();
                    if (!user || !user.group) {
                        return [3 /*break*/, 10];
                    }
                    baanId = camp.groupRefMap.get(user.group);
                    return [4 /*yield*/, (0, camp_1.changeBaanRaw)([user._id], baanId, res)];
                case 12:
                    _b.sent();
                    return [3 /*break*/, 10];
                case 13:
                    (0, setup_1.sendRes)(res, true);
                    return [2 /*return*/];
            }
        });
    });
}
function deleteWorkingItemRaw(workItemId) {
    return __awaiter(this, void 0, void 0, function () {
        var workItem, part, camp, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, WorkItem_1.default.findById(workItemId)];
                case 1:
                    workItem = _a.sent();
                    if (!workItem) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Part_1.default.findById(workItem.partId)];
                case 2:
                    part = _a.sent();
                    return [4 /*yield*/, Camp_1.default.findById(part === null || part === void 0 ? void 0 : part.campId)];
                case 3:
                    camp = _a.sent();
                    if (!camp || !part) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, part.updateOne({ workItemIds: (0, setup_1.swop)(workItem._id, null, part.workItemIds) })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, camp.updateOne({ workItemIds: (0, setup_1.swop)(workItem._id, null, camp.workItemIds) })];
                case 5:
                    _a.sent();
                    i = 0;
                    _a.label = 6;
                case 6:
                    if (!(i < workItem.linkOutIds.length)) return [3 /*break*/, 9];
                    if (!workItem.linkOutIds[i++]) return [3 /*break*/, 8];
                    return [4 /*yield*/, deleteWorkingItemRaw(workItem.linkOutIds[i - 1])];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8: return [3 /*break*/, 6];
                case 9: return [4 /*yield*/, workItem.deleteOne()];
                case 10:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function getPartNames(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var partNames;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, PartNameContainer_1.default.find()];
                case 1:
                    partNames = _a.sent();
                    res.status(200).json(partNames);
                    return [2 /*return*/];
            }
        });
    });
}
function addAllGroup(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var baan, camp, user, ready, i, baan_2, j, user_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Baan_1.default.findById(req.params.id)];
                case 1:
                    baan = _a.sent();
                    if (!baan) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(baan.campId)];
                case 2:
                    camp = _a.sent();
                    return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 3:
                    user = _a.sent();
                    if (!camp || !user || !baan.groupRef) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    if (!camp.ready.includes(baan.groupRef)) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    ready = camp.ready;
                    ready.push(baan.groupRef);
                    return [4 /*yield*/, camp.updateOne({ ready: ready })];
                case 4:
                    _a.sent();
                    if (ready.length < 18) {
                        (0, setup_1.sendRes)(res, true);
                        return [2 /*return*/];
                    }
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < camp.baanIds.length)) return [3 /*break*/, 11];
                    return [4 /*yield*/, Baan_1.default.findById(camp.baanIds[i++])];
                case 6:
                    baan_2 = _a.sent();
                    if (!baan_2 || !baan_2.groupRef) {
                        return [3 /*break*/, 5];
                    }
                    j = 0;
                    _a.label = 7;
                case 7:
                    if (!(j < baan_2.nongIds.length)) return [3 /*break*/, 10];
                    return [4 /*yield*/, User_1.default.findById(baan_2.nongIds[j++])];
                case 8:
                    user_1 = _a.sent();
                    return [4 /*yield*/, (user_1 === null || user_1 === void 0 ? void 0 : user_1.updateOne({ group: baan_2.groupRef }))];
                case 9:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 10: return [3 /*break*/, 5];
                case 11: return [2 /*return*/];
            }
        });
    });
}
function getAllRemainPartName(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var camp, partNameContainers, partNameIds, buf, i, out, partNameContainer, key, name_3, value;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Camp_1.default.findById(req.params.id)];
                case 1:
                    camp = _a.sent();
                    if (!camp) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, PartNameContainer_1.default.find()];
                case 2:
                    partNameContainers = _a.sent();
                    partNameIds = partNameContainers.map(function (partNameContainer) { return (partNameContainer._id); });
                    buf = (0, setup_1.removeDupicate)(partNameIds, camp.partNameIds);
                    i = 0;
                    out = [];
                    _a.label = 3;
                case 3:
                    if (!(i < buf.length)) return [3 /*break*/, 5];
                    return [4 /*yield*/, PartNameContainer_1.default.findById(buf[i++])];
                case 4:
                    partNameContainer = _a.sent();
                    if (!partNameContainer) {
                        return [3 /*break*/, 3];
                    }
                    key = partNameContainer._id, name_3 = partNameContainer.name;
                    value = name_3;
                    out.push({ key: key, value: value });
                    return [3 /*break*/, 3];
                case 5:
                    res.status(200).json(out);
                    return [2 /*return*/];
            }
        });
    });
}
function peeToPeto(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var users, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, User_1.default.find({ role: 'pee' })];
                case 1:
                    users = _a.sent();
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < users.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, users[i++].updateOne({ role: 'peto' })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 2];
                case 4:
                    (0, setup_1.sendRes)(res, true);
                    return [2 /*return*/];
            }
        });
    });
}
function afterVisnuToPee(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var users, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, User_1.default.find({ fridayActEn: true })];
                case 1:
                    users = _a.sent();
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < users.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, users[i++].updateOne({ role: 'pee' })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 2];
                case 4: return [2 /*return*/];
            }
        });
    });
}
