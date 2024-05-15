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
import { calculate, conBaanBackToFront, conCampBackToFront, conPartBackToFront, resError, resOk, sendRes, startSize, swop } from "./setup";
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
// export async function addNongPass       fix
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
    await camp?.updateOne({ workItemIds: swop(null, hospital.id, camp.workItemIds) })
    const part = await Part.findById(hospital.partId)
    await part?.updateOne({ workItemIds: swop(null, hospital.id, part.workItemIds) })
    const from = await WorkItem.findById(hospital.fromId)
    from?.linkOutIds.push(hospital.id)
    await from?.updateOne({ linkOutIds: from.linkOutIds })
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

        const hospital = await WorkItem.findById(req.params.id);
        const from = await WorkItem.findById(hospital?.fromId)
        from?.updateOne({ linkOutIds: swop(hospital?.id, null, from.linkOutIds) })
        await deleteWorkingItemRaw(req.params.id)
        if (!hospital) {
            res.status(400).json(resError);
        }
        res.status(200).json(resOk);
    } catch {
        res.status(400).json(resError);
    }
}
async function deleteWorkingItemRaw(workItemId: string) {
    const workItem = await WorkItem.findById(workItemId)
    const camp = await Camp.findById(workItem?.campId)
    const part = await Part.findById(workItem?.partId)
    await part?.updateOne({ workItemIds: swop(workItem?.id, null, part.workItemIds) })
    await camp?.updateOne({ workItemIds: swop(workItem?.id, null, camp.workItemIds) })
    workItem?.linkOutIds.forEach(async (outId) => {
        if (outId != 'end') {
            await deleteWorkingItemRaw(outId)
        }
    })
    workItem?.deleteOne()
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
        //     console.log(data.nongShertSize.get('S'))
        //     const size: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number>=data.nongShertSize as Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number>
        //     size.set('S',size.get('S') as number +1)
        //     console.log(data.nongShertSize)
        //    //await data.updateOne({nongShertSize:size,round:data.round as number+1})
        //    data.nongShertSize.set('S',(data.nongShertSize.get('S') as number) +1)
        //    await data.updateOne({nongShertSize:data.nongShertSize})
        res.status(200).json(conCampBackToFront(data as InterCampBack));
    } catch (err) {
        console.log(err)
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
            const baan: InterBaanBack | null = await Baan.findById(baanId);
            if (baan) {
                baans.push(conBaanBackToFront(baan));
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
            const nong = await User.findById(nongId);
            nongCamp?.nongIds.push(nongId)
            const shertManage = await ShertManage.create({
                userId: nongId,
                size: nong?.shertSize,
                campModelId: nongCamp?.id,
                recive: 'baan',
                role: 'nong'
            })
            nongCamp?.nongShertManageIds.push(shertManage.id)
            baan.nongShertManageIds.push(shertManage.id)
            camp.nongShertManageIds.push(shertManage.id)
            nong?.shertManageIds.push(shertManage.id)
            newNongPassIds = swop(nongId, null, newNongPassIds)
            if (nong?.helthIsueId) {
                baan.nongHelthIsueIds.push(nong?.helthIsueId);
                camp.nongHelthIsueIds.push(nong?.helthIsueId);
            }
            const userSize = nong?.shertSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'
            size.set(userSize, size.get(userSize) as number + 1)

            if (nong?.haveBottle) {
                b = b + 1
                c = c + 1
            }
            camp.nongHaveBottleMapIds.set(nong?.id, nong?.haveBottle)
            baan.nongHaveBottleMapIds.set(nong?.id, nong?.haveBottle)
            nong?.nongCampIds.push(nongCamp?.id);
            camp.mapShertManageIdByUserId.set(nong?.id, shertManage.id)
            baan.mapShertManageIdByUserId.set(nong?.id, shertManage.id)
            await nong?.updateOne({ nongCampIds: nong.nongCampIds, shertManageIds: nong.shertManageIds })

        });
        size.forEach((v, k) => {
            camp.nongShertSize.set(k, camp.nongShertSize.get(k) as number + v)
            baan.nongShertSize.set(k, camp.nongShertSize.get(k) as number + v)
        })
        await camp.updateOne({
            nongSureIds: newNongPassIds,
            nongHaveBottle: c,
            nongShertManageIds: camp.nongShertManageIds,
            nongShertSize: camp.nongShertSize,
            nongHaveBottleMapIds: camp.nongHaveBottleMapIds,
            nongHelthIsueIds: camp.nongHelthIsueIds,
            nongIds: camp.nongIds
        })
        await baan.updateOne({
            nongHaveBottle: b,
            nongShertManageIds: baan.nongShertManageIds,
            nongShertSize: baan.nongShertSize,
            nongHelthIsueIds: baan.nongHelthIsueIds,
            nongHaveBottleMapIds: baan.nongHaveBottleMapIds,
            nongIds: baan.nongIds
        })
        await nongCamp?.updateOne({
            nongIds: nongCamp.nongIds,
            nongShertManageIds: nongCamp.nongShertManageIds,
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
        var b = baan?.peeHaveBottle as number
        var c = camp?.peeHaveBottle as number
        var count = 0
        const size: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number> = startSize()
        await member.forEach(async (userId: string) => {
            const user = await User.findById(userId);
            const part = await Part.findById(camp?.peePassIds.get(userId));
            const peeCamp = await PeeCamp.findById(baan?.mapPeeCampIdByPartId.get(part?.id))
            const shertManage = await ShertManage.create({ userId, size: user?.shertSize, campModelId: peeCamp?.id, recive: 'baan', role: 'pee' })
            part?.peeShertManageIds.push(shertManage.id)
            camp?.peeShertManageIds.push(shertManage.id)
            baan?.peeShertManageIds.push(shertManage.id)
            user?.shertManageIds.push(shertManage.id)
            count = count + 1
            peeCamp?.peeShertManageIds.push(shertManage.id)
            baan?.peeIds.push(userId);
            camp?.peeIds.push(userId);
            part?.peeIds.push(userId);
            if (user?.helthIsueId) {
                baan?.peeHelthIsueIds.push(user.helthIsueId);
                camp?.peeHelthIsueIds.push(user.helthIsueId);
                part?.peeHelthIsueIds.push(user.helthIsueId);
            }
            const userSize = user?.shertSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'
            part?.peeShertSize.set(userSize, part.peeShertSize.get(userSize) as number + 1);
            size.set(userSize, size.get(userSize) as number + 1)
            if (user?.haveBottle) {
                await part?.updateOne({
                    peeHaveBottle: part?.peeHaveBottle + 1
                })
                b = b + 1
                c = c + 1
            }
            baan?.peeHaveBottleMapIds.set(user?.id, user?.haveBottle)
            camp?.peeHaveBottleMapIds.set(user?.id, user?.haveBottle)
            part?.peeHaveBottleMapIds.set(user?.id, user?.haveBottle)
            user?.peeCampIds.push(peeCamp?.id);
            camp?.peePassIds.delete(user?.id);
            peeCamp?.peeIds.push(userId)
            camp?.mapShertManageIdByUserId.set(user?.id, shertManage.id)
            part?.mapShertManageIdByUserId.set(user?.id, shertManage.id)
            baan?.mapShertManageIdByUserId.set(user?.id, shertManage.id)
            await peeCamp?.updateOne({ peeIds: peeCamp.peeIds, peeShertManageIds: peeCamp.peeShertManageIds })
            await user?.updateOne({ peeCampIds: user.peeCampIds, shertManageIds: user.shertManageIds })
            await part?.updateOne({
                peeHaveBottle: part.peeHaveBottle,
                peeHaveBottleMapIds: part.peeHaveBottleMapIds,
                mapShertManageIdByUserId: part.mapShertManageIdByUserId,
                peeHelthIsueIds: part.peeHelthIsueIds,
                peeIds: part.peeIds,
                peeShertManageIds: part.peeShertManageIds,
                peeShertSize: part.peeShertSize
            })
        });
        size.forEach((v, k) => {
            camp?.peeShertSize.set(k, camp.peeShertSize.get(k) as number + v)
            baan?.peeShertSize.set(k, baan.peeShertSize.get(k) as number + v)
        })
        await camp?.updateOne({
            peeHaveBottle: c,
            peeShertManageIds: camp.peeShertManageIds,
            peeShertSize: camp.peeShertSize,
            peeIds: camp.peeIds,
            peeHaveBottleMapIds: camp.peeHaveBottleMapIds,
            peeHelthIsueIds: camp.peeHelthIsueIds,
            peePassIds: camp.peePassIds,
            mapShertManageIdByUserId: camp.mapShertManageIdByUserId
        })
        await baan?.updateOne({
            peeHaveBottle: b,
            peeHaveBottleMapIds: baan.peeHaveBottleMapIds,
            peeHelthIsueIds: baan.peeHelthIsueIds,
            peeIds: baan.peeIds,
            peeShertManageIds: baan.peeShertManageIds,
            mapShertManageIdByUserId: baan.mapShertManageIdByUserId
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
        var count = 0
        const size: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number> = startSize()
        const petoCamp = await PetoCamp.findById(part?.petoModelId)
        member.forEach(async (userId: string) => {
            count = count + 1;
            camp?.petoIds.push(userId);
            part?.petoIds.push(userId);
            const user = await User.findById(userId);
            const userSize = user?.shertSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL';
            size.set(userSize, size.get(userSize) as number + 1);
            petoCamp?.petoIds.push(userId);
            if (user?.helthIsueId) {
                camp?.petoHelthIsueIds.push(user.helthIsueId);
                part?.petoHelthIsueIds.push(user.helthIsueId);
            }
            const shertManage = await ShertManage.create({
                userId,
                size: user?.shertSize,
                campModelId: petoCamp?.id,
                recive: 'part',
                role: 'peto'
            });
            user?.shertManageIds.push(shertManage.id);
            part?.petoShertManageIds.push(shertManage.id);
            petoCamp?.petoShertManageIds.push(shertManage._id.toString());
            if (user?.haveBottle) {
                c = c as number + 1;
                p = p as number + 1;
            }
            camp?.mapShertManageIdByUserId.set(user?.id, shertManage.id)
            part?.mapShertManageIdByUserId.set(user?.id, shertManage.id)
            camp?.petoHaveBottleMapIds.set(user?.id, user?.haveBottle);
            part?.petoHaveBottleMapIds.set(user?.id, user?.haveBottle);
            user?.petoCampIds.push(petoCamp?.id);
            user?.updateOne({ petoCampIds: user.petoCampIds, shertManageIds: user.shertManageIds })

        });
        size.forEach((v, k) => {
            camp?.petoShertSize.set(k, camp.petoShertSize.get(k) as number + v)
            part?.petoShertSize.set(k, part.petoShertSize.get(k) as number + v)
        })
        await camp?.updateOne({
            petoHaveBottle: c,
            petoHaveBottleMapIds: camp.petoHaveBottleMapIds,
            petoHelthIsueIds: camp.petoHelthIsueIds,
            petoIds: camp.petoIds,
            petoShertManageIds: camp.petoShertManageIds,
            petoShertSize: camp.petoShertSize,
            mapShertManageIdByUserId: camp.mapShertManageIdByUserId
        })
        await part?.updateOne({
            petoHaveBottle: p,
            petoHaveBottleMapIds: part.petoHaveBottleMapIds,
            petoHelthIsueIds: part.petoHelthIsueIds,
            petoIds: part.petoIds,
            petoShertManageIds: part.petoShertManageIds,
            petoShertSize: part.petoShertSize,
            mapShertManageIdByUserId: part.mapShertManageIdByUserId
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
        camp?.peePassIds.set(user?.id, partId)
        await camp?.updateOne({ peePassIds: camp.peePassIds })
        res.status(200).json({
            success: true
        })
    } else {
        await addPetoRaw(campId, [user?.id], partId, res);
    }
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
    const camp = await Camp.findById(part?.campId)
    await part?.updateOne({ actionPlanIds: swop(null, hospital.id, part.actionPlanIds) })
    await camp?.updateOne({ actionPlanIds: swop(null, hospital.id, camp.actionPlanIds) })
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
        await part?.updateOne({ actionPlanIds: buf })
        await hospital?.deleteOne()
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
        camp.nongPendingIds.set(nong?.id, link)
        await camp.updateOne({ nongPendingIds: camp.nongPendingIds })
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
export async function changeBaan(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { userIds, baanId } = req.body
    const baan = await Baan.findById(baanId)
    const camp = await Camp.findById(baan?.campId)
    const newNongCamp = await NongCamp.findById(baan?.nongModelId)
    userIds.forEach(async (userId: string) => {
        const user = await User.findById(userId)
        const shertManage = await ShertManage.findById(camp?.mapShertManageIdByUserId.get(user?.id))
        switch (shertManage?.role) {
            case 'nong': {
                const oldNongCamp = await NongCamp.findById(shertManage.campModelId)
                const oldBaan = await Baan.findById(oldNongCamp?.baanId)
                await user?.updateOne({ nongCampIds: swop(oldNongCamp?.id, newNongCamp?.id, user.nongCampIds) })
                baan?.nongIds.push(user?.id)
                oldBaan?.nongShertSize.set(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', calculate(oldBaan.nongShertSize.get(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'), 0, 1))
                baan?.nongShertSize.set(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', calculate(baan.nongShertSize.get(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'), 1, 0))
                oldBaan?.mapShertManageIdByUserId.delete(user?.id)
                await oldBaan?.updateOne({
                    nongShertManageIds: swop(shertManage.id, null, oldBaan.nongShertManageIds),
                    nongIds: swop(user?.id, null, oldBaan.nongIds),
                    mapShertManageIdByUserId: oldBaan.mapShertManageIdByUserId
                })
                baan?.nongShertManageIds.push(shertManage.id)
                await shertManage.updateOne({ campModelId: newNongCamp?.id })
                baan?.nongHaveBottleMapIds.set(user?.id, oldBaan?.nongHaveBottleMapIds.get(user?.id))
                if (oldBaan?.nongHaveBottleMapIds.get(user?.id)) {
                    await oldBaan.updateOne({ nongHaveBottle: oldBaan.nongHaveBottle - 1 })
                    await baan?.updateOne({ nongHaveBottle: baan.nongHaveBottle + 1 })
                }
                baan?.mapShertManageIdByUserId.set(user?.id, shertManage.id)
                await oldNongCamp?.updateOne({
                    nongIds: swop(user?.id, null, oldNongCamp.nongIds),
                    nongShertManageIds: swop(shertManage.id, null, oldNongCamp.nongShertManageIds)
                })
                newNongCamp?.nongIds.push(user?.id)
                camp?.mapShertManageIdByUserId.set(user?.id, newNongCamp?.id)
            }
            case 'pee': {
                const oldPeeCamp = await PeeCamp.findById(shertManage.campModelId)
                const oldBaan = await Baan.findById(oldPeeCamp?.baanId)
                const newPeeCamp = await PeeCamp.findById(baan?.mapPeeCampIdByPartId.get(oldPeeCamp?.partId as string))
                await user?.updateOne({ peeCampIds: swop(oldPeeCamp?.id, newPeeCamp?.id, user?.peeCampIds) })
                await oldBaan?.updateOne({ peeIds: swop(user?.id, null, oldBaan.peeIds) })
                baan?.peeIds.push(user?.id)
                oldBaan?.peeShertSize.set(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', calculate(oldBaan.peeShertSize.get(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'), 0, 1))
                baan?.peeShertSize.set(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', calculate(baan.peeShertSize.get(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'), 1, 0))
                await oldBaan?.updateOne({ peeShertManageIds: swop(shertManage.id, null, oldBaan.peeShertManageIds) })
                baan?.peeShertManageIds.push(shertManage.id)
                await shertManage.updateOne({ campModelId: newPeeCamp?.id })
                baan?.peeHaveBottleMapIds.set(user?.id, oldBaan?.peeHaveBottleMapIds.get(user?.id))
                if (oldBaan?.peeHaveBottleMapIds.get(user?.id)) {
                    await oldBaan.updateOne({ peeHaveBottle: oldBaan.peeHaveBottle - 1 })
                    await baan?.updateOne({ peeHaveBottle: baan.peeHaveBottle + 1 })
                }
                oldBaan?.mapShertManageIdByUserId.delete(user?.id)
                baan?.mapShertManageIdByUserId.set(user?.id, shertManage.id)
                await oldPeeCamp?.updateOne({ peeIds: swop(user?.id, null, oldPeeCamp.peeIds) })
                await newPeeCamp?.updateOne({ peeIds: swop(null, user?.id, newPeeCamp.peeIds) })
                await newPeeCamp?.updateOne({ peeShertManageIds: swop(null, shertManage.id, newPeeCamp.peeShertManageIds) })
                await oldPeeCamp?.updateOne({ peeShertManageIds: swop(shertManage.id, null, oldPeeCamp.peeShertManageIds) })
                camp?.mapShertManageIdByUserId.set(user?.id, newPeeCamp?.id)
            }
        }
    })
    await newNongCamp?.updateOne({ nongIds: newNongCamp.nongIds, nongShertManageIds: newNongCamp.nongShertManageIds })
    await baan?.updateOne({
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
    })
    await camp?.updateOne({ mapShertManageIdByUserId: camp.mapShertManageIdByUserId })
    sendRes(res, true)
}
export async function changePart(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { userIds, partId } = req.body
    const part = await Part.findById(partId)
    const camp = await Camp.findById(part?.campId)
    const newPetoCamp = await PetoCamp.findById(part?.petoModelId)
    userIds.forEach(async (userId: string) => {
        const user = await User.findById(userId)
        const shertManage = await ShertManage.findById(camp?.mapShertManageIdByUserId.get(user?.id))
        switch (shertManage?.role) {
            case 'peto': {
                const oldPetoCamp = await PetoCamp.findById(shertManage.campModelId)
                const oldPart = await Part.findById(oldPetoCamp?.partId)
                await user?.updateOne({ peeCampIds: swop(oldPetoCamp?.id, newPetoCamp?.id, user.petoCampIds) })
                part?.petoIds.push(user?.id)
                oldPart?.petoShertSize.set(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', calculate(oldPart.peeShertSize.get(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'), 0, 1))
                part?.petoShertSize.set(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', calculate(part?.petoShertSize.get(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'), 1, 0))
                oldPart?.mapShertManageIdByUserId.delete(user?.id)
                await oldPart?.updateOne({
                    petoShertManageIds: swop(shertManage.id, null, oldPart.petoShertManageIds),/////////////
                    petoIds: swop(user?.id, null, oldPart.petoIds),
                    mapShertManageIdByUserId: oldPart.mapShertManageIdByUserId
                })
                part?.petoShertManageIds.push(shertManage.id)
                await shertManage.updateOne({ campModelId: newPetoCamp?.id })
                part?.petoHaveBottleMapIds.set(user?.id, oldPart?.petoHaveBottleMapIds.get(user?.id))
                if (oldPart?.petoHaveBottleMapIds.get(user?.id)) {
                    await oldPart.updateOne({ petoHaveBottle: oldPart.petoHaveBottle - 1 })
                    await part?.updateOne({ petoHaveBottle: part.petoHaveBottle + 1 })
                }
                part?.mapShertManageIdByUserId.set(user?.id, shertManage.id)
                await oldPetoCamp?.updateOne({
                    petoIds: swop(user?.id, null, oldPetoCamp.petoIds),
                    petoShertManageIds: swop(shertManage.id, null, oldPetoCamp.petoShertManageIds)
                })
                newPetoCamp?.petoIds.push(user?.id)
                camp?.mapShertManageIdByUserId.set(user?.id, newPetoCamp?.id)

            }
            case 'pee': {
                const oldPeeCamp = await PeeCamp.findById(shertManage.campModelId)
                const oldPart = await Part.findById(oldPeeCamp?.partId)
                const newPeeCamp = await PeeCamp.findById(part?.mapPeeCampIdByBaanId.get(oldPeeCamp?.baanId as string))
                await user?.updateOne({ peeCampIds: swop(oldPeeCamp?.id, newPeeCamp?.id, user?.peeCampIds) })
                await oldPart?.updateOne({ peeIds: swop(user?.id, null, oldPart.peeIds) })
                part?.peeIds.push(user?.id)
                oldPart?.peeShertSize.set(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', calculate(oldPart.peeShertSize.get(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'), 0, 1))
                part?.peeShertSize.set(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', calculate(part.peeShertSize.get(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'), 1, 0))
                await oldPart?.updateOne({ peeShertManageIds: swop(shertManage.id, null, oldPart.peeShertManageIds) })
                part?.peeShertManageIds.push(shertManage.id)
                await shertManage.updateOne({ campModelId: newPeeCamp?.id })
                part?.peeHaveBottleMapIds.set(user?.id, oldPart?.peeHaveBottleMapIds.get(user?.id))
                if (oldPart?.peeHaveBottleMapIds.get(user?.id)) {
                    await oldPart.updateOne({ peeHaveBottle: oldPart.peeHaveBottle - 1 })
                    await part?.updateOne({ peeHaveBottle: part.peeHaveBottle + 1 })
                }
                oldPart?.mapShertManageIdByUserId.delete(user?.id)
                part?.mapShertManageIdByUserId.set(user?.id, shertManage.id)
                await oldPeeCamp?.updateOne({ peeIds: swop(user?.id, null, oldPeeCamp.peeIds) })
                await newPeeCamp?.updateOne({ peeIds: swop(null, user?.id, newPeeCamp.peeIds) })
                await newPeeCamp?.updateOne({ peeShertManageIds: swop(null, shertManage.id, newPeeCamp.peeShertManageIds) })
                await oldPeeCamp?.updateOne({ peeShertManageIds: swop(shertManage.id, null, oldPeeCamp.peeShertManageIds) })
                camp?.mapShertManageIdByUserId.set(user?.id, newPeeCamp?.id)
            }
        }
    })
    await newPetoCamp?.updateOne({ petoIds: newPetoCamp.petoIds, petoShertManageIds: newPetoCamp.petoShertManageIds })
    await part?.updateOne({
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
    })
    await camp?.updateOne({ mapShertManageIdByUserId: camp.mapShertManageIdByUserId })
    sendRes(res, true)
}