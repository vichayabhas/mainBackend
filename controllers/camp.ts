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
import { calculate, conBaanBackToFront, conCampBackToFront, conPartBackToFront, linkHash, linkSign, resError, resOk, sendRes, startSize, swop } from "./setup";
import PartNameContainer from "../models/PartNameContainer";
import NameContainer from "../models/NameContainer";
import express from "express";
import jwt from 'jsonwebtoken'
import { getUser } from "../middleware/auth";
import { InterBaanBack, InterBaanFront, InterCampBack, InterCampFront, InterPartBack, InterUser, InterWorkingItem, InterActionPlan, ShowMember, createActionPlan, showActionPlan, Answer, CreateQuation, EditQuation } from "../models/intreface";
import mongoose from "mongoose";
import Song from "../models/Song";
import HelthIsue from "../models/HelthIsue";
import Place from "../models/Place";
import Building from "../models/Building";
import ChoiseAnswer from "../models/ChoiseAnswer";
import ChoiseQuasion from "../models/ChoiseQuasion";
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
export async function getWorkingItem(req: express.Request, res: express.Response, next: express.NextFunction) {
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
    const { campId, token, linkOutIds, fromId, link, status, partId, name } = req.body
    const user = await getUser(req)
    const camp = await Camp.findById(campId)
    if (!camp || !user) {
        sendRes(res, false)
        return
    }
    if (camp.allDone) {
        return res.status(400).json({ success: false, message: 'This camp is all done' })
    }
    const hospital = await WorkItem.create({ campId, linkOutIds, fromId, status, partId, name, link: jwt.sign(link, token), createBy: user._id });
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
}
export async function getBaan(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const data = await Baan.findById(req.params.id);
        if (!data) {
            return res.status(400).json({
                success: false
            });
        }
        res.status(200).json(conBaanBackToFront(data.toObject()));
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
}
export async function getCamp(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        //console.log(req.params.id)
        const data = await Camp.findById(req.params.id);
        if (!data) {
            return res.status(400).json({
                success: false
            });
        }
        //console.log(data.toObject())
        res.status(200).json(conCampBackToFront(data.toObject()));
        //console.log(req.params.id)
    } catch (err) {
        console.log(err)
        res.status(400).json({
            success: false
        });
    }
}
export async function getBaans(req: express.Request, res: express.Response, next: express.NextFunction) {
    //console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjttttttttttttttttttttttttttttttt')
    try {
        const camp = await Camp.findById(req.params.id);
        if (!camp) {
            return res.status(400).json({
                success: false
            });
        }
        var baans: InterBaanFront[] = []
        var i = 0
        while (i < camp.baanIds.length) {
            const baan: InterBaanBack | null = await Baan.findById(camp.baanIds[i++])
            if (baan) {
                baans.push(conBaanBackToFront(baan))
            }
        }
        //console.log('jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
        res.status(200).json(baans);
        //console.log(baans.length)
    } catch (err) {
        console.log('gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg')
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
        console.log(err)
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
            baanId,
            member
        }: { baanId: string, member: string[] } = req.body;
        const baan = await Baan.findById(baanId);
        if (!baan) {
            sendRes(res, false)
            return
        }
        const camp = await Camp.findById(baan.campId);
        if (!camp) {
            return res.status(400).json({
                success: false
            });
        }
        const nongCamp = await NongCamp.findById(baan.nongModelId)
        if (!nongCamp) {
            sendRes(res, false)
            return
        }
        var newNongPassIds = camp.nongSureIds
        var count = 0
        var b = baan.nongHaveBottle
        var c = camp.nongHaveBottle
        const size: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number> = startSize()
        var i = 0
        while (i < member.length) {
            count = count + 1
            const user = await User.findById(member[i++])
            if (!user) {
                continue
            }
            baan.nongIds.push(user._id)
            camp.nongIds.push(user._id)
            var sleepAtCamp: boolean
            switch (camp.toObject().nongSleepModel) {
                case 'นอนทุกคน': {
                    sleepAtCamp = true
                    break
                }
                case 'เลือกได้ว่าจะค้างคืนหรือไม่': {
                    sleepAtCamp = user.likeToSleepAtCamp as boolean
                    break
                }
                case 'ไม่มีการค้างคืน': sleepAtCamp = false
                case null: sleepAtCamp = false
                case undefined: sleepAtCamp = false
            }
            if (sleepAtCamp) {
                camp.nongSleepIds.push(user._id)
                baan.nongSleepIds.push(user._id)
            }
            const shertManage = await ShertManage.create({
                userId: user._id,
                size: user.shertSize,
                campModelId: nongCamp._id,
                recive: 'baan',
                role: 'nong',
                haveBottle: user.haveBottle,
                sleepAtCamp
            })
            nongCamp.nongShertManageIds.push(shertManage._id)
            baan.nongShertManageIds.push(shertManage._id)
            camp.nongShertManageIds.push(shertManage._id)
            user.shertManageIds.push(shertManage._id)
            newNongPassIds = swop(user._id, null, newNongPassIds)
            if (user.helthIsueId) {
                baan.nongHelthIsueIds.push(user.helthIsueId);
                camp.nongHelthIsueIds.push(user.helthIsueId);
            }
            const userSize = user.shertSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'
            size.set(userSize, size.get(userSize) as number + 1)
            if (user.haveBottle) {
                b = b + 1
                c = c + 1
            }
            camp.nongHaveBottleMapIds.set(user.id, user.haveBottle)
            baan.nongHaveBottleMapIds.set(user.id, user.haveBottle)
            user.nongCampIds.push(nongCamp._id);
            camp.mapShertManageIdByUserId.set(user.id, shertManage._id)
            baan.mapShertManageIdByUserId.set(user.id, shertManage._id)
            await user.updateOne({ nongCampIds: user.nongCampIds, shertManageIds: user.shertManageIds })
        }
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

        members,
        baanId
    }: {
        members: mongoose.Types.ObjectId[]
        baanId: mongoose.Types.ObjectId
    } = req.body;
    const success = await addPeeRaw(members, baanId)
    sendRes(res, success)


}
export async function addPeeRaw(members: mongoose.Types.ObjectId[], baanId: mongoose.Types.ObjectId) {
    try {
        const baan = await Baan.findById(baanId);
        if (!baan) {
            return false
        }
        const camp = await Camp.findById(baan.campId);
        if (!camp) {
            return false
        }
        var b = baan.peeHaveBottle
        var c = camp.peeHaveBottle
        var count = 0
        const size: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number> = startSize()
        var i = 0
        while (i < members.length) {
            const user = await User.findById(members[i++]);
            if (!user) {
                continue
            }
            const part = await Part.findById(camp.peePassIds.get(user.id));
            if (!part) {
                continue
            }
            const peeCamp = await PeeCamp.findById(baan?.mapPeeCampIdByPartId.get(part.id))
            if (!peeCamp) {
                continue
            }
            var sleepAtCamp: boolean
            switch (camp.toObject().peeSleepModel) {
                case 'นอนทุกคน': {
                    sleepAtCamp = true
                    break
                }
                case 'เลือกได้ว่าจะค้างคืนหรือไม่': {
                    sleepAtCamp = user.likeToSleepAtCamp as boolean
                    break
                }
                case 'ไม่มีการค้างคืน': sleepAtCamp = false
                case null: sleepAtCamp = false
                case undefined: sleepAtCamp = false
            }
            if (sleepAtCamp) {
                camp.peeSleepIds.push(user._id)
                baan.peeSleepIds.push(user._id)
                part.peeSleepIds.push(user._id)
            }
            const shertManage = await ShertManage.create({
                userId: user._id,
                size: user.shertSize,
                campModelId: peeCamp._id,
                recive: 'baan',
                role: 'pee',
                haveBottle: user.haveBottle,
                sleepAtCamp
            })
            part.peeShertManageIds.push(shertManage._id)
            camp.peeShertManageIds.push(shertManage._id)
            baan.peeShertManageIds.push(shertManage._id)
            user.shertManageIds.push(shertManage._id)
            count = count + 1
            peeCamp.peeShertManageIds.push(shertManage._id)
            baan.peeIds.push(user._id);
            camp.peeIds.push(user._id);
            part.peeIds.push(user._id);
            if (user.helthIsueId) {
                baan.peeHelthIsueIds.push(user.helthIsueId);
                camp.peeHelthIsueIds.push(user.helthIsueId);
                part.peeHelthIsueIds.push(user.helthIsueId);
            }
            const userSize = user.shertSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'
            part.peeShertSize.set(userSize, part.peeShertSize.get(userSize) as number + 1);
            size.set(userSize, size.get(userSize) as number + 1)
            if (user?.haveBottle) {
                await part?.updateOne({
                    peeHaveBottle: part?.peeHaveBottle + 1
                })
                b = b + 1
                c = c + 1
            }
            baan.peeHaveBottleMapIds.set(user.id, user.haveBottle)
            camp.peeHaveBottleMapIds.set(user.id, user.haveBottle)
            part.peeHaveBottleMapIds.set(user.id, user?.haveBottle)
            user.peeCampIds.push(peeCamp._id);
            user.registerIds.push(camp._id)
            camp.peePassIds.delete(user.id);
            peeCamp.peeIds.push(user._id)
            camp.mapShertManageIdByUserId.set(user.id, shertManage._id)
            part.mapShertManageIdByUserId.set(user.id, shertManage._id)
            baan.mapShertManageIdByUserId.set(user.id, shertManage._id)
            await peeCamp.updateOne({
                peeIds: peeCamp.peeIds,
                peeShertManageIds: peeCamp.peeShertManageIds
            })
            await user.updateOne({
                peeCampIds: user.peeCampIds,
                shertManageIds: user.shertManageIds,
                registerIds: user.registerIds
            })
            await part.updateOne({
                peeHaveBottle: part.peeHaveBottle,
                peeHaveBottleMapIds: part.peeHaveBottleMapIds,
                mapShertManageIdByUserId: part.mapShertManageIdByUserId,
                peeHelthIsueIds: part.peeHelthIsueIds,
                peeIds: part.peeIds,
                peeShertManageIds: part.peeShertManageIds,
                peeShertSize: part.peeShertSize
            })
        }
        size.forEach((v, k) => {
            camp.peeShertSize.set(k, camp.peeShertSize.get(k) as number + v)
            baan.peeShertSize.set(k, baan.peeShertSize.get(k) as number + v)
        })
        await camp.updateOne({
            peeHaveBottle: c,
            peeShertManageIds: camp.peeShertManageIds,
            peeShertSize: camp.peeShertSize,
            peeIds: camp.peeIds,
            peeHaveBottleMapIds: camp.peeHaveBottleMapIds,
            peeHelthIsueIds: camp.peeHelthIsueIds,
            peePassIds: camp.peePassIds,
            mapShertManageIdByUserId: camp.mapShertManageIdByUserId
        })
        await baan.updateOne({
            peeHaveBottle: b,
            peeHaveBottleMapIds: baan.peeHaveBottleMapIds,
            peeHelthIsueIds: baan.peeHelthIsueIds,
            peeIds: baan.peeIds,
            peeShertManageIds: baan.peeShertManageIds,
            mapShertManageIdByUserId: baan.mapShertManageIdByUserId,
            peeShertSize: baan.peeShertSize
        })
        return true

    } catch (err) {
        console.log(err)
        return false
    }
}
export async function addPeto(req: express.Request, res: express.Response, next: express.NextFunction) {
    const {
        member,
        partId
    } = req.body;
    await addPetoRaw(member, partId, res);

}
export async function addPetoRaw(member: mongoose.Types.ObjectId[], partId: mongoose.Types.ObjectId, res: express.Response) {
    const part = await Part.findById(partId);
    if (!part) {
        sendRes(res, false)
        return
    }
    const camp = await Camp.findById(part.campId);
    if (!camp) {
        sendRes(res, false)
        return
    }
    var c = camp.petoHaveBottle
    var p = part.petoHaveBottle
    var count = 0
    const size: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number> = startSize()
    const petoCamp = await PetoCamp.findById(part.petoModelId)
    if (!petoCamp) {
        sendRes(res, false)
        return
    }
    var i = 0
    while (i < member.length) {
        count = count + 1
        const user = await User.findById(member[i++])
        if (!user) {
            continue
        }
        part.petoIds.push(user._id)
        camp.petoIds.push(user._id)
        var sleepAtCamp: boolean
        switch (camp.toObject().peeSleepModel) {
            case 'นอนทุกคน': {
                sleepAtCamp = true
                break
            }
            case 'เลือกได้ว่าจะค้างคืนหรือไม่': {
                sleepAtCamp = user.likeToSleepAtCamp as boolean
                break
            }
            case 'ไม่มีการค้างคืน': sleepAtCamp = false
            case null: sleepAtCamp = false
            case undefined: sleepAtCamp = false
        }
        if (sleepAtCamp) {
            camp.peeSleepIds.push(user._id)
            part.peeSleepIds.push(user._id)
        }
        const shertManage = await ShertManage.create({
            userId: user._id,
            size: user.shertSize,
            campModelId: petoCamp._id,
            recive: 'part',
            role: 'peto',
            haveBottle: user.haveBottle,
            sleepAtCamp
        })
        petoCamp.petoShertManageIds.push(shertManage._id)
        part.petoShertManageIds.push(shertManage._id)
        camp.petoShertManageIds.push(shertManage._id)
        user.shertManageIds.push(shertManage._id)
        if (user.helthIsueId) {
            part.petoHelthIsueIds.push(user.helthIsueId);
            camp.petoHelthIsueIds.push(user.helthIsueId);
        }
        const userSize = user.shertSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'
        size.set(userSize, size.get(userSize) as number + 1)
        if (user.haveBottle) {
            p = p + 1
            c = c + 1
        }
        camp.petoHaveBottleMapIds.set(user.id, user.haveBottle)
        part.petoHaveBottleMapIds.set(user.id, user.haveBottle)
        user.petoCampIds.push(petoCamp._id)
        user.registerIds.push(camp._id)
        camp.mapShertManageIdByUserId.set(user.id, shertManage._id)
        part.mapShertManageIdByUserId.set(user.id, shertManage._id)
        await user.updateOne({
            petoCampIds: user.petoCampIds,
            shertManageIds: user.shertManageIds,
            registerIds: user.registerIds
        })
    }
    size.forEach((v, k) => {
        camp.petoShertSize.set(k, camp.petoShertSize.get(k) as number + v)
        part.petoShertSize.set(k, part.petoShertSize.get(k) as number + v)
    })
    await camp.updateOne({
        petoHaveBottle: c,
        petoHaveBottleMapIds: camp.petoHaveBottleMapIds,
        petoHelthIsueIds: camp.petoHelthIsueIds,
        petoIds: camp.petoIds,
        petoShertManageIds: camp.petoShertManageIds,
        petoShertSize: camp.petoShertSize,
        mapShertManageIdByUserId: camp.mapShertManageIdByUserId
    })
    await part.updateOne({
        petoHaveBottle: p,
        petoHaveBottleMapIds: part.petoHaveBottleMapIds,
        petoHelthIsueIds: part.petoHelthIsueIds,
        petoIds: part.petoIds,
        petoShertManageIds: part.petoShertManageIds,
        petoShertSize: part.petoShertSize,
        mapShertManageIdByUserId: part.mapShertManageIdByUserId
    })
    sendRes(res, true)
}
export async function staffRegister(req: express.Request, res: express.Response, next: express.NextFunction) {
    const partId: string = req.params.id
    const part = await Part.findById(partId)
    const user = await getUser(req)
    if (!user || !part) {
        sendRes(res, false)
        return
    }
    const camp = await Camp.findById(part.campId)
    if (user?.role === 'pee' || camp?.memberStructre != 'nong->highSchool,pee->1year,peto->2upYear') {
        camp?.peePassIds.set(user.id, partId)
        await camp?.updateOne({ peePassIds: camp.peePassIds })
        res.status(200).json({
            success: true
        })
    } else {
        await addPetoRaw([user._id], part._id, res);
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
        const part = await Part.findById(req.params.id)
        var data: showActionPlan[] = [];
        if (!part) {
            sendRes(res, false)
            return
        }
        var j = 0
        while (j < part.actionPlanIds.length) {
            const actionPlan: InterActionPlan | null = await ActionPlan.findById(part.actionPlanIds[j++])
            if (!actionPlan) {
                continue
            }
            const {
                action,
                partId,
                placeIds,
                start,
                end,
                headId,
                body,
                partName,
                _id
            } = actionPlan
            const user = await User.findById(headId)
            var k = 0
            const placeName: string[] = []
            while (k < placeIds.length) {
                const place = await Place.findById(placeIds[k++])
                const building = await Building.findById(place?.buildingId)
                placeName.push(`${building?.name} ${place?.flore} ${place?.room}`)
            }
            data.push({
                action,
                partId,
                placeIds,
                start,
                end,
                headId,
                body,
                headName: user?.nickname as string,
                headTel: user?.tel as string,
                partName,
                placeName,
                _id
            })
        }
        data.sort((a, b) => (a.start.getTime() - b.start.getTime()))
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
    }
}
export async function createActionPlan(req: express.Request, res: express.Response, next: express.NextFunction) {
    const create: createActionPlan = req.body
    const hospital = await ActionPlan.create(create);
    const part = await Part.findById(create.partId)
    const camp = await Camp.findById(part?.campId)
    await part?.updateOne({ actionPlanIds: swop(null, hospital._id, part.actionPlanIds) })
    await camp?.updateOne({ actionPlanIds: swop(null, hospital._id, camp.actionPlanIds) })
    await hospital.updateOne({ partName: part?.partName })
    var i = 0
    while (i < hospital.placeIds.length) {
        const place = await Place.findById(create.placeIds[i++])
        const building = await Building.findById(place?.buildingId)
        await place?.updateOne({ actionPlanIds: swop(null, hospital._id, place.actionPlanIds) })
        await building?.updateOne({ actionPlanIds: swop(null, hospital._id, building.actionPlanIds) })
    }
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
            return
        }
        const part = await Part.findById(hospital.partId)
        if (!part) {
            sendRes(res, false)
            return
        }
        const buf = swop(hospital._id, null, part.actionPlanIds)
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
        var data: showActionPlan[] = [];
        const user = await getUser(req)
        if (!user) {
            sendRes(res, false)
            return
        }
        if (user.filterIds.length == 0) {
            var i = 0
            while (i < user.registerIds.length) {
                const camp = await Camp.findById(user.registerIds[i++])
                if (!camp) {
                    continue
                }
                var j = 0
                while (j < camp.actionPlanIds.length) {
                    const actionPlan: InterActionPlan | null = await ActionPlan.findById(camp.actionPlanIds[j++])
                    if (!actionPlan) {
                        continue
                    }
                    const {
                        action,
                        partId,
                        placeIds,
                        start,
                        end,
                        headId,
                        body,
                        partName,
                        _id

                    } = actionPlan
                    const user = await User.findById(headId)
                    var k = 0
                    const placeName: string[] = []
                    while (k < placeIds.length) {
                        const place = await Place.findById(placeIds[k++])
                        const building = await Building.findById(place?.buildingId)
                        placeName.push(`${building?.name} ${place?.flore} ${place?.room}`)
                    }
                    data.push({
                        action,
                        partId,
                        placeIds,
                        start,
                        end,
                        headId,
                        body,
                        headName: user?.nickname as string,
                        headTel: user?.tel as string,
                        partName,
                        placeName,
                        _id
                    })
                }
            }
        } else {
            var i = 0
            while (i < user.filterIds.length) {
                const camp = await Camp.findById(user.filterIds[i++])
                if (!camp) {
                    continue
                }
                var j = 0
                while (j < camp.actionPlanIds.length) {
                    const actionPlan: InterActionPlan | null = await ActionPlan.findById(camp.actionPlanIds[j++])
                    if (!actionPlan) {
                        continue
                    }
                    const {
                        action,
                        partId,
                        placeIds,
                        start,
                        end,
                        headId,
                        body,
                        partName,
                        _id

                    } = actionPlan
                    const user = await User.findById(headId)
                    var k = 0
                    const placeName: string[] = []
                    while (k < placeIds.length) {
                        const place = await Place.findById(placeIds[k++])
                        const building = await Building.findById(place?.buildingId)
                        placeName.push(`${building?.name} ${place?.flore} ${place?.room}`)
                    }
                    data.push({
                        action,
                        partId,
                        placeIds,
                        start,
                        end,
                        headId,
                        body,
                        headName: user?.nickname as string,
                        headTel: user?.tel as string,
                        partName,
                        placeName,
                        _id
                    })
                }
            }
        }
        data.sort((a, b) => (a.start.getTime() - b.start.getTime()))
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
    const { userIds, baanId }: { userIds: mongoose.Types.ObjectId[], baanId: mongoose.Types.ObjectId } = req.body
    const user = await getUser(req)
    const baan = await Baan.findById(baanId)
    if (!baan) {
        sendRes(res, false)
        return
    }
    const camp: InterCampBack | null = await Camp.findById(baan.campId)
    if (!user || !camp || (!user.authPartIds.includes(camp.partBoardId) && !user.authPartIds.includes(camp.partRegiterId))) {
        sendRes(res, false)
        return
    }
    await changeBaanRaw(userIds, baanId, res)
}
export async function changeBaanRaw(userIds: mongoose.Types.ObjectId[], baanId: mongoose.Types.ObjectId, res: express.Response) {
    const baan = await Baan.findById(baanId)
    if (!baan) {
        sendRes(res, false)
        return
    }
    const camp = await Camp.findById(baan.campId)
    const newNongCamp = await NongCamp.findById(baan.nongModelId)
    if (!camp || !newNongCamp) {
        sendRes(res, false)
        return
    }
    var i = 0
    while (i < userIds.length) {
        const user = await User.findById(userIds[i++])
        if (!user) {
            continue
        }
        const shertManage = await ShertManage.findById(camp.mapShertManageIdByUserId.get(user.id))
        if (!shertManage) {
            continue
        }
        switch (shertManage.role) {
            case 'nong': {
                const oldNongCamp = await NongCamp.findById(shertManage.campModelId)
                if (!oldNongCamp) {
                    continue
                }
                const oldBaan = await Baan.findById(oldNongCamp.baanId)
                if (!oldBaan) {
                    continue
                }
                await user.updateOne({ nongCampIds: swop(oldNongCamp._id, newNongCamp._id, user.nongCampIds) })
                baan.nongIds.push(user._id)
                oldBaan.nongShertSize.set(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', calculate(oldBaan.nongShertSize.get(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'), 0, 1))
                baan.nongShertSize.set(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', calculate(baan.nongShertSize.get(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'), 1, 0))
                oldBaan.mapShertManageIdByUserId.delete(user.id)
                await oldBaan.updateOne({
                    nongShertManageIds: swop(shertManage._id, null, oldBaan.nongShertManageIds),
                    nongIds: swop(user._id, null, oldBaan.nongIds),
                    mapShertManageIdByUserId: oldBaan.mapShertManageIdByUserId
                })
                baan.nongShertManageIds.push(shertManage._id)
                await shertManage.updateOne({ campModelId: newNongCamp._id })
                baan.nongHaveBottleMapIds.set(user.id, oldBaan?.nongHaveBottleMapIds.get(user.id))
                if (oldBaan.nongHaveBottleMapIds.get(user.id)) {
                    await oldBaan.updateOne({ nongHaveBottle: oldBaan.nongHaveBottle - 1 })
                    await baan.updateOne({ nongHaveBottle: baan.nongHaveBottle + 1 })
                }
                baan.mapShertManageIdByUserId.set(user?.id, shertManage._id)
                await oldNongCamp.updateOne({
                    nongIds: swop(user._id, null, oldNongCamp.nongIds),
                    nongShertManageIds: swop(shertManage._id, null, oldNongCamp.nongShertManageIds)
                })
                newNongCamp.nongIds.push(user._id)
                break
            }
            case 'pee': {
                const oldPeeCamp = await PeeCamp.findById(shertManage.campModelId)
                if (!oldPeeCamp) {
                    continue
                }
                const oldBaan = await Baan.findById(oldPeeCamp.baanId)
                if (!oldBaan) {
                    continue
                }
                const newPeeCamp = await PeeCamp.findById(baan.mapPeeCampIdByPartId.get(oldPeeCamp.partId?.toString() as string))
                if (!newPeeCamp) {
                    continue
                }
                await user.updateOne({ peeCampIds: swop(oldPeeCamp._id, newPeeCamp._id, user.peeCampIds) })
                baan.peeIds.push(user._id)
                oldBaan.peeShertSize.set(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', calculate(oldBaan.peeShertSize.get(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'), 0, 1))
                baan.peeShertSize.set(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', calculate(baan.peeShertSize.get(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'), 1, 0))
                await oldBaan.updateOne({
                    peeShertManageIds: swop(shertManage._id, null, oldBaan.peeShertManageIds),
                    peeIds: swop(user._id, null, oldBaan.peeIds)
                })
                baan.peeShertManageIds.push(shertManage._id)
                await shertManage.updateOne({ campModelId: newPeeCamp._id })
                baan.peeHaveBottleMapIds.set(user.id, oldBaan.peeHaveBottleMapIds.get(user.id))
                if (oldBaan.peeHaveBottleMapIds.get(user.id)) {
                    await oldBaan.updateOne({ peeHaveBottle: oldBaan.peeHaveBottle - 1 })
                    await baan.updateOne({ peeHaveBottle: baan.peeHaveBottle + 1 })
                }
                oldBaan?.mapShertManageIdByUserId.delete(user.id)
                baan.mapShertManageIdByUserId.set(user.id, shertManage._id)
                await newPeeCamp.updateOne({
                    peeShertManageIds: swop(null, shertManage._id, newPeeCamp.peeShertManageIds),
                    peeIds: swop(null, user._id, newPeeCamp.peeIds)
                })
                await oldPeeCamp.updateOne({
                    peeShertManageIds: swop(shertManage._id, null, oldPeeCamp.peeShertManageIds),
                    peeIds: swop(user._id, null, oldPeeCamp.peeIds)
                })
                break
            }
        }
    }
    await newNongCamp.updateOne({
        nongIds: newNongCamp.nongIds,
        nongShertManageIds: newNongCamp.nongShertManageIds
    })
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
    sendRes(res, true)
}
export async function changePart(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { userIds, partId }: { userIds: mongoose.Types.ObjectId[], partId: mongoose.Types.ObjectId } = req.body
    const out = await changePartRaw(userIds, partId)
    sendRes(res, out)
}
export async function changePartRaw(userIds: mongoose.Types.ObjectId[], partId: mongoose.Types.ObjectId) {


    const part = await Part.findById(partId)
    if (!part) {

        return false
    }
    const camp = await Camp.findById(part.campId)
    if (!camp) {

        return false
    }
    const newPetoCamp = await PetoCamp.findById(part.petoModelId)
    if (!newPetoCamp) {

        return false
    }
    var i = 0
    while (i < userIds.length) {
        const user = await User.findById(userIds[i++])
        if (!user) {
            continue
        }
        const shertManage = await ShertManage.findById(camp.mapShertManageIdByUserId.get(user.id))
        if (!shertManage) {
            continue
        }
        switch (shertManage.role) {
            case 'peto': {
                const oldPetoCamp = await PetoCamp.findById(shertManage.campModelId)
                if (!oldPetoCamp) {
                    continue
                }
                const oldPart = await Part.findById(oldPetoCamp.partId)
                if (!oldPart) {
                    continue
                }
                await user.updateOne({ peeCampIds: swop(oldPetoCamp._id, newPetoCamp._id, user.petoCampIds) })
                part.petoIds.push(user._id)
                oldPart.petoShertSize.set(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', calculate(oldPart.peeShertSize.get(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'), 0, 1))
                part.petoShertSize.set(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', calculate(part.petoShertSize.get(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'), 1, 0))
                oldPart.mapShertManageIdByUserId.delete(user?.id)
                await oldPart.updateOne({
                    petoShertManageIds: swop(shertManage._id, null, oldPart.petoShertManageIds),/////////////
                    petoIds: swop(user._id, null, oldPart.petoIds),
                    mapShertManageIdByUserId: oldPart.mapShertManageIdByUserId
                })
                part.petoShertManageIds.push(shertManage._id)
                await shertManage.updateOne({ campModelId: newPetoCamp._id })
                part.petoHaveBottleMapIds.set(user.id, oldPart.petoHaveBottleMapIds.get(user.id))
                if (oldPart.petoHaveBottleMapIds.get(user.id)) {
                    await oldPart.updateOne({ petoHaveBottle: oldPart.petoHaveBottle - 1 })
                    await part.updateOne({ petoHaveBottle: part.petoHaveBottle + 1 })
                }
                part.mapShertManageIdByUserId.set(user.id, shertManage._id)
                await oldPetoCamp.updateOne({
                    petoIds: swop(user._id, null, oldPetoCamp.petoIds),
                    petoShertManageIds: swop(shertManage._id, null, oldPetoCamp.petoShertManageIds)
                })
                newPetoCamp.petoIds.push(user._id)
                break
            }
            case 'pee': {
                const oldPeeCamp = await PeeCamp.findById(shertManage.campModelId)
                if (!oldPeeCamp) {
                    continue
                }
                const oldPart = await Part.findById(oldPeeCamp.partId)
                if (!oldPart) {
                    continue
                }
                const newPeeCamp = await PeeCamp.findById(part.mapPeeCampIdByBaanId.get(oldPeeCamp.baanId?.toString() as string))
                if (!newPeeCamp) {
                    continue
                }
                await user.updateOne({ peeCampIds: swop(oldPeeCamp._id, newPeeCamp._id, user.peeCampIds) })
                part.peeIds.push(user._id)
                oldPart.peeShertSize.set(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', calculate(oldPart.peeShertSize.get(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'), 0, 1))
                part.peeShertSize.set(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', calculate(part.peeShertSize.get(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'), 1, 0))
                await oldPart.updateOne({
                    peeShertManageIds: swop(shertManage._id, null, oldPart.peeShertManageIds),
                    peeIds: swop(user._id, null, oldPart.peeIds)
                })
                part.peeShertManageIds.push(shertManage._id)
                await shertManage.updateOne({ campModelId: newPeeCamp._id })
                part.peeHaveBottleMapIds.set(user.id, oldPart.peeHaveBottleMapIds.get(user.id))
                if (oldPart.peeHaveBottleMapIds.get(user.id)) {
                    await oldPart.updateOne({ peeHaveBottle: oldPart.peeHaveBottle - 1 })
                    await part.updateOne({ peeHaveBottle: part.peeHaveBottle + 1 })
                }
                oldPart.mapShertManageIdByUserId.delete(user.id)
                part.mapShertManageIdByUserId.set(user.id, shertManage._id)
                await newPeeCamp.updateOne({
                    peeShertManageIds: swop(null, shertManage._id, newPeeCamp.peeShertManageIds),
                    peeIds: swop(null, user._id, newPeeCamp.peeIds)
                })
                await oldPeeCamp.updateOne({
                    peeShertManageIds: swop(shertManage._id, null, oldPeeCamp.peeShertManageIds),
                    peeIds: swop(user._id, null, oldPeeCamp.peeIds)
                })
                break
            }
        }
    }
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
    return true
}
export async function getNongsFromBaanId(req: express.Request, res: express.Response, next: express.NextFunction) {
    const out: ShowMember[] = []
    const baan = await Baan.findById(req.params.id)
    if (!baan) {
        sendRes(res, false)
        return
    }
    var i = 0
    while (i < baan.nongIds.length) {
        const user: InterUser | null = await User.findById(baan.nongIds[i++])
        if (user) {
            const shertManage = await ShertManage.findById(baan.mapShertManageIdByUserId.get(user._id.toString()))
            if (!shertManage) {
                continue
            }
            var j = 0
            var likeSongs: string[] = []

            const {
                name,
                lastname,
                nickname,
                _id,
                email,
                tel,
                group,
                gender,
                studentId,
                helthIsueId,
                haveBottle,
                likeSongIds
            } = user
            while (j < likeSongIds.length) {
                const song = await Song.findById(likeSongs[j++])
                if (!song) {
                    continue
                }
                likeSongs.push(song.name as string)
            }
            var isWearing = false
            var spicy = false
            const helthIsue = await HelthIsue.findById(helthIsueId)
            if (helthIsue) {
                isWearing = helthIsue.isWearing
                spicy = helthIsue.spicy
            }
            out.push({
                name,
                nickname,
                lastname,
                _id,
                shertSize: shertManage.size,
                email,
                studentId,
                sleep: shertManage.sleepAtCamp,
                tel,
                gender,
                group,
                helthIsueId,
                haveBottle,
                likeSongs,
                isWearing,
                spicy
            })
        }
    }
    res.status(200).json(out)
}
export async function getPeesFromBaanId(req: express.Request, res: express.Response, next: express.NextFunction) {
    const out: ShowMember[] = []
    const baan = await Baan.findById(req.params.id)
    if (!baan) {
        sendRes(res, false)
        return
    }
    var i = 0
    while (i < baan.peeIds.length) {
        const user: InterUser | null = await User.findById(baan.peeIds[i++])
        if (user) {
            const shertManage = await ShertManage.findById(baan.mapShertManageIdByUserId.get(user._id.toString()))
            if (!shertManage) {
                continue
            }
            var j = 0
            var likeSongs: string[] = []

            const { name, lastname, nickname, _id, email, tel, group, gender, studentId, helthIsueId, haveBottle, likeSongIds } = user
            while (j < likeSongIds.length) {
                const song = await Song.findById(likeSongs[j++])
                if (!song) {
                    continue
                }
                likeSongs.push(song.name as string)


            }
            var isWearing = false
            var spicy = false
            const helthIsue = await HelthIsue.findById(helthIsueId)
            if (helthIsue) {
                isWearing = helthIsue.isWearing
                spicy = helthIsue.spicy
            }
            out.push({
                name,
                nickname,
                lastname,
                _id,
                shertSize: shertManage.size,
                email,
                studentId,
                sleep: shertManage.sleepAtCamp,
                tel,
                gender,
                group,
                helthIsueId,
                haveBottle,
                likeSongs,
                isWearing,
                spicy
            })
        }
    }
    res.status(200).json(out)
}
export async function getPeesFromPartId(req: express.Request, res: express.Response, next: express.NextFunction) {
    const out: ShowMember[] = []
    const part = await Part.findById(req.params.id)
    if (!part) {
        sendRes(res, false)
        return
    }
    var i = 0
    while (i < part.peeIds.length) {
        const user: InterUser | null = await User.findById(part.peeIds[i++])
        if (user) {
            const shertManage = await ShertManage.findById(part.mapShertManageIdByUserId.get(user._id.toString()))
            if (!shertManage) {
                continue
            }
            var j = 0
            var likeSongs: string[] = []

            const { name, lastname, nickname, _id, email, tel, group, gender, studentId, helthIsueId, haveBottle, likeSongIds } = user
            while (j < likeSongIds.length) {
                const song = await Song.findById(likeSongs[j++])
                if (!song) {
                    continue
                }
                likeSongs.push(song.name as string)


            }
            var isWearing = false
            var spicy = false
            const helthIsue = await HelthIsue.findById(helthIsueId)
            if (helthIsue) {
                isWearing = helthIsue.isWearing
                spicy = helthIsue.spicy
            }
            out.push({
                name,
                nickname,
                lastname,
                _id,
                shertSize: shertManage.size,
                email,
                studentId,
                sleep: shertManage.sleepAtCamp,
                tel,
                gender,
                group,
                helthIsueId,
                haveBottle,
                likeSongs,
                isWearing,
                spicy
            })
        }
    }
    res.status(200).json(out)
}
export async function getPetosFromPartId(req: express.Request, res: express.Response, next: express.NextFunction) {
    const out: ShowMember[] = []
    const part = await Part.findById(req.params.id)
    if (!part) {
        sendRes(res, false)
        return
    }
    var i = 0
    while (i < part.petoIds.length) {
        const user: InterUser | null = await User.findById(part.petoIds[i++])
        if (user) {
            const shertManage = await ShertManage.findById(part.mapShertManageIdByUserId.get(user._id.toString()))
            if (!shertManage) {
                continue
            }
            var j = 0
            var likeSongs: string[] = []

            const { name, lastname, nickname, _id, email, tel, group, gender, studentId, helthIsueId, haveBottle, likeSongIds } = user
            while (j < likeSongIds.length) {
                const song = await Song.findById(likeSongs[j++])
                if (!song) {
                    continue
                }
                likeSongs.push(song.name as string)
            }
            var isWearing = false
            var spicy = false
            const helthIsue = await HelthIsue.findById(helthIsueId)
            if (helthIsue) {
                isWearing = helthIsue.isWearing
                spicy = helthIsue.spicy
            }
            out.push({
                name,
                nickname,
                lastname,
                _id,
                shertSize: shertManage.size,
                email,
                studentId,
                sleep: shertManage.sleepAtCamp,
                tel,
                gender,
                group,
                helthIsueId,
                haveBottle,
                likeSongs,
                isWearing,
                spicy
            })
        }
    }
    res.status(200).json(out)
}
export async function getLinkRegister(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user = await getUser(req)
    const campId: string = req.params.id
    const camp = await Camp.findById(campId)
    if (!user || !camp) {
        sendRes(res, false)
        return
    }
    res.status(200).json({ link: camp.nongPendingIds.get(user.id) })
}
export async function getImpotentPartIdBCRP(campId: mongoose.Types.ObjectId) {
    const camp = await Camp.findById(campId)
    if (!camp) {
        return []
    }
    return [camp.partBoardId, camp.partCoopId, camp.partRegiterId, camp.partPeeBaanId] as mongoose.Types.ObjectId[]
}
export async function answerTheQuasion(req: express.Request, res: express.Response, next: express.NextFunction) {
    const answers: Answer[] = req.body
    var i = 0
    const user = await getUser(req)
    if (!user) {
        sendRes(res, false)
        return
    }

    while (i < answers.length) {
        const quasion = await ChoiseQuasion.findById(answers[i].quasionId)
        if (!quasion) {
            continue
        }
        if (quasion.mapAwnserIdByUserId.has(user._id.toString())) {
            const answer = await ChoiseAnswer.findByIdAndUpdate(quasion.mapAwnserIdByUserId.get(user._id.toString()), answers[i])
            if (answers[i].answer === quasion.correct) {
                await answer?.updateOne({ score: quasion.score })
            } else {
                await answer?.updateOne({ score: 0 })
            }
            i++

        } else {
            const choiseAnswer = await ChoiseAnswer.create(answers[i])
            await choiseAnswer.updateOne({ userId: user._id })
            const camp = await Camp.findById(answers[i++].campId)
            await camp?.updateOne({ choiseAnswerIds: swop(null, choiseAnswer._id, camp.choiseAnswerIds) })
            await user.updateOne({
                choiseAnswerIds: swop(null, choiseAnswer._id, user.choiseAnswerIds),
                quasionIds: swop(null, quasion._id, user.quasionIds)
            })
            await quasion.updateOne({ choiseAnswerIds: swop(null, choiseAnswer._id, quasion.choiseAnswerIds) })
            if (answers[i].answer === quasion.correct) {
                await choiseAnswer.updateOne({ score: quasion.score })
            } else {
                await choiseAnswer.updateOne({ score: 0 })
            }
        }
    }
    sendRes(res, true)
}
export async function createAllQuasion(req: express.Request, res: express.Response, next: express.NextFunction) {
    const create: CreateQuation[] = req.body
    var i = 0
    while (i < create.length) {
        const choiseQuasion = await ChoiseQuasion.create(create[i++])
        const camp = await Camp.findById(choiseQuasion.campId)
        await camp?.updateOne({ quasionIds: swop(null, choiseQuasion._id, camp.quasionIds) })
    }
    res.status(201).json(resOk)
}
export async function updateQuasion(req: express.Request, res: express.Response, next: express.NextFunction) {
    const { _id, a, b, c, d, e, quasion, correct, score }: EditQuation = req.body
    await ChoiseQuasion.findByIdAndUpdate(_id, { a, b, c, d, e, quasion, correct, score })
    res.status(200).json(resOk)
}