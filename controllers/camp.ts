import ActionPlan from "../models/ActionPlan";
import Baan from "../models/Baan";
import Camp from "../models/Camp";
import NongCamp from "../models/NongCamp";
import Part from "../models/Part";
import PeeCamp from "../models/PeeCamp";
import PetoCamp from "../models/PetoCamp";
import User from "../models/User";
import WorkItem from "../models/WorkItem";
import ShertManage from "../models/ShertManage";
import { conBaanBackToFront, conCampBackToFront, conPartBackToFront, resError, resOk, sendRes, startSize, swop } from "./setup";
import PartNameContainer from "../models/PartNameContainer";
import NameContainer from "../models/NameContainer";
import express from "express";
import { getUser } from "../middleware/auth";
import { InterBaanBack, InterBaanFront, InterCampBack, InterCampFront, InterPartBack, InterWorkingItem, IntreActionPlan } from "../models/intreface";
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
// export async function addNongPass
// export async function getActionPlan
// export async function createActionPlan
// export async function updateActionPlan
// export async function deleteActionPlan
// export async function getActionPlans
// export async function nongRegister
// export async function getCampName
// export async function getPartName
export async function getWorkingItem(req: express.Request, res: express.Response, next: express.NextFunction) {
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

        res.status(200).json(hospital);
    } catch (err) {
        res.status(400).json(resError);
    }
}
export async function createWorkingItem(req: express.Request, res: express.Response, next: express.NextFunction) {
    const camp = await Camp.findById(req.body.campId)

    if (camp?.allDone) {
        return res.status(400).json({ success: false, message: 'This camp is all done' })
    }
    const hospital = await WorkItem.create(req.body);
    res.status(200).json(hospital.toJSON());
}
export async function updateWorkingItem(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const camp = await Camp.findById(req.body.campId)

        if (camp?.allDone) {
            return res.status(400).json({ success: false, message: 'This camp is all done' })
        }
        const hospital = await WorkItem.findByIdAndUpdate(req.params.id, req.body);
        if (!hospital) {
            return res.status(400).json(resError);
        }
        res.status(200).json(hospital.toJSON());
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
        const hospital = await WorkItem.findByIdAndDelete(req.params.id);
        if (!hospital) {
            res.status(400).json(resError);
        }
        res.status(200).json(resOk);
    } catch {
        res.status(400).json(resError);
    }
}
export async function getWorkingItems(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        var bufe: InterWorkingItem[] = [];
        const user = await getUser(req)
        if (user?.filterIds.length == 0) {
            bufe = await WorkItem.find();
        } else {
            user?.filterIds.forEach(async (campId: string) => {
                const buf: InterWorkingItem[] = await WorkItem.find({
                    campId
                });
                buf.forEach((b: InterWorkingItem) => {
                    bufe.push(b);
                });
            });
        }
        res.status(200).json(bufe);
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
}
export async function getBaan(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const data = await Baan.findById(req.params.id);
        if (!data) {
            return res.status(400).json({
                success: false
            });
        }
        res.status(200).json(conBaanBackToFront(data as InterBaanBack));
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
}
export async function getCamp(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const data = await Camp.findById(req.params.id);
        if (!data) {
            return res.status(400).json({
                success: false
            });
        }
        res.status(200).json(conCampBackToFront(data as InterCampBack));
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
}
export async function getBaans(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const camp = await Camp.findById(req.params.id);
        if (!camp) {
            return res.status(400).json({
                success: false
            });
        }
        var baans: InterBaanFront[] = []
        camp.baanIds.forEach(async (baanId) => {
            const baan: InterBaanBack | null = await Baan.findById(baanId)
            if (baan) {
                baans.push(conBaanBackToFront(baan))
            }
        })
        //const baans:InterBaan[]=await data

        res.status(200).json(baans);
    } catch (err) {
        res.status(400).json(resError);
    }
}
export async function getCamps(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const data: InterCampBack[] = await Camp.find();
        if (!data) {
            return res.status(400).json(resError);
        }
        const out: InterCampFront[] = data.map((input: InterCampBack) => {
            return conCampBackToFront(input)
        })
        res.status(200).json(out);
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
}
export async function getNongCamp(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const data = await NongCamp.findById(req.params.id);
        if (!data) {
            return res.status(400).json(resError);
        }
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(resError);
    }
}
export async function getPeeCamp(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const data = await PeeCamp.findById(req.params.id);
        if (!data) {
            return res.status(400).json({
                success: false
            });
        }
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
}
export async function getPetoCamp(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const data = await PetoCamp.findById(req.params.id);
        if (!data) {
            return res.status(400).json({
                success: false
            });
        }
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
}
export async function getPart(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const data: InterPartBack | null = await Part.findById(req.params.id);
        if (!data) {
            return res.status(400).json({
                success: false
            });
        }
        res.status(200).json(conPartBackToFront(data));
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
}
export async function addNong(req: express.Request, res: express.Response, next: express.NextFunction) {
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
        const size: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number> = startSize()
        await member.forEach(async (nongId: string) => {
            count = count + 1
            baan.nongIds.push(nongId);
            camp.nongIds.push(nongId);
            if (!nongCamp) {
                return
            }
            const nong = await User.findById(nongId);
            nongCamp.nongIds.push(nongId)
            if (!nong) {
                return res.status(400).json({
                    success: false
                });
            }
            const shertManage = await ShertManage.create({ userId: nongId, size: nong.shertSize, campModelId: nongCamp._id, recive: 'baan', role: 'nong' })
            nongCamp.nongShertManageIds.push(shertManage._id.toString())
            baan.nongShertManageIds.push(shertManage._id.toString())
            camp.nongShertManageIds.push(shertManage._id.toString())
            nong.shertManageIds.push(shertManage._id.toString())
            newNongPassIds = swop(nongId, null, newNongPassIds)
            if (nong.helthIsueId) {
                baan.nongHelthIsueIds.push(nong.helthIsueId);
                camp.nongHelthIsueIds.push(nong.helthIsueId);
            }
            const userSize = nong?.shertSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'
            size.set(userSize, size.get(userSize) as number + 1)

            if (nong.haveBottle) {
                b = b + 1
                c = c + 1
            }
            camp.nongHaveBottleMapIds.set(nong._id.toString(), nong.haveBottle)
            baan.nongHaveBottleMapIds.set(nong._id.toString(), nong.haveBottle)
            nong.nongCampIds.push(nongCamp._id.toString());
        });
        size.forEach((v, k) => {
            camp.nongShertSize.set(k, camp.nongShertSize.get(k) as number + v)
            baan.nongShertSize.set(k, camp.nongShertSize.get(k) as number + v)
        })
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
}

export async function addPee(req: express.Request, res: express.Response, next: express.NextFunction) {
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
        const size: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number> = startSize()
        await member.forEach(async (userId: string) => {
            const user = await User.findById(userId);
            const part = await Part.findById(camp.peePassIds.get(userId));
            const peeCamp = await PeeCamp.findById(baan.mapPeeCampIdByPartId.get(part?._id.toHexString() as string))
            const shertManage = await ShertManage.create({ userId, size: user?.shertSize, campModelId: peeCamp?._id, recive: 'baan', role: 'pee' })
            part?.peeShertManageIds.push(shertManage._id.toString())
            camp.peeShertManageIds.push(shertManage._id.toString())
            baan.peeShertManageIds.push(shertManage._id.toString())
            user?.shertManageIds.push(shertManage._id.toString())
            count = count + 1
            peeCamp?.peeShertManageIds.push(shertManage._id.toString())
            baan.peeIds.push(userId);
            camp.peeIds.push(userId);
            part?.peeIds.push(userId);
            if (user?.helthIsueId) {
                baan.peeHelthIsueIds.push(user.helthIsueId);
                camp.peeHelthIsueIds.push(user.helthIsueId);
                part?.peeHelthIsueIds.push(user.helthIsueId);
            }
            const userSize = user?.shertSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'
            part?.peeShertSize.set(userSize, part.peeShertSize.get(userSize) as number + 1);
            size.set(userSize, size.get(userSize) as number + 1)
            if (user?.haveBottle) {
                part?.updateOne({
                    peeHaveBottle: part?.peeHaveBottle + 1
                })
                b = b + 1
                c = c + 1
            }
            baan.peeHaveBottleMapIds.set(user?._id.toString() as string, user?.haveBottle)
            camp.peeHaveBottleMapIds.set(user?._id.toString() as string, user?.haveBottle)
            part?.peeHaveBottleMapIds.set(user?._id.toString() as string, user?.haveBottle)
            user?.peeCampIds.push(peeCamp?._id.toString() as string);
            camp.peePassIds.delete(user?._id.toString() as string);
            peeCamp?.peeIds.push(userId)
        });
        size.forEach((v, k) => {
            camp.peeShertSize.set(k, camp.peeShertSize.get(k) as number + v)
            baan.peeShertSize.set(k, baan.peeShertSize.get(k) as number + v)
        })
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
export async function addPeto(req: express.Request, res: express.Response, next: express.NextFunction) {
    const {
        campId,
        member,
        partId
    } = req.body;
    await addPetoRaw(campId, member, partId, res);
}
async function addPetoRaw(campId: string, member: string[], partId: string, res: express.Response) {
    try {
        const camp = await Camp.findById(campId);
        const part = await Part.findById(partId);
        var c = camp?.petoHaveBottle
        var p = part?.petoHaveBottle
        if (!camp || !part) {
            return res.status(400).json({
                success: false
            });
        }
        var count = 0
        const size: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number> = startSize()
        const petoCamp = await PetoCamp.findById(part.petoModelId)
        member.forEach(async (userId: string) => {
            count = count + 1;
            camp.petoIds.push(userId);
            part.petoIds.push(userId);
            const user = await User.findById(userId);
            if (!user) {
                return res.status(400).json({
                    success: false
                });
            }
            const userSize = user?.shertSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL';
            size.set(userSize, size.get(userSize) as number + 1);
            petoCamp?.petoIds.push(userId);
            if (user.helthIsueId) {
                camp.petoHelthIsueIds.push(user.helthIsueId);
                part.petoHelthIsueIds.push(user.helthIsueId);
            }
            const shertManage = await ShertManage.create({ userId, size: user.shertSize, campModelId: petoCamp?._id.toString(), recive: 'part', role: 'peto' });

            user.shertManageIds.push(shertManage._id.toString());
            part.petoShertManageIds.push(shertManage._id.toString());

            petoCamp?.petoShertManageIds.push(shertManage._id.toString());
            if (user.haveBottle) {
                c = c as number + 1;
                p = p as number + 1;
            }
            camp.petoHaveBottleMapIds.set(user._id.toString(), user.haveBottle);
            part.petoHaveBottleMapIds.set(user._id.toString(), user.haveBottle);
            user.petoCampIds.push(petoCamp?._id.toString() as string);
        });
        size.forEach((v, k) => {
            camp.petoShertSize.set(k, camp.petoShertSize.get(k) as number + v)
            part.petoShertSize.set(k, part.petoShertSize.get(k) as number + v)
        })
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
export async function staffRegister(req: express.Request, res: express.Response, next: express.NextFunction) {
    const {
        campId,
        partId
    } = req.body;
    const user = await getUser(req)
    const camp = await Camp.findById(campId)
    if (user?.role === 'pee' || !camp?.havePeto) {
        camp?.peePassIds.set(user?._id.toString() as string, partId)
        res.status(200).json({
            success: true
        })
    } else {
        await addPetoRaw(campId, [user?._id.toString() as string], partId, res);
    }
}
export async function addNongPass(req: express.Request, res: express.Response, next: express.NextFunction) {
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
}
export async function getActionPlan(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const hospital = await ActionPlan.findById(req.params.id);
        if (!hospital) {
            return res.status(400).json({
                success: false
            });
        }
        res.status(200).json(hospital);
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
}
export async function createActionPlan(req: express.Request, res: express.Response, next: express.NextFunction) {
    const hospital = await ActionPlan.create(req.body);
    const part = await Part.findById(req.body.partId)
    part?.actionPlanIds.push(hospital._id.toString())
    res.status(200).json(hospital);
}
export async function updateActionPlan(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const hospital = await ActionPlan.findByIdAndUpdate(req.params.id, req.body);
        if (!hospital) {
            return res.status(400).json({
                success: false
            });
        }
        res.status(200).json(hospital);
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
}
export async function deleteActionPlan(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const hospital = await ActionPlan.findById(req.params.id);
        if (!hospital) {
            res.status(400).json({
                success: false
            });
        }
        const part = await Part.findById(hospital?.partId)
        const buf = swop(hospital?._id.toString() as string, null, part?.actionPlanIds as string[])
        part?.updateOne({ actionPlanIds: buf })
        hospital?.deleteOne()
        res.status(200).json({
            success: true,
            data: {}
        });
    } catch {
        res.status(400).json({
            success: false
        });
    }
}
export async function getActionPlans(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        var data: IntreActionPlan[] = [];
        const user = await getUser(req)
        if (user?.filterIds.length == 0) {
            data = await ActionPlan.find();
        } else {
            user?.filterIds.forEach(async (campId) => {
                const buf: IntreActionPlan[] = await ActionPlan.find({
                    campId
                });
                buf.forEach((b: IntreActionPlan) => {
                    data.push(b);
                });
            });
        }
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
}
export async function nongRegister(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const {
            campId,
            link
        } = req.body
        const nong = await getUser(req)
        if (!campId || !link) {
            sendRes(res, false)
            return
        }
        const camp = await Camp.findById(campId)
        if (!camp?.open) {
            return res.status(400).json({ success: false, message: 'This camp is close' })
        }
        camp.nongPendingIds.set(nong?._id.toString() as string, link)
        res.status(200).json({
            success: true
        })
    } catch (err) {
        res.status(400).json({
            success: false
        })
    }
}
export async function getCampName(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const camp = await NameContainer.findById(req.params.id)
        res.status(200).json(camp)
    } catch {
        res.status(400).json(resError)
    }
}
export async function getPartName(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const camp = await PartNameContainer.findById(req.params.id)
        res.status(200).json(camp)
    } catch {
        res.status(400).json(resError)
    }
}