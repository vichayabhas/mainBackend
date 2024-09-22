import ActionPlan from "../models/ActionPlan";
import Baan from "../models/Baan";
import Camp from "../models/Camp";
import NongCamp from "../models/NongCamp";
import Part from "../models/Part";
import PeeCamp from "../models/PeeCamp";
import PetoCamp from "../models/PetoCamp";
import User from "../models/User";
import ShertManage from "../models/ShertManage";
import { calculate, conBaanBackToFront, conCampBackToFront, conPartBackToFront, ifIsTrue, mapObjectIdToMyMap, resError, resOk, sendRes, startSize, swop } from "./setup";
import PartNameContainer from "../models/PartNameContainer";
import NameContainer from "../models/NameContainer";
import express from "express";
import { getUser } from "../middleware/auth";
import { InterBaanBack, InterBaanFront, InterCampBack, InterCampFront, InterPartBack, InterUser, InterActionPlan, ShowMember, CreateActionPlan, showActionPlan, Answer, CreateQuation, EditQuation, CreateWorkingItem, InterWorkingItem, ShowRegister, MyMap, AllNongRegister } from "../models/intreface";
import mongoose from "mongoose";
import Song from "../models/Song";
import HelthIsue from "../models/HelthIsue";
import Place from "../models/Place";
import Building from "../models/Building";
import ChoiseAnswer from "../models/ChoiseAnswer";
import ChoiseQuasion from "../models/ChoiseQuasion";
import WorkItem from "../models/WorkItem";
import { deleteWorkingItemRaw } from "./admin";
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
// export async function addPeeRaw
// export async function addPeto
// export async function addPetoRaw
// export async function staffRegister
// export async function getActionPlanByPartId
// export async function createActionPlan
// export async function updateActionPlan
// export async function deleteActionPlan
// export async function getActionPlans
// export async function nongRegister
// export async function getCampName
// export async function getPartName
// export async function changeBaan
// export async function changeBaanRaw
// export async function changePart
// export async function changePartRaw
// export async function getNongsFromBaanId
// export async function getPeesFromBaanId
// export async function getPeesFromPartId
// export async function getPetosFromPartId
// export async function getLinkRegister
// export async function getImpotentPartIdBCRP
// export async function answerTheQuasion
// export async function createAllQuasion
// export async function updateQuasion
// export async function getActionPlan
// export async function getWorkingItemByPartId
// export async function createWorkingItem
// export async function updateWorkingItem
// export async function deleteWorkingItem
// export async function getWorkingItems
// export async function getWorkingItem
// export async function getShowRegisters
// export async function getAllUserCamp
// export async function getAllNongRegister
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
        //console.log('gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg')
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
            members
        }: {
            baanId: mongoose.Types.ObjectId,
            members: mongoose.Types.ObjectId[]
        } = req.body;
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
        const baanNongHaveBottleIds = baan.nongHaveBottleIds
        const campNongHaveBottleIds = camp.nongHaveBottleIds
        const size: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number> = startSize()
        var i = 0
        while (i < members.length) {
            count = count + 1
            const user = await User.findById(members[i++])
            if (!user) {
                continue
            }
            await nongCamp.updateOne({ nongIds: swop(null, user._id, nongCamp.nongIds) })
            await baan.updateOne({ nongIds: swop(null, user._id, baan.nongIds) })
            await camp.updateOne({ nongIds: swop(null, user._id, camp.nongIds) })
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
                sleepAtCamp,
                helthIshueId: user.helthIsueId,
            })
            nongCamp.nongShertManageIds.push(shertManage._id)
            baan.nongShertManageIds.push(shertManage._id)
            camp.nongShertManageIds.push(shertManage._id)
            user.shertManageIds.push(shertManage._id)
            newNongPassIds = swop(user._id, null, newNongPassIds)
            if (user.helthIsueId) {
                baan.nongHelthIsueIds.push(user.helthIsueId);
                camp.nongHelthIsueIds.push(user.helthIsueId);
                const helthIsue = await HelthIsue.findById(user.helthIsueId)
                baan.nongShertManageHaveHelthIshueIds.push(shertManage._id)
                camp.nongShertManageHaveHelthIshueIds.push(shertManage._id)
                if (helthIsue) {
                    await helthIsue.updateOne({
                        //nongCampIds: swop(null, nongCamp._id, helthIsue.nongCampIds),
                        shertManageIds: swop(null, shertManage._id, helthIsue.shertManageIds),
                    })
                }
            }
            const userSize = user.shertSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'
            size.set(userSize, size.get(userSize) as number + 1)
            ifIsTrue(user.haveBottle, user._id, baanNongHaveBottleIds)
            ifIsTrue(user.haveBottle, user._id, campNongHaveBottleIds)
            user.nongCampIds.push(nongCamp._id);
            camp.mapShertManageIdByUserId.set(user.id, shertManage._id)
            baan.mapShertManageIdByUserId.set(user.id, shertManage._id)//
            await baan.updateOne({ mapShertManageIdByUserId: baan.mapShertManageIdByUserId })
            await user.updateOne({ nongCampIds: user.nongCampIds, shertManageIds: user.shertManageIds })
        }
        size.forEach((v, k) => {
            camp.nongShertSize.set(k, camp.nongShertSize.get(k) as number + v)
            baan.nongShertSize.set(k, camp.nongShertSize.get(k) as number + v)
        })
        await camp.updateOne({
            nongSureIds: newNongPassIds,
            nongShertManageIds: camp.nongShertManageIds,
            nongShertSize: camp.nongShertSize,
            nongHelthIsueIds: camp.nongHelthIsueIds,
            nongIds: camp.nongIds,
            mapShertManageIdByUserId: camp.mapShertManageIdByUserId,
            nongSleepIds: camp.nongSleepIds,
            currentNong: camp.currentNong,
            nongShertManageHaveHelthIshueIds: camp.nongShertManageHaveHelthIshueIds,
            nongHaveBottleIds: campNongHaveBottleIds,
        })
        await baan.updateOne({
            nongShertManageIds: baan.nongShertManageIds,
            nongShertSize: baan.nongShertSize,
            nongHelthIsueIds: baan.nongHelthIsueIds,
            nongIds: baan.nongIds,//
            mapShertManageIdByUserId: baan.mapShertManageIdByUserId,
            nongSleepIds: baan.nongSleepIds,
            nongShertManageHaveHelthIshueIds: baan.nongShertManageHaveHelthIshueIds,
            nongHaveBottleIds: baanNongHaveBottleIds,
        })
        await nongCamp.updateOne({
            nongIds: nongCamp.nongIds,//
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
    const baan = await Baan.findById(baanId);
    if (!baan) {
        sendRes(res, false)
        return
    }
    const camp = await Camp.findById(baan.campId);
    if (!camp) {
        sendRes(res, false)
        return false
    }
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
        if (part.isAuth) {
            await user.updateOne({ authPartIds: swop(null, part._id, user.authPartIds) })
        }
    }
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
        const baanPeeHaveBottleIds = baan.peeHaveBottleIds
        const campPeeHaveBottleIds = camp.peeHaveBottleIds
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
                    sleepAtCamp = user.likeToSleepAtCamp
                    break
                }
                case 'ไม่มีการค้างคืน': sleepAtCamp = false
            }
            if (sleepAtCamp) {
                camp.peeSleepIds.push(user._id)
                baan.peeSleepIds.push(user._id)
                part.peeSleepIds.push(user._id)
            }
            camp.peeMapIdGtoL.set(user._id.toString(), camp.currentPee + 1)
            camp.peeMapIdLtoG.set((camp.currentPee + 1).toString(), user._id)
            await camp.updateOne({ peeMapIdGtoL: camp.peeMapIdGtoL, peeMapIdLtoG: camp.peeMapIdLtoG })
            const shertManage = await ShertManage.create({
                userId: user._id,
                size: user.shertSize,
                campModelId: peeCamp._id,
                recive: 'baan',
                role: 'pee',
                haveBottle: user.haveBottle,
                sleepAtCamp,
                helthIshueId: user.helthIsueId,
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
                const helthIsue = await HelthIsue.findById(user.helthIsueId)
                if (helthIsue) {
                    await helthIsue.updateOne({
                        //peeCampIds: swop(null, peeCamp._id, helthIsue.peeCampIds),
                        shertManageIds: swop(null, shertManage._id, helthIsue.shertManageIds)
                    })
                    baan.peeShertManageHaveHelthIshueIds.push(shertManage._id)
                    part.peeShertManageHaveHelthIshueIds.push(shertManage._id)
                    camp.peeShertManageHaveHelthIshueIds.push(shertManage._id)
                }
            }
            const userSize = user.shertSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'
            part.peeShertSize.set(userSize, part.peeShertSize.get(userSize) as number + 1);
            size.set(userSize, size.get(userSize) as number + 1)
            ifIsTrue(user.haveBottle, user._id, baanPeeHaveBottleIds)
            ifIsTrue(user.haveBottle, user._id, campPeeHaveBottleIds)
            await part.updateOne({ peeHaveBottleIds: ifIsTrue(user.haveBottle, user._id, part.peeHaveBottleIds) })
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
            if (part.isAuth) {
                await user.updateOne({
                    authPartIds: swop(null, part._id, user.authPartIds)
                })
            }
            await user.updateOne({
                peeCampIds: user.peeCampIds,
                shertManageIds: user.shertManageIds,
                registerIds: user.registerIds
            })
            await part.updateOne({
                mapShertManageIdByUserId: part.mapShertManageIdByUserId,
                peeHelthIsueIds: part.peeHelthIsueIds,
                peeIds: part.peeIds,
                peeShertManageIds: part.peeShertManageIds,
                peeShertSize: part.peeShertSize,
                peeShertManageHaveHelthIshueIds: part.peeShertManageHaveHelthIshueIds,
            })
        }
        size.forEach((v, k) => {
            camp.peeShertSize.set(k, camp.peeShertSize.get(k) as number + v)
            baan.peeShertSize.set(k, baan.peeShertSize.get(k) as number + v)
        })
        await camp.updateOne({
            peeShertManageIds: camp.peeShertManageIds,
            peeShertSize: camp.peeShertSize,
            peeIds: camp.peeIds,
            peeHelthIsueIds: camp.peeHelthIsueIds,
            peePassIds: camp.peePassIds,
            mapShertManageIdByUserId: camp.mapShertManageIdByUserId,
            peeSleepIds: camp.peeSleepIds,
            currentPee: camp.currentPee,
            peeShertManageHaveHelthIshueIds: camp.peeShertManageHaveHelthIshueIds,
            peeHaveBottleIds: campPeeHaveBottleIds,
        })
        await baan.updateOne({
            peeHelthIsueIds: baan.peeHelthIsueIds,
            peeIds: baan.peeIds,
            peeShertManageIds: baan.peeShertManageIds,
            mapShertManageIdByUserId: baan.mapShertManageIdByUserId,
            peeShertSize: baan.peeShertSize,
            peeSleepIds: baan.peeSleepIds,
            peeShertManageHaveHelthIshueIds: baan.peeShertManageHaveHelthIshueIds,
            peeHaveBottleIds: baanPeeHaveBottleIds,
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
    const campPetoHaveBottleIds = camp.petoHaveBottleIds
    const partPetoHaveBottleIds = part.petoHaveBottleIds
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
        camp.peeMapIdGtoL.set(user._id.toString(), camp.currentPee + 1)
        camp.peeMapIdLtoG.set((camp.currentPee + 1).toString(), user._id)
        await camp.updateOne({ peeMapIdGtoL: camp.peeMapIdGtoL, peeMapIdLtoG: camp.peeMapIdLtoG })
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
            case 'ไม่มีการค้างคืน': {
                sleepAtCamp = false
                break
            }
        }
        if (sleepAtCamp) {
            camp.petoSleepIds.push(user._id)
            part.petoSleepIds.push(user._id)
        }
        const shertManage = await ShertManage.create({
            userId: user._id,
            size: user.shertSize,
            campModelId: petoCamp._id,
            recive: 'part',
            role: 'peto',
            haveBottle: user.haveBottle,
            sleepAtCamp,
            helthIshueId: user.helthIsueId,
        })
        petoCamp.petoShertManageIds.push(shertManage._id)
        part.petoShertManageIds.push(shertManage._id)
        camp.petoShertManageIds.push(shertManage._id)
        user.shertManageIds.push(shertManage._id)
        if (user.helthIsueId) {
            part.petoHelthIsueIds.push(user.helthIsueId);
            camp.petoHelthIsueIds.push(user.helthIsueId);
            const helthIsue = await HelthIsue.findById(user.helthIsueId)
            if (helthIsue) {
                await helthIsue.updateOne({
                    //petoCampIds: swop(null, petoCamp._id, helthIsue.petoCampIds),
                    shertManageIds: swop(null, shertManage._id, helthIsue.shertManageIds)
                })
                part.petoShertManageHaveHelthIshueIds.push(shertManage._id)
                camp.petoShertManageHaveHelthIshueIds.push(shertManage._id)
            }
        }
        const userSize = user.shertSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'
        size.set(userSize, size.get(userSize) as number + 1)
        ifIsTrue(user.haveBottle, user._id, partPetoHaveBottleIds)
        ifIsTrue(user.haveBottle, user._id, campPetoHaveBottleIds)
        if (part.isAuth) {
            await user.updateOne({
                authPartIds: swop(null, part._id, user.authPartIds)
            })
        }
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
        petoHelthIsueIds: camp.petoHelthIsueIds,
        petoIds: camp.petoIds,
        petoShertManageIds: camp.petoShertManageIds,
        petoShertSize: camp.petoShertSize,
        mapShertManageIdByUserId: camp.mapShertManageIdByUserId,
        petoSleepIds: camp.petoSleepIds,
        petoShertManageHaveHelthIshueIds: camp.petoShertManageHaveHelthIshueIds,
        petoHaveBottleIds: campPetoHaveBottleIds,
    })
    await part.updateOne({
        petoHelthIsueIds: part.petoHelthIsueIds,
        petoIds: part.petoIds,
        petoShertManageIds: part.petoShertManageIds,
        petoShertSize: part.petoShertSize,
        mapShertManageIdByUserId: part.mapShertManageIdByUserId,
        petoSleepIds: part.petoSleepIds,
        petoShertManageHaveHelthIshueIds: part.petoShertManageHaveHelthIshueIds,
        petoHaveBottleIds: partPetoHaveBottleIds,
    })
    sendRes(res, true)
}
export async function staffRegister(req: express.Request, res: express.Response, next: express.NextFunction) {
    const partId = new mongoose.Types.ObjectId(req.params.id)
    const part = await Part.findById(partId)
    const user = await getUser(req)
    if (!user || !part) {
        sendRes(res, false)
        return
    }
    const camp = await Camp.findById(part.campId)
    if (!camp) {
        sendRes(res, false)
        return

    }
    const impotantParts = await getImpotentPartIdBCRP(camp._id)
    if (user.role === 'pee' || camp.memberStructre != 'nong->highSchool,pee->1year,peto->2upYear') {
        camp.peePassIds.set(user.id, partId)
        await camp.updateOne({ peePassIds: camp.peePassIds })
        res.status(200).json({
            success: true
        })
    } else {
        if (impotantParts.includes(part._id) && !part._id.equals(impotantParts[3])) {
            await user.updateOne({ authPartIds: swop(null, part._id, user.authPartIds) })
        }
        await addPetoRaw([user._id], part._id, res);
    }
}
export async function getActionPlanByPartId(req: express.Request, res: express.Response, next: express.NextFunction) {
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
    const create: CreateActionPlan = req.body
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
        const hospital = await ActionPlan.findById(req.params.id);
        if (!hospital) {
            sendRes(res, false)
            return
        }
        var i = 0
        while (i < hospital.placeIds.length) {
            const place = await Place.findById(hospital.placeIds[i++])
            const building = await Building.findById(place?.buildingId)
            await place?.updateOne({ actionPlanIds: swop(hospital._id, null, place.actionPlanIds) })
            await building?.updateOne({ actionPlanIds: swop(hospital._id, null, building.actionPlanIds) })
        }
        await hospital?.updateOne(req.body)
        while (i < hospital.placeIds.length) {
            const place = await Place.findById(hospital.placeIds[i++])
            const building = await Building.findById(place?.buildingId)
            await place?.updateOne({ actionPlanIds: swop(null, hospital._id, place.actionPlanIds) })
            await building?.updateOne({ actionPlanIds: swop(null, hospital._id, building.actionPlanIds) })
        }
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
        const camp = await Camp.findById(part.campId)
        await camp?.updateOne({ actionPlanIds: swop(hospital._id, null, camp.actionPlanIds) })
        var i = 0
        while (i < hospital.placeIds.length) {
            const place = await Place.findById(hospital.placeIds[i++])
            const building = await Building.findById(place?.buildingId)
            await place?.updateOne({ actionPlanIds: swop(hospital._id, null, place.actionPlanIds) })
            await building?.updateOne({ actionPlanIds: swop(hospital._id, null, building.actionPlanIds) })
        }

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
        camp.nongMapIdGtoL.set(nong._id.toString(), camp.currentNong + 1)
        camp.nongMapIdLtoG.set((camp.currentNong + 1).toString(), nong._id)
        camp.nongPendingIds.set(nong.id, link)
        await camp.updateOne({
            nongPendingIds: camp.nongPendingIds,
            currentNong: camp.currentNong + 1,
            nongMapIdGtoL: camp.nongMapIdGtoL,
            nongMapIdLtoG: camp.nongMapIdLtoG,
        })
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
                if (!oldBaan || oldBaan._id.equals(baan._id)) {
                    continue
                }
                await user.updateOne({ nongCampIds: swop(oldNongCamp._id, newNongCamp._id, user.nongCampIds) })
                oldBaan.nongShertSize.set(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', calculate(oldBaan.nongShertSize.get(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'), 0, 1))
                oldBaan.mapShertManageIdByUserId.delete(user.id)
                await oldBaan.updateOne({
                    nongShertManageIds: swop(shertManage._id, null, oldBaan.nongShertManageIds),
                    nongIds: swop(user._id, null, oldBaan.nongIds),
                    mapShertManageIdByUserId: oldBaan.mapShertManageIdByUserId,
                    nongShertSize: oldBaan.nongShertSize
                })
                baan.nongShertSize.set(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', calculate(baan.nongShertSize.get(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'), 1, 0))
                baan.nongIds.push(user._id)
                baan.nongShertManageIds.push(shertManage._id)
                await shertManage.updateOne({ campModelId: newNongCamp._id })
                if (oldBaan.nongHaveBottleIds.includes(user._id)) {
                    await oldBaan.updateOne({ nongHaveBottleIds: swop(user._id, null, oldBaan.nongHaveBottleIds) })
                    baan.nongHaveBottleIds.push(user._id)
                }
                baan.mapShertManageIdByUserId.set(user?.id, shertManage._id)
                await oldNongCamp.updateOne({
                    nongIds: swop(user._id, null, oldNongCamp.nongIds),
                    nongShertManageIds: swop(shertManage._id, null, oldNongCamp.nongShertManageIds)
                })
                if (shertManage.helthIshueId) {
                    await oldBaan.updateOne({
                        nongHelthIsueIds: swop(shertManage.helthIshueId, null, oldBaan.nongHelthIsueIds),
                        nongShertManageHaveHelthIshueIds: swop(shertManage._id, null, oldBaan.nongShertManageHaveHelthIshueIds),
                    })
                    baan.nongShertManageHaveHelthIshueIds.push(shertManage._id)
                    baan.nongHelthIsueIds.push(shertManage.helthIshueId)
                }
                if (shertManage.sleepAtCamp) {
                    await oldBaan.updateOne({ peeSleepIds: swop(user._id, null, oldBaan.nongSleepIds) })
                    await baan.updateOne({ peeSleepIds: swop(null, user._id, baan.nongSleepIds) })
                }
                newNongCamp.nongIds.push(user._id)
                await baan.updateOne({
                    mapShertManageIdByUserId: baan.mapShertManageIdByUserId,
                    nongHelthIsueIds: baan.nongHelthIsueIds,
                    nongIds: (baan.nongIds),
                    nongShertManageIds: baan.nongShertManageIds,
                    nongShertSize: baan.nongShertSize,
                    nongShertManageHaveHelthIshueIds: baan.nongShertManageHaveHelthIshueIds,
                    nongHaveBottleIds: baan.nongHaveBottleIds,
                })
                await newNongCamp.updateOne({
                    nongIds: newNongCamp.nongIds,
                    nongShertManageIds: newNongCamp.nongShertManageIds
                })
                break
            }
            case 'pee': {
                const oldPeeCamp = await PeeCamp.findById(shertManage.campModelId)
                if (!oldPeeCamp) {
                    continue
                }
                const oldBaan = await Baan.findById(oldPeeCamp.baanId)
                if (!oldBaan || oldBaan._id.equals(baan._id)) {
                    continue
                }
                const newPeeCamp = await PeeCamp.findById(baan.mapPeeCampIdByPartId.get(oldPeeCamp.partId?.toString() as string))
                if (!newPeeCamp) {
                    continue
                }
                await user.updateOne({ peeCampIds: swop(oldPeeCamp._id, newPeeCamp._id, user.peeCampIds) })
                oldBaan.peeShertSize.set(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', calculate(oldBaan.peeShertSize.get(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'), 0, 1))
                await oldBaan.updateOne({
                    peeShertManageIds: swop(shertManage._id, null, oldBaan.peeShertManageIds),
                    peeIds: swop(user._id, null, oldBaan.peeIds),
                    peeShertSize: oldBaan.peeShertSize,
                })
                baan.peeShertSize.set(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', calculate(baan.peeShertSize.get(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'), 1, 0))
                baan.peeIds.push(user._id)
                baan.peeShertManageIds.push(shertManage._id)
                await shertManage.updateOne({ campModelId: newPeeCamp._id })
                if (oldBaan.peeHaveBottleIds.includes(user._id)) {
                    await oldBaan.updateOne({ peeHaveBottleIds: swop(user._id, null, oldBaan.peeHaveBottleIds) })
                    baan.peeHaveBottleIds.push(user._id)
                }
                oldBaan?.mapShertManageIdByUserId.delete(user.id)
                baan.mapShertManageIdByUserId.set(user.id, shertManage._id)
                if (shertManage.helthIshueId) {
                    await oldBaan.updateOne({
                        peeHelthIsueIds: swop(shertManage.helthIshueId, null, oldBaan.peeHelthIsueIds),
                        peeShertManageHaveHelthIshueIds: swop(shertManage._id, null, oldBaan.peeShertManageHaveHelthIshueIds)
                    })
                    baan.peeHelthIsueIds.push(shertManage.helthIshueId)
                    baan.peeShertManageHaveHelthIshueIds.push(shertManage._id)
                }
                if (shertManage.sleepAtCamp) {
                    await oldBaan.updateOne({ peeSleepIds: swop(user._id, null, oldBaan.peeSleepIds) })
                    await baan.updateOne({ peeSleepIds: swop(null, user._id, baan.peeSleepIds) })
                }
                await newPeeCamp.updateOne({
                    peeShertManageIds: swop(null, shertManage._id, newPeeCamp.peeShertManageIds),
                    peeIds: swop(null, user._id, newPeeCamp.peeIds)
                })
                await oldPeeCamp.updateOne({
                    peeShertManageIds: swop(shertManage._id, null, oldPeeCamp.peeShertManageIds),
                    peeIds: swop(user._id, null, oldPeeCamp.peeIds)
                })
                await baan.updateOne({
                    peeHelthIsueIds: baan.peeHelthIsueIds,
                    mapShertManageIdByUserId: baan.mapShertManageIdByUserId,
                    peeIds: (baan.peeIds),
                    peeShertManageIds: baan.peeShertManageIds,
                    peeShertSize: baan.peeShertSize,
                    peeShertManageHaveHelthIshueIds: baan.peeShertManageHaveHelthIshueIds,
                    peeHaveBottleIds: baan.peeHaveBottleIds,
                })
                break
            }
        }
    }
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
                if (!oldPart || oldPart._id.equals(part._id)) {
                    continue
                }
                await user.updateOne({ peeCampIds: swop(oldPetoCamp._id, newPetoCamp._id, user.petoCampIds) })
                oldPart.petoShertSize.set(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', calculate(oldPart.peeShertSize.get(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'), 0, 1))
                oldPart.mapShertManageIdByUserId.delete(user?.id)
                await oldPart.updateOne({
                    petoShertManageIds: swop(shertManage._id, null, oldPart.petoShertManageIds),/////////////
                    petoIds: swop(user._id, null, oldPart.petoIds),
                    mapShertManageIdByUserId: oldPart.mapShertManageIdByUserId,
                    petoShertSize: oldPart.petoShertSize
                })
                part.petoIds.push(user._id)
                part.petoShertSize.set(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', calculate(part.petoShertSize.get(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'), 1, 0))
                part.petoShertManageIds.push(shertManage._id)
                await shertManage.updateOne({ campModelId: newPetoCamp._id })
                if (oldPart.petoHaveBottleIds.includes(user._id)) {
                    await oldPart.updateOne({ petoHaveBottleIds: swop(user._id, null, oldPart.petoHaveBottleIds) })
                    part.petoHaveBottleIds.push(user._id)
                }
                part.mapShertManageIdByUserId.set(user.id, shertManage._id)
                await oldPetoCamp.updateOne({
                    petoIds: swop(user._id, null, oldPetoCamp.petoIds),
                    petoShertManageIds: swop(shertManage._id, null, oldPetoCamp.petoShertManageIds)
                })
                if (shertManage.helthIshueId) {
                    await oldPart.updateOne({
                        petoHelthIsueIds: swop(shertManage.helthIshueId, null, oldPart.petoHelthIsueIds),
                        petoShertManageHaveHelthIshueIds: swop(shertManage._id, null, oldPart.petoShertManageHaveHelthIshueIds)
                    })
                    part.petoShertManageHaveHelthIshueIds.push(shertManage._id)
                    part.petoHelthIsueIds.push(shertManage.helthIshueId)
                }
                if (shertManage.sleepAtCamp) {
                    await oldPart.updateOne({ petoSleepIds: swop(user._id, null, oldPart.petoSleepIds) })
                    await part.updateOne({ petoSleepIds: swop(null, user._id, part.petoSleepIds) })
                }
                if (oldPart.isAuth) {
                    await user.updateOne({ authPartIds: swop(oldPart._id, null, user.authPartIds) })
                }
                if (part.isAuth) {
                    await user.updateOne({ authPartIds: swop(null, oldPart._id, user.authPartIds) })
                }
                newPetoCamp.petoIds.push(user._id)
                await newPetoCamp.updateOne({ petoIds: newPetoCamp.petoIds, petoShertManageIds: newPetoCamp.petoShertManageIds })
                await part.updateOne({
                    mapShertManageIdByUserId: part.mapShertManageIdByUserId,
                    petoHelthIsueIds: part.petoHelthIsueIds,
                    petoIds: (part.petoIds),
                    petoShertManageIds: part.petoShertManageIds,
                    petoShertManageHaveHelthIshueIds: part.petoShertManageHaveHelthIshueIds,
                    petoHaveBottleIds: part.petoHaveBottleIds,
                })
                break
            }
            case 'pee': {
                const oldPeeCamp = await PeeCamp.findById(shertManage.campModelId)
                if (!oldPeeCamp) {
                    continue
                }
                const oldPart = await Part.findById(oldPeeCamp.partId)
                if (!oldPart || oldPart._id.equals(part._id)) {
                    continue
                }
                const newPeeCamp = await PeeCamp.findById(part.mapPeeCampIdByBaanId.get(oldPeeCamp.baanId?.toString() as string))
                if (!newPeeCamp) {
                    continue
                }
                await user.updateOne({ peeCampIds: swop(oldPeeCamp._id, newPeeCamp._id, user.peeCampIds) })
                oldPart.peeShertSize.set(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', calculate(oldPart.peeShertSize.get(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'), 0, 1))
                await oldPart.updateOne({
                    peeShertManageIds: swop(shertManage._id, null, oldPart.peeShertManageIds),
                    peeIds: swop(user._id, null, oldPart.peeIds),
                    peeShertSize: oldPart.peeShertSize
                })
                part.peeIds.push(user._id)
                part.peeShertSize.set(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', calculate(part.peeShertSize.get(shertManage.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'), 1, 0))
                part.peeShertManageIds.push(shertManage._id)
                await shertManage.updateOne({ campModelId: newPeeCamp._id })
                if (oldPart.peeHaveBottleIds.includes(user._id)) {
                    await oldPart.updateOne({ peeHaveBottleIds: swop(user._id, null, oldPart.peeHaveBottleIds) })
                    part.peeHaveBottleIds.push(user._id)
                }
                oldPart.mapShertManageIdByUserId.delete(user.id)
                part.mapShertManageIdByUserId.set(user.id, shertManage._id)
                if (shertManage.helthIshueId) {
                    await oldPart.updateOne({
                        peeHelthIsueIds: swop(shertManage.helthIshueId, null, oldPart.peeHelthIsueIds),
                        peeShertManageHaveHelthIshueIds: swop(shertManage._id, null, oldPart.peeShertManageHaveHelthIshueIds)
                    })
                    part.peeHelthIsueIds.push(shertManage.helthIshueId)
                    part.peeShertManageHaveHelthIshueIds.push(shertManage._id)
                }
                if (shertManage.sleepAtCamp) {
                    await oldPart.updateOne({ peeSleepIds: swop(user._id, null, oldPart.peeSleepIds) })
                    await part.updateOne({ peeSleepIds: swop(null, user._id, part.peeSleepIds) })
                }
                if (oldPart.isAuth) {
                    await user.updateOne({ authPartIds: swop(oldPart._id, null, user.authPartIds) })
                }
                if (part.isAuth) {
                    await user.updateOne({ authPartIds: swop(null, oldPart._id, user.authPartIds) })
                }
                await newPeeCamp.updateOne({
                    peeShertManageIds: swop(null, shertManage._id, newPeeCamp.peeShertManageIds),
                    peeIds: swop(null, user._id, newPeeCamp.peeIds)
                })
                await oldPeeCamp.updateOne({
                    peeShertManageIds: swop(shertManage._id, null, oldPeeCamp.peeShertManageIds),
                    peeIds: swop(user._id, null, oldPeeCamp.peeIds)
                })
                await part.updateOne({
                    peeHelthIsueIds: part.peeHelthIsueIds,
                    mapShertManageIdByUserId: part.mapShertManageIdByUserId,
                    peeIds: (part.peeIds),
                    peeShertManageIds: part.peeShertManageIds,
                    peeShertSize: part.peeShertSize,
                    peeShertManageHaveHelthIshueIds: part.peeShertManageHaveHelthIshueIds,
                    peeHaveBottleIds: part.peeHaveBottleIds,
                })
                break
            }
        }
    }
    return true
}
export async function getNongsFromBaanId(req: express.Request, res: express.Response, next: express.NextFunction) {
    const out: ShowMember[] = []
    const baan = await Baan.findById(req.params.id)
    if (!baan) {
        sendRes(res, false)
        return
    }
    const camp = await Camp.findById(baan.campId)
    if (!camp) {
        sendRes(res, false)
        return
    }
    var i = 0
    while (i < baan.nongShertManageIds.length) {
        const shertManage = await ShertManage.findById(baan.nongShertManageIds[i++])
        if (!shertManage) {
            continue
        }
        const user = await User.findById(shertManage.userId)
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
            likeSongIds
        } = user
        while (j < likeSongIds.length) {
            const song = await Song.findById(likeSongs[j++])
            if (!song) {
                continue
            }
            likeSongs.push(song.name)
        }
        var isWearing = false
        var spicy = false
        const helthIsue = await HelthIsue.findById(shertManage.helthIshueId)
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
            helthIsueId: shertManage.helthIshueId,
            haveBottle: shertManage.haveBottle,
            likeSongs,
            isWearing,
            spicy,
            id: camp.nongMapIdGtoL.get(_id.toString()) as number
        })
    }
    console.log(out)
    res.status(200).json(out)
}
export async function getPeesFromBaanId(req: express.Request, res: express.Response, next: express.NextFunction) {
    const out: ShowMember[] = []
    const baan = await Baan.findById(req.params.id)
    if (!baan) {
        sendRes(res, false)
        return
    }
    const camp = await Camp.findById(baan.campId)
    if (!camp) {
        sendRes(res, false)
        return
    }
    var i = 0
    while (i < baan.peeShertManageHaveHelthIshueIds.length) {
        const shertManage = await ShertManage.findById(baan.peeShertManageHaveHelthIshueIds[i++])
        if (!shertManage) {
            continue
        }
        const user = await User.findById(shertManage.userId)
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
            likeSongIds
        } = user
        while (j < likeSongIds.length) {
            const song = await Song.findById(likeSongs[j++])
            if (!song) {
                continue
            }
            likeSongs.push(song.name)
        }
        var isWearing = false
        var spicy = false
        const helthIsue = await HelthIsue.findById(shertManage.helthIshueId)
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
            helthIsueId: shertManage.helthIshueId,
            haveBottle: shertManage.haveBottle,
            likeSongs,
            isWearing,
            spicy,
            id: camp.peeMapIdGtoL.get(_id.toString()) as number
        })
    }
    console.log(out)
    res.status(200).json(out)
}
export async function getPeesFromPartId(req: express.Request, res: express.Response, next: express.NextFunction) {
    const out: ShowMember[] = []
    const part = await Part.findById(req.params.id)
    if (!part) {
        sendRes(res, false)
        return
    }
    const camp = await Camp.findById(part.campId)
    if (!camp) {
        sendRes(res, false)
        return
    }
    var i = 0
    while (i < part.peeShertManageHaveHelthIshueIds.length) {
        const shertManage = await ShertManage.findById(part.peeShertManageHaveHelthIshueIds[i++])
        if (!shertManage) {
            continue
        }
        const user = await User.findById(shertManage.userId)
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
            likeSongIds
        } = user
        while (j < likeSongIds.length) {
            const song = await Song.findById(likeSongs[j++])
            if (!song) {
                continue
            }
            likeSongs.push(song.name)
        }
        var isWearing = false
        var spicy = false
        const helthIsue = await HelthIsue.findById(shertManage.helthIshueId)
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
            helthIsueId: shertManage.helthIshueId,
            haveBottle: shertManage.haveBottle,
            likeSongs,
            isWearing,
            spicy,
            id: camp.peeMapIdGtoL.get(_id.toString()) as number
        })
    }
    console.log(out)
    res.status(200).json(out)
}
export async function getPetosFromPartId(req: express.Request, res: express.Response, next: express.NextFunction) {
    const out: ShowMember[] = []
    const part = await Part.findById(req.params.id)
    if (!part) {
        sendRes(res, false)
        return
    }
    const camp = await Camp.findById(part.campId)
    if (!camp) {
        sendRes(res, false)
        return
    }
    var i = 0
    while (i < part.petoShertManageHaveHelthIshueIds.length) {
        const shertManage = await ShertManage.findById(part.petoShertManageHaveHelthIshueIds[i++])
        if (!shertManage) {
            continue
        }
        const user = await User.findById(shertManage.userId)
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
            likeSongIds
        } = user
        while (j < likeSongIds.length) {
            const song = await Song.findById(likeSongs[j++])
            if (!song) {
                continue
            }
            likeSongs.push(song.name)
        }
        var isWearing = false
        var spicy = false
        const helthIsue = await HelthIsue.findById(shertManage.helthIshueId)
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
            helthIsueId: shertManage.helthIshueId,
            haveBottle: shertManage.haveBottle,
            likeSongs,
            isWearing,
            spicy,
            id: camp.peeMapIdGtoL.get(_id.toString()) as number
        })
    }
    console.log(out)
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
    return [camp.partBoardId, camp.partCoopId, camp.partRegiterId, camp.partPeeBaanId, camp.partWelfairId, camp.partMedId, camp.partPlanId] as mongoose.Types.ObjectId[]
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
export async function getActionPlan(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const actionPlan: InterActionPlan | null = await ActionPlan.findById(req.params.id)
        if (!actionPlan) {
            sendRes(res, false)
            return
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
        const show: showActionPlan = ({
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
        res.status(200).json(show)
    } catch (err) {
        console.log(err)
    }
}
export async function getWorkingItemByPartId(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const part = await Part.findById(req.params.id)
        var data: InterWorkingItem[] = [];
        if (!part) {
            sendRes(res, false)
            return
        }
        var j = 0
        while (j < part.workItemIds.length) {
            const workItem: InterWorkingItem | null = await WorkItem.findById(part.workItemIds[j++])
            if (!workItem) {
                continue
            }
            data.push(workItem)
        }
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
    }
}
export async function createWorkingItem(req: express.Request, res: express.Response, next: express.NextFunction) {
    const create: CreateWorkingItem = req.body
    const hospital = await WorkItem.create(create);
    const user = await getUser(req)
    const part = await Part.findById(create.partId)
    const camp = await Camp.findById(part?.campId)
    await part?.updateOne({ workItemIds: swop(null, hospital._id, part.workItemIds) })
    await camp?.updateOne({ workItemIds: swop(null, hospital._id, camp.workItemIds) })
    await hospital.updateOne({ partName: part?.partName })
    if (create.fromId) {
        const from = await WorkItem.findById(create.fromId)
        await from?.updateOne({ linkOutIds: swop(null, hospital._id, from.linkOutIds) })
    }
    await hospital.updateOne({ createBy: user?._id, partName: part?.partName })
    var i = 0
    res.status(200).json(hospital);
}
export async function updateWorkingItem(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const { status, link, name } = req.body

        const hospital = await WorkItem.findById(req.params.id);
        if (!hospital) {
            sendRes(res, false)
            return
        }
        await hospital.updateOne({ status, link, name })
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
export async function deleteWorkingItem(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        await deleteWorkingItemRaw(new mongoose.Types.ObjectId(req.params.id))
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
export async function getWorkingItems(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        var data: InterWorkingItem[] = [];
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
                while (j < camp.workItemIds.length) {
                    const workItem: InterWorkingItem | null = await WorkItem.findById(camp.workItemIds[j++])
                    if (!workItem) {
                        continue
                    }
                    data.push(workItem)
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
                while (j < camp.workItemIds.length) {
                    const workItem: InterWorkingItem | null = await WorkItem.findById(camp.workItemIds[j++])
                    if (!workItem) {
                        continue
                    }
                    data.push(workItem)
                }
            }
        }
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
}
export async function getWorkingItem(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
        const workItem: InterWorkingItem | null = await WorkItem.findById(req.params.id)
        if (!workItem) {
            sendRes(res, false)
            return
        }
        res.status(200).json(workItem)
    } catch (err) {
        console.log(err)
    }
}
export async function getShowRegisters(req: express.Request, res: express.Response, next: express.NextFunction) {
    const camp: InterCampBack | null = await Camp.findById(req.params.id)
    if (!camp) {
        sendRes(res, false)
        return
    }
    const bufs = mapObjectIdToMyMap(camp.peePassIds)
    var i = 0
    const out: ShowRegister[] = []
    while (i < bufs.length) {
        const user = await User.findById(bufs[i].key)
        const part = await Part.findById(bufs[i++].value)
        if (!user || !part) {
            continue
        }
        out.push({
            fullName: `ชื่อจริง ${user.name} นามสกุล ${user.lastname} ชื่อเล่น ${user.nickname}`,
            userId: user._id,
            partId: part._id,
            partName: part.partName as string
        })
    }
    res.status(200).json(out)
}
export async function getAllUserCamp(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user = await getUser(req)
    var out: MyMap[] = []
    if (!user) {
        sendRes(res, false)
        return
    }
    var i = 0
    while (i < user.nongCampIds.length) {
        const nongCamp = await NongCamp.findById(user.nongCampIds[i++])
        if (!nongCamp) {
            continue
        }
        const camp = await Camp.findById(nongCamp.campId)
        if (!camp) {
            continue
        }
        out.push({ key: camp._id, value: camp.campName })
    }
    i = 0
    while (i < user.peeCampIds.length) {
        const peeCamp = await PeeCamp.findById(user.peeCampIds[i++])
        if (!peeCamp) {
            continue
        }
        const camp = await Camp.findById(peeCamp.campId)
        if (!camp) {
            continue
        }
        out.push({ key: camp._id, value: camp.campName })
    }
    i = 0
    while (i < user.petoCampIds.length) {
        const petoCamp = await PetoCamp.findById(user.petoCampIds[i++])
        if (!petoCamp) {
            continue
        }
        const camp = await Camp.findById(petoCamp.campId)
        if (!camp) {
            continue
        }
        out.push({ key: camp._id, value: camp.campName })
    }
    res.status(200).json(out)
}
export async function getAllNongRegister(req: express.Request, res: express.Response, next: express.NextFunction) {
    const camp: InterCampBack | null = await Camp.findById(req.params.id)
    if (!camp) {
        sendRes(res, false)
        return
    }
    const { interviews, pendings, passs, paids, sures }: AllNongRegister = { interviews: [], pendings: [], passs: [], paids: [], sures: [] }
    camp.nongPendingIds.forEach((link, generalId) => {
        pendings.push({ link, generalId, localId: camp.nongMapIdGtoL.get(generalId).toString() })
    })
    camp.nongInterviewIds.forEach((link, generalId) => {
        interviews.push({ link, generalId, localId: camp.nongMapIdGtoL.get(generalId).toString() })
    })
    camp.nongPassIds.forEach((link, generalId) => {
        passs.push({ link, generalId, localId: camp.nongMapIdGtoL.get(generalId).toString() })
    })
    camp.nongPaidIds.forEach((generalId) => {
        paids.push({ link: camp.nongPassIds.get(generalId).toString(), generalId, localId: camp.nongMapIdGtoL.get(generalId).toString() })
    })
    camp.nongSureIds.forEach((generalId) => {
        sures.push({ link: '', generalId, localId: camp.nongMapIdGtoL.get(generalId).toString() })
    })
    const out: AllNongRegister = { interviews, pendings, passs, paids, sures }
    res.status(200).json(out)
}