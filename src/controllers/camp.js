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
exports.getBaan = getBaan;
exports.getCamp = getCamp;
exports.getBaans = getBaans;
exports.getCamps = getCamps;
exports.getNongCamp = getNongCamp;
exports.getPeeCamp = getPeeCamp;
exports.getPetoCamp = getPetoCamp;
exports.getPart = getPart;
exports.addNong = addNong;
exports.addPee = addPee;
exports.addPeeRaw = addPeeRaw;
exports.addPeto = addPeto;
exports.addPetoRaw = addPetoRaw;
exports.staffRegister = staffRegister;
exports.getActionPlanByPartId = getActionPlanByPartId;
exports.createActionPlan = createActionPlan;
exports.updateActionPlan = updateActionPlan;
exports.deleteActionPlan = deleteActionPlan;
exports.getActionPlans = getActionPlans;
exports.nongRegister = nongRegister;
exports.getCampName = getCampName;
exports.getPartName = getPartName;
exports.changeBaan = changeBaan;
exports.changeBaanRaw = changeBaanRaw;
exports.changePart = changePart;
exports.changePartRaw = changePartRaw;
exports.getNongsFromBaanId = getNongsFromBaanId;
exports.getPeesFromBaanId = getPeesFromBaanId;
exports.getPeesFromPartId = getPeesFromPartId;
exports.getPetosFromPartId = getPetosFromPartId;
exports.getLinkRegister = getLinkRegister;
exports.getImpotentPartIdBCRP = getImpotentPartIdBCRP;
exports.answerTheQuasion = answerTheQuasion;
exports.createAllQuasion = createAllQuasion;
exports.updateQuasion = updateQuasion;
exports.getActionPlan = getActionPlan;
exports.getWorkingItemByPartId = getWorkingItemByPartId;
exports.createWorkingItem = createWorkingItem;
exports.updateWorkingItem = updateWorkingItem;
exports.deleteWorkingItem = deleteWorkingItem;
exports.getWorkingItems = getWorkingItems;
exports.getWorkingItem = getWorkingItem;
exports.getShowRegisters = getShowRegisters;
exports.getAllUserCamp = getAllUserCamp;
var ActionPlan_1 = __importDefault(require("../models/ActionPlan"));
var Baan_1 = __importDefault(require("../models/Baan"));
var Camp_1 = __importDefault(require("../models/Camp"));
var NongCamp_1 = __importDefault(require("../models/NongCamp"));
var Part_1 = __importDefault(require("../models/Part"));
var PeeCamp_1 = __importDefault(require("../models/PeeCamp"));
var PetoCamp_1 = __importDefault(require("../models/PetoCamp"));
var User_1 = __importDefault(require("../models/User"));
var ShertManage_1 = __importDefault(require("../models/ShertManage"));
var setup_1 = require("./setup");
var PartNameContainer_1 = __importDefault(require("../models/PartNameContainer"));
var NameContainer_1 = __importDefault(require("../models/NameContainer"));
var auth_1 = require("../middleware/auth");
var mongoose_1 = __importDefault(require("mongoose"));
var Song_1 = __importDefault(require("../models/Song"));
var HelthIsue_1 = __importDefault(require("../models/HelthIsue"));
var Place_1 = __importDefault(require("../models/Place"));
var Building_1 = __importDefault(require("../models/Building"));
var ChoiseAnswer_1 = __importDefault(require("../models/ChoiseAnswer"));
var ChoiseQuasion_1 = __importDefault(require("../models/ChoiseQuasion"));
var WorkItem_1 = __importDefault(require("../models/WorkItem"));
var admin_1 = require("./admin");
// exports.getWorkingItem           protect pee up           params id                fix
// exports.createWorkingItem        protect pee up
// exports.updateWorkingItem        protect pee up           params id
// exports.deleteWorkingItem        protect peto up          params id
// exports.getWorkingItems          protect pee up                                    fix
// exports.getBaan                  protect                  params id                fix
// exports.getCamp                  protect                  params id                fix
// exports.getNongCamp              protect                  params id                fix
// exports.getPeeCamp               protect pee up           params id                fix
// exports.getPetoCamp              protect pee up           params id
// exports.getPart                  protect pee up           params id
// exports.addNong                  protect peto up
// exports.addPee                   protect peto up
// exports.addPeto                  protect peto up
// exports.staffRegister            protect pee up
// exports.addNongPass              protect peto up
// exports.getActionPlan            protect pee up           params id                fix
// exports.createActionPlan         protect pee up
// exports.updateActionPlan         protect pee up           params id
// exports.deleteActionPlan         protect pee up           params id
// exports.getActionPlans           protect pee up                                    fix
// exports.nongRegister             protect nong
// exports.renameVarible            protect pee up
// export async function getWorkingItem
// export async function createWorkingItem
// export async function updateWorkingItem
// export async function deleteWorkingItem
// export async function getWorkingItems
// export async function getBaan
// export async function getCamp
// export async function getBaans
// export async function getCamps
// export async function getNongCamp
// export async function getPeeCamp
// export async function getPetoCamp
// export async function getPart
// export async function addNong
// export async function addPee
// export async function addPeto
// export async function staffRegister
// export async function addNongPass       fix
// export async function getActionPlan
// export async function createActionPlan
// export async function updateActionPlan
// export async function deleteActionPlan
// export async function getActionPlans
// export async function nongRegister
// export async function getCampName
// export async function getPartName
// export async function changeBaan
// export async function changePart
/*export async function getWorkingItem(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user = await getUser(req)
    try {
        if (req.params.id === 'init') {
            return res.status(400).json({
                success: false,
                massage: 'this is start point'
            })
        }
        if (req.params.id === 'end') {
            return res.status(400).json({
                success: false,
                massage: 'this is end point'
            })
        }
        const hospital = await WorkItem.findById(req.params.id);
        if (!hospital) {
            return res.status(400).json(resError);
        }
        res.status(200).json(linkHash(hospital as InterWorkingItem, user?.linkHash as string));
    } catch (err) {
        res.status(400).json(resError);
    }
}
export async function createWorkingItem(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { campId, token, fromId, partId, name } = req.body
    const user = await getUser(req)
    const camp = await Camp.findById(campId)
    if (!camp || !user) {
        sendRes(res, false)
        return
    }
    if (camp.allDone) {
        return res.status(400).json({ success: false, message: 'This camp is all done' })
    }
    const hospital = await WorkItem.create({ campId, fromId, partId, name, link: jwt.sign({link:null}, token), createBy: user._id });
    await camp?.updateOne({ workItemIds: swop(null, hospital._id, camp.workItemIds) })
    const part = await Part.findById(hospital.partId)
    await part?.updateOne({ workItemIds: swop(null, hospital._id, part.workItemIds) })
    const from = await WorkItem.findById(hospital.fromId)
    from?.linkOutIds.push(hospital._id)
    await from?.updateOne({ linkOutIds: from.linkOutIds })
    res.status(200).json(hospital);
}
export async function updateWorkingItem(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const { campId, token, linkOutIds, link, status, partId, name, id } = req.body
        const user = await getUser(req)
        const workItem = await WorkItem.findById(id)
        if (!workItem || !user) {
            return res.status(400).json(resError);
        }
        jwt.verify(workItem.link as string, token)
        const camp = await Camp.findById(campId)
        if (camp?.allDone) {
            return res.status(400).json({ success: false, message: 'This camp is all done' })
        }
        await workItem.updateOne({ campId, link: jwt.sign(link, token), linkOutIds, status, partId, name });
        res.status(200).json(workItem.toJSON());
    } catch (err) {
        res.status(400).json(resError);
    }
}
export async function deleteWorkingItem(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const camp = await Camp.findById(req.body.campId)
        if (camp?.allDone) {
            return res.status(400).json({ success: false, message: 'This camp is all done' })
        }
        const hospital = await WorkItem.findById(req.params.id);
        if (!hospital) {
            sendRes(res, false)
            return
        }
        const from = await WorkItem.findById(hospital?.fromId)
        from?.updateOne({ linkOutIds: swop(hospital._id, null, from.linkOutIds) })
        await deleteWorkingItemRaw(new mongoose.Types.ObjectId(req.params.id))
        if (!hospital) {
            res.status(400).json(resError);
        }
        res.status(200).json(resOk);
    } catch {
        res.status(400).json(resError);
    }
}
async function deleteWorkingItemRaw(workItemId: mongoose.Types.ObjectId) {
    const workItem = await WorkItem.findById(workItemId)
    if (!workItem) {
        return
    }
    const camp = await Camp.findById(workItem.campId)
    const part = await Part.findById(workItem.partId)
    if (!camp || !part) {
        return
    }
    await part.updateOne({ workItemIds: swop(workItem._id, null, part.workItemIds) })
    await camp.updateOne({ workItemIds: swop(workItem._id, null, camp.workItemIds) })
    var i = 0
    while (i < workItem.linkOutIds.length) {
        if (workItem.linkOutIds[i++]) {
            await deleteWorkingItemRaw(workItem.linkOutIds[i - 1])
        }
    }
    await workItem.deleteOne()
}
export async function getWorkingItems(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        var bufe: InterWorkingItem[] = [];
        const user = await getUser(req)
        if (!user) {
            sendRes(res, false)
            return
        }
        var i = 0
        if (user.filterIds.length == 0) {
            bufe = await WorkItem.find();
        } else {
            while (i < user.filterIds.length) {
                const buf: InterWorkingItem[] = await WorkItem.find({ campId: user.filterIds[i++] })
                var j = 0
                while (j < buf.length) {
                    bufe.push(buf[j++])
                }
            }
        }
        var out: InterWorkingItem[] = [];
        i = 0
        while (i < bufe.length) {
            out.push(linkHash(bufe[i++], user.linkHash))
        }
        res.status(200).json(out);
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
}*/
function getBaan(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Baan_1.default.findById(req.params.id)];
                case 1:
                    data = _a.sent();
                    if (!data) {
                        return [2 /*return*/, res.status(400).json({
                                success: false
                            })];
                    }
                    res.status(200).json((0, setup_1.conBaanBackToFront)(data.toObject()));
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    res.status(400).json({
                        success: false
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getCamp(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var data, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Camp_1.default.findById(req.params.id)];
                case 1:
                    data = _a.sent();
                    if (!data) {
                        return [2 /*return*/, res.status(400).json({
                                success: false
                            })];
                    }
                    //console.log(data.toObject())
                    res.status(200).json((0, setup_1.conCampBackToFront)(data.toObject()));
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    console.log(err_2);
                    res.status(400).json({
                        success: false
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getBaans(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var camp, baans, i, baan, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, Camp_1.default.findById(req.params.id)];
                case 1:
                    camp = _a.sent();
                    if (!camp) {
                        return [2 /*return*/, res.status(400).json({
                                success: false
                            })];
                    }
                    baans = [];
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < camp.baanIds.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, Baan_1.default.findById(camp.baanIds[i++])];
                case 3:
                    baan = _a.sent();
                    if (baan) {
                        baans.push((0, setup_1.conBaanBackToFront)(baan));
                    }
                    return [3 /*break*/, 2];
                case 4:
                    //console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
                    res.status(200).json(baans);
                    return [3 /*break*/, 6];
                case 5:
                    err_3 = _a.sent();
                    console.log('gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg');
                    res.status(400).json(setup_1.resError);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function getCamps(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var data, out, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Camp_1.default.find()];
                case 1:
                    data = _a.sent();
                    if (!data) {
                        return [2 /*return*/, res.status(400).json(setup_1.resError)];
                    }
                    out = data.map(function (input) {
                        return (0, setup_1.conCampBackToFront)(input);
                    });
                    res.status(200).json(out);
                    return [3 /*break*/, 3];
                case 2:
                    err_4 = _a.sent();
                    console.log(err_4);
                    res.status(400).json({
                        success: false
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getNongCamp(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var data, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, NongCamp_1.default.findById(req.params.id)];
                case 1:
                    data = _a.sent();
                    if (!data) {
                        return [2 /*return*/, res.status(400).json(setup_1.resError)];
                    }
                    res.status(200).json(data);
                    return [3 /*break*/, 3];
                case 2:
                    err_5 = _a.sent();
                    res.status(400).json(setup_1.resError);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getPeeCamp(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var data, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, PeeCamp_1.default.findById(req.params.id)];
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
                    err_6 = _a.sent();
                    res.status(400).json({
                        success: false
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getPetoCamp(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var data, err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, PetoCamp_1.default.findById(req.params.id)];
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
                    err_7 = _a.sent();
                    res.status(400).json({
                        success: false
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getPart(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var data, err_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Part_1.default.findById(req.params.id)];
                case 1:
                    data = _a.sent();
                    if (!data) {
                        return [2 /*return*/, res.status(400).json({
                                success: false
                            })];
                    }
                    res.status(200).json((0, setup_1.conPartBackToFront)(data));
                    return [3 /*break*/, 3];
                case 2:
                    err_8 = _a.sent();
                    res.status(400).json({
                        success: false
                    });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function addNong(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, baanId, members, baan_1, camp_1, nongCamp, newNongPassIds, count, b, c, size, i, user, sleepAtCamp, shertManage, userSize, err_9;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 12, , 13]);
                    _a = req.body, baanId = _a.baanId, members = _a.members;
                    return [4 /*yield*/, Baan_1.default.findById(baanId)];
                case 1:
                    baan_1 = _b.sent();
                    if (!baan_1) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(baan_1.campId)];
                case 2:
                    camp_1 = _b.sent();
                    if (!camp_1) {
                        return [2 /*return*/, res.status(400).json({
                                success: false
                            })];
                    }
                    return [4 /*yield*/, NongCamp_1.default.findById(baan_1.nongModelId)];
                case 3:
                    nongCamp = _b.sent();
                    if (!nongCamp) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    newNongPassIds = camp_1.nongSureIds;
                    count = 0;
                    b = baan_1.nongHaveBottle;
                    c = camp_1.nongHaveBottle;
                    size = (0, setup_1.startSize)();
                    i = 0;
                    _b.label = 4;
                case 4:
                    if (!(i < members.length)) return [3 /*break*/, 8];
                    count = count + 1;
                    return [4 /*yield*/, User_1.default.findById(members[i++])];
                case 5:
                    user = _b.sent();
                    if (!user) {
                        return [3 /*break*/, 4];
                    }
                    baan_1.nongIds.push(user._id);
                    camp_1.nongIds.push(user._id);
                    switch (camp_1.toObject().nongSleepModel) {
                        case 'นอนทุกคน': {
                            sleepAtCamp = true;
                            break;
                        }
                        case 'เลือกได้ว่าจะค้างคืนหรือไม่': {
                            sleepAtCamp = user.likeToSleepAtCamp;
                            break;
                        }
                        case 'ไม่มีการค้างคืน': sleepAtCamp = false;
                        case null: sleepAtCamp = false;
                        case undefined: sleepAtCamp = false;
                    }
                    if (sleepAtCamp) {
                        camp_1.nongSleepIds.push(user._id);
                        baan_1.nongSleepIds.push(user._id);
                    }
                    return [4 /*yield*/, ShertManage_1.default.create({
                            userId: user._id,
                            size: user.shertSize,
                            campModelId: nongCamp._id,
                            recive: 'baan',
                            role: 'nong',
                            haveBottle: user.haveBottle,
                            sleepAtCamp: sleepAtCamp
                        })];
                case 6:
                    shertManage = _b.sent();
                    nongCamp.nongShertManageIds.push(shertManage._id);
                    baan_1.nongShertManageIds.push(shertManage._id);
                    camp_1.nongShertManageIds.push(shertManage._id);
                    user.shertManageIds.push(shertManage._id);
                    newNongPassIds = (0, setup_1.swop)(user._id, null, newNongPassIds);
                    if (user.helthIsueId) {
                        baan_1.nongHelthIsueIds.push(user.helthIsueId);
                        camp_1.nongHelthIsueIds.push(user.helthIsueId);
                    }
                    userSize = user.shertSize;
                    size.set(userSize, size.get(userSize) + 1);
                    if (user.haveBottle) {
                        b = b + 1;
                        c = c + 1;
                    }
                    camp_1.nongHaveBottleMapIds.set(user.id, user.haveBottle);
                    baan_1.nongHaveBottleMapIds.set(user.id, user.haveBottle);
                    user.nongCampIds.push(nongCamp._id);
                    camp_1.mapShertManageIdByUserId.set(user.id, shertManage._id);
                    baan_1.mapShertManageIdByUserId.set(user.id, shertManage._id);
                    return [4 /*yield*/, user.updateOne({ nongCampIds: user.nongCampIds, shertManageIds: user.shertManageIds })];
                case 7:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 8:
                    size.forEach(function (v, k) {
                        camp_1.nongShertSize.set(k, camp_1.nongShertSize.get(k) + v);
                        baan_1.nongShertSize.set(k, camp_1.nongShertSize.get(k) + v);
                    });
                    return [4 /*yield*/, camp_1.updateOne({
                            nongSureIds: newNongPassIds,
                            nongHaveBottle: c,
                            nongShertManageIds: camp_1.nongShertManageIds,
                            nongShertSize: camp_1.nongShertSize,
                            nongHaveBottleMapIds: camp_1.nongHaveBottleMapIds,
                            nongHelthIsueIds: camp_1.nongHelthIsueIds,
                            nongIds: camp_1.nongIds,
                            mapShertManageIdByUserId: camp_1.mapShertManageIdByUserId
                        })];
                case 9:
                    _b.sent();
                    return [4 /*yield*/, baan_1.updateOne({
                            nongHaveBottle: b,
                            nongShertManageIds: baan_1.nongShertManageIds,
                            nongShertSize: baan_1.nongShertSize,
                            nongHelthIsueIds: baan_1.nongHelthIsueIds,
                            nongHaveBottleMapIds: baan_1.nongHaveBottleMapIds,
                            nongIds: baan_1.nongIds,
                            mapShertManageIdByUserId: baan_1.mapShertManageIdByUserId
                        })];
                case 10:
                    _b.sent();
                    return [4 /*yield*/, (nongCamp === null || nongCamp === void 0 ? void 0 : nongCamp.updateOne({
                            nongIds: nongCamp.nongIds,
                            nongShertManageIds: nongCamp.nongShertManageIds,
                        }))];
                case 11:
                    _b.sent();
                    res.status(200).json({
                        success: true,
                        count: count
                    });
                    return [3 /*break*/, 13];
                case 12:
                    err_9 = _b.sent();
                    return [2 /*return*/, res.status(400).json({
                            success: false
                        })];
                case 13: return [2 /*return*/];
            }
        });
    });
}
function addPee(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, members, baanId, success;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, members = _a.members, baanId = _a.baanId;
                    return [4 /*yield*/, addPeeRaw(members, baanId)];
                case 1:
                    success = _b.sent();
                    (0, setup_1.sendRes)(res, success);
                    return [2 /*return*/];
            }
        });
    });
}
function addPeeRaw(members, baanId) {
    return __awaiter(this, void 0, void 0, function () {
        var baan_2, camp_2, b, c, count, size, i, user, part, peeCamp, sleepAtCamp, shertManage, userSize, err_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 16, , 17]);
                    return [4 /*yield*/, Baan_1.default.findById(baanId)];
                case 1:
                    baan_2 = _a.sent();
                    if (!baan_2) {
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(baan_2.campId)];
                case 2:
                    camp_2 = _a.sent();
                    if (!camp_2) {
                        return [2 /*return*/, false];
                    }
                    b = baan_2.peeHaveBottle;
                    c = camp_2.peeHaveBottle;
                    count = 0;
                    size = (0, setup_1.startSize)();
                    i = 0;
                    _a.label = 3;
                case 3:
                    if (!(i < members.length)) return [3 /*break*/, 13];
                    return [4 /*yield*/, User_1.default.findById(members[i++])];
                case 4:
                    user = _a.sent();
                    if (!user) {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, Part_1.default.findById(camp_2.peePassIds.get(user.id))];
                case 5:
                    part = _a.sent();
                    if (!part) {
                        return [3 /*break*/, 3];
                    }
                    return [4 /*yield*/, PeeCamp_1.default.findById(baan_2 === null || baan_2 === void 0 ? void 0 : baan_2.mapPeeCampIdByPartId.get(part.id))];
                case 6:
                    peeCamp = _a.sent();
                    if (!peeCamp) {
                        return [3 /*break*/, 3];
                    }
                    switch (camp_2.toObject().peeSleepModel) {
                        case 'นอนทุกคน': {
                            sleepAtCamp = true;
                            break;
                        }
                        case 'เลือกได้ว่าจะค้างคืนหรือไม่': {
                            sleepAtCamp = user.likeToSleepAtCamp;
                            break;
                        }
                        case 'ไม่มีการค้างคืน': sleepAtCamp = false;
                        case null: sleepAtCamp = false;
                        case undefined: sleepAtCamp = false;
                    }
                    if (sleepAtCamp) {
                        camp_2.peeSleepIds.push(user._id);
                        baan_2.peeSleepIds.push(user._id);
                        part.peeSleepIds.push(user._id);
                    }
                    return [4 /*yield*/, ShertManage_1.default.create({
                            userId: user._id,
                            size: user.shertSize,
                            campModelId: peeCamp._id,
                            recive: 'baan',
                            role: 'pee',
                            haveBottle: user.haveBottle,
                            sleepAtCamp: sleepAtCamp
                        })];
                case 7:
                    shertManage = _a.sent();
                    part.peeShertManageIds.push(shertManage._id);
                    camp_2.peeShertManageIds.push(shertManage._id);
                    baan_2.peeShertManageIds.push(shertManage._id);
                    user.shertManageIds.push(shertManage._id);
                    count = count + 1;
                    peeCamp.peeShertManageIds.push(shertManage._id);
                    baan_2.peeIds.push(user._id);
                    camp_2.peeIds.push(user._id);
                    part.peeIds.push(user._id);
                    if (user.helthIsueId) {
                        baan_2.peeHelthIsueIds.push(user.helthIsueId);
                        camp_2.peeHelthIsueIds.push(user.helthIsueId);
                        part.peeHelthIsueIds.push(user.helthIsueId);
                    }
                    userSize = user.shertSize;
                    part.peeShertSize.set(userSize, part.peeShertSize.get(userSize) + 1);
                    size.set(userSize, size.get(userSize) + 1);
                    if (!(user === null || user === void 0 ? void 0 : user.haveBottle)) return [3 /*break*/, 9];
                    return [4 /*yield*/, (part === null || part === void 0 ? void 0 : part.updateOne({
                            peeHaveBottle: (part === null || part === void 0 ? void 0 : part.peeHaveBottle) + 1
                        }))];
                case 8:
                    _a.sent();
                    b = b + 1;
                    c = c + 1;
                    _a.label = 9;
                case 9:
                    baan_2.peeHaveBottleMapIds.set(user.id, user.haveBottle);
                    camp_2.peeHaveBottleMapIds.set(user.id, user.haveBottle);
                    part.peeHaveBottleMapIds.set(user.id, user === null || user === void 0 ? void 0 : user.haveBottle);
                    user.peeCampIds.push(peeCamp._id);
                    user.registerIds.push(camp_2._id);
                    camp_2.peePassIds.delete(user.id);
                    peeCamp.peeIds.push(user._id);
                    camp_2.mapShertManageIdByUserId.set(user.id, shertManage._id);
                    part.mapShertManageIdByUserId.set(user.id, shertManage._id);
                    baan_2.mapShertManageIdByUserId.set(user.id, shertManage._id);
                    return [4 /*yield*/, peeCamp.updateOne({
                            peeIds: peeCamp.peeIds,
                            peeShertManageIds: peeCamp.peeShertManageIds
                        })];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, user.updateOne({
                            peeCampIds: user.peeCampIds,
                            shertManageIds: user.shertManageIds,
                            registerIds: user.registerIds
                        })];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, part.updateOne({
                            peeHaveBottle: part.peeHaveBottle,
                            peeHaveBottleMapIds: part.peeHaveBottleMapIds,
                            mapShertManageIdByUserId: part.mapShertManageIdByUserId,
                            peeHelthIsueIds: part.peeHelthIsueIds,
                            peeIds: part.peeIds,
                            peeShertManageIds: part.peeShertManageIds,
                            peeShertSize: part.peeShertSize
                        })];
                case 12:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 13:
                    size.forEach(function (v, k) {
                        camp_2.peeShertSize.set(k, camp_2.peeShertSize.get(k) + v);
                        baan_2.peeShertSize.set(k, baan_2.peeShertSize.get(k) + v);
                    });
                    return [4 /*yield*/, camp_2.updateOne({
                            peeHaveBottle: c,
                            peeShertManageIds: camp_2.peeShertManageIds,
                            peeShertSize: camp_2.peeShertSize,
                            peeIds: camp_2.peeIds,
                            peeHaveBottleMapIds: camp_2.peeHaveBottleMapIds,
                            peeHelthIsueIds: camp_2.peeHelthIsueIds,
                            peePassIds: camp_2.peePassIds,
                            mapShertManageIdByUserId: camp_2.mapShertManageIdByUserId
                        })];
                case 14:
                    _a.sent();
                    return [4 /*yield*/, baan_2.updateOne({
                            peeHaveBottle: b,
                            peeHaveBottleMapIds: baan_2.peeHaveBottleMapIds,
                            peeHelthIsueIds: baan_2.peeHelthIsueIds,
                            peeIds: baan_2.peeIds,
                            peeShertManageIds: baan_2.peeShertManageIds,
                            mapShertManageIdByUserId: baan_2.mapShertManageIdByUserId,
                            peeShertSize: baan_2.peeShertSize
                        })];
                case 15:
                    _a.sent();
                    return [2 /*return*/, true];
                case 16:
                    err_10 = _a.sent();
                    console.log(err_10);
                    return [2 /*return*/, false];
                case 17: return [2 /*return*/];
            }
        });
    });
}
function addPeto(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, member, partId;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, member = _a.member, partId = _a.partId;
                    return [4 /*yield*/, addPetoRaw(member, partId, res)];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function addPetoRaw(member, partId, res) {
    return __awaiter(this, void 0, void 0, function () {
        var part, camp, c, p, count, size, petoCamp, i, user, sleepAtCamp, _a, _b, shertManage, userSize, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, Part_1.default.findById(partId)];
                case 1:
                    part = _d.sent();
                    if (!part) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(part.campId)];
                case 2:
                    camp = _d.sent();
                    if (!camp) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    c = camp.petoHaveBottle;
                    p = part.petoHaveBottle;
                    count = 0;
                    size = (0, setup_1.startSize)();
                    return [4 /*yield*/, PetoCamp_1.default.findById(part.petoModelId)];
                case 3:
                    petoCamp = _d.sent();
                    if (!petoCamp) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    i = 0;
                    _d.label = 4;
                case 4:
                    if (!(i < member.length)) return [3 /*break*/, 23];
                    count = count + 1;
                    return [4 /*yield*/, User_1.default.findById(member[i++])];
                case 5:
                    user = _d.sent();
                    if (!user) {
                        return [3 /*break*/, 4];
                    }
                    part.petoIds.push(user._id);
                    camp.petoIds.push(user._id);
                    _a = camp.toObject().peeSleepModel;
                    switch (_a) {
                        case 'นอนทุกคน': return [3 /*break*/, 6];
                        case 'เลือกได้ว่าจะค้างคืนหรือไม่': return [3 /*break*/, 7];
                        case 'ไม่มีการค้างคืน': return [3 /*break*/, 8];
                        case null: return [3 /*break*/, 9];
                        case undefined: return [3 /*break*/, 10];
                    }
                    return [3 /*break*/, 15];
                case 6:
                    {
                        sleepAtCamp = true;
                        return [3 /*break*/, 15];
                    }
                    _d.label = 7;
                case 7:
                    {
                        sleepAtCamp = user.likeToSleepAtCamp;
                        return [3 /*break*/, 15];
                    }
                    _d.label = 8;
                case 8:
                    sleepAtCamp = false;
                    _d.label = 9;
                case 9:
                    sleepAtCamp = false;
                    _d.label = 10;
                case 10:
                    sleepAtCamp = false;
                    _b = partId;
                    switch (_b) {
                        case camp.partCoopId: return [3 /*break*/, 11];
                        case camp.partRegiterId: return [3 /*break*/, 13];
                    }
                    return [3 /*break*/, 15];
                case 11: return [4 /*yield*/, user.updateOne({ authPartIds: (0, setup_1.swop)(null, partId, user.authPartIds) })];
                case 12:
                    _d.sent();
                    return [3 /*break*/, 15];
                case 13: return [4 /*yield*/, user.updateOne({ authPartIds: (0, setup_1.swop)(null, partId, user.authPartIds) })];
                case 14:
                    _d.sent();
                    return [3 /*break*/, 15];
                case 15:
                    if (sleepAtCamp) {
                        camp.peeSleepIds.push(user._id);
                        part.peeSleepIds.push(user._id);
                    }
                    return [4 /*yield*/, ShertManage_1.default.create({
                            userId: user._id,
                            size: user.shertSize,
                            campModelId: petoCamp._id,
                            recive: 'part',
                            role: 'peto',
                            haveBottle: user.haveBottle,
                            sleepAtCamp: sleepAtCamp
                        })];
                case 16:
                    shertManage = _d.sent();
                    petoCamp.petoShertManageIds.push(shertManage._id);
                    part.petoShertManageIds.push(shertManage._id);
                    camp.petoShertManageIds.push(shertManage._id);
                    user.shertManageIds.push(shertManage._id);
                    if (user.helthIsueId) {
                        part.petoHelthIsueIds.push(user.helthIsueId);
                        camp.petoHelthIsueIds.push(user.helthIsueId);
                    }
                    userSize = user.shertSize;
                    size.set(userSize, size.get(userSize) + 1);
                    if (user.haveBottle) {
                        p = p + 1;
                        c = c + 1;
                    }
                    camp.petoHaveBottleMapIds.set(user.id, user.haveBottle);
                    part.petoHaveBottleMapIds.set(user.id, user.haveBottle);
                    user.petoCampIds.push(petoCamp._id);
                    user.registerIds.push(camp._id);
                    camp.mapShertManageIdByUserId.set(user.id, shertManage._id);
                    part.mapShertManageIdByUserId.set(user.id, shertManage._id);
                    return [4 /*yield*/, user.updateOne({
                            petoCampIds: user.petoCampIds,
                            shertManageIds: user.shertManageIds,
                            registerIds: user.registerIds
                        })];
                case 17:
                    _d.sent();
                    _c = partId;
                    switch (_c) {
                        case camp.partCoopId: return [3 /*break*/, 18];
                        case camp.partRegiterId: return [3 /*break*/, 20];
                    }
                    return [3 /*break*/, 22];
                case 18: return [4 /*yield*/, user.updateOne({ authPartIds: (0, setup_1.swop)(null, partId, user.authPartIds) })];
                case 19:
                    _d.sent();
                    return [3 /*break*/, 22];
                case 20: return [4 /*yield*/, user.updateOne({ authPartIds: (0, setup_1.swop)(null, partId, user.authPartIds) })];
                case 21:
                    _d.sent();
                    return [3 /*break*/, 22];
                case 22: return [3 /*break*/, 4];
                case 23:
                    size.forEach(function (v, k) {
                        camp.petoShertSize.set(k, camp.petoShertSize.get(k) + v);
                        part.petoShertSize.set(k, part.petoShertSize.get(k) + v);
                    });
                    return [4 /*yield*/, camp.updateOne({
                            petoHaveBottle: c,
                            petoHaveBottleMapIds: camp.petoHaveBottleMapIds,
                            petoHelthIsueIds: camp.petoHelthIsueIds,
                            petoIds: camp.petoIds,
                            petoShertManageIds: camp.petoShertManageIds,
                            petoShertSize: camp.petoShertSize,
                            mapShertManageIdByUserId: camp.mapShertManageIdByUserId
                        })];
                case 24:
                    _d.sent();
                    return [4 /*yield*/, part.updateOne({
                            petoHaveBottle: p,
                            petoHaveBottleMapIds: part.petoHaveBottleMapIds,
                            petoHelthIsueIds: part.petoHelthIsueIds,
                            petoIds: part.petoIds,
                            petoShertManageIds: part.petoShertManageIds,
                            petoShertSize: part.petoShertSize,
                            mapShertManageIdByUserId: part.mapShertManageIdByUserId
                        })];
                case 25:
                    _d.sent();
                    (0, setup_1.sendRes)(res, true);
                    return [2 /*return*/];
            }
        });
    });
}
function staffRegister(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var partId, part, user, camp, impotantParts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    partId = new mongoose_1.default.Types.ObjectId(req.params.id);
                    return [4 /*yield*/, Part_1.default.findById(partId)];
                case 1:
                    part = _a.sent();
                    return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 2:
                    user = _a.sent();
                    if (!user || !part) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(part.campId)];
                case 3:
                    camp = _a.sent();
                    if (!camp) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, getImpotentPartIdBCRP(camp._id)];
                case 4:
                    impotantParts = _a.sent();
                    if (impotantParts.includes(partId)) {
                    }
                    if (!((user === null || user === void 0 ? void 0 : user.role) === 'pee' || (camp === null || camp === void 0 ? void 0 : camp.memberStructre) != 'nong->highSchool,pee->1year,peto->2upYear')) return [3 /*break*/, 6];
                    camp === null || camp === void 0 ? void 0 : camp.peePassIds.set(user.id, partId);
                    return [4 /*yield*/, (camp === null || camp === void 0 ? void 0 : camp.updateOne({ peePassIds: camp.peePassIds }))];
                case 5:
                    _a.sent();
                    res.status(200).json({
                        success: true
                    });
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, addPetoRaw([user._id], part._id, res)];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
/*export async function addNongPass(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const {
            campId,
            member
        } = req.body
        const camp = await Camp.findById(campId)
        var newPending = camp?.nongPendingIds
        var count = 0
        member.forEach((nongId: string) => {
            camp?.nongPassIds.set(nongId, camp.nongPendingIds.get(nongId))
            camp?.nongPendingIds.delete(nongId)
            count = count + 1;
        })
        camp?.updateOne({
            nongPendingIds: newPending
        })
        res.status(200).json({
            success: true,
            count
        })
    } catch (err) {
        res.status(400).json({
            success: false
        })
    }
}*/
function getActionPlanByPartId(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var part, data, j, actionPlan, action, partId, placeIds, start, end, headId, body, partName, _id, user, k, placeName, place, building, err_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 10, , 11]);
                    return [4 /*yield*/, Part_1.default.findById(req.params.id)];
                case 1:
                    part = _a.sent();
                    data = [];
                    if (!part) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    j = 0;
                    _a.label = 2;
                case 2:
                    if (!(j < part.actionPlanIds.length)) return [3 /*break*/, 9];
                    return [4 /*yield*/, ActionPlan_1.default.findById(part.actionPlanIds[j++])];
                case 3:
                    actionPlan = _a.sent();
                    if (!actionPlan) {
                        return [3 /*break*/, 2];
                    }
                    action = actionPlan.action, partId = actionPlan.partId, placeIds = actionPlan.placeIds, start = actionPlan.start, end = actionPlan.end, headId = actionPlan.headId, body = actionPlan.body, partName = actionPlan.partName, _id = actionPlan._id;
                    return [4 /*yield*/, User_1.default.findById(headId)];
                case 4:
                    user = _a.sent();
                    k = 0;
                    placeName = [];
                    _a.label = 5;
                case 5:
                    if (!(k < placeIds.length)) return [3 /*break*/, 8];
                    return [4 /*yield*/, Place_1.default.findById(placeIds[k++])];
                case 6:
                    place = _a.sent();
                    return [4 /*yield*/, Building_1.default.findById(place === null || place === void 0 ? void 0 : place.buildingId)];
                case 7:
                    building = _a.sent();
                    placeName.push("".concat(building === null || building === void 0 ? void 0 : building.name, " ").concat(place === null || place === void 0 ? void 0 : place.flore, " ").concat(place === null || place === void 0 ? void 0 : place.room));
                    return [3 /*break*/, 5];
                case 8:
                    data.push({
                        action: action,
                        partId: partId,
                        placeIds: placeIds,
                        start: start,
                        end: end,
                        headId: headId,
                        body: body,
                        headName: user === null || user === void 0 ? void 0 : user.nickname,
                        headTel: user === null || user === void 0 ? void 0 : user.tel,
                        partName: partName,
                        placeName: placeName,
                        _id: _id
                    });
                    return [3 /*break*/, 2];
                case 9:
                    data.sort(function (a, b) { return (a.start.getTime() - b.start.getTime()); });
                    res.status(200).json(data);
                    return [3 /*break*/, 11];
                case 10:
                    err_11 = _a.sent();
                    console.log(err_11);
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}
function createActionPlan(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var create, hospital, part, camp, i, place, building;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    create = req.body;
                    return [4 /*yield*/, ActionPlan_1.default.create(create)];
                case 1:
                    hospital = _a.sent();
                    return [4 /*yield*/, Part_1.default.findById(create.partId)];
                case 2:
                    part = _a.sent();
                    return [4 /*yield*/, Camp_1.default.findById(part === null || part === void 0 ? void 0 : part.campId)];
                case 3:
                    camp = _a.sent();
                    return [4 /*yield*/, (part === null || part === void 0 ? void 0 : part.updateOne({ actionPlanIds: (0, setup_1.swop)(null, hospital._id, part.actionPlanIds) }))];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, (camp === null || camp === void 0 ? void 0 : camp.updateOne({ actionPlanIds: (0, setup_1.swop)(null, hospital._id, camp.actionPlanIds) }))];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, hospital.updateOne({ partName: part === null || part === void 0 ? void 0 : part.partName })];
                case 6:
                    _a.sent();
                    i = 0;
                    _a.label = 7;
                case 7:
                    if (!(i < hospital.placeIds.length)) return [3 /*break*/, 12];
                    return [4 /*yield*/, Place_1.default.findById(create.placeIds[i++])];
                case 8:
                    place = _a.sent();
                    return [4 /*yield*/, Building_1.default.findById(place === null || place === void 0 ? void 0 : place.buildingId)];
                case 9:
                    building = _a.sent();
                    return [4 /*yield*/, (place === null || place === void 0 ? void 0 : place.updateOne({ actionPlanIds: (0, setup_1.swop)(null, hospital._id, place.actionPlanIds) }))];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, (building === null || building === void 0 ? void 0 : building.updateOne({ actionPlanIds: (0, setup_1.swop)(null, hospital._id, building.actionPlanIds) }))];
                case 11:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 12:
                    res.status(200).json(hospital);
                    return [2 /*return*/];
            }
        });
    });
}
function updateActionPlan(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var hospital, i, place, building, place, building, err_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 15, , 16]);
                    return [4 /*yield*/, ActionPlan_1.default.findById(req.params.id)];
                case 1:
                    hospital = _a.sent();
                    if (!hospital) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < hospital.placeIds.length)) return [3 /*break*/, 7];
                    return [4 /*yield*/, Place_1.default.findById(hospital.placeIds[i++])];
                case 3:
                    place = _a.sent();
                    return [4 /*yield*/, Building_1.default.findById(place === null || place === void 0 ? void 0 : place.buildingId)];
                case 4:
                    building = _a.sent();
                    return [4 /*yield*/, (place === null || place === void 0 ? void 0 : place.updateOne({ actionPlanIds: (0, setup_1.swop)(hospital._id, null, place.actionPlanIds) }))];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, (building === null || building === void 0 ? void 0 : building.updateOne({ actionPlanIds: (0, setup_1.swop)(hospital._id, null, building.actionPlanIds) }))];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 2];
                case 7: return [4 /*yield*/, (hospital === null || hospital === void 0 ? void 0 : hospital.updateOne(req.body))];
                case 8:
                    _a.sent();
                    _a.label = 9;
                case 9:
                    if (!(i < hospital.placeIds.length)) return [3 /*break*/, 14];
                    return [4 /*yield*/, Place_1.default.findById(hospital.placeIds[i++])];
                case 10:
                    place = _a.sent();
                    return [4 /*yield*/, Building_1.default.findById(place === null || place === void 0 ? void 0 : place.buildingId)];
                case 11:
                    building = _a.sent();
                    return [4 /*yield*/, (place === null || place === void 0 ? void 0 : place.updateOne({ actionPlanIds: (0, setup_1.swop)(null, hospital._id, place.actionPlanIds) }))];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, (building === null || building === void 0 ? void 0 : building.updateOne({ actionPlanIds: (0, setup_1.swop)(null, hospital._id, building.actionPlanIds) }))];
                case 13:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 14:
                    if (!hospital) {
                        return [2 /*return*/, res.status(400).json({
                                success: false
                            })];
                    }
                    res.status(200).json(hospital);
                    return [3 /*break*/, 16];
                case 15:
                    err_12 = _a.sent();
                    res.status(400).json({
                        success: false
                    });
                    return [3 /*break*/, 16];
                case 16: return [2 /*return*/];
            }
        });
    });
}
function deleteActionPlan(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var hospital, part, buf, camp, i, place, building, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 13, , 14]);
                    return [4 /*yield*/, ActionPlan_1.default.findById(req.params.id)];
                case 1:
                    hospital = _b.sent();
                    if (!hospital) {
                        res.status(400).json({
                            success: false
                        });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Part_1.default.findById(hospital.partId)];
                case 2:
                    part = _b.sent();
                    if (!part) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    buf = (0, setup_1.swop)(hospital._id, null, part.actionPlanIds);
                    return [4 /*yield*/, (part === null || part === void 0 ? void 0 : part.updateOne({ actionPlanIds: buf }))];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, Camp_1.default.findById(part.campId)];
                case 4:
                    camp = _b.sent();
                    return [4 /*yield*/, (camp === null || camp === void 0 ? void 0 : camp.updateOne({ actionPlanIds: (0, setup_1.swop)(hospital._id, null, camp.actionPlanIds) }))];
                case 5:
                    _b.sent();
                    i = 0;
                    _b.label = 6;
                case 6:
                    if (!(i < hospital.placeIds.length)) return [3 /*break*/, 11];
                    return [4 /*yield*/, Place_1.default.findById(hospital.placeIds[i++])];
                case 7:
                    place = _b.sent();
                    return [4 /*yield*/, Building_1.default.findById(place === null || place === void 0 ? void 0 : place.buildingId)];
                case 8:
                    building = _b.sent();
                    return [4 /*yield*/, (place === null || place === void 0 ? void 0 : place.updateOne({ actionPlanIds: (0, setup_1.swop)(hospital._id, null, place.actionPlanIds) }))];
                case 9:
                    _b.sent();
                    return [4 /*yield*/, (building === null || building === void 0 ? void 0 : building.updateOne({ actionPlanIds: (0, setup_1.swop)(hospital._id, null, building.actionPlanIds) }))];
                case 10:
                    _b.sent();
                    return [3 /*break*/, 6];
                case 11: return [4 /*yield*/, (hospital === null || hospital === void 0 ? void 0 : hospital.deleteOne())];
                case 12:
                    _b.sent();
                    res.status(200).json({
                        success: true,
                        data: {}
                    });
                    return [3 /*break*/, 14];
                case 13:
                    _a = _b.sent();
                    res.status(400).json({
                        success: false
                    });
                    return [3 /*break*/, 14];
                case 14: return [2 /*return*/];
            }
        });
    });
}
function getActionPlans(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var data, user, i, camp, j, actionPlan, action, partId, placeIds, start, end, headId, body, partName, _id, user_1, k, placeName, place, building, i, camp, j, actionPlan, action, partId, placeIds, start, end, headId, body, partName, _id, user_2, k, placeName, place, building, err_13;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 25, , 26]);
                    data = [];
                    return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    if (!(user.filterIds.length == 0)) return [3 /*break*/, 13];
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < user.registerIds.length)) return [3 /*break*/, 12];
                    return [4 /*yield*/, Camp_1.default.findById(user.registerIds[i++])];
                case 3:
                    camp = _a.sent();
                    if (!camp) {
                        return [3 /*break*/, 2];
                    }
                    j = 0;
                    _a.label = 4;
                case 4:
                    if (!(j < camp.actionPlanIds.length)) return [3 /*break*/, 11];
                    return [4 /*yield*/, ActionPlan_1.default.findById(camp.actionPlanIds[j++])];
                case 5:
                    actionPlan = _a.sent();
                    if (!actionPlan) {
                        return [3 /*break*/, 4];
                    }
                    action = actionPlan.action, partId = actionPlan.partId, placeIds = actionPlan.placeIds, start = actionPlan.start, end = actionPlan.end, headId = actionPlan.headId, body = actionPlan.body, partName = actionPlan.partName, _id = actionPlan._id;
                    return [4 /*yield*/, User_1.default.findById(headId)];
                case 6:
                    user_1 = _a.sent();
                    k = 0;
                    placeName = [];
                    _a.label = 7;
                case 7:
                    if (!(k < placeIds.length)) return [3 /*break*/, 10];
                    return [4 /*yield*/, Place_1.default.findById(placeIds[k++])];
                case 8:
                    place = _a.sent();
                    return [4 /*yield*/, Building_1.default.findById(place === null || place === void 0 ? void 0 : place.buildingId)];
                case 9:
                    building = _a.sent();
                    placeName.push("".concat(building === null || building === void 0 ? void 0 : building.name, " ").concat(place === null || place === void 0 ? void 0 : place.flore, " ").concat(place === null || place === void 0 ? void 0 : place.room));
                    return [3 /*break*/, 7];
                case 10:
                    data.push({
                        action: action,
                        partId: partId,
                        placeIds: placeIds,
                        start: start,
                        end: end,
                        headId: headId,
                        body: body,
                        headName: user_1 === null || user_1 === void 0 ? void 0 : user_1.nickname,
                        headTel: user_1 === null || user_1 === void 0 ? void 0 : user_1.tel,
                        partName: partName,
                        placeName: placeName,
                        _id: _id
                    });
                    return [3 /*break*/, 4];
                case 11: return [3 /*break*/, 2];
                case 12: return [3 /*break*/, 24];
                case 13:
                    i = 0;
                    _a.label = 14;
                case 14:
                    if (!(i < user.filterIds.length)) return [3 /*break*/, 24];
                    return [4 /*yield*/, Camp_1.default.findById(user.filterIds[i++])];
                case 15:
                    camp = _a.sent();
                    if (!camp) {
                        return [3 /*break*/, 14];
                    }
                    j = 0;
                    _a.label = 16;
                case 16:
                    if (!(j < camp.actionPlanIds.length)) return [3 /*break*/, 23];
                    return [4 /*yield*/, ActionPlan_1.default.findById(camp.actionPlanIds[j++])];
                case 17:
                    actionPlan = _a.sent();
                    if (!actionPlan) {
                        return [3 /*break*/, 16];
                    }
                    action = actionPlan.action, partId = actionPlan.partId, placeIds = actionPlan.placeIds, start = actionPlan.start, end = actionPlan.end, headId = actionPlan.headId, body = actionPlan.body, partName = actionPlan.partName, _id = actionPlan._id;
                    return [4 /*yield*/, User_1.default.findById(headId)];
                case 18:
                    user_2 = _a.sent();
                    k = 0;
                    placeName = [];
                    _a.label = 19;
                case 19:
                    if (!(k < placeIds.length)) return [3 /*break*/, 22];
                    return [4 /*yield*/, Place_1.default.findById(placeIds[k++])];
                case 20:
                    place = _a.sent();
                    return [4 /*yield*/, Building_1.default.findById(place === null || place === void 0 ? void 0 : place.buildingId)];
                case 21:
                    building = _a.sent();
                    placeName.push("".concat(building === null || building === void 0 ? void 0 : building.name, " ").concat(place === null || place === void 0 ? void 0 : place.flore, " ").concat(place === null || place === void 0 ? void 0 : place.room));
                    return [3 /*break*/, 19];
                case 22:
                    data.push({
                        action: action,
                        partId: partId,
                        placeIds: placeIds,
                        start: start,
                        end: end,
                        headId: headId,
                        body: body,
                        headName: user_2 === null || user_2 === void 0 ? void 0 : user_2.nickname,
                        headTel: user_2 === null || user_2 === void 0 ? void 0 : user_2.tel,
                        partName: partName,
                        placeName: placeName,
                        _id: _id
                    });
                    return [3 /*break*/, 16];
                case 23: return [3 /*break*/, 14];
                case 24:
                    data.sort(function (a, b) { return (a.start.getTime() - b.start.getTime()); });
                    //console.log(data)
                    res.status(200).json(data);
                    return [3 /*break*/, 26];
                case 25:
                    err_13 = _a.sent();
                    res.status(400).json({
                        success: false
                    });
                    return [3 /*break*/, 26];
                case 26: return [2 /*return*/];
            }
        });
    });
}
function nongRegister(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, campId, link, nong, camp, err_14;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    _a = req.body, campId = _a.campId, link = _a.link;
                    return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 1:
                    nong = _b.sent();
                    if (!campId || !link) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(campId)];
                case 2:
                    camp = _b.sent();
                    if (!(camp === null || camp === void 0 ? void 0 : camp.open)) {
                        return [2 /*return*/, res.status(400).json({ success: false, message: 'This camp is close' })];
                    }
                    camp.nongPendingIds.set(nong === null || nong === void 0 ? void 0 : nong.id, link);
                    return [4 /*yield*/, camp.updateOne({ nongPendingIds: camp.nongPendingIds })];
                case 3:
                    _b.sent();
                    res.status(200).json({
                        success: true
                    });
                    return [3 /*break*/, 5];
                case 4:
                    err_14 = _b.sent();
                    res.status(400).json({
                        success: false
                    });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function getCampName(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var camp, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, NameContainer_1.default.findById(req.params.id)];
                case 1:
                    camp = _b.sent();
                    res.status(200).json(camp);
                    return [3 /*break*/, 3];
                case 2:
                    _a = _b.sent();
                    res.status(400).json(setup_1.resError);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getPartName(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var camp, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, PartNameContainer_1.default.findById(req.params.id)];
                case 1:
                    camp = _b.sent();
                    res.status(200).json(camp);
                    return [3 /*break*/, 3];
                case 2:
                    _a = _b.sent();
                    res.status(400).json(setup_1.resError);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function changeBaan(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, userIds, baanId, user, baan, camp;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, userIds = _a.userIds, baanId = _a.baanId;
                    return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 1:
                    user = _b.sent();
                    return [4 /*yield*/, Baan_1.default.findById(baanId)];
                case 2:
                    baan = _b.sent();
                    if (!baan) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(baan.campId)];
                case 3:
                    camp = _b.sent();
                    if (!user || !camp || (!user.authPartIds.includes(camp.partBoardId) && !user.authPartIds.includes(camp.partRegiterId))) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, changeBaanRaw(userIds, baanId, res)];
                case 4:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function changeBaanRaw(userIds, baanId, res) {
    return __awaiter(this, void 0, void 0, function () {
        var baan, camp, newNongCamp, i, user, shertManage, _a, oldNongCamp, oldBaan, oldPeeCamp, oldBaan, newPeeCamp;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, Baan_1.default.findById(baanId)];
                case 1:
                    baan = _c.sent();
                    if (!baan) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(baan.campId)];
                case 2:
                    camp = _c.sent();
                    return [4 /*yield*/, NongCamp_1.default.findById(baan.nongModelId)];
                case 3:
                    newNongCamp = _c.sent();
                    if (!camp || !newNongCamp) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    i = 0;
                    _c.label = 4;
                case 4:
                    if (!(i < userIds.length)) return [3 /*break*/, 30];
                    return [4 /*yield*/, User_1.default.findById(userIds[i++])];
                case 5:
                    user = _c.sent();
                    if (!user) {
                        return [3 /*break*/, 4];
                    }
                    return [4 /*yield*/, ShertManage_1.default.findById(camp.mapShertManageIdByUserId.get(user.id))];
                case 6:
                    shertManage = _c.sent();
                    if (!shertManage) {
                        return [3 /*break*/, 4];
                    }
                    _a = shertManage.role;
                    switch (_a) {
                        case 'nong': return [3 /*break*/, 7];
                        case 'pee': return [3 /*break*/, 17];
                    }
                    return [3 /*break*/, 29];
                case 7: return [4 /*yield*/, NongCamp_1.default.findById(shertManage.campModelId)];
                case 8:
                    oldNongCamp = _c.sent();
                    if (!oldNongCamp) {
                        return [3 /*break*/, 4];
                    }
                    return [4 /*yield*/, Baan_1.default.findById(oldNongCamp.baanId)];
                case 9:
                    oldBaan = _c.sent();
                    if (!oldBaan) {
                        return [3 /*break*/, 4];
                    }
                    return [4 /*yield*/, user.updateOne({ nongCampIds: (0, setup_1.swop)(oldNongCamp._id, newNongCamp._id, user.nongCampIds) })];
                case 10:
                    _c.sent();
                    baan.nongIds.push(user._id);
                    oldBaan.nongShertSize.set(shertManage.size, (0, setup_1.calculate)(oldBaan.nongShertSize.get(shertManage.size), 0, 1));
                    baan.nongShertSize.set(shertManage.size, (0, setup_1.calculate)(baan.nongShertSize.get(shertManage.size), 1, 0));
                    oldBaan.mapShertManageIdByUserId.delete(user.id);
                    return [4 /*yield*/, oldBaan.updateOne({
                            nongShertManageIds: (0, setup_1.swop)(shertManage._id, null, oldBaan.nongShertManageIds),
                            nongIds: (0, setup_1.swop)(user._id, null, oldBaan.nongIds),
                            mapShertManageIdByUserId: oldBaan.mapShertManageIdByUserId
                        })];
                case 11:
                    _c.sent();
                    baan.nongShertManageIds.push(shertManage._id);
                    return [4 /*yield*/, shertManage.updateOne({ campModelId: newNongCamp._id })];
                case 12:
                    _c.sent();
                    baan.nongHaveBottleMapIds.set(user.id, oldBaan === null || oldBaan === void 0 ? void 0 : oldBaan.nongHaveBottleMapIds.get(user.id));
                    if (!oldBaan.nongHaveBottleMapIds.get(user.id)) return [3 /*break*/, 15];
                    return [4 /*yield*/, oldBaan.updateOne({ nongHaveBottle: oldBaan.nongHaveBottle - 1 })];
                case 13:
                    _c.sent();
                    return [4 /*yield*/, baan.updateOne({ nongHaveBottle: baan.nongHaveBottle + 1 })];
                case 14:
                    _c.sent();
                    _c.label = 15;
                case 15:
                    baan.mapShertManageIdByUserId.set(user === null || user === void 0 ? void 0 : user.id, shertManage._id);
                    return [4 /*yield*/, oldNongCamp.updateOne({
                            nongIds: (0, setup_1.swop)(user._id, null, oldNongCamp.nongIds),
                            nongShertManageIds: (0, setup_1.swop)(shertManage._id, null, oldNongCamp.nongShertManageIds)
                        })];
                case 16:
                    _c.sent();
                    newNongCamp.nongIds.push(user._id);
                    return [3 /*break*/, 29];
                case 17: return [4 /*yield*/, PeeCamp_1.default.findById(shertManage.campModelId)];
                case 18:
                    oldPeeCamp = _c.sent();
                    if (!oldPeeCamp) {
                        return [3 /*break*/, 4];
                    }
                    return [4 /*yield*/, Baan_1.default.findById(oldPeeCamp.baanId)];
                case 19:
                    oldBaan = _c.sent();
                    if (!oldBaan) {
                        return [3 /*break*/, 4];
                    }
                    return [4 /*yield*/, PeeCamp_1.default.findById(baan.mapPeeCampIdByPartId.get((_b = oldPeeCamp.partId) === null || _b === void 0 ? void 0 : _b.toString()))];
                case 20:
                    newPeeCamp = _c.sent();
                    if (!newPeeCamp) {
                        return [3 /*break*/, 4];
                    }
                    return [4 /*yield*/, user.updateOne({ peeCampIds: (0, setup_1.swop)(oldPeeCamp._id, newPeeCamp._id, user.peeCampIds) })];
                case 21:
                    _c.sent();
                    baan.peeIds.push(user._id);
                    oldBaan.peeShertSize.set(shertManage.size, (0, setup_1.calculate)(oldBaan.peeShertSize.get(shertManage.size), 0, 1));
                    baan.peeShertSize.set(shertManage.size, (0, setup_1.calculate)(baan.peeShertSize.get(shertManage.size), 1, 0));
                    return [4 /*yield*/, oldBaan.updateOne({
                            peeShertManageIds: (0, setup_1.swop)(shertManage._id, null, oldBaan.peeShertManageIds),
                            peeIds: (0, setup_1.swop)(user._id, null, oldBaan.peeIds)
                        })];
                case 22:
                    _c.sent();
                    baan.peeShertManageIds.push(shertManage._id);
                    return [4 /*yield*/, shertManage.updateOne({ campModelId: newPeeCamp._id })];
                case 23:
                    _c.sent();
                    baan.peeHaveBottleMapIds.set(user.id, oldBaan.peeHaveBottleMapIds.get(user.id));
                    if (!oldBaan.peeHaveBottleMapIds.get(user.id)) return [3 /*break*/, 26];
                    return [4 /*yield*/, oldBaan.updateOne({ peeHaveBottle: oldBaan.peeHaveBottle - 1 })];
                case 24:
                    _c.sent();
                    return [4 /*yield*/, baan.updateOne({ peeHaveBottle: baan.peeHaveBottle + 1 })];
                case 25:
                    _c.sent();
                    _c.label = 26;
                case 26:
                    oldBaan === null || oldBaan === void 0 ? void 0 : oldBaan.mapShertManageIdByUserId.delete(user.id);
                    baan.mapShertManageIdByUserId.set(user.id, shertManage._id);
                    return [4 /*yield*/, newPeeCamp.updateOne({
                            peeShertManageIds: (0, setup_1.swop)(null, shertManage._id, newPeeCamp.peeShertManageIds),
                            peeIds: (0, setup_1.swop)(null, user._id, newPeeCamp.peeIds)
                        })];
                case 27:
                    _c.sent();
                    return [4 /*yield*/, oldPeeCamp.updateOne({
                            peeShertManageIds: (0, setup_1.swop)(shertManage._id, null, oldPeeCamp.peeShertManageIds),
                            peeIds: (0, setup_1.swop)(user._id, null, oldPeeCamp.peeIds)
                        })];
                case 28:
                    _c.sent();
                    return [3 /*break*/, 29];
                case 29: return [3 /*break*/, 4];
                case 30: return [4 /*yield*/, newNongCamp.updateOne({
                        nongIds: newNongCamp.nongIds,
                        nongShertManageIds: newNongCamp.nongShertManageIds
                    })];
                case 31:
                    _c.sent();
                    return [4 /*yield*/, (baan === null || baan === void 0 ? void 0 : baan.updateOne({
                            peeHaveBottleMapIds: baan.peeHaveBottleMapIds,
                            peeHelthIsueIds: baan.peeHelthIsueIds,
                            mapShertManageIdByUserId: baan.mapShertManageIdByUserId,
                            peeIds: baan.peeIds,
                            peeShertManageIds: baan.peeShertManageIds,
                            peeShertSize: baan.peeShertSize,
                            nongHaveBottleMapIds: baan.nongHaveBottleMapIds,
                            nongHelthIsueIds: baan.nongHelthIsueIds,
                            nongIds: baan.nongIds,
                            nongShertManageIds: baan.nongShertManageIds,
                            nongShertSize: baan.nongShertSize
                        }))];
                case 32:
                    _c.sent();
                    (0, setup_1.sendRes)(res, true);
                    return [2 /*return*/];
            }
        });
    });
}
function changePart(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, userIds, partId, out;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, userIds = _a.userIds, partId = _a.partId;
                    return [4 /*yield*/, changePartRaw(userIds, partId)];
                case 1:
                    out = _b.sent();
                    (0, setup_1.sendRes)(res, out);
                    return [2 /*return*/];
            }
        });
    });
}
function changePartRaw(userIds, partId) {
    return __awaiter(this, void 0, void 0, function () {
        var part, camp, newPetoCamp, i, user, shertManage, _a, oldPetoCamp, oldPart, oldPeeCamp, oldPart, newPeeCamp;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, Part_1.default.findById(partId)];
                case 1:
                    part = _c.sent();
                    if (!part) {
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, Camp_1.default.findById(part.campId)];
                case 2:
                    camp = _c.sent();
                    if (!camp) {
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, PetoCamp_1.default.findById(part.petoModelId)];
                case 3:
                    newPetoCamp = _c.sent();
                    if (!newPetoCamp) {
                        return [2 /*return*/, false];
                    }
                    i = 0;
                    _c.label = 4;
                case 4:
                    if (!(i < userIds.length)) return [3 /*break*/, 30];
                    return [4 /*yield*/, User_1.default.findById(userIds[i++])];
                case 5:
                    user = _c.sent();
                    if (!user) {
                        return [3 /*break*/, 4];
                    }
                    return [4 /*yield*/, ShertManage_1.default.findById(camp.mapShertManageIdByUserId.get(user.id))];
                case 6:
                    shertManage = _c.sent();
                    if (!shertManage) {
                        return [3 /*break*/, 4];
                    }
                    _a = shertManage.role;
                    switch (_a) {
                        case 'peto': return [3 /*break*/, 7];
                        case 'pee': return [3 /*break*/, 17];
                    }
                    return [3 /*break*/, 29];
                case 7: return [4 /*yield*/, PetoCamp_1.default.findById(shertManage.campModelId)];
                case 8:
                    oldPetoCamp = _c.sent();
                    if (!oldPetoCamp) {
                        return [3 /*break*/, 4];
                    }
                    return [4 /*yield*/, Part_1.default.findById(oldPetoCamp.partId)];
                case 9:
                    oldPart = _c.sent();
                    if (!oldPart) {
                        return [3 /*break*/, 4];
                    }
                    return [4 /*yield*/, user.updateOne({ peeCampIds: (0, setup_1.swop)(oldPetoCamp._id, newPetoCamp._id, user.petoCampIds) })];
                case 10:
                    _c.sent();
                    part.petoIds.push(user._id);
                    oldPart.petoShertSize.set(shertManage.size, (0, setup_1.calculate)(oldPart.peeShertSize.get(shertManage.size), 0, 1));
                    part.petoShertSize.set(shertManage.size, (0, setup_1.calculate)(part.petoShertSize.get(shertManage.size), 1, 0));
                    oldPart.mapShertManageIdByUserId.delete(user === null || user === void 0 ? void 0 : user.id);
                    return [4 /*yield*/, oldPart.updateOne({
                            petoShertManageIds: (0, setup_1.swop)(shertManage._id, null, oldPart.petoShertManageIds), /////////////
                            petoIds: (0, setup_1.swop)(user._id, null, oldPart.petoIds),
                            mapShertManageIdByUserId: oldPart.mapShertManageIdByUserId
                        })];
                case 11:
                    _c.sent();
                    part.petoShertManageIds.push(shertManage._id);
                    return [4 /*yield*/, shertManage.updateOne({ campModelId: newPetoCamp._id })];
                case 12:
                    _c.sent();
                    part.petoHaveBottleMapIds.set(user.id, oldPart.petoHaveBottleMapIds.get(user.id));
                    if (!oldPart.petoHaveBottleMapIds.get(user.id)) return [3 /*break*/, 15];
                    return [4 /*yield*/, oldPart.updateOne({ petoHaveBottle: oldPart.petoHaveBottle - 1 })];
                case 13:
                    _c.sent();
                    return [4 /*yield*/, part.updateOne({ petoHaveBottle: part.petoHaveBottle + 1 })];
                case 14:
                    _c.sent();
                    _c.label = 15;
                case 15:
                    part.mapShertManageIdByUserId.set(user.id, shertManage._id);
                    return [4 /*yield*/, oldPetoCamp.updateOne({
                            petoIds: (0, setup_1.swop)(user._id, null, oldPetoCamp.petoIds),
                            petoShertManageIds: (0, setup_1.swop)(shertManage._id, null, oldPetoCamp.petoShertManageIds)
                        })];
                case 16:
                    _c.sent();
                    newPetoCamp.petoIds.push(user._id);
                    return [3 /*break*/, 29];
                case 17: return [4 /*yield*/, PeeCamp_1.default.findById(shertManage.campModelId)];
                case 18:
                    oldPeeCamp = _c.sent();
                    if (!oldPeeCamp) {
                        return [3 /*break*/, 4];
                    }
                    return [4 /*yield*/, Part_1.default.findById(oldPeeCamp.partId)];
                case 19:
                    oldPart = _c.sent();
                    if (!oldPart) {
                        return [3 /*break*/, 4];
                    }
                    return [4 /*yield*/, PeeCamp_1.default.findById(part.mapPeeCampIdByBaanId.get((_b = oldPeeCamp.baanId) === null || _b === void 0 ? void 0 : _b.toString()))];
                case 20:
                    newPeeCamp = _c.sent();
                    if (!newPeeCamp) {
                        return [3 /*break*/, 4];
                    }
                    return [4 /*yield*/, user.updateOne({ peeCampIds: (0, setup_1.swop)(oldPeeCamp._id, newPeeCamp._id, user.peeCampIds) })];
                case 21:
                    _c.sent();
                    part.peeIds.push(user._id);
                    oldPart.peeShertSize.set(shertManage.size, (0, setup_1.calculate)(oldPart.peeShertSize.get(shertManage.size), 0, 1));
                    part.peeShertSize.set(shertManage.size, (0, setup_1.calculate)(part.peeShertSize.get(shertManage.size), 1, 0));
                    return [4 /*yield*/, oldPart.updateOne({
                            peeShertManageIds: (0, setup_1.swop)(shertManage._id, null, oldPart.peeShertManageIds),
                            peeIds: (0, setup_1.swop)(user._id, null, oldPart.peeIds)
                        })];
                case 22:
                    _c.sent();
                    part.peeShertManageIds.push(shertManage._id);
                    return [4 /*yield*/, shertManage.updateOne({ campModelId: newPeeCamp._id })];
                case 23:
                    _c.sent();
                    part.peeHaveBottleMapIds.set(user.id, oldPart.peeHaveBottleMapIds.get(user.id));
                    if (!oldPart.peeHaveBottleMapIds.get(user.id)) return [3 /*break*/, 26];
                    return [4 /*yield*/, oldPart.updateOne({ peeHaveBottle: oldPart.peeHaveBottle - 1 })];
                case 24:
                    _c.sent();
                    return [4 /*yield*/, part.updateOne({ peeHaveBottle: part.peeHaveBottle + 1 })];
                case 25:
                    _c.sent();
                    _c.label = 26;
                case 26:
                    oldPart.mapShertManageIdByUserId.delete(user.id);
                    part.mapShertManageIdByUserId.set(user.id, shertManage._id);
                    return [4 /*yield*/, newPeeCamp.updateOne({
                            peeShertManageIds: (0, setup_1.swop)(null, shertManage._id, newPeeCamp.peeShertManageIds),
                            peeIds: (0, setup_1.swop)(null, user._id, newPeeCamp.peeIds)
                        })];
                case 27:
                    _c.sent();
                    return [4 /*yield*/, oldPeeCamp.updateOne({
                            peeShertManageIds: (0, setup_1.swop)(shertManage._id, null, oldPeeCamp.peeShertManageIds),
                            peeIds: (0, setup_1.swop)(user._id, null, oldPeeCamp.peeIds)
                        })];
                case 28:
                    _c.sent();
                    return [3 /*break*/, 29];
                case 29: return [3 /*break*/, 4];
                case 30: return [4 /*yield*/, (newPetoCamp === null || newPetoCamp === void 0 ? void 0 : newPetoCamp.updateOne({ petoIds: newPetoCamp.petoIds, petoShertManageIds: newPetoCamp.petoShertManageIds }))];
                case 31:
                    _c.sent();
                    return [4 /*yield*/, (part === null || part === void 0 ? void 0 : part.updateOne({
                            peeHaveBottleMapIds: part.peeHaveBottleMapIds,
                            peeHelthIsueIds: part.peeHelthIsueIds,
                            mapShertManageIdByUserId: part.mapShertManageIdByUserId,
                            peeIds: part.peeIds,
                            peeShertManageIds: part.peeShertManageIds,
                            peeShertSize: part.peeShertSize,
                            petoHaveBottleMapIds: part.petoHaveBottleMapIds,
                            petoHelthIsueIds: part.petoHelthIsueIds,
                            petoIds: part.petoIds,
                            petoShertManageIds: part.petoShertManageIds
                        }))];
                case 32:
                    _c.sent();
                    return [4 /*yield*/, (camp === null || camp === void 0 ? void 0 : camp.updateOne({ mapShertManageIdByUserId: camp.mapShertManageIdByUserId }))];
                case 33:
                    _c.sent();
                    return [2 /*return*/, true];
            }
        });
    });
}
function getNongsFromBaanId(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var out, baan, i, user, shertManage, j, likeSongs, name_1, lastname, nickname, _id, email, tel, group, gender, studentId, helthIsueId, haveBottle, likeSongIds, song, isWearing, spicy, helthIsue;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    out = [];
                    return [4 /*yield*/, Baan_1.default.findById(req.params.id)];
                case 1:
                    baan = _a.sent();
                    if (!baan) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < baan.nongIds.length)) return [3 /*break*/, 10];
                    return [4 /*yield*/, User_1.default.findById(baan.nongIds[i++])];
                case 3:
                    user = _a.sent();
                    if (!user) return [3 /*break*/, 9];
                    return [4 /*yield*/, ShertManage_1.default.findById(baan.mapShertManageIdByUserId.get(user._id.toString()))];
                case 4:
                    shertManage = _a.sent();
                    if (!shertManage) {
                        return [3 /*break*/, 2];
                    }
                    j = 0;
                    likeSongs = [];
                    name_1 = user.name, lastname = user.lastname, nickname = user.nickname, _id = user._id, email = user.email, tel = user.tel, group = user.group, gender = user.gender, studentId = user.studentId, helthIsueId = user.helthIsueId, haveBottle = user.haveBottle, likeSongIds = user.likeSongIds;
                    _a.label = 5;
                case 5:
                    if (!(j < likeSongIds.length)) return [3 /*break*/, 7];
                    return [4 /*yield*/, Song_1.default.findById(likeSongs[j++])];
                case 6:
                    song = _a.sent();
                    if (!song) {
                        return [3 /*break*/, 5];
                    }
                    likeSongs.push(song.name);
                    return [3 /*break*/, 5];
                case 7:
                    isWearing = false;
                    spicy = false;
                    return [4 /*yield*/, HelthIsue_1.default.findById(helthIsueId)];
                case 8:
                    helthIsue = _a.sent();
                    if (helthIsue) {
                        isWearing = helthIsue.isWearing;
                        spicy = helthIsue.spicy;
                    }
                    out.push({
                        name: name_1,
                        nickname: nickname,
                        lastname: lastname,
                        _id: _id,
                        shertSize: shertManage.size,
                        email: email,
                        studentId: studentId,
                        sleep: shertManage.sleepAtCamp,
                        tel: tel,
                        gender: gender,
                        group: group,
                        helthIsueId: helthIsueId,
                        haveBottle: haveBottle,
                        likeSongs: likeSongs,
                        isWearing: isWearing,
                        spicy: spicy
                    });
                    _a.label = 9;
                case 9: return [3 /*break*/, 2];
                case 10:
                    res.status(200).json(out);
                    return [2 /*return*/];
            }
        });
    });
}
function getPeesFromBaanId(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var out, baan, i, user, shertManage, j, likeSongs, name_2, lastname, nickname, _id, email, tel, group, gender, studentId, helthIsueId, haveBottle, likeSongIds, song, isWearing, spicy, helthIsue;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    out = [];
                    return [4 /*yield*/, Baan_1.default.findById(req.params.id)];
                case 1:
                    baan = _a.sent();
                    if (!baan) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < baan.peeIds.length)) return [3 /*break*/, 10];
                    return [4 /*yield*/, User_1.default.findById(baan.peeIds[i++])];
                case 3:
                    user = _a.sent();
                    if (!user) return [3 /*break*/, 9];
                    return [4 /*yield*/, ShertManage_1.default.findById(baan.mapShertManageIdByUserId.get(user._id.toString()))];
                case 4:
                    shertManage = _a.sent();
                    if (!shertManage) {
                        return [3 /*break*/, 2];
                    }
                    j = 0;
                    likeSongs = [];
                    name_2 = user.name, lastname = user.lastname, nickname = user.nickname, _id = user._id, email = user.email, tel = user.tel, group = user.group, gender = user.gender, studentId = user.studentId, helthIsueId = user.helthIsueId, haveBottle = user.haveBottle, likeSongIds = user.likeSongIds;
                    _a.label = 5;
                case 5:
                    if (!(j < likeSongIds.length)) return [3 /*break*/, 7];
                    return [4 /*yield*/, Song_1.default.findById(likeSongs[j++])];
                case 6:
                    song = _a.sent();
                    if (!song) {
                        return [3 /*break*/, 5];
                    }
                    likeSongs.push(song.name);
                    return [3 /*break*/, 5];
                case 7:
                    isWearing = false;
                    spicy = false;
                    return [4 /*yield*/, HelthIsue_1.default.findById(helthIsueId)];
                case 8:
                    helthIsue = _a.sent();
                    if (helthIsue) {
                        isWearing = helthIsue.isWearing;
                        spicy = helthIsue.spicy;
                    }
                    out.push({
                        name: name_2,
                        nickname: nickname,
                        lastname: lastname,
                        _id: _id,
                        shertSize: shertManage.size,
                        email: email,
                        studentId: studentId,
                        sleep: shertManage.sleepAtCamp,
                        tel: tel,
                        gender: gender,
                        group: group,
                        helthIsueId: helthIsueId,
                        haveBottle: haveBottle,
                        likeSongs: likeSongs,
                        isWearing: isWearing,
                        spicy: spicy
                    });
                    _a.label = 9;
                case 9: return [3 /*break*/, 2];
                case 10:
                    res.status(200).json(out);
                    return [2 /*return*/];
            }
        });
    });
}
function getPeesFromPartId(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var out, part, i, user, shertManage, j, likeSongs, name_3, lastname, nickname, _id, email, tel, group, gender, studentId, helthIsueId, haveBottle, likeSongIds, song, isWearing, spicy, helthIsue;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    out = [];
                    return [4 /*yield*/, Part_1.default.findById(req.params.id)];
                case 1:
                    part = _a.sent();
                    if (!part) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < part.peeIds.length)) return [3 /*break*/, 10];
                    return [4 /*yield*/, User_1.default.findById(part.peeIds[i++])];
                case 3:
                    user = _a.sent();
                    if (!user) return [3 /*break*/, 9];
                    return [4 /*yield*/, ShertManage_1.default.findById(part.mapShertManageIdByUserId.get(user._id.toString()))];
                case 4:
                    shertManage = _a.sent();
                    if (!shertManage) {
                        return [3 /*break*/, 2];
                    }
                    j = 0;
                    likeSongs = [];
                    name_3 = user.name, lastname = user.lastname, nickname = user.nickname, _id = user._id, email = user.email, tel = user.tel, group = user.group, gender = user.gender, studentId = user.studentId, helthIsueId = user.helthIsueId, haveBottle = user.haveBottle, likeSongIds = user.likeSongIds;
                    _a.label = 5;
                case 5:
                    if (!(j < likeSongIds.length)) return [3 /*break*/, 7];
                    return [4 /*yield*/, Song_1.default.findById(likeSongs[j++])];
                case 6:
                    song = _a.sent();
                    if (!song) {
                        return [3 /*break*/, 5];
                    }
                    likeSongs.push(song.name);
                    return [3 /*break*/, 5];
                case 7:
                    isWearing = false;
                    spicy = false;
                    return [4 /*yield*/, HelthIsue_1.default.findById(helthIsueId)];
                case 8:
                    helthIsue = _a.sent();
                    if (helthIsue) {
                        isWearing = helthIsue.isWearing;
                        spicy = helthIsue.spicy;
                    }
                    out.push({
                        name: name_3,
                        nickname: nickname,
                        lastname: lastname,
                        _id: _id,
                        shertSize: shertManage.size,
                        email: email,
                        studentId: studentId,
                        sleep: shertManage.sleepAtCamp,
                        tel: tel,
                        gender: gender,
                        group: group,
                        helthIsueId: helthIsueId,
                        haveBottle: haveBottle,
                        likeSongs: likeSongs,
                        isWearing: isWearing,
                        spicy: spicy
                    });
                    _a.label = 9;
                case 9: return [3 /*break*/, 2];
                case 10:
                    res.status(200).json(out);
                    return [2 /*return*/];
            }
        });
    });
}
function getPetosFromPartId(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var out, part, i, user, shertManage, j, likeSongs, name_4, lastname, nickname, _id, email, tel, group, gender, studentId, helthIsueId, haveBottle, likeSongIds, song, isWearing, spicy, helthIsue;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    out = [];
                    return [4 /*yield*/, Part_1.default.findById(req.params.id)];
                case 1:
                    part = _a.sent();
                    if (!part) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < part.petoIds.length)) return [3 /*break*/, 10];
                    return [4 /*yield*/, User_1.default.findById(part.petoIds[i++])];
                case 3:
                    user = _a.sent();
                    if (!user) return [3 /*break*/, 9];
                    return [4 /*yield*/, ShertManage_1.default.findById(part.mapShertManageIdByUserId.get(user._id.toString()))];
                case 4:
                    shertManage = _a.sent();
                    if (!shertManage) {
                        return [3 /*break*/, 2];
                    }
                    j = 0;
                    likeSongs = [];
                    name_4 = user.name, lastname = user.lastname, nickname = user.nickname, _id = user._id, email = user.email, tel = user.tel, group = user.group, gender = user.gender, studentId = user.studentId, helthIsueId = user.helthIsueId, haveBottle = user.haveBottle, likeSongIds = user.likeSongIds;
                    _a.label = 5;
                case 5:
                    if (!(j < likeSongIds.length)) return [3 /*break*/, 7];
                    return [4 /*yield*/, Song_1.default.findById(likeSongs[j++])];
                case 6:
                    song = _a.sent();
                    if (!song) {
                        return [3 /*break*/, 5];
                    }
                    likeSongs.push(song.name);
                    return [3 /*break*/, 5];
                case 7:
                    isWearing = false;
                    spicy = false;
                    return [4 /*yield*/, HelthIsue_1.default.findById(helthIsueId)];
                case 8:
                    helthIsue = _a.sent();
                    if (helthIsue) {
                        isWearing = helthIsue.isWearing;
                        spicy = helthIsue.spicy;
                    }
                    out.push({
                        name: name_4,
                        nickname: nickname,
                        lastname: lastname,
                        _id: _id,
                        shertSize: shertManage.size,
                        email: email,
                        studentId: studentId,
                        sleep: shertManage.sleepAtCamp,
                        tel: tel,
                        gender: gender,
                        group: group,
                        helthIsueId: helthIsueId,
                        haveBottle: haveBottle,
                        likeSongs: likeSongs,
                        isWearing: isWearing,
                        spicy: spicy
                    });
                    _a.label = 9;
                case 9: return [3 /*break*/, 2];
                case 10:
                    res.status(200).json(out);
                    return [2 /*return*/];
            }
        });
    });
}
function getLinkRegister(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, campId, camp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 1:
                    user = _a.sent();
                    campId = req.params.id;
                    return [4 /*yield*/, Camp_1.default.findById(campId)];
                case 2:
                    camp = _a.sent();
                    if (!user || !camp) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    res.status(200).json({ link: camp.nongPendingIds.get(user.id) });
                    return [2 /*return*/];
            }
        });
    });
}
function getImpotentPartIdBCRP(campId) {
    return __awaiter(this, void 0, void 0, function () {
        var camp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Camp_1.default.findById(campId)];
                case 1:
                    camp = _a.sent();
                    if (!camp) {
                        return [2 /*return*/, []];
                    }
                    return [2 /*return*/, [camp.partBoardId, camp.partCoopId, camp.partRegiterId, camp.partPeeBaanId]];
            }
        });
    });
}
function answerTheQuasion(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var answers, i, user, quasion, answer, choiseAnswer, camp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    answers = req.body;
                    i = 0;
                    return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    _a.label = 2;
                case 2:
                    if (!(i < answers.length)) return [3 /*break*/, 20];
                    return [4 /*yield*/, ChoiseQuasion_1.default.findById(answers[i].quasionId)];
                case 3:
                    quasion = _a.sent();
                    if (!quasion) {
                        return [3 /*break*/, 2];
                    }
                    if (!quasion.mapAwnserIdByUserId.has(user._id.toString())) return [3 /*break*/, 9];
                    return [4 /*yield*/, ChoiseAnswer_1.default.findByIdAndUpdate(quasion.mapAwnserIdByUserId.get(user._id.toString()), answers[i])];
                case 4:
                    answer = _a.sent();
                    if (!(answers[i].answer === quasion.correct)) return [3 /*break*/, 6];
                    return [4 /*yield*/, (answer === null || answer === void 0 ? void 0 : answer.updateOne({ score: quasion.score }))];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, (answer === null || answer === void 0 ? void 0 : answer.updateOne({ score: 0 }))];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    i++;
                    return [3 /*break*/, 19];
                case 9: return [4 /*yield*/, ChoiseAnswer_1.default.create(answers[i])];
                case 10:
                    choiseAnswer = _a.sent();
                    return [4 /*yield*/, choiseAnswer.updateOne({ userId: user._id })];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, Camp_1.default.findById(answers[i++].campId)];
                case 12:
                    camp = _a.sent();
                    return [4 /*yield*/, (camp === null || camp === void 0 ? void 0 : camp.updateOne({ choiseAnswerIds: (0, setup_1.swop)(null, choiseAnswer._id, camp.choiseAnswerIds) }))];
                case 13:
                    _a.sent();
                    return [4 /*yield*/, user.updateOne({
                            choiseAnswerIds: (0, setup_1.swop)(null, choiseAnswer._id, user.choiseAnswerIds),
                            quasionIds: (0, setup_1.swop)(null, quasion._id, user.quasionIds)
                        })];
                case 14:
                    _a.sent();
                    return [4 /*yield*/, quasion.updateOne({ choiseAnswerIds: (0, setup_1.swop)(null, choiseAnswer._id, quasion.choiseAnswerIds) })];
                case 15:
                    _a.sent();
                    if (!(answers[i].answer === quasion.correct)) return [3 /*break*/, 17];
                    return [4 /*yield*/, choiseAnswer.updateOne({ score: quasion.score })];
                case 16:
                    _a.sent();
                    return [3 /*break*/, 19];
                case 17: return [4 /*yield*/, choiseAnswer.updateOne({ score: 0 })];
                case 18:
                    _a.sent();
                    _a.label = 19;
                case 19: return [3 /*break*/, 2];
                case 20:
                    (0, setup_1.sendRes)(res, true);
                    return [2 /*return*/];
            }
        });
    });
}
function createAllQuasion(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var create, i, choiseQuasion, camp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    create = req.body;
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < create.length)) return [3 /*break*/, 5];
                    return [4 /*yield*/, ChoiseQuasion_1.default.create(create[i++])];
                case 2:
                    choiseQuasion = _a.sent();
                    return [4 /*yield*/, Camp_1.default.findById(choiseQuasion.campId)];
                case 3:
                    camp = _a.sent();
                    return [4 /*yield*/, (camp === null || camp === void 0 ? void 0 : camp.updateOne({ quasionIds: (0, setup_1.swop)(null, choiseQuasion._id, camp.quasionIds) }))];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 1];
                case 5:
                    res.status(201).json(setup_1.resOk);
                    return [2 /*return*/];
            }
        });
    });
}
function updateQuasion(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _id, a, b, c, d, e, quasion, correct, score;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, _id = _a._id, a = _a.a, b = _a.b, c = _a.c, d = _a.d, e = _a.e, quasion = _a.quasion, correct = _a.correct, score = _a.score;
                    return [4 /*yield*/, ChoiseQuasion_1.default.findByIdAndUpdate(_id, { a: a, b: b, c: c, d: d, e: e, quasion: quasion, correct: correct, score: score })];
                case 1:
                    _b.sent();
                    res.status(200).json(setup_1.resOk);
                    return [2 /*return*/];
            }
        });
    });
}
/*export async function getActionPlanByPartId(req: express.Request, res: express.Response, next: express.NextFunction){
    const part=await Part.findById(req.params.id)
    if(!part){
        sendRes(res,false)
        return
    }
    var i=0
    const actionPlans:InterActionPlan[]=[]
    while(i<part.actionPlanIds.length){
        const actionPlan=await ActionPlan.findById(part.actionPlanIds[i++])
        if(actionPlan){
            actionPlans.push(actionPlan.toObject())
        }
    }
    res.status(200).json(actionPlans)
}*/
function getActionPlan(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var actionPlan, action, partId, placeIds, start, end, headId, body, partName, _id, user, k, placeName, place, building, show, err_15;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, ActionPlan_1.default.findById(req.params.id)];
                case 1:
                    actionPlan = _a.sent();
                    if (!actionPlan) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    action = actionPlan.action, partId = actionPlan.partId, placeIds = actionPlan.placeIds, start = actionPlan.start, end = actionPlan.end, headId = actionPlan.headId, body = actionPlan.body, partName = actionPlan.partName, _id = actionPlan._id;
                    return [4 /*yield*/, User_1.default.findById(headId)];
                case 2:
                    user = _a.sent();
                    k = 0;
                    placeName = [];
                    _a.label = 3;
                case 3:
                    if (!(k < placeIds.length)) return [3 /*break*/, 6];
                    return [4 /*yield*/, Place_1.default.findById(placeIds[k++])];
                case 4:
                    place = _a.sent();
                    return [4 /*yield*/, Building_1.default.findById(place === null || place === void 0 ? void 0 : place.buildingId)];
                case 5:
                    building = _a.sent();
                    placeName.push("".concat(building === null || building === void 0 ? void 0 : building.name, " ").concat(place === null || place === void 0 ? void 0 : place.flore, " ").concat(place === null || place === void 0 ? void 0 : place.room));
                    return [3 /*break*/, 3];
                case 6:
                    show = ({
                        action: action,
                        partId: partId,
                        placeIds: placeIds,
                        start: start,
                        end: end,
                        headId: headId,
                        body: body,
                        headName: user === null || user === void 0 ? void 0 : user.nickname,
                        headTel: user === null || user === void 0 ? void 0 : user.tel,
                        partName: partName,
                        placeName: placeName,
                        _id: _id
                    });
                    res.status(200).json(show);
                    return [3 /*break*/, 8];
                case 7:
                    err_15 = _a.sent();
                    console.log(err_15);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function getWorkingItemByPartId(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var part, data, j, workItem, err_16;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, Part_1.default.findById(req.params.id)];
                case 1:
                    part = _a.sent();
                    data = [];
                    if (!part) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    j = 0;
                    _a.label = 2;
                case 2:
                    if (!(j < part.workItemIds.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, WorkItem_1.default.findById(part.workItemIds[j++])];
                case 3:
                    workItem = _a.sent();
                    if (!workItem) {
                        return [3 /*break*/, 2];
                    }
                    data.push(workItem);
                    return [3 /*break*/, 2];
                case 4:
                    res.status(200).json(data);
                    return [3 /*break*/, 6];
                case 5:
                    err_16 = _a.sent();
                    console.log(err_16);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function createWorkingItem(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var create, hospital, user, part, camp, from, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    create = req.body;
                    return [4 /*yield*/, WorkItem_1.default.create(create)];
                case 1:
                    hospital = _a.sent();
                    return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 2:
                    user = _a.sent();
                    return [4 /*yield*/, Part_1.default.findById(create.partId)];
                case 3:
                    part = _a.sent();
                    return [4 /*yield*/, Camp_1.default.findById(part === null || part === void 0 ? void 0 : part.campId)];
                case 4:
                    camp = _a.sent();
                    return [4 /*yield*/, (part === null || part === void 0 ? void 0 : part.updateOne({ workItemIds: (0, setup_1.swop)(null, hospital._id, part.workItemIds) }))];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, (camp === null || camp === void 0 ? void 0 : camp.updateOne({ workItemIds: (0, setup_1.swop)(null, hospital._id, camp.workItemIds) }))];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, hospital.updateOne({ partName: part === null || part === void 0 ? void 0 : part.partName })];
                case 7:
                    _a.sent();
                    if (!create.fromId) return [3 /*break*/, 10];
                    return [4 /*yield*/, WorkItem_1.default.findById(create.fromId)];
                case 8:
                    from = _a.sent();
                    return [4 /*yield*/, (from === null || from === void 0 ? void 0 : from.updateOne({ linkOutIds: (0, setup_1.swop)(null, hospital._id, from.linkOutIds) }))];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10: return [4 /*yield*/, hospital.updateOne({ createBy: user === null || user === void 0 ? void 0 : user._id, partName: part === null || part === void 0 ? void 0 : part.partName })];
                case 11:
                    _a.sent();
                    i = 0;
                    res.status(200).json(hospital);
                    return [2 /*return*/];
            }
        });
    });
}
function updateWorkingItem(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, status_1, link, name_5, hospital, err_17;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, status_1 = _a.status, link = _a.link, name_5 = _a.name;
                    return [4 /*yield*/, WorkItem_1.default.findById(req.params.id)];
                case 1:
                    hospital = _b.sent();
                    if (!hospital) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, hospital.updateOne({ status: status_1, link: link, name: name_5 })];
                case 2:
                    _b.sent();
                    if (!hospital) {
                        return [2 /*return*/, res.status(400).json({
                                success: false
                            })];
                    }
                    res.status(200).json(hospital);
                    return [3 /*break*/, 4];
                case 3:
                    err_17 = _b.sent();
                    res.status(400).json({
                        success: false
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function deleteWorkingItem(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, admin_1.deleteWorkingItemRaw)(new mongoose_1.default.Types.ObjectId(req.params.id))];
                case 1:
                    _b.sent();
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
function getWorkingItems(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var data, user, i, camp, j, workItem, i, camp, j, workItem, err_18;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 15, , 16]);
                    data = [];
                    return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    if (!(user.filterIds.length == 0)) return [3 /*break*/, 8];
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < user.registerIds.length)) return [3 /*break*/, 7];
                    return [4 /*yield*/, Camp_1.default.findById(user.registerIds[i++])];
                case 3:
                    camp = _a.sent();
                    if (!camp) {
                        return [3 /*break*/, 2];
                    }
                    j = 0;
                    _a.label = 4;
                case 4:
                    if (!(j < camp.workItemIds.length)) return [3 /*break*/, 6];
                    return [4 /*yield*/, WorkItem_1.default.findById(camp.workItemIds[j++])];
                case 5:
                    workItem = _a.sent();
                    if (!workItem) {
                        return [3 /*break*/, 4];
                    }
                    data.push(workItem);
                    return [3 /*break*/, 4];
                case 6: return [3 /*break*/, 2];
                case 7: return [3 /*break*/, 14];
                case 8:
                    i = 0;
                    _a.label = 9;
                case 9:
                    if (!(i < user.filterIds.length)) return [3 /*break*/, 14];
                    return [4 /*yield*/, Camp_1.default.findById(user.filterIds[i++])];
                case 10:
                    camp = _a.sent();
                    if (!camp) {
                        return [3 /*break*/, 9];
                    }
                    j = 0;
                    _a.label = 11;
                case 11:
                    if (!(j < camp.workItemIds.length)) return [3 /*break*/, 13];
                    return [4 /*yield*/, WorkItem_1.default.findById(camp.workItemIds[j++])];
                case 12:
                    workItem = _a.sent();
                    if (!workItem) {
                        return [3 /*break*/, 11];
                    }
                    data.push(workItem);
                    return [3 /*break*/, 11];
                case 13: return [3 /*break*/, 9];
                case 14:
                    res.status(200).json(data);
                    return [3 /*break*/, 16];
                case 15:
                    err_18 = _a.sent();
                    res.status(400).json({
                        success: false
                    });
                    return [3 /*break*/, 16];
                case 16: return [2 /*return*/];
            }
        });
    });
}
function getWorkingItem(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var workItem, err_19;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, WorkItem_1.default.findById(req.params.id)];
                case 1:
                    workItem = _a.sent();
                    if (!workItem) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    res.status(200).json(workItem);
                    return [3 /*break*/, 3];
                case 2:
                    err_19 = _a.sent();
                    console.log(err_19);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getShowRegisters(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var camp, bufs, i, out, user, part;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Camp_1.default.findById(req.params.id)];
                case 1:
                    camp = _a.sent();
                    if (!camp) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
                    }
                    bufs = (0, setup_1.mapObjectIdToMyMap)(camp.peePassIds);
                    i = 0;
                    out = [];
                    _a.label = 2;
                case 2:
                    if (!(i < bufs.length)) return [3 /*break*/, 5];
                    return [4 /*yield*/, User_1.default.findById(bufs[i].key)];
                case 3:
                    user = _a.sent();
                    return [4 /*yield*/, Part_1.default.findById(bufs[i++].value)];
                case 4:
                    part = _a.sent();
                    if (!user || !part) {
                        return [3 /*break*/, 2];
                    }
                    out.push({
                        fullName: "\u0E0A\u0E37\u0E48\u0E2D\u0E08\u0E23\u0E34\u0E07 ".concat(user.name, " \u0E19\u0E32\u0E21\u0E2A\u0E01\u0E38\u0E25 ").concat(user.lastname, " \u0E0A\u0E37\u0E48\u0E2D\u0E40\u0E25\u0E48\u0E19 ").concat(user.nickname),
                        userId: user._id,
                        partId: part._id,
                        partName: part.partName
                    });
                    return [3 /*break*/, 2];
                case 5:
                    res.status(200).json(out);
                    return [2 /*return*/];
            }
        });
    });
}
function getAllUserCamp(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var user, out, i, nongCamp, camp, peeCamp, camp, petoCamp, camp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, auth_1.getUser)(req)];
                case 1:
                    user = _a.sent();
                    out = [];
                    if (!user) {
                        (0, setup_1.sendRes)(res, false);
                        return [2 /*return*/];
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
                    out.push({ key: camp._id, value: camp.campName });
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
                    out.push({ key: camp._id, value: camp.campName });
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
                    out.push({ key: camp._id, value: camp.campName });
                    return [3 /*break*/, 10];
                case 13:
                    res.status(200).json(out);
                    return [2 /*return*/];
            }
        });
    });
}
