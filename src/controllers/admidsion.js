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
exports.interview = interview;
exports.paid = paid;
exports.sure = sure;
exports.pass = pass;
exports.kickPee = kickPee;
exports.kickNong = kickNong;
var Camp_1 = __importDefault(require("../models/Camp"));
var setup_1 = require("./setup");
var auth_1 = require("../middleware/auth");
var mongoose_1 = __importDefault(require("mongoose"));
var camp_1 = require("./camp");
function interview(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, members, campId, i;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, members = _a.members, campId = _a.campId;
                    return [4 /*yield*/, interviewRaw(members, campId)];
                case 1:
                    i = _b.sent();
                    if (i == 0) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    res.status(200).json({ count: i });
                    return [2 /*return*/];
            }
        });
    });
}
function interviewRaw(members, campId) {
    return __awaiter(this, void 0, void 0, function () {
        var camp, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Camp_1.default.findById(campId)];
                case 1:
                    camp = _a.sent();
                    if (!camp) {
                        return [2 /*return*/, 0];
                    }
                    i = 0;
                    while (i < members.length) {
                        camp.nongInterviewIds.set(members[i].toString(), camp.nongPendingIds.get(members[i].toString()));
                        camp.nongPendingIds.delete(members[i++].toString());
                    }
                    return [4 /*yield*/, camp.updateOne({
                            nongPendingIds: camp.nongPendingIds,
                            nongInterviewIds: camp.nongInterviewIds
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, i];
            }
        });
    });
}
function passRaw(members, campId) {
    return __awaiter(this, void 0, void 0, function () {
        var camp, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Camp_1.default.findById(campId)];
                case 1:
                    camp = _a.sent();
                    if (!camp) {
                        return [2 /*return*/, 0];
                    }
                    i = 0;
                    while (i < members.length) {
                        camp.nongPassIds.set(members[i].toString(), camp.nongInterviewIds.get(members[i].toString()));
                        camp.nongInterviewIds.delete(members[i++].toString());
                        if (camp.registerModel === 'noPaid') {
                            //camp.nongPaidIds.push(members[i - 1])
                        }
                    }
                    return [4 /*yield*/, camp.updateOne({
                            nongPassIds: camp.nongPassIds,
                            nongInterviewIds: camp.nongInterviewIds,
                            //nongPaidIds:camp.nongPaidIds
                        })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, i];
            }
        });
    });
}
function paid(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, camp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, Camp_1.default.findById(req.params.id)];
                case 2:
                    camp = _a.sent();
                    if (!camp || !user || !camp.nongPassIds.has(user._id.toString())) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    if (!(camp.registerModel === 'noPaid')) return [3 /*break*/, 4];
                    camp.nongPassIds.delete(user._id.toString());
                    return [4 /*yield*/, camp.updateOne({
                            nongSureIds: (0, setup_1.swop)(null, user._id, camp.nongSureIds),
                            nongPassIds: camp.nongPassIds
                        })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, camp.updateOne({ nongPaidIds: (0, setup_1.swop)(null, user._id, camp.nongPaidIds) })];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
function sure(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, members, campId, camp, nongPaidIds, nongSureIds, i;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, members = _a.members, campId = _a.campId;
                    return [4 /*yield*/, Camp_1.default.findById(campId)];
                case 1:
                    camp = _b.sent();
                    if (!camp) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    nongPaidIds = camp.nongPaidIds, nongSureIds = camp.nongSureIds;
                    i = 0;
                    while (i < members.length) {
                        if (!camp.nongPaidIds.includes(new mongoose_1.default.Types.ObjectId(members[i].toString()))) {
                            i++;
                            //console.log('jjjjjjjjjjjjjjjjjjjjjjjj')
                            continue;
                        }
                        camp.nongPassIds.delete(members[i].toString());
                        nongPaidIds = (0, setup_1.swop)(members[i], null, nongPaidIds);
                        nongSureIds.push(members[i++]);
                    }
                    return [4 /*yield*/, camp.updateOne({
                            nongPaidIds: nongPaidIds,
                            nongSureIds: nongSureIds,
                            nongPassIds: camp.nongPassIds
                        })
                        //console.log(members)
                        //console.log(camp)
                    ];
                case 2:
                    _b.sent();
                    //console.log(members)
                    //console.log(camp)
                    res.status(200).json({ count: i });
                    return [2 /*return*/];
            }
        });
    });
}
function pass(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, campId, members, camp, i;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, campId = _a.campId, members = _a.members;
                    return [4 /*yield*/, Camp_1.default.findById(campId)];
                case 1:
                    camp = _b.sent();
                    if (!camp) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    if (!(camp.registerModel !== 'all')) return [3 /*break*/, 3];
                    return [4 /*yield*/, interviewRaw(members, campId)];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3: return [4 /*yield*/, passRaw(members, campId)];
                case 4:
                    i = _b.sent();
                    if (i == 0) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    res.status(200).json({ count: i });
                    return [2 /*return*/];
            }
        });
    });
}
function kickPee(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, campId, members, camp, im;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, campId = _a.campId, members = _a.members;
                    return [4 /*yield*/, Camp_1.default.findById(campId)];
                case 1:
                    camp = _b.sent();
                    if (!camp) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, (0, camp_1.getImpotentPartIdBCRP)(camp._id)];
                case 2:
                    im = _b.sent();
                    return [4 /*yield*/, (0, camp_1.changePartRaw)(members, im[3])];
                case 3:
                    _b.sent();
                    (0, setup_1.sendRes)(res, true);
                    return [2 /*return*/];
            }
        });
    });
}
function kickNong(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, members, campId, camp, i, nongPaidIds;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, members = _a.members, campId = _a.campId;
                    return [4 /*yield*/, Camp_1.default.findById(campId)];
                case 1:
                    camp = _b.sent();
                    if (!camp) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    i = 0;
                    nongPaidIds = camp.nongPaidIds;
                    while (i < members.length) {
                        camp.nongInterviewIds.delete(members[i].toString());
                        camp.nongPendingIds.delete(members[i].toString());
                        camp.nongPassIds.delete(members[i].toString());
                        camp.outRoundIds.push(members[i]);
                        nongPaidIds = (0, setup_1.swop)(members[i++], null, nongPaidIds);
                    }
                    return [4 /*yield*/, camp.updateOne({
                            nongPendingIds: camp.nongPendingIds,
                            nongInterviewIds: camp.nongInterviewIds,
                            nongPaidIds: nongPaidIds,
                            nongPassIds: camp.nongPassIds,
                            outRoundIds: camp.outRoundIds
                        })];
                case 2:
                    _b.sent();
                    (0, setup_1.sendRes)(res, true);
                    return [2 /*return*/];
            }
        });
    });
}
