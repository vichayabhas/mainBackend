const ActionPlan = require("../models/ActionPlan");
const Baan = require("../models/Baan");
const Camp = require("../models/Camp");
const NongCamp = require("../models/NongCamp");
const Part = require("../models/Part");
const PeeCamp = require("../models/PeeCamp");
const PetoCamp = require("../models/PetoCamp");
const User = require("../models/User");
const WorkItem = require("../models/WorkItem");
const ShertManage = require("../models/ShertManage");
const {
    swop
} = require("./setup");
const {
    getUser
} = require("./user");
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
exports.getWorkingItem = async (req, res, next) => {
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
            return res.status(400).json({
                success: false
            });
        }
        res.status(200).json({
            success: true,
            data: hospital
        });
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
};
exports.createWorkingItem = async (req, res, next) => {
    const camp = await Camp.findById(req.body.campId)
    if (camp.allDone) {
        return res.status(400).json({ success: false, message: 'This camp is all done' })
    }
    const hospital = await WorkItem.create(req.body);
    res.status(200).json({
        success: true,
        data: hospital
    });
};
exports.updateWorkingItem = async (req, res, next) => {
    try {
        const camp = await Camp.findById(req.body.campId)
        if (camp.allDone) {
            return res.status(400).json({ success: false, message: 'This camp is all done' })
        }
        const hospital = await WorkItem.findByIdAndUpdate(req.params.id, req.body);
        if (!hospital) {
            return res.status(400).json({
                success: false
            });
        }
        res.status(200).json({
            success: true,
            data: hospital
        });
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
};
exports.deleteWorkingItem = async (req, res, next) => {
    try {
        const camp = await Camp.findById(req.body.campId)
        if (camp.allDone) {
            return res.status(400).json({ success: false, message: 'This camp is all done' })
        }
        const hospital = await WorkItem.findByIdAndDelete(req.params.id);
        if (!hospital) {
            res.status(400).json({
                success: false
            });
        }
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch {
        res.status(400).json({
            success: false
        });
    }
};
exports.getWorkingItems = async (req, res, next) => {
    try {
        var data = [];
        const user = await getUser(req)
        if (user.filterIds.length == 0) {
            data = await WorkItem.find();
        } else {
            await req.user.filter.forEach(async (campId) => {
                const buf = await WorkItem.find({
                    campId
                });
                buf.forEach((b) => {
                    data.push(b);
                });
            });
        }
        res.status(200).json({
            success: true,
            count: data.length,
            data
        });
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
};
exports.getBaan = async (req, res, next) => {
    try {
        const data = await Baan.findById(req.params.id);
        if (!data) {
            return res.status(400).json({
                success: false
            });
        }
        res.status(200).json({
            success: true,
            data
        });
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
};
exports.getCamp = async (req, res, next) => {
    try {
        const data = await Camp.findById(req.params.id);
        if (!data) {
            return res.status(400).json({
                success: false
            });
        }
        res.status(200).json({
            success: true,
            data
        });
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
};
exports.getNongCamp = async (req, res, next) => {
    try {
        const data = await NongCamp.findById(req.params.id);
        if (!data) {
            return res.status(400).json({
                success: false
            });
        }
        res.status(200).json({
            success: true,
            data
        });
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
};
exports.getPeeCamp = async (req, res, next) => {
    try {
        const data = await PeeCamp.findById(req.params.id);
        if (!data) {
            return res.status(400).json({
                success: false
            });
        }
        res.status(200).json({
            success: true,
            data
        });
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
};
exports.getPetoCamp = async (req, res, next) => {
    try {
        const data = await PetoCamp.findById(req.params.id);
        if (!data) {
            return res.status(400).json({
                success: false
            });
        }
        res.status(200).json({
            success: true,
            data
        });
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
};
exports.getPart = async (req, res, next) => {
    try {
        const data = await Part.findById(req.params.id);
        if (!data) {
            return res.status(400).json({
                success: false
            });
        }
        res.status(200).json({
            success: true,
            data
        });
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
};
exports.addNong = async (req, res, next) => {
    try {
        const {
            campId,
            baanId,
            member
        } = req.body;
        const baan = await Baan.findById(baanId);
        const camp = await Camp.findById(campId);
        if (!baan || !camp) {
            return res.status(400).json({
                success: false
            });
        }
        const nongCamp = await NongCamp.findById(baan.nongModelId)
        var newNongPassIds = camp.nongSureIds
        var count = 0
        var b = baan.nongHaveBottle
        var c = camp.nongHaveBottle
        await member.forEach(async (nongId) => {
            count = count + 1
            baan.nongIds.push(nongId);
            camp.nongIds.push(nongId);
            const nong = await User.findById(nongId);
            nongCamp.nongIds.push(nongId)
            if (!nong) {
                return res.status(400).json({
                    success: false
                });
            }
            const shertManage = await ShertManage.create({ userId: nongId, size: nong.shertSize, campModelId: nongCamp._id, recive: 'baan', role: 'nong' })
            nongCamp.nongShertManageIds.push(shertManage._id)
            baan.nongShertManageIds.push(shertManage._id)
            camp.nongShertManageIds.push(shertManage._id)
            nong.shertManageIds.push(shertManage._id)
            newNongPassIds = swop(nongId, null, newNongPassIds)
            if (nong.helthIsueId) {
                baan.nongHelthIsueIds.push(nong.helthIsueId);
                camp.nongHelthIsueIds.push(nong.helthIsueId);
            }
            baan.nongShertSize.set(nong.shertSize, baan.nongShertSize.get(nong.shertSize) + 1);
            camp.nongShertSize.set(nong.shertSize, camp.nongShertSize.get(nong.shertSize) + 1);
            if (nong.haveBottle) {
                b = b + 1
                c = c + 1
            }
            camp.nongHaveBottleMapIds.set(nong._id, nong.haveBottle)
            baan.nongHaveBottleMapIds.set(nong._id, nong.haveBottle)
            nong.nongCampIds.push(nongCamp._id);
        });
        camp.updateOne({
            nongSureIds: newNongPassIds,
            nongHaveBottle: c
        })
        baan.updateOne({
            nongHaveBottle: b
        })
        res.status(200).json({
            success: true,
            count
        });
    } catch (err) {
        return res.status(400).json({
            success: false
        });
    }
};

exports.addPee = async (req, res, next) => {
    const {
        campId,
        member,
        baanId
    } = req.body;
    try {
        const baan = await Baan.findById(baanId);
        const camp = await Camp.findById(campId);
        if (!baan || !camp) {
            return res.status(400).json({
                success: false
            });
        }
        var b = baan.peeHaveBottle
        var c = camp.peeHaveBottle
        var count = 0
        await member.forEach(async (userId) => {
            const user = await User.findById(userId);
            const part = await Part.findById(camp.peePassIds.get(userId));
            const peeCamp = await PeeCamp.findById(baan.mapPeeCampIdByPartId.get(part._id))
            const shertManage = await ShertManage.create({ userId, size: user.shertSize, campModelId: peeCamp._id, recive: 'baan', role: 'pee' })
            part.peeShertManageIds.push(shertManage._id)
            camp.peeShertManageIds.push(shertManage._id)
            baan.peeShertManageIds.push(shertManage._id)
            user.shertManageIds.push(shertManage._id)
            count = count + 1
            peeCamp.peeShertManageIds.push(shertManage._id)
            baan.peeIds.push(userId);
            camp.peeIds.push(userId);
            part.peeIds.push(userId);
            if (user.helthIsueId) {
                baan.peeHelthIsueIds.push(user.helthIsueId);
                camp.peeHelthIsueIds.push(user.helthIsueId);
                part.peeHelthIsueIds.push(user.helthIsueId);
            }
            baan.peeShertSize.set(user.shertSize, baan.peeShertSize.get(user.shertSize) + 1);
            camp.peeShertSize.set(user.shertSize, camp.peeShertSize.get(user.shertSize) + 1);
            part.peeShertSize.set(user.shertSize, part.peeShertSize.get(user.shertSize) + 1);
            if (user.haveBottle) {
                part.updateOne({
                    peeHaveBottle: part.peeHaveBottle + 1
                })
                b = b + 1
                c = c + 1
            }
            baan.peeHaveBottleMapIds.set(user._id, user.haveBottle)
            camp.peeHaveBottleMapIds.set(user._id, user.haveBottle)
            part.peeHaveBottleMapIds.set(user._id, user.haveBottle)
            user.peeCampIds.push(peeCamp._id);
            camp.peePassIds.delete(user._id);
            peeCamp.peeIds.push(userId)
        });
        camp.updateOne({
            peeHaveBottle: c
        })
        baan.updateOne({
            peeHaveBottle: b
        })
        res.status(200).json({
            success: true,
            count
        });
    } catch (err) {
        return res.status(400).json({
            success: false
        });
    }
}
exports.addPeto = async (req, res, next) => {
    const {
        campId,
        member,
        partId
    } = req.body;
    await addPetoRaw(campId, member, partId, res);
};
async function addPetoRaw(campId, member, partId, res) {
    try {
        const camp = await Camp.findById(campId);
        const part = await Part.findById(partId);
        var c = camp.petoHaveBottle
        var p = part.petoHaveBottle
        if (!camp || !part) {
            return res.status(400).json({
                success: false
            });
        }
        var count = 0
        const petoCamp = await PetoCamp.findById(part.petoModelId)
        await member.forEach(async (userId) => {
            count = count + 1
            camp.petoIds.push(userId);
            part.petoIds.push(userId);
            const user = await User.findById(userId);
            if (!user) {
                return res.status(400).json({
                    success: false
                });
            }
            petoCamp.petoIds.push(userId)
            if (user.helthIsueId) {
                camp.petoHelthIsueIds.push(user.helthIsueId);
                part.petoHelthIsueIds.push(user.helthIsueId);
            }
            const shertManage = await ShertManage.create({ userId, size: user.shertSize, campModelId: petoCamp._id, recive: 'part', role: 'peto' })
            camp.petoShertSize.set(user.shertSize, part.petoShertSize.get(user.shertSize) + 1);
            user.shertManageIds.push(shertManage._id)
            part.petoShertManageIds.push(shertManage._id)
            part.petoShertSize.set(user.shertSize, part.petoShertSize.get(user.shertSize) + 1);
            petoCamp.petoShertManageIds.push(shertManage._id)
            if (user.haveBottle) {
                c = c + 1
                p = p + 1
            }
            camp.petoHaveBottleMapIds.set(user._id, user.haveBottle)
            part.petoHaveBottleMapIds.set(user._id, user.haveBottle)
            user.petoCampIds.push(petoCamp._id);
        });
        camp.updateOne({
            petoHaveBottle: c
        })
        part.updateOne({
            petoHaveBottle: p
        })
        res.status(200).json({
            success: true,
            count
        });
    } catch (err) {
        return res.status(400).json({
            success: false
        });
    }
}
exports.staffRegister = async (req, res, next) => {
    const {
        campId,
        partId
    } = req.body;
    const user = await getUser(req)
    if (user.role === 'pee') {
        const camp = await Camp.findById(campId)
        camp.peePassIds.set(user._id, partId)
        res.status(200).json({
            success: true
        })
    } else {
        await addPetoRaw(campId, [user._id], partId, res);
    }
};
exports.addNongPass = async (req, res, next) => {
    try {
        const {
            campId,
            member
        } = req.body
        const camp = await Camp.findById(campId)
        var newPending = camp.nongPendingIds
        var count = 0
        member.forEach((nongId) => {
            camp.nongPassIds.set(camp.nongPendingIds.get(nongId))
            camp.nongPendingIds.delete(nongId)
            count = count + 1;
        })
        camp.updateOne({
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
}
exports.getActionPlan = async (req, res, next) => {
    try {
        const hospital = await ActionPlan.findById(req.params.id);
        if (!hospital) {
            return res.status(400).json({
                success: false
            });
        }
        res.status(200).json({
            success: true,
            data: hospital
        });
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
};
exports.createActionPlan = async (req, res, next) => {
    const hospital = await ActionPlan.create(req.body);
    const part = await Part.findById(req.body.partId)
    part.actionPlanIds.push(hospital._id)
    res.status(200).json({
        success: true,
        data: hospital
    });
};
exports.updateActionPlan = async (req, res, next) => {
    try {
        const hospital = await ActionPlan.findByIdAndUpdate(req.params.id, req.body);
        if (!hospital) {
            return res.status(400).json({
                success: false
            });
        }
        res.status(200).json({
            success: true,
            data: hospital
        });
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
};
exports.deleteActionPlan = async (req, res, next) => {
    try {
        const hospital = await ActionPlan.findById(req.params.id);
        if (!hospital) {
            res.status(400).json({
                success: false
            });
        }
        const part = await Part.findById(hospital.partId)
        const buf = swop(hospital._id, null, part.actionPlanIds)
        part.updateOne({ actionPlanIds: buf })
        hospital.deleteOne()
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch {
        res.status(400).json({
            success: false
        });
    }
};
exports.getActionPlans = async (req, res, next) => {
    try {
        var data = [];
        const user = await getUser(req)
        if (user.filterIds.length == 0) {
            data = await ActionPlan.find();
        } else {
            await req.user.filter.forEach(async (campId) => {
                const buf = await ActionPlan.find({
                    campId
                });
                buf.forEach((b) => {
                    data.push(b);
                });
            });
        }
        res.status(200).json({
            success: true,
            count: data.length,
            data
        });
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
};
exports.nongRegister = async (req, res, next) => {
    try {
        const {
            campId,
            link
        } = req.body
        const nong = await getUser(req)
        const camp = await Camp.findById(campId)
        if (!camp.open) {
            return res.status(400).json({ success: false, message: 'This camp is close' })
        }
        camp.nongPendingIds.set(nong._id, link)
        res.status(200).json({
            success: true
        })
    } catch (err) {
        res.status(400).json({
            success: false
        })
    }
}
exports.renameVarible = async (req, res, next) => {
    try {
        const { peeCampId, names } = req.body
        const peeCamp = await PeeCamp.findById(peeCampId)
        const camp = await Camp.findById(peeCamp.campId)
        if (camp.allDone) {
            return res.status(400).json({ success: false, message: 'This camp is all done' })
        }
        var i = 0
        while (i < 10) {
            if (!names[i]) {
                names[i] = peeCamp.varibleNames[i]
                i = i + 1;
            }
        }
        i = 0
        while (i < 5) {
            peeCamp.mapArrayStringNumberByName.delete(peeCamp.varibleNames[i++])
        }
        while (i < 10) {
            peeCamp.mapMapNumberByName.delete(peeCamp.varibleNames[i++])
        }
        peeCamp.updateOne({ varibleNames: names })
        i = 0
        peeCamp.mapArrayStringNumberByName.set(names[i++], peeCamp.arrayString1)
        peeCamp.mapArrayStringNumberByName.set(names[i++], peeCamp.arrayString2)
        peeCamp.mapArrayStringNumberByName.set(names[i++], peeCamp.arrayString3)
        peeCamp.mapArrayStringNumberByName.set(names[i++], peeCamp.arrayString4)
        peeCamp.mapArrayStringNumberByName.set(names[i++], peeCamp.arrayString5)
        peeCamp.mapMapNumberByName.set(names[i++], peeCamp.map1)
        peeCamp.mapMapNumberByName.set(names[i++], peeCamp.map2)
        peeCamp.mapMapNumberByName.set(names[i++], peeCamp.map3)
        peeCamp.mapMapNumberByName.set(names[i++], peeCamp.map4)
        peeCamp.mapMapNumberByName.set(names[i++], peeCamp.map5)
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(400).json({ success: false })
    }
}