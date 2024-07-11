"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.register = register;
exports.login = login;
exports.getMe = getMe;
exports.logout = logout;
exports.updateMode = updateMode;
exports.updateSize = updateSize;
exports.getHelthIsue = getHelthIsue;
exports.updateHelth = updateHelth;
exports.updateBottle = updateBottle;
exports.getShertManageByCampId = getShertManageByCampId;
exports.updateProfile = updateProfile;
exports.changeModeToPee = changeModeToPee;
exports.checkTel = checkTel;
exports.updateSleep = updateSleep;
exports.getUsers = getUsers;
exports.getShertmanage = getShertmanage;
exports.updateTimeOffset = updateTimeOffset;
exports.getTimeOffset = getTimeOffset;
exports.signId = signId;
exports.verifyEmail = verifyEmail;
var auth_1 = require("../middleware/auth");
var Baan_1 = __importDefault(require("../models/Baan"));
var Camp_1 = __importDefault(require("../models/Camp"));
var HelthIsue_1 = __importDefault(require("../models/HelthIsue"));
var NongCamp_1 = __importDefault(require("../models/NongCamp"));
var Part_1 = __importDefault(require("../models/Part"));
var PeeCamp_1 = __importDefault(require("../models/PeeCamp"));
var PetoCamp_1 = __importDefault(require("../models/PetoCamp"));
var ShertManage_1 = __importDefault(require("../models/ShertManage"));
var User_1 = __importStar(require("../models/User"));
var setup_1 = require("./setup");
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var TimeOffset_1 = __importDefault(require("../models/TimeOffset"));
// exports.register             
// exports.login
// exports.getMe               protect
// exports.logout
// exports.updateMode          protect pee up
// exports.updateSize          protect           params id
// exports.getHelthIsue        protect           params id
// exports.updateHelth         protect           params id
// exports.updateBottle        protect
// export async function getShertManageByCampId
function register(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var buf_1, user, select, display, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    buf_1 = req.body;
                    return [4 /*yield*/, User_1.default.create(buf_1)];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, TimeOffset_1.default.create({ userId: user._id })];
                case 2:
                    select = _a.sent();
                    return [4 /*yield*/, TimeOffset_1.default.create({ userId: user._id })];
                case 3:
                    display = _a.sent();
                    return [4 /*yield*/, user.updateOne({ displayOffsetId: display._id, selectOffsetId: select._id })];
                case 4:
                    _a.sent();
                    sendTokenResponse(user, 200, res);
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _a.sent();
                    res.status(400).json({
                        success: false
                    });
                    console.log(err_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, user, isMatch;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, email = _a.email, password = _a.password;
                    if (!email || !password) {
                        return [2 /*return*/, res.status(400).json({
                                success: false,
                                msg: "Please provide an email and password"
                            })];
                    }
                    return [4 /*yield*/, User_1.default.findOne({
                            email: email
                        }).select("+password")];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        return [2 /*return*/, res.status(400).json({
                                success: false,
                                msg: "Invalid credentials"
                            })];
                    }
                    return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                case 2:
                    isMatch = _b.sent();
                    if (!isMatch) {
                        return [2 /*return*/, res.status(401).json({
                                success: false,
                                msg: "Invalid credentials"
                            })];
                    }
                    sendTokenResponse(user, 200, res);
                    return [2 /*return*/];
            }
        });
    });
}
var sendTokenResponse = function (user, statusCode, res) {
    var token = jsonwebtoken_1.default.sign({ id: user._id }, User_1.buf, {
        expiresIn: process.env.JWT_EXPIRE
    });
    var options = {
        expires: new Date(Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRE || '0') * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        token: token,
    });
};
function getMe(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 1:
                    user = _a.sent();
                    res.status(200).json(user);
                    return [2 /*return*/];
            }
        });
    });
}
function logout(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            //Clears cookie
            res.cookie('token', 'none', {
                expires: new Date(Date.now() + 10 * 1000),
                httpOnly: true
            });
            res.status(200).json({
                success: true,
                data: {}
            });
            return [2 /*return*/];
        });
    });
}
function updateMode(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, mode, filter, linkHash, user, _b, _c;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _a = req.body, mode = _a.mode, filter = _a.filter, linkHash = _a.linkHash;
                    _c = (_b = User_1.default).findByIdAndUpdate;
                    return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 1: return [4 /*yield*/, _c.apply(_b, [(_d = (_e.sent())) === null || _d === void 0 ? void 0 : _d._id, {
                            mode: mode,
                            filter: filter,
                            linkHash: linkHash
                        }])];
                case 2:
                    user = _e.sent();
                    res.status(200).json(user);
                    return [2 /*return*/];
            }
        });
    });
}
function updateSize(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var shertSize, old, oldSize, user, i, shertManage, _a, nongCamp, camp, baan, peeCamp, camp, baan, part, petoCamp, camp, part;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    shertSize = req.params.id;
                    return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 1:
                    old = _b.sent();
                    if (!old) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    oldSize = old.shertSize;
                    if (!shertSize) return [3 /*break*/, 23];
                    return [4 /*yield*/, User_1.default.findByIdAndUpdate(old._id, {
                            shertSize: shertSize
                        })];
                case 2:
                    user = _b.sent();
                    if (!user) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    i = 0;
                    _b.label = 3;
                case 3:
                    if (!(i < user.shertManageIds.length)) return [3 /*break*/, 22];
                    return [4 /*yield*/, ShertManage_1.default.findById(user.shertManageIds[i++])];
                case 4:
                    shertManage = _b.sent();
                    if (!shertManage) {
                        return [3 /*break*/, 3];
                    }
                    _a = shertManage.role;
                    switch (_a) {
                        case 'nong': return [3 /*break*/, 5];
                        case 'pee': return [3 /*break*/, 10];
                        case 'peto': return [3 /*break*/, 16];
                    }
                    return [3 /*break*/, 21];
                case 5: return [4 /*yield*/, NongCamp_1.default.findById(shertManage.campModelId)];
                case 6:
                    nongCamp = _b.sent();
                    if (!nongCamp) {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(nongCamp.campId)];
                case 7:
                    camp = _b.sent();
                    if (!camp || camp.dataLock) {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, Baan_1.default.findById(nongCamp.baanId)];
                case 8:
                    baan = _b.sent();
                    if (!baan) {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, shertManage.updateOne({ size: shertSize })];
                case 9:
                    _b.sent();
                    camp.nongShertSize.set(oldSize, (0, setup_1.calculate)(camp.nongShertSize.get(oldSize), 0, 1));
                    camp.nongShertSize.set(shertSize, (0, setup_1.calculate)(camp.nongShertSize.get(shertSize), 1, 0));
                    baan.nongShertSize.set(oldSize, (0, setup_1.calculate)(baan.nongShertSize.get(oldSize), 0, 1));
                    baan.nongShertSize.set(shertSize, (0, setup_1.calculate)(baan.nongShertSize.get(shertSize), 1, 0));
                    return [3 /*break*/, 21];
                case 10: return [4 /*yield*/, PeeCamp_1.default.findById(shertManage.campModelId)];
                case 11:
                    peeCamp = _b.sent();
                    if (!peeCamp) {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(peeCamp.campId)];
                case 12:
                    camp = _b.sent();
                    if (!camp || camp.peeDataLock) {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, Baan_1.default.findById(peeCamp.baanId)];
                case 13:
                    baan = _b.sent();
                    return [4 /*yield*/, Part_1.default.findById(peeCamp.partId)];
                case 14:
                    part = _b.sent();
                    if (!baan || !part) {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, shertManage.updateOne({ size: shertSize })];
                case 15:
                    _b.sent();
                    camp.peeShertSize.set(oldSize, (0, setup_1.calculate)(camp.peeShertSize.get(oldSize), 0, 1));
                    camp.peeShertSize.set(shertSize, (0, setup_1.calculate)(camp.peeShertSize.get(shertSize), 1, 0));
                    baan.peeShertSize.set(oldSize, (0, setup_1.calculate)(baan.peeShertSize.get(oldSize), 0, 1));
                    baan.peeShertSize.set(shertSize, (0, setup_1.calculate)(baan.peeShertSize.get(shertSize), 1, 0));
                    part.peeShertSize.set(oldSize, (0, setup_1.calculate)(part.peeShertSize.get(oldSize), 0, 1));
                    part.peeShertSize.set(shertSize, (0, setup_1.calculate)(part.peeShertSize.get(shertSize), 1, 0));
                    return [3 /*break*/, 21];
                case 16: return [4 /*yield*/, PetoCamp_1.default.findById(shertManage.campModelId)];
                case 17:
                    petoCamp = _b.sent();
                    if (!petoCamp) {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(petoCamp.campId)];
                case 18:
                    camp = _b.sent();
                    if (!camp || camp.petoDataLock) {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, Part_1.default.findById(petoCamp.partId)];
                case 19:
                    part = _b.sent();
                    if (!part) {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, shertManage.updateOne({ size: shertSize })];
                case 20:
                    _b.sent();
                    camp.petoShertSize.set(oldSize, (0, setup_1.calculate)(camp.petoShertSize.get(oldSize), 0, 1));
                    camp.petoShertSize.set(shertSize, (0, setup_1.calculate)(camp.petoShertSize.get(shertSize), 1, 0));
                    part.petoShertSize.set(oldSize, (0, setup_1.calculate)(part.petoShertSize.get(oldSize), 0, 1));
                    part.petoShertSize.set(shertSize, (0, setup_1.calculate)(part.petoShertSize.get(shertSize), 1, 0));
                    return [3 /*break*/, 21];
                case 21: return [3 /*break*/, 3];
                case 22:
                    res.status(200).json(user);
                    return [3 /*break*/, 24];
                case 23:
                    res.status(400).json({
                        success: false
                    });
                    _b.label = 24;
                case 24: return [2 /*return*/];
            }
        });
    });
}
function getHelthIsue(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var data, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, HelthIsue_1.default.findById(req.params.id)];
                case 1:
                    data = _a.sent();
                    if (!data) {
                        return [2 /*return*/, res.status(400).json({
                                success: false
                            })];
                    }
                    res.status(200).json(data);
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    res.status(400).json({
                        success: false
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function updateHelth(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, helthIsueBody, oldHelthId, helth, i, nongCamp, baan, camp, peeCamp, baan, camp, part, petoCamp, camp, part, helth;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 1:
                    user = _a.sent();
                    helthIsueBody = req.body;
                    if (!user) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    oldHelthId = user.helthIsueId;
                    return [4 /*yield*/, findLock(user._id, oldHelthId)];
                case 2:
                    if (!_a.sent()) return [3 /*break*/, 28];
                    return [4 /*yield*/, HelthIsue_1.default.create(helthIsueBody)];
                case 3:
                    helth = _a.sent();
                    return [4 /*yield*/, user.updateOne({
                            helthIsueId: helth._id
                        })];
                case 4:
                    _a.sent();
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < user.nongCampIds.length)) return [3 /*break*/, 11];
                    return [4 /*yield*/, NongCamp_1.default.findById(user.nongCampIds[i++])];
                case 6:
                    nongCamp = _a.sent();
                    if (!nongCamp) {
                        return [3 /*break*/, 5];
                    }
                    return [4 /*yield*/, Baan_1.default.findById(nongCamp.baanId)];
                case 7:
                    baan = _a.sent();
                    return [4 /*yield*/, Camp_1.default.findById(nongCamp.campId)];
                case 8:
                    camp = _a.sent();
                    if (!camp || camp.dataLock || !baan) {
                        return [3 /*break*/, 5];
                    }
                    return [4 /*yield*/, camp.updateOne({
                            nongHelthIsueIds: (0, setup_1.swop)(oldHelthId, helth._id, camp.nongHelthIsueIds)
                        })];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, baan.updateOne({
                            nongHelthIsueIds: (0, setup_1.swop)(oldHelthId, helth._id, baan.nongHelthIsueIds)
                        })];
                case 10:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 11:
                    i = 0;
                    _a.label = 12;
                case 12:
                    if (!(i < user.peeCampIds.length)) return [3 /*break*/, 20];
                    return [4 /*yield*/, PeeCamp_1.default.findById(user.peeCampIds[i++])];
                case 13:
                    peeCamp = _a.sent();
                    if (!peeCamp) {
                        return [3 /*break*/, 12];
                    }
                    return [4 /*yield*/, Baan_1.default.findById(peeCamp.baanId)];
                case 14:
                    baan = _a.sent();
                    return [4 /*yield*/, Camp_1.default.findById(peeCamp.campId)];
                case 15:
                    camp = _a.sent();
                    return [4 /*yield*/, Part_1.default.findById(peeCamp.partId)];
                case 16:
                    part = _a.sent();
                    if (!camp || camp.dataLock || !baan || !part) {
                        return [3 /*break*/, 12];
                    }
                    return [4 /*yield*/, camp.updateOne({
                            peeHelthIsueIds: (0, setup_1.swop)(oldHelthId, helth._id, camp.peeHelthIsueIds)
                        })];
                case 17:
                    _a.sent();
                    return [4 /*yield*/, baan.updateOne({
                            peeHelthIsueIds: (0, setup_1.swop)(oldHelthId, helth._id, baan.peeHelthIsueIds)
                        })];
                case 18:
                    _a.sent();
                    return [4 /*yield*/, part.updateOne({
                            peeHelthIsueIds: (0, setup_1.swop)(oldHelthId, helth._id, part.peeHelthIsueIds)
                        })];
                case 19:
                    _a.sent();
                    return [3 /*break*/, 12];
                case 20:
                    i = 0;
                    _a.label = 21;
                case 21:
                    if (!(i < user.petoCampIds.length)) return [3 /*break*/, 27];
                    return [4 /*yield*/, PetoCamp_1.default.findById(user.petoCampIds[i++])];
                case 22:
                    petoCamp = _a.sent();
                    if (!petoCamp) {
                        return [3 /*break*/, 21];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(petoCamp.campId)];
                case 23:
                    camp = _a.sent();
                    return [4 /*yield*/, Part_1.default.findById(petoCamp.partId)];
                case 24:
                    part = _a.sent();
                    if (!camp || camp.dataLock || !part) {
                        return [3 /*break*/, 21];
                    }
                    return [4 /*yield*/, camp.updateOne({
                            petoHelthIsueIds: (0, setup_1.swop)(oldHelthId, helth._id, camp.petoHelthIsueIds)
                        })];
                case 25:
                    _a.sent();
                    return [4 /*yield*/, part.updateOne({
                            petoHelthIsueIds: (0, setup_1.swop)(oldHelthId, helth._id, part.petoHelthIsueIds)
                        })];
                case 26:
                    _a.sent();
                    return [3 /*break*/, 21];
                case 27:
                    res.status(200).json({
                        success: true,
                        data: helth
                    });
                    return [3 /*break*/, 30];
                case 28: return [4 /*yield*/, HelthIsue_1.default.findByIdAndUpdate(user === null || user === void 0 ? void 0 : user.helthIsueId, helthIsueBody)];
                case 29:
                    helth = _a.sent();
                    res.status(200).json(helth === null || helth === void 0 ? void 0 : helth.toObject());
                    _a.label = 30;
                case 30: return [2 /*return*/];
            }
        });
    });
}
function findLock(userId, oldHelthId) {
    return __awaiter(this, void 0, void 0, function () {
        var user, i, nongCamp, camp, peeCamp, camp, petoCamp, camp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, User_1.default.findById(userId)];
                case 1:
                    user = _a.sent();
                    if (!oldHelthId || !user) {
                        return [2 /*return*/, true];
                    }
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < user.nongCampIds.length)) return [3 /*break*/, 5];
                    return [4 /*yield*/, NongCamp_1.default.findById(user.nongCampIds[i++])];
                case 3:
                    nongCamp = _a.sent();
                    if (!nongCamp) {
                        return [3 /*break*/, 2];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(nongCamp.campId)];
                case 4:
                    camp = _a.sent();
                    if (!camp) {
                        return [3 /*break*/, 2];
                    }
                    if (camp.nongHelthIsueIds.includes(oldHelthId) && camp.dataLock) {
                        return [2 /*return*/, true];
                    }
                    return [3 /*break*/, 2];
                case 5:
                    i = 0;
                    _a.label = 6;
                case 6:
                    if (!(i < user.peeCampIds.length)) return [3 /*break*/, 9];
                    return [4 /*yield*/, PeeCamp_1.default.findById(user.peeCampIds[i++])];
                case 7:
                    peeCamp = _a.sent();
                    if (!peeCamp) {
                        return [3 /*break*/, 6];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(peeCamp.campId)];
                case 8:
                    camp = _a.sent();
                    if (!camp) {
                        return [3 /*break*/, 6];
                    }
                    if (camp.peeHelthIsueIds.includes(oldHelthId) && camp.peeDataLock) {
                        return [2 /*return*/, true];
                    }
                    return [3 /*break*/, 6];
                case 9:
                    i = 0;
                    _a.label = 10;
                case 10:
                    if (!(i < user.petoCampIds.length)) return [3 /*break*/, 13];
                    return [4 /*yield*/, PetoCamp_1.default.findById(user.petoCampIds[i++])];
                case 11:
                    petoCamp = _a.sent();
                    if (!petoCamp) {
                        return [3 /*break*/, 10];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(petoCamp.campId)];
                case 12:
                    camp = _a.sent();
                    if (!camp) {
                        return [3 /*break*/, 10];
                    }
                    if (camp.petoHelthIsueIds.includes(oldHelthId) && camp.petoDataLock) {
                        return [2 /*return*/, true];
                    }
                    return [3 /*break*/, 10];
                case 13: return [2 /*return*/, false];
            }
        });
    });
}
function updateBottle(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var old, oldBottle, change, user, i, shertManage, _a, nongCamp, camp, baan, peeCamp, camp, baan, part, petoCamp, camp, part;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 1:
                    old = _b.sent();
                    if (!old) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    oldBottle = old === null || old === void 0 ? void 0 : old.haveBottle;
                    change = 1;
                    if (oldBottle) {
                        change = -1;
                    }
                    return [4 /*yield*/, User_1.default.findByIdAndUpdate(old._id, {
                            haveBottle: !oldBottle
                        })];
                case 2:
                    user = _b.sent();
                    if (!user) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    i = 0;
                    _b.label = 3;
                case 3:
                    if (!(i < user.shertManageIds.length)) return [3 /*break*/, 29];
                    return [4 /*yield*/, ShertManage_1.default.findById(user.shertManageIds[i++])];
                case 4:
                    shertManage = _b.sent();
                    if (!shertManage) {
                        return [3 /*break*/, 3];
                    }
                    _a = shertManage.role;
                    switch (_a) {
                        case 'nong': return [3 /*break*/, 5];
                        case 'pee': return [3 /*break*/, 12];
                        case 'peto': return [3 /*break*/, 21];
                    }
                    return [3 /*break*/, 28];
                case 5: return [4 /*yield*/, NongCamp_1.default.findById(shertManage.campModelId)];
                case 6:
                    nongCamp = _b.sent();
                    if (!nongCamp) {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(nongCamp.campId)];
                case 7:
                    camp = _b.sent();
                    if (!camp || camp.dataLock) {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, Baan_1.default.findById(nongCamp.baanId)];
                case 8:
                    baan = _b.sent();
                    if (!baan) {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, shertManage.updateOne({ haveBottle: !oldBottle })];
                case 9:
                    _b.sent();
                    return [4 /*yield*/, camp.updateOne({
                            nongHaveBottle: camp.nongHaveBottle + change
                        })];
                case 10:
                    _b.sent();
                    return [4 /*yield*/, baan.updateOne({
                            nongHaveBottle: baan.nongHaveBottle + change
                        })];
                case 11:
                    _b.sent();
                    return [3 /*break*/, 28];
                case 12: return [4 /*yield*/, PeeCamp_1.default.findById(shertManage.campModelId)];
                case 13:
                    peeCamp = _b.sent();
                    if (!peeCamp) {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(peeCamp.campId)];
                case 14:
                    camp = _b.sent();
                    if (!camp || camp.peeDataLock) {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, Baan_1.default.findById(peeCamp.baanId)];
                case 15:
                    baan = _b.sent();
                    return [4 /*yield*/, Part_1.default.findById(peeCamp.partId)];
                case 16:
                    part = _b.sent();
                    if (!baan || !part) {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, shertManage.updateOne({ haveBottle: !oldBottle })];
                case 17:
                    _b.sent();
                    return [4 /*yield*/, camp.updateOne({
                            peeHaveBottle: camp.peeHaveBottle + change
                        })];
                case 18:
                    _b.sent();
                    return [4 /*yield*/, baan.updateOne({
                            peeHaveBottle: baan.peeHaveBottle + change
                        })];
                case 19:
                    _b.sent();
                    return [4 /*yield*/, part.updateOne({
                            peeHaveBottle: part.peeHaveBottle + change
                        })];
                case 20:
                    _b.sent();
                    return [3 /*break*/, 28];
                case 21: return [4 /*yield*/, PetoCamp_1.default.findById(shertManage.campModelId)];
                case 22:
                    petoCamp = _b.sent();
                    if (!petoCamp) {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(petoCamp.campId)];
                case 23:
                    camp = _b.sent();
                    if (!camp || camp.petoDataLock) {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, Part_1.default.findById(petoCamp.partId)];
                case 24:
                    part = _b.sent();
                    if (!part) {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, shertManage.updateOne({ haveBottle: !oldBottle })];
                case 25:
                    _b.sent();
                    return [4 /*yield*/, camp.updateOne({
                            petoHaveBottle: camp.petoHaveBottle + change
                        })];
                case 26:
                    _b.sent();
                    return [4 /*yield*/, part.updateOne({
                            petoHaveBottle: part.petoHaveBottle + change
                        })];
                case 27:
                    _b.sent();
                    return [3 /*break*/, 28];
                case 28: return [3 /*break*/, 3];
                case 29:
                    res.status(200).json({
                        success: true,
                        user: user,
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function getShertManageByCampId(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, campId, camp, shertManage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 1:
                    user = _a.sent();
                    campId = req.params.id;
                    return [4 /*yield*/, Camp_1.default.findById(campId)];
                case 2:
                    camp = _a.sent();
                    return [4 /*yield*/, ShertManage_1.default.findById(camp === null || camp === void 0 ? void 0 : camp.mapShertManageIdByUserId.get(user === null || user === void 0 ? void 0 : user.id))];
                case 3:
                    shertManage = _a.sent();
                    res.status(200).json(shertManage);
                    return [2 /*return*/];
            }
        });
    });
} /*
export async function getSameWearing(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user = await getUser(req)
    var sames: InterUser[] = []
    user?.shertManageIds.forEach(async (shertManageId: string) => {
        const shertManage = await ShertManage.findById(shertManageId);
        switch (shertManage?.role) {
            case 'nong': {
                const nongCamp = await NongCamp.findById(shertManage.campModelId);
                const nong = await getSameWearingRaw(nongCamp?._id, []);
                nong.forEach((u) => {
                    sames.push(u);
                });
            }
            case 'pee': {
                const peeCamp = await PeeCamp.findById(shertManage.campModelId)
                const nong = await getSameWearingRaw(peeCamp?._id, []);
                nong.forEach((u) => {
                    sames.push(u);
                });
            }
            case 'peto': {
                const peeCamp = await PetoCamp.findById(shertManage.campModelId)
                const nong = await getSameWearingRaw(peeCamp?._id, []);
                nong.forEach((u) => {
                    sames.push(u);
                });
            }
        }
    })
}
async function getSameWearingRaw(campId: string, sames: InterUser[]): Promise<InterUser[]> {
    const camp = await Camp.findById(campId)
    camp?.nongHelthIsueIds.forEach(async (helthIsueId: string) => {
        const helthIsue = await HelthIsue.findById(helthIsueId)
        if (helthIsue?.isWearing) {
            const user: InterUser | null = await User.findById(helthIsue.userId)
            if (user) {
                sames.push(user)
            }
        }
    })
    return sames
}*/
function updateProfile(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, _a, email, tel, name, nickname, lastname, citizenId;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 1:
                    user = _b.sent();
                    _a = req.body, email = _a.email, tel = _a.tel, name = _a.name, nickname = _a.nickname, lastname = _a.lastname, citizenId = _a.citizenId;
                    return [4 /*yield*/, (user === null || user === void 0 ? void 0 : user.updateOne({ email: email, tel: tel, name: name, nickname: nickname, lastname: lastname, citizenId: citizenId }))];
                case 2:
                    _b.sent();
                    res.status(200).json(user);
                    return [2 /*return*/];
            }
        });
    });
}
function changeModeToPee(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, password, isMatch, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 1:
                    user = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    if (!user || user.role == 'nong') {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    password = req.params.id;
                    return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                case 3:
                    isMatch = _a.sent();
                    if (!isMatch) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, user.updateOne({ mode: 'pee' })];
                case 4:
                    _a.sent();
                    (0, setup_1.sendRes)(res, true);
                    return [3 /*break*/, 6];
                case 5:
                    err_3 = _a.sent();
                    console.log(err_3);
                    //console.log('tttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttttt')
                    (0, setup_1.sendRes)(res, false);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function checkTel(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var findUser, host, relation, i, nongCamp, camp, shertManage, _a, findnongCamp, findbaan, findPeeCamp, findbaan, peeCamp, camp, shertManage, _b, findnongCamp, findbaan, findPeeCamp, findbaan, findPart, findPeeCamp, findPart, petoCamp, camp, shertManage, _c, findnongCamp, findbaan, findPeeCamp, findbaan, findPart, findPeeCamp, findPart;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, User_1.default.findOne({ tel: req.params.id })];
                case 1:
                    findUser = _d.sent();
                    return [4 /*yield*/, (0, auth_1.getUser)(req)
                        //console.log(findUser)
                    ];
                case 2:
                    host = _d.sent();
                    relation = [];
                    if (!host || !findUser) {
                        res.status(400).json({ relation: relation });
                        return [2 /*return*/];
                    }
                    i = 0;
                    _d.label = 3;
                case 3:
                    if (!(i < host.nongCampIds.length)) return [3 /*break*/, 15];
                    return [4 /*yield*/, NongCamp_1.default.findById(host.nongCampIds[i++])];
                case 4:
                    nongCamp = _d.sent();
                    if (!nongCamp) {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(nongCamp.campId)];
                case 5:
                    camp = _d.sent();
                    if (!camp || !camp.mapShertManageIdByUserId.has(findUser._id.toString())) {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, ShertManage_1.default.findById(camp.mapShertManageIdByUserId.get(findUser._id.toString()))];
                case 6:
                    shertManage = _d.sent();
                    if (!shertManage) {
                        return [3 /*break*/, 3];
                    }
                    _a = shertManage.role;
                    switch (_a) {
                        case 'nong': return [3 /*break*/, 7];
                        case 'pee': return [3 /*break*/, 10];
                        case 'peto': return [3 /*break*/, 13];
                    }
                    return [3 /*break*/, 14];
                case 7: return [4 /*yield*/, NongCamp_1.default.findById(shertManage.campModelId)];
                case 8:
                    findnongCamp = _d.sent();
                    return [4 /*yield*/, Baan_1.default.findById(findnongCamp === null || findnongCamp === void 0 ? void 0 : findnongCamp.baanId)];
                case 9:
                    findbaan = _d.sent();
                    relation.push("\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E19\u0E0A\u0E37\u0E48\u0E2D".concat(findUser.nickname, " \u0E08\u0E32\u0E01\u0E04\u0E48\u0E32\u0E22").concat(camp.campName, " \u0E1A\u0E49\u0E32\u0E19").concat(findbaan === null || findbaan === void 0 ? void 0 : findbaan.name));
                    return [3 /*break*/, 14];
                case 10: return [4 /*yield*/, PeeCamp_1.default.findById(shertManage.campModelId)];
                case 11:
                    findPeeCamp = _d.sent();
                    return [4 /*yield*/, Baan_1.default.findById(findPeeCamp === null || findPeeCamp === void 0 ? void 0 : findPeeCamp.baanId)];
                case 12:
                    findbaan = _d.sent();
                    relation.push("\u0E1E\u0E35\u0E48\u0E0A\u0E37\u0E48\u0E2D".concat(findUser.nickname, " \u0E08\u0E32\u0E01\u0E04\u0E48\u0E32\u0E22").concat(camp.campName, " \u0E1A\u0E49\u0E32\u0E19").concat(findbaan === null || findbaan === void 0 ? void 0 : findbaan.name));
                    return [3 /*break*/, 14];
                case 13:
                    {
                        relation.push("\u0E1E\u0E35\u0E48\u0E0A\u0E37\u0E48\u0E2D".concat(findUser.nickname, " \u0E08\u0E32\u0E01\u0E04\u0E48\u0E32\u0E22").concat(camp.campName));
                        return [3 /*break*/, 14];
                    }
                    _d.label = 14;
                case 14: return [3 /*break*/, 3];
                case 15:
                    i = 0;
                    _d.label = 16;
                case 16:
                    if (!(i < host.peeCampIds.length)) return [3 /*break*/, 31];
                    return [4 /*yield*/, PeeCamp_1.default.findById(host.peeCampIds[i++])];
                case 17:
                    peeCamp = _d.sent();
                    if (!peeCamp) {
                        return [3 /*break*/, 16];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(peeCamp.campId)];
                case 18:
                    camp = _d.sent();
                    if (!camp || !camp.mapShertManageIdByUserId.has(findUser._id.toString())) {
                        return [3 /*break*/, 16];
                    }
                    return [4 /*yield*/, ShertManage_1.default.findById(camp.mapShertManageIdByUserId.get(findUser._id.toString()))];
                case 19:
                    shertManage = _d.sent();
                    if (!shertManage) {
                        return [3 /*break*/, 16];
                    }
                    _b = shertManage.role;
                    switch (_b) {
                        case 'nong': return [3 /*break*/, 20];
                        case 'pee': return [3 /*break*/, 23];
                        case 'peto': return [3 /*break*/, 27];
                    }
                    return [3 /*break*/, 30];
                case 20: return [4 /*yield*/, NongCamp_1.default.findById(shertManage.campModelId)];
                case 21:
                    findnongCamp = _d.sent();
                    return [4 /*yield*/, Baan_1.default.findById(findnongCamp === null || findnongCamp === void 0 ? void 0 : findnongCamp.baanId)];
                case 22:
                    findbaan = _d.sent();
                    relation.push("\u0E19\u0E49\u0E2D\u0E07".concat(findUser.nickname, " \u0E08\u0E32\u0E01\u0E04\u0E48\u0E32\u0E22").concat(camp.campName, " \u0E1A\u0E49\u0E32\u0E19").concat(findbaan === null || findbaan === void 0 ? void 0 : findbaan.name));
                    return [3 /*break*/, 30];
                case 23: return [4 /*yield*/, PeeCamp_1.default.findById(shertManage.campModelId)];
                case 24:
                    findPeeCamp = _d.sent();
                    return [4 /*yield*/, Baan_1.default.findById(findPeeCamp === null || findPeeCamp === void 0 ? void 0 : findPeeCamp.baanId)];
                case 25:
                    findbaan = _d.sent();
                    return [4 /*yield*/, Part_1.default.findById(findPeeCamp === null || findPeeCamp === void 0 ? void 0 : findPeeCamp.partId)];
                case 26:
                    findPart = _d.sent();
                    relation.push("\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E19\u0E0A\u0E37\u0E48\u0E2D".concat(findUser.nickname, " \u0E08\u0E32\u0E01\u0E04\u0E48\u0E32\u0E22").concat(camp.campName, " \u0E1A\u0E49\u0E32\u0E19").concat(findbaan === null || findbaan === void 0 ? void 0 : findbaan.name, " \u0E1D\u0E48\u0E32\u0E22").concat(findPart === null || findPart === void 0 ? void 0 : findPart.partName));
                    return [3 /*break*/, 30];
                case 27: return [4 /*yield*/, PetoCamp_1.default.findById(shertManage.campModelId)];
                case 28:
                    findPeeCamp = _d.sent();
                    return [4 /*yield*/, Part_1.default.findById(findPeeCamp === null || findPeeCamp === void 0 ? void 0 : findPeeCamp.partId)];
                case 29:
                    findPart = _d.sent();
                    relation.push("\u0E1E\u0E35\u0E48\u0E1B\u0E35\u0E42\u0E15\u0E0A\u0E37\u0E48\u0E2D".concat(findUser.nickname, " \u0E08\u0E32\u0E01\u0E04\u0E48\u0E32\u0E22").concat(camp.campName, " \u0E1D\u0E48\u0E32\u0E22").concat(findPart === null || findPart === void 0 ? void 0 : findPart.partName));
                    return [3 /*break*/, 30];
                case 30: return [3 /*break*/, 16];
                case 31:
                    i = 0;
                    _d.label = 32;
                case 32:
                    if (!(i < host.petoCampIds.length)) return [3 /*break*/, 47];
                    return [4 /*yield*/, PetoCamp_1.default.findById(host.petoCampIds[i++])];
                case 33:
                    petoCamp = _d.sent();
                    if (!petoCamp) {
                        return [3 /*break*/, 32];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(petoCamp.campId)];
                case 34:
                    camp = _d.sent();
                    if (!camp || !camp.mapShertManageIdByUserId.has(findUser._id.toString())) {
                        return [3 /*break*/, 32];
                    }
                    return [4 /*yield*/, ShertManage_1.default.findById(camp.mapShertManageIdByUserId.get(findUser._id.toString()))];
                case 35:
                    shertManage = _d.sent();
                    if (!shertManage) {
                        return [3 /*break*/, 32];
                    }
                    _c = shertManage.role;
                    switch (_c) {
                        case 'nong': return [3 /*break*/, 36];
                        case 'pee': return [3 /*break*/, 39];
                        case 'peto': return [3 /*break*/, 43];
                    }
                    return [3 /*break*/, 46];
                case 36: return [4 /*yield*/, NongCamp_1.default.findById(shertManage.campModelId)];
                case 37:
                    findnongCamp = _d.sent();
                    return [4 /*yield*/, Baan_1.default.findById(findnongCamp === null || findnongCamp === void 0 ? void 0 : findnongCamp.baanId)];
                case 38:
                    findbaan = _d.sent();
                    relation.push("\u0E19\u0E49\u0E2D\u0E07".concat(findUser.nickname, " \u0E08\u0E32\u0E01\u0E04\u0E48\u0E32\u0E22").concat(camp.campName, " \u0E1A\u0E49\u0E32\u0E19").concat(findbaan === null || findbaan === void 0 ? void 0 : findbaan.name));
                    return [3 /*break*/, 46];
                case 39: return [4 /*yield*/, PeeCamp_1.default.findById(shertManage.campModelId)];
                case 40:
                    findPeeCamp = _d.sent();
                    return [4 /*yield*/, Baan_1.default.findById(findPeeCamp === null || findPeeCamp === void 0 ? void 0 : findPeeCamp.baanId)];
                case 41:
                    findbaan = _d.sent();
                    return [4 /*yield*/, Part_1.default.findById(findPeeCamp === null || findPeeCamp === void 0 ? void 0 : findPeeCamp.partId)];
                case 42:
                    findPart = _d.sent();
                    relation.push("\u0E19\u0E49\u0E2D\u0E07\u0E1B\u0E351\u0E0A\u0E37\u0E48\u0E2D".concat(findUser.nickname, " \u0E08\u0E32\u0E01\u0E04\u0E48\u0E32\u0E22").concat(camp.campName, " \u0E1A\u0E49\u0E32\u0E19").concat(findbaan === null || findbaan === void 0 ? void 0 : findbaan.name, " \u0E1D\u0E48\u0E32\u0E22").concat(findPart === null || findPart === void 0 ? void 0 : findPart.partName));
                    return [3 /*break*/, 46];
                case 43: return [4 /*yield*/, PetoCamp_1.default.findById(shertManage.campModelId)];
                case 44:
                    findPeeCamp = _d.sent();
                    return [4 /*yield*/, Part_1.default.findById(findPeeCamp === null || findPeeCamp === void 0 ? void 0 : findPeeCamp.partId)];
                case 45:
                    findPart = _d.sent();
                    relation.push("\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E19\u0E0A\u0E37\u0E48\u0E2D".concat(findUser.nickname, " \u0E08\u0E32\u0E01\u0E04\u0E48\u0E32\u0E22").concat(camp.campName, " \u0E1D\u0E48\u0E32\u0E22").concat(findPart === null || findPart === void 0 ? void 0 : findPart.partName));
                    return [3 /*break*/, 46];
                case 46: return [3 /*break*/, 32];
                case 47:
                    res.status(200).json({
                        relation: relation
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function updateSleep(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var old, oldSleep, user, i, shertManage, _a, nongCamp, camp, baan, peeCamp, camp, baan, part, petoCamp, camp, part;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 1:
                    old = _b.sent();
                    if (!old) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    oldSleep = old === null || old === void 0 ? void 0 : old.likeToSleepAtCamp;
                    return [4 /*yield*/, User_1.default.findByIdAndUpdate(old._id, {
                            likeToSleepAtCamp: !oldSleep
                        })];
                case 2:
                    user = _b.sent();
                    if (!user) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    i = 0;
                    _b.label = 3;
                case 3:
                    if (!(i < user.shertManageIds.length)) return [3 /*break*/, 42];
                    return [4 /*yield*/, ShertManage_1.default.findById(user.shertManageIds[i++])];
                case 4:
                    shertManage = _b.sent();
                    if (!shertManage) {
                        return [3 /*break*/, 3];
                    }
                    _a = shertManage.role;
                    switch (_a) {
                        case 'nong': return [3 /*break*/, 5];
                        case 'pee': return [3 /*break*/, 16];
                        case 'peto': return [3 /*break*/, 30];
                    }
                    return [3 /*break*/, 41];
                case 5: return [4 /*yield*/, NongCamp_1.default.findById(shertManage.campModelId)];
                case 6:
                    nongCamp = _b.sent();
                    if (!nongCamp) {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(nongCamp.campId)];
                case 7:
                    camp = _b.sent();
                    if (!camp || camp.dataLock || camp.nongSleepModel !== 'เลือกได้ว่าจะค้างคืนหรือไม่') {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, Baan_1.default.findById(nongCamp.baanId)];
                case 8:
                    baan = _b.sent();
                    if (!baan) {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, shertManage.updateOne({ sleepAtCamp: !oldSleep })];
                case 9:
                    _b.sent();
                    if (!oldSleep) return [3 /*break*/, 12];
                    return [4 /*yield*/, camp.updateOne({
                            nongSleepIds: (0, setup_1.swop)(user._id, null, camp.nongSleepIds)
                        })];
                case 10:
                    _b.sent();
                    return [4 /*yield*/, baan.updateOne({
                            nongSleepIds: (0, setup_1.swop)(user._id, null, baan.nongSleepIds)
                        })];
                case 11:
                    _b.sent();
                    return [3 /*break*/, 15];
                case 12: return [4 /*yield*/, camp.updateOne({
                        nongSleepIds: (0, setup_1.swop)(null, user._id, camp.nongSleepIds)
                    })];
                case 13:
                    _b.sent();
                    return [4 /*yield*/, baan.updateOne({
                            nongSleepIds: (0, setup_1.swop)(null, user._id, baan.nongSleepIds)
                        })];
                case 14:
                    _b.sent();
                    _b.label = 15;
                case 15: return [3 /*break*/, 41];
                case 16: return [4 /*yield*/, PeeCamp_1.default.findById(shertManage.campModelId)];
                case 17:
                    peeCamp = _b.sent();
                    if (!peeCamp) {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(peeCamp.campId)];
                case 18:
                    camp = _b.sent();
                    if (!camp || camp.peeDataLock || camp.peeSleepModel != 'เลือกได้ว่าจะค้างคืนหรือไม่') {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, Baan_1.default.findById(peeCamp.baanId)];
                case 19:
                    baan = _b.sent();
                    return [4 /*yield*/, Part_1.default.findById(peeCamp.partId)];
                case 20:
                    part = _b.sent();
                    if (!baan || !part) {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, shertManage.updateOne({ sleepAtCamp: !oldSleep })];
                case 21:
                    _b.sent();
                    if (!oldSleep) return [3 /*break*/, 25];
                    return [4 /*yield*/, camp.updateOne({ peeSleepIds: (0, setup_1.swop)(user._id, null, camp.peeSleepIds) })];
                case 22:
                    _b.sent();
                    return [4 /*yield*/, baan.updateOne({ peeSleepIds: (0, setup_1.swop)(user._id, null, baan.peeSleepIds) })];
                case 23:
                    _b.sent();
                    return [4 /*yield*/, part.updateOne({ peeSleepIds: (0, setup_1.swop)(user._id, null, part.peeSleepIds) })];
                case 24:
                    _b.sent();
                    return [3 /*break*/, 29];
                case 25: return [4 /*yield*/, camp.updateOne({ peeSleepIds: (0, setup_1.swop)(null, user._id, camp.peeSleepIds) })];
                case 26:
                    _b.sent();
                    return [4 /*yield*/, baan.updateOne({ peeSleepIds: (0, setup_1.swop)(null, user._id, baan.peeSleepIds) })];
                case 27:
                    _b.sent();
                    return [4 /*yield*/, part.updateOne({ peeSleepIds: (0, setup_1.swop)(null, user._id, part.peeSleepIds) })];
                case 28:
                    _b.sent();
                    _b.label = 29;
                case 29: return [3 /*break*/, 41];
                case 30: return [4 /*yield*/, PetoCamp_1.default.findById(shertManage.campModelId)];
                case 31:
                    petoCamp = _b.sent();
                    if (!petoCamp) {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(petoCamp.campId)];
                case 32:
                    camp = _b.sent();
                    if (!camp || camp.petoDataLock || camp.peeSleepModel !== 'เลือกได้ว่าจะค้างคืนหรือไม่') {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, Part_1.default.findById(petoCamp.partId)];
                case 33:
                    part = _b.sent();
                    if (!part) {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, shertManage.updateOne({ sleepAtCamp: !oldSleep })];
                case 34:
                    _b.sent();
                    if (!oldSleep) return [3 /*break*/, 37];
                    return [4 /*yield*/, camp.updateOne({ peeSleepIds: (0, setup_1.swop)(user._id, null, camp.peeSleepIds) })];
                case 35:
                    _b.sent();
                    return [4 /*yield*/, part.updateOne({ peeSleepIds: (0, setup_1.swop)(user._id, null, part.peeSleepIds) })];
                case 36:
                    _b.sent();
                    return [3 /*break*/, 40];
                case 37: return [4 /*yield*/, camp.updateOne({ peeSleepIds: (0, setup_1.swop)(null, user._id, camp.peeSleepIds) })];
                case 38:
                    _b.sent();
                    return [4 /*yield*/, part.updateOne({ peeSleepIds: (0, setup_1.swop)(null, user._id, part.peeSleepIds) })];
                case 39:
                    _b.sent();
                    _b.label = 40;
                case 40: return [3 /*break*/, 41];
                case 41: return [3 /*break*/, 3];
                case 42:
                    res.status(200).json({
                        success: true,
                        user: user,
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function getUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, User_1.default.findById(req.params.id)
                        //console.log(user)
                    ];
                case 1:
                    user = _a.sent();
                    //console.log(user)
                    res.status(200).json(user);
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
function getShertmanage(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var shertManage, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, ShertManage_1.default.findById(req.params.id)];
                case 1:
                    shertManage = _a.sent();
                    res.status(200).json(shertManage);
                    return [3 /*break*/, 3];
                case 2:
                    err_5 = _a.sent();
                    console.log(err_5);
                    (0, setup_1.sendRes)(res, false);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function updateTimeOffset(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var update, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    update = req.body;
                    return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, TimeOffset_1.default.findByIdAndUpdate(user.displayOffsetId, update.display)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, TimeOffset_1.default.findByIdAndUpdate(user.selectOffsetId, update.select)];
                case 3:
                    _a.sent();
                    (0, setup_1.sendRes)(res, true);
                    return [2 /*return*/];
            }
        });
    });
}
function getTimeOffset(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var buf;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, TimeOffset_1.default.findById(req.params.id)];
                case 1:
                    buf = _a.sent();
                    res.status(200).json(buf);
                    return [2 /*return*/];
            }
        });
    });
}
function signId(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, salt, text;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 1:
                    user = _a.sent();
                    if (!user || user.email.split('@')[1].localeCompare('student.chula.ac.th')) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, bcrypt_1.default.genSalt(10)];
                case 2:
                    salt = _a.sent();
                    return [4 /*yield*/, bcrypt_1.default.hash(user._id.toString(), salt)];
                case 3:
                    text = _a.sent();
                    (0, setup_1.sendingEmail)(user.email, jsonwebtoken_1.default.sign({ password: text }, User_1.buf));
                    (0, setup_1.sendRes)(res, true);
                    return [2 /*return*/];
            }
        });
    });
}
function verifyEmail(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, password, correct, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 5, , 6]);
                    password = jsonwebtoken_1.default.verify(req.body.password, User_1.buf).password;
                    return [4 /*yield*/, bcrypt_1.default.compare(user._id.toString(), password)];
                case 3:
                    correct = _a.sent();
                    if (!correct) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, user.updateOne({
                            fridayActEn: true,
                            studentId: user.email.split('@')[0]
                        })];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.error(error_1);
                    (0, setup_1.sendRes)(res, false);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
