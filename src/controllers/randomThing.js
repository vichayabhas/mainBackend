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
exports.addLikeSong = addLikeSong;
exports.getNongLikeSong = getNongLikeSong;
exports.getPeeLikeSong = getPeeLikeSong;
exports.getPetoLikeSong = getPetoLikeSong;
exports.getAllCampLikeSong = getAllCampLikeSong;
exports.addBaanSong = addBaanSong;
exports.removeBaanSong = removeBaanSong;
exports.addLostAndFound = addLostAndFound;
exports.deleteLostAndFound = deleteLostAndFound;
exports.getLostAndFounds = getLostAndFounds;
exports.getLostAndFound = getLostAndFound;
exports.getAllBuilding = getAllBuilding;
exports.createPlace = createPlace;
exports.saveDeletePlace = saveDeletePlace;
exports.createBuilding = createBuilding;
exports.saveDeleteBuilding = saveDeleteBuilding;
exports.getPlaces = getPlaces;
exports.getPlace = getPlace;
exports.getBuilding = getBuilding;
var auth_1 = require("../middleware/auth");
var Baan_1 = __importDefault(require("../models/Baan"));
var Camp_1 = __importDefault(require("../models/Camp"));
var Song_1 = __importDefault(require("../models/Song"));
var User_1 = __importDefault(require("../models/User"));
var setup_1 = require("./setup");
var LostAndFound_1 = __importDefault(require("../models/LostAndFound"));
var Building_1 = __importDefault(require("../models/Building"));
var Place_1 = __importDefault(require("../models/Place"));
var NongCamp_1 = __importDefault(require("../models/NongCamp"));
// export async function addLikeSong
// export async function getNongLikeSong
// export async function getPeeLikeSong
// export async function getPetoLikeSong
// export async function getAllCampLikeSong
// export async function addBaanSong
// export async function removeBaanSong
// export async function addLostAndFound
// export async function deleteLostAndFound
// export async function getLostAndFounds
// export async function getLostAndFound
function addLikeSong(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var songIds, user, i, song;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    songIds = req.body.songIds;
                    return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < songIds.length)) return [3 /*break*/, 5];
                    return [4 /*yield*/, Song_1.default.findById(songIds[i++])];
                case 3:
                    song = _a.sent();
                    if (!song) {
                        return [3 /*break*/, 2];
                    }
                    return [4 /*yield*/, song.updateOne({ userLikeIds: (0, setup_1.swop)(null, user._id, song.userLikeIds) })];
                case 4:
                    _a.sent();
                    user.likeSongIds.push(song === null || song === void 0 ? void 0 : song._id);
                    return [3 /*break*/, 2];
                case 5: return [4 /*yield*/, user.updateOne({ likeSongIds: user.likeSongIds })];
                case 6:
                    _a.sent();
                    res.status(200).json({
                        success: true
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function getAllSong() {
    return __awaiter(this, void 0, void 0, function () {
        var songs, map, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Song_1.default.find()];
                case 1:
                    songs = _a.sent();
                    map = new Map;
                    i = 0;
                    while (i < songs.length) {
                        map.set(songs[i++]._id, 0);
                    }
                    return [2 /*return*/, map];
            }
        });
    });
}
function getNongLikeSong(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var camp, songList, i, user, j, songId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Camp_1.default.findById(req.params.id)];
                case 1:
                    camp = _a.sent();
                    if (!camp) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, getAllSong()];
                case 2:
                    songList = _a.sent();
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < camp.nongIds.length)) return [3 /*break*/, 5];
                    return [4 /*yield*/, User_1.default.findById(camp.nongIds[i++])];
                case 4:
                    user = _a.sent();
                    if (!user) {
                        return [3 /*break*/, 3];
                    }
                    j = 0;
                    while (j < user.likeSongIds.length) {
                        songId = user.likeSongIds[j++];
                        songList.set(songId, songList.get(songId) + 1);
                    }
                    return [3 /*break*/, 3];
                case 5:
                    res.status(200).json({ songList: songList });
                    return [2 /*return*/];
            }
        });
    });
}
function getPeeLikeSong(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var camp, songList, i, user, j, songId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Camp_1.default.findById(req.params.id)];
                case 1:
                    camp = _a.sent();
                    if (!camp) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, getAllSong()];
                case 2:
                    songList = _a.sent();
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < camp.peeIds.length)) return [3 /*break*/, 5];
                    return [4 /*yield*/, User_1.default.findById(camp.peeIds[i++])];
                case 4:
                    user = _a.sent();
                    if (!user) {
                        return [3 /*break*/, 3];
                    }
                    j = 0;
                    while (j < user.likeSongIds.length) {
                        songId = user.likeSongIds[j++];
                        songList.set(songId, songList.get(songId) + 1);
                    }
                    return [3 /*break*/, 3];
                case 5:
                    res.status(200).json({ songList: songList });
                    return [2 /*return*/];
            }
        });
    });
}
function getPetoLikeSong(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var camp, songList, i, user, j, songId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Camp_1.default.findById(req.params.id)];
                case 1:
                    camp = _a.sent();
                    if (!camp) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, getAllSong()];
                case 2:
                    songList = _a.sent();
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < camp.petoIds.length)) return [3 /*break*/, 5];
                    return [4 /*yield*/, User_1.default.findById(camp.petoIds[i++])];
                case 4:
                    user = _a.sent();
                    if (!user) {
                        return [3 /*break*/, 3];
                    }
                    j = 0;
                    while (j < user.likeSongIds.length) {
                        songId = user.likeSongIds[j++];
                        songList.set(songId, songList.get(songId) + 1);
                    }
                    return [3 /*break*/, 3];
                case 5:
                    res.status(200).json({ songList: songList });
                    return [2 /*return*/];
            }
        });
    });
}
function getAllCampLikeSong(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var camp, songList, i, user, j, songId, user, j, songId, user, j, songId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Camp_1.default.findById(req.params.id)];
                case 1:
                    camp = _a.sent();
                    if (!camp) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, getAllSong()];
                case 2:
                    songList = _a.sent();
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < camp.nongIds.length)) return [3 /*break*/, 5];
                    return [4 /*yield*/, User_1.default.findById(camp.nongIds[i++])];
                case 4:
                    user = _a.sent();
                    if (!user) {
                        return [3 /*break*/, 3];
                    }
                    j = 0;
                    while (j < user.likeSongIds.length) {
                        songId = user.likeSongIds[j++];
                        songList.set(songId, songList.get(songId) + 1);
                    }
                    return [3 /*break*/, 3];
                case 5:
                    if (!(i < camp.peeIds.length)) return [3 /*break*/, 7];
                    return [4 /*yield*/, User_1.default.findById(camp.peeIds[i++])];
                case 6:
                    user = _a.sent();
                    if (!user) {
                        return [3 /*break*/, 5];
                    }
                    j = 0;
                    while (j < user.likeSongIds.length) {
                        songId = user.likeSongIds[j++];
                        songList.set(songId, songList.get(songId) + 1);
                    }
                    return [3 /*break*/, 5];
                case 7:
                    if (!(i < camp.petoIds.length)) return [3 /*break*/, 9];
                    return [4 /*yield*/, User_1.default.findById(camp.petoIds[i++])];
                case 8:
                    user = _a.sent();
                    if (!user) {
                        return [3 /*break*/, 7];
                    }
                    j = 0;
                    while (j < user.likeSongIds.length) {
                        songId = user.likeSongIds[j++];
                        songList.set(songId, songList.get(songId) + 1);
                    }
                    return [3 /*break*/, 7];
                case 9:
                    res.status(200).json({ songList: songList });
                    return [2 /*return*/];
            }
        });
    });
}
function addBaanSong(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, baanId, songIds, baan, i, song;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, baanId = _a.baanId, songIds = _a.songIds;
                    return [4 /*yield*/, Baan_1.default.findById(baanId)];
                case 1:
                    baan = _b.sent();
                    if (!baan) {
                        return [2 /*return*/, res.status(400).json({ success: false })];
                    }
                    i = 0;
                    _b.label = 2;
                case 2:
                    if (!(i < songIds.length)) return [3 /*break*/, 6];
                    return [4 /*yield*/, Song_1.default.findById(songIds[i++])];
                case 3:
                    song = _b.sent();
                    if (!song) return [3 /*break*/, 5];
                    baan.songIds.push(song._id);
                    return [4 /*yield*/, song.updateOne({ baanIds: (0, setup_1.swop)(null, baan._id, song.baanIds) })];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5: return [3 /*break*/, 2];
                case 6: return [4 /*yield*/, baan.updateOne({ songIds: baan.songIds })];
                case 7:
                    _b.sent();
                    res.status(200).json({ success: true });
                    return [2 /*return*/];
            }
        });
    });
}
function removeBaanSong(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, baanId, songId, baan, song;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, baanId = _a.baanId, songId = _a.songId;
                    return [4 /*yield*/, Baan_1.default.findById(baanId)];
                case 1:
                    baan = _b.sent();
                    return [4 /*yield*/, Song_1.default.findById(songId)];
                case 2:
                    song = _b.sent();
                    if (!baan || !song) {
                        return [2 /*return*/, res.status(400).json(setup_1.resError)];
                    }
                    return [4 /*yield*/, baan.updateOne({ songIds: (0, setup_1.swop)(song._id, null, baan.songIds) })];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, song.updateOne({ baanIds: (0, setup_1.swop)(baan._id, null, song.baanIds) })];
                case 4:
                    _b.sent();
                    res.status(200).json(setup_1.resOk);
                    return [2 /*return*/];
            }
        });
    });
}
function addLostAndFound(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, campId, type, name, detail, placeId, user, buildingId, _b, place, lostAndFound, camp, building;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = req.body, campId = _a.campId, type = _a.type, name = _a.name, detail = _a.detail, placeId = _a.placeId;
                    return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 1:
                    user = _c.sent();
                    if (!placeId) return [3 /*break*/, 3];
                    return [4 /*yield*/, Place_1.default.findById(placeId)];
                case 2:
                    _b = (_c.sent()).buildingId;
                    return [3 /*break*/, 4];
                case 3:
                    _b = null;
                    _c.label = 4;
                case 4:
                    buildingId = _b;
                    place = null // =placeId? await Place.findById(placeId):null
                    ;
                    if (!user) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, LostAndFound_1.default.create({ campId: campId, type: type, name: name, detail: detail, userId: user._id, placeId: placeId, buildingId: buildingId })];
                case 5:
                    lostAndFound = _c.sent();
                    return [4 /*yield*/, user.updateOne({ lostAndFoundIds: (0, setup_1.swop)(null, lostAndFound._id, user.lostAndFoundIds) })];
                case 6:
                    _c.sent();
                    if (!campId) return [3 /*break*/, 9];
                    return [4 /*yield*/, Camp_1.default.findById(campId)];
                case 7:
                    camp = _c.sent();
                    return [4 /*yield*/, (camp === null || camp === void 0 ? void 0 : camp.updateOne({ lostAndFoundIds: (0, setup_1.swop)(null, lostAndFound._id, camp.lostAndFoundIds) }))];
                case 8:
                    _c.sent();
                    _c.label = 9;
                case 9:
                    if (!place) return [3 /*break*/, 13];
                    return [4 /*yield*/, place.updateOne({ lostAndFoundIds: (0, setup_1.swop)(null, lostAndFound._id, place.lostAndFoundIds) })];
                case 10:
                    _c.sent();
                    return [4 /*yield*/, Building_1.default.findById(place.buildingId)];
                case 11:
                    building = _c.sent();
                    return [4 /*yield*/, building.updateOne({ lostAndFoundIds: (0, setup_1.swop)(null, lostAndFound._id, building.lostAndFoundIds) })];
                case 12:
                    _c.sent();
                    _c.label = 13;
                case 13:
                    res.status(201).json({});
                    return [2 /*return*/];
            }
        });
    });
}
function deleteLostAndFound(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, lostAndFound, camp, owner, place, building;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, LostAndFound_1.default.findById(req.params.id)];
                case 2:
                    lostAndFound = _a.sent();
                    if (!lostAndFound || !user) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(lostAndFound.campId)];
                case 3:
                    camp = _a.sent();
                    if (!user || (user.role != 'admin' && (lostAndFound.userId !== (user._id)) && (camp ? !user.authPartIds.includes(camp.partBoardId) && !user.authPartIds.includes(camp.partRegiterId) : true) && !(camp === null || camp === void 0 ? void 0 : camp.boardIds.includes(user._id)))) {
                        res.status(403).json(setup_1.resError);
                    }
                    return [4 /*yield*/, User_1.default.findById(lostAndFound.userId)];
                case 4:
                    owner = _a.sent();
                    return [4 /*yield*/, Place_1.default.findById(lostAndFound.placeId)];
                case 5:
                    place = _a.sent();
                    return [4 /*yield*/, Building_1.default.findById(lostAndFound === null || lostAndFound === void 0 ? void 0 : lostAndFound.buildingId)];
                case 6:
                    building = _a.sent();
                    return [4 /*yield*/, (owner === null || owner === void 0 ? void 0 : owner.updateOne({ lostAndFoundIds: (0, setup_1.swop)(lostAndFound._id, null, owner.lostAndFoundIds) }))];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, (place === null || place === void 0 ? void 0 : place.updateOne({ lostAndFoundIds: (0, setup_1.swop)(lostAndFound._id, null, place.lostAndFoundIds) }))];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, (building === null || building === void 0 ? void 0 : building.updateOne({ lostAndFoundIds: (0, setup_1.swop)(lostAndFound._id, null, building.lostAndFoundIds) }))];
                case 9:
                    _a.sent();
                    if (camp) {
                        camp.updateOne({ lostAndFoundIds: (0, setup_1.swop)(lostAndFound._id, null, camp.lostAndFoundIds) });
                    }
                    return [4 /*yield*/, lostAndFound.deleteOne()];
                case 10:
                    _a.sent();
                    (0, setup_1.sendRes)(res, true);
                    return [2 /*return*/];
            }
        });
    });
}
function getLostAndFounds(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, out, i, nongCamp, camp, j, lostAndFound, output, buf;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    out = [];
                    i = 0;
                    if (!user.fridayActEn) return [3 /*break*/, 3];
                    return [4 /*yield*/, LostAndFound_1.default.find()];
                case 2:
                    out = _a.sent();
                    return [3 /*break*/, 9];
                case 3:
                    if (!(i < user.nongCampIds.length)) return [3 /*break*/, 9];
                    return [4 /*yield*/, NongCamp_1.default.findById(user.nongCampIds[i++])];
                case 4:
                    nongCamp = _a.sent();
                    if (!nongCamp) {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(nongCamp.campId)];
                case 5:
                    camp = _a.sent();
                    if (!camp) {
                        return [3 /*break*/, 3];
                    }
                    j = 0;
                    _a.label = 6;
                case 6:
                    if (!(j < camp.lostAndFoundIds.length)) return [3 /*break*/, 8];
                    return [4 /*yield*/, LostAndFound_1.default.findById(camp.lostAndFoundIds[j++])];
                case 7:
                    lostAndFound = _a.sent();
                    if (lostAndFound) {
                        out.push(lostAndFound);
                    }
                    return [3 /*break*/, 6];
                case 8: return [3 /*break*/, 3];
                case 9:
                    i = 0;
                    output = [];
                    _a.label = 10;
                case 10:
                    if (!(i < out.length)) return [3 /*break*/, 12];
                    return [4 /*yield*/, fillLostAndFound(out[i++])];
                case 11:
                    buf = _a.sent();
                    if (buf) {
                        output.push(buf);
                    }
                    return [3 /*break*/, 10];
                case 12:
                    res.status(200).json(output);
                    return [2 /*return*/];
            }
        });
    });
}
function getLostAndFound(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var lostAndFound, buf;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, LostAndFound_1.default.findById(req.params.id)];
                case 1:
                    lostAndFound = _a.sent();
                    if (!lostAndFound) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, fillLostAndFound(lostAndFound.toObject())];
                case 2:
                    buf = _a.sent();
                    res.status(200).json(buf);
                    return [2 /*return*/];
            }
        });
    });
}
function getAllBuilding(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var buildings;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Building_1.default.find()];
                case 1:
                    buildings = _a.sent();
                    res.status(200).json(buildings);
                    return [2 /*return*/];
            }
        });
    });
}
function createPlace(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, room, buildingId, flore, place, building;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, room = _a.room, buildingId = _a.buildingId, flore = _a.flore;
                    return [4 /*yield*/, Place_1.default.create({ room: room, buildingId: buildingId, flore: flore })];
                case 1:
                    place = _b.sent();
                    return [4 /*yield*/, Building_1.default.findById(buildingId)];
                case 2:
                    building = _b.sent();
                    return [4 /*yield*/, (building === null || building === void 0 ? void 0 : building.updateOne({ placeIds: (0, setup_1.swop)(null, place._id, building.placeIds) }))];
                case 3:
                    _b.sent();
                    res.status(201).json(place);
                    return [2 /*return*/];
            }
        });
    });
}
function saveDeletePlace(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var place;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Place_1.default.findById(req.params.id)];
                case 1:
                    place = _a.sent();
                    if ((place === null || place === void 0 ? void 0 : place.actionPlanIds.length) || (place === null || place === void 0 ? void 0 : place.boySleepBaanIds.length) || (place === null || place === void 0 ? void 0 : place.girlSleepBaanIds.length) || (place === null || place === void 0 ? void 0 : place.normalBaanIds.length) || (place === null || place === void 0 ? void 0 : place.fridayActIds.length) || (place === null || place === void 0 ? void 0 : place.partIds.length) || (place === null || place === void 0 ? void 0 : place.lostAndFoundIds.length)) {
                        return [2 /*return*/, res.status(400).json({ success: false })];
                    }
                    return [4 /*yield*/, (place === null || place === void 0 ? void 0 : place.deleteOne())];
                case 2:
                    _a.sent();
                    res.status(200).json({ success: true });
                    return [2 /*return*/];
            }
        });
    });
}
function createBuilding(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var building;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Building_1.default.create({ name: req.params.id })];
                case 1:
                    building = _a.sent();
                    res.status(201).json(building);
                    return [2 /*return*/];
            }
        });
    });
}
function saveDeleteBuilding(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var building;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Building_1.default.findById(req.params.id)];
                case 1:
                    building = _a.sent();
                    if (building === null || building === void 0 ? void 0 : building.placeIds.length) {
                        return [2 /*return*/, res.status(400).json({ success: false })];
                    }
                    return [4 /*yield*/, (building === null || building === void 0 ? void 0 : building.deleteOne())];
                case 2:
                    _a.sent();
                    (0, setup_1.sendRes)(res, true);
                    return [2 /*return*/];
            }
        });
    });
}
function getPlaces(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var building, places, i, place;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Building_1.default.findById(req.params.id)];
                case 1:
                    building = _a.sent();
                    if (!building) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    places = [];
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < building.placeIds.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, Place_1.default.findById(building.placeIds[i++])];
                case 3:
                    place = _a.sent();
                    if (place) {
                        places.push(place.toObject());
                    }
                    return [3 /*break*/, 2];
                case 4:
                    res.status(200).json(places);
                    return [2 /*return*/];
            }
        });
    });
}
function getPlace(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var place;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Place_1.default.findById(req.params.id)];
                case 1:
                    place = _a.sent();
                    res.status(200).json(place);
                    return [2 /*return*/];
            }
        });
    });
}
function getBuilding(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var building;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Building_1.default.findById(req.params.id)];
                case 1:
                    building = _a.sent();
                    res.status(200).json(building);
                    return [2 /*return*/];
            }
        });
    });
}
function fillLostAndFound(input) {
    return __awaiter(this, void 0, void 0, function () {
        var _id, name, buildingId, placeId, userId, detail, campId, type, user, building, place, camp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _id = input._id, name = input.name, buildingId = input.buildingId, placeId = input.placeId, userId = input.userId, detail = input.detail, campId = input.campId, type = input.type;
                    return [4 /*yield*/, User_1.default.findById(userId)];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, Building_1.default.findById(buildingId)];
                case 2:
                    building = _a.sent();
                    return [4 /*yield*/, Place_1.default.findById(placeId)];
                case 3:
                    place = _a.sent();
                    return [4 /*yield*/, Camp_1.default.findById(campId)];
                case 4:
                    camp = _a.sent();
                    if (!user) {
                        return [2 /*return*/, null];
                    }
                    return [2 /*return*/, {
                            _id: _id,
                            name: name,
                            buildingId: buildingId,
                            placeId: placeId,
                            detail: detail,
                            userId: userId,
                            userLastName: user.lastname,
                            userName: user.name,
                            userNickname: user.nickname,
                            tel: user.tel,
                            room: place ? place.room : 'null',
                            floor: place ? place.flore : 'null',
                            buildingName: building ? building.name : 'null',
                            campId: campId,
                            type: type,
                            campName: camp ? camp.campName : 'null'
                        }];
            }
        });
    });
}
