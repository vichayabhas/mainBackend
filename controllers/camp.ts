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
import { startSize, swop } from "./setup";
import PartNameContainer from "../models/PartNameContainer";
import NameContainer from "../models/NameContainer";
import { NextFunction } from 'express'
import express from "express";
import { getUser } from "../middleware/auth";
import { InterWorkingItem, IntreActionPlan } from "../models/intreface";
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
export async function getWorkingItem(req: express.Request, res: express.Response, next: NextFunction) {
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
        const camp = await Camp.findById(hospital.campId)
        const part = await Part.findById(hospital.partId)

        const partName = await PartNameContainer.findById(part?.nameId)
        const name = await NameContainer.findById(camp?.nameId)



        res.status(200).json({
            success: true,
            camp: `${name?.name} ${camp?.round}`,
            part: partName?.name,
            data: hospital
        });
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
}
export async function createWorkingItem(req: express.Request, res: express.Response, next: NextFunction) {
    const camp = await Camp.findById(req.body.campId)

    if (camp?.allDone) {
        return res.status(400).json({ success: false, message: 'This camp is all done' })
    }
    const hospital = await WorkItem.create(req.body);
    res.status(200).json({
        success: true,
        data: hospital
    });
}
export async function updateWorkingItem(req: express.Request, res: express.Response, next: NextFunction) {
    try {
        const camp = await Camp.findById(req.body.campId)

        if (camp?.allDone) {
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
}
export async function deleteWorkingItem(req: express.Request, res: express.Response, next: NextFunction) {
    try {
        const camp = await Camp.findById(req.body.campId)
        if (camp?.allDone) {
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
}
export async function getWorkingItems(req: express.Request, res: express.Response, next: NextFunction) {
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
        const data = bufe.map(async (workItem: InterWorkingItem) => {
            const part = await Part.findById(workItem.partId);
            const partName = await PartNameContainer.findById(part?.nameId);
            const camp = await Camp.findById(workItem.campId);
            const name = await NameContainer.findById(camp?.nameId);
            return ({
                part: partName?.name,
                camp: name?.name,
                link: workItem.link,
                linkOutIds: workItem.linkOutIds,
                fromId: workItem.fromId,
                name: workItem.name,
                status: workItem.status
            });




        })

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
}
export async function getBaan(req: express.Request, res: express.Response, next: NextFunction) {
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
}
export async function getCamp(req: express.Request, res: express.Response, next: NextFunction) {
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
}
export async function getNongCamp(req: express.Request, res: express.Response, next: NextFunction) {
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
}
export async function getPeeCamp(req: express.Request, res: express.Response, next: NextFunction) {
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
}
export async function getPetoCamp(req: express.Request, res: express.Response, next: NextFunction) {
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
}
export async function getPart(req: express.Request, res: express.Response, next: NextFunction) {
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
}
export async function addNong(req: express.Request, res: express.Response, next: NextFunction) {
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
        const size: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number> = startSize
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

export async function addPee(req: express.Request, res: express.Response, next: NextFunction) {
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
        const size: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number> = startSize
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
export async function addPeto(req: express.Request, res: express.Response, next: NextFunction) {
    const {
        campId,
        member,
        partId
    } = req.body;
    await addPetoRaw(campId, member, partId, res);
}
async function addPetoRaw(campId:string, member:string[], partId:string, res:express.Response) {
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
        const size: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number> = startSize
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
export async function staffRegister(req: express.Request, res: express.Response, next: NextFunction) {
    const {
        campId,
        partId
    } = req.body;
    const user = await getUser(req)
    if (user?.role === 'pee') {
        const camp = await Camp.findById(campId)
        camp?.peePassIds.set(user._id.toString(), partId)
        res.status(200).json({
            success: true
        })
    } else {
        await addPetoRaw(campId, [user?._id.toString() as string], partId, res);
    }
}
export async function addNongPass(req: express.Request, res: express.Response, next: NextFunction) {
    try {
        const {
            campId,
            member
        } = req.body
        const camp = await Camp.findById(campId)
        var newPending = camp?.nongPendingIds
        var count = 0
        member.forEach((nongId:string) => {
            camp?.nongPassIds.set(nongId,camp.nongPendingIds.get(nongId))
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
export async function getActionPlan(req: express.Request, res: express.Response, next: NextFunction) {
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
}
export async function createActionPlan(req: express.Request, res: express.Response, next: NextFunction) {
    const hospital = await ActionPlan.create(req.body);
    const part = await Part.findById(req.body.partId)
    part?.actionPlanIds.push(hospital._id.toString())
    res.status(200).json({
        success: true,
        data: hospital
    });
}
export async function updateActionPlan(req: express.Request, res: express.Response, next: NextFunction) {
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
}
export async function deleteActionPlan(req: express.Request, res: express.Response, next: NextFunction) {
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
export async function getActionPlans(req: express.Request, res: express.Response, next: NextFunction) {
    try {
        var data:IntreActionPlan[] = [];
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
}
export async function nongRegister(req: express.Request, res: express.Response, next: NextFunction) {
    try {
        const {
            campId,
            link
        } = req.body
        const nong = await getUser(req)
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
export async function renameVarible(req: express.Request, res: express.Response, next: NextFunction) {
    try {
        const { peeCampId, names } = req.body
        const peeCamp = await PeeCamp.findById(peeCampId)
        const camp = await Camp.findById(peeCamp?.campId)
        if (camp?.allDone) {
            return res.status(400).json({ success: false, message: 'This camp is all done' })
        }
        var i = 0
        while (i < 10) {
            if (!names[i]) {
                names[i] = peeCamp?.varibleNames[i]
                i = i + 1;
            }
        }
        i = 0
        while (i < 5) {
            peeCamp?.mapArrayStringNumberByName.delete(peeCamp?.varibleNames[i++])
        }
        while (i < 10) {
            peeCamp?.mapMapNumberByName.delete(peeCamp?.varibleNames[i++])
        }
        peeCamp?.updateOne({ varibleNames: names })
        i = 0
        peeCamp?.mapArrayStringNumberByName.set(names[i++], peeCamp.arrayString1)
        peeCamp?.mapArrayStringNumberByName.set(names[i++], peeCamp.arrayString2)
        peeCamp?.mapArrayStringNumberByName.set(names[i++], peeCamp.arrayString3)
        peeCamp?.mapArrayStringNumberByName.set(names[i++], peeCamp.arrayString4)
        peeCamp?.mapArrayStringNumberByName.set(names[i++], peeCamp.arrayString5)
        peeCamp?.mapMapNumberByName.set(names[i++], peeCamp.map1)
        peeCamp?.mapMapNumberByName.set(names[i++], peeCamp.map2)
        peeCamp?.mapMapNumberByName.set(names[i++], peeCamp.map3)
        peeCamp?.mapMapNumberByName.set(names[i++], peeCamp.map4)
        peeCamp?.mapMapNumberByName.set(names[i++], peeCamp.map5)
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(400).json({ success: false })
    }
}