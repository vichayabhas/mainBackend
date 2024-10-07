import ActionPlan from "../models/ActionPlan";
import Baan from "../models/Baan";
import Camp from "../models/Camp";
import NongCamp from "../models/NongCamp";
import Part from "../models/Part";
import PeeCamp from "../models/PeeCamp";
import PetoCamp from "../models/PetoCamp";
import User from "../models/User";
import CampMemberCard from "../models/CampMemberCard";
import { calculate, conBaanBackToFront, conCampBackToFront, conPartBackToFront, ifIsTrue, mapObjectIdToMyMap, resError, resOk, sendRes, sizeMapToJson, startJsonSize, startSize, swop } from "./setup";
import PartNameContainer from "../models/PartNameContainer";
import NameContainer from "../models/NameContainer";
import express from "express";
import { getUser } from "../middleware/auth";
import { InterBaanBack, InterBaanFront, InterCampBack, InterCampFront, InterPartBack, InterUser, InterActionPlan, ShowMember, CreateActionPlan, showActionPlan, Answer, CreateQuation, EditQuation, CreateWorkingItem, InterWorkingItem, ShowRegister, MyMap, AllNongRegister, WelfarePack, HeathIssuePack, CampWelfarePack } from "../models/interface";
import mongoose from "mongoose";
import Song from "../models/Song";
import HeathIssue from "../models/HeathIssue";
import Place from "../models/Place";
import Building from "../models/Building";
import ChoiseAnswer from "../models/ChoiseAnswer";
import ChoiseQuasion from "../models/ChoiseQuasion";
import WorkItem from "../models/WorkItem";
import { deleteWorkingItemRaw } from "./admin";
import { isWelfareValid } from "./user";
//*export async function getBaan
//*export async function getCamp
//*export async function getBaans
//*export async function getCamps
//*export async function getNongCamp
//*export async function getPeeCamp
//*export async function getPetoCamp
//*export async function getPart
//*export async function addNong
//*export async function addPee
//*export async function addPeeRaw
// export async function addPeto
//*export async function addPetoRaw
//*export async function staffRegister
//*export async function getActionPlanByPartId
//*export async function createActionPlan
//*export async function updateActionPlan
//*export async function deleteActionPlan
//*export async function getActionPlans
//*export async function nongRegister
//*export async function getCampName
//*export async function getPartName
//*export async function changeBaan
//*export async function changeBaanRaw
//*export async function changePart
//*export async function changePartRaw
//*export async function getNongsFromBaanId
//*export async function getPeesFromBaanId
//*export async function getPeesFromPartId
//*export async function getPetosFromPartId
// export async function getLinkRegister
//*export async function getImpotentPartIdBCRP
// export async function answerTheQuasion
// export async function createAllQuasion
// export async function updateQuasion
//*export async function getActionPlan
//*export async function getWorkingItemByPartId
//*export async function createWorkingItem
//*export async function updateWorkingItem
//*export async function deleteWorkingItem
//*export async function getWorkingItems
//*export async function getWorkingItem
//*export async function getShowRegisters
//*export async function getAllUserCamp
// export async function getAllNongRegister
//*export async function getAllWelfare
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
        res.status(200).json(baans);
        //console.log(baans.length)
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
            if (!user || camp.nongIds.includes(user._id) || camp.peeIds.includes(user._id) || camp.petoIds.includes(user._id)) {
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
            const campMemberCard = await CampMemberCard.create({
                userId: user._id,
                size: user.shirtSize,
                campModelId: nongCamp._id,
                receive: 'baan',
                role: 'nong',
                haveBottle: user.haveBottle,
                sleepAtCamp,
                healthIssueId: user.healthIssueId,
            })
            nongCamp.nongCampMemberCardIds.push(campMemberCard._id)
            baan.nongCampMemberCardIds.push(campMemberCard._id)
            camp.nongCampMemberCardIds.push(campMemberCard._id)
            user.campMemberCardIds.push(campMemberCard._id)
            newNongPassIds = swop(user._id, null, newNongPassIds)
            if (user.healthIssueId) {
                baan.nongHeathIssueIds.push(user.healthIssueId);
                camp.nongHeathIssueIds.push(user.healthIssueId);
                const heathIssue = await HeathIssue.findById(user.healthIssueId)
                baan.nongCampMemberCardHaveHeathIssueIds.push(campMemberCard._id)
                camp.nongCampMemberCardHaveHeathIssueIds.push(campMemberCard._id)
                if (heathIssue) {
                    await heathIssue.updateOne({
                        //nongCampIds: swop(null, nongCamp._id, heathIssue.nongCampIds),
                        campMemberCardIds: swop(null, campMemberCard._id, heathIssue.campMemberCardIds),
                    })
                }
            }
            const userSize = user.shirtSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'
            size.set(userSize, size.get(userSize) as number + 1)
            ifIsTrue(user.haveBottle, user._id, baanNongHaveBottleIds)
            ifIsTrue(user.haveBottle, user._id, campNongHaveBottleIds)
            user.nongCampIds.push(nongCamp._id);
            camp.mapCampMemberCardIdByUserId.set(user.id, campMemberCard._id)
            baan.mapCampMemberCardIdByUserId.set(user.id, campMemberCard._id)//
            await baan.updateOne({ mapCampMemberCardIdByUserId: baan.mapCampMemberCardIdByUserId })
            await user.updateOne({ nongCampIds: user.nongCampIds, campMemberCardIds: user.campMemberCardIds })
        }
        size.forEach((v, k) => {
            camp.nongShirtSize.set(k, camp.nongShirtSize.get(k) as number + v)
            baan.nongShirtSize.set(k, camp.nongShirtSize.get(k) as number + v)
        })
        await camp.updateOne({
            nongSureIds: newNongPassIds,
            nongCampMemberCardIds: camp.nongCampMemberCardIds,
            nongShirtSize: camp.nongShirtSize,
            nongHeathIssueIds: camp.nongHeathIssueIds,
            nongIds: camp.nongIds,
            mapCampMemberCardIdByUserId: camp.mapCampMemberCardIdByUserId,
            nongSleepIds: camp.nongSleepIds,
            currentNong: camp.currentNong,
            nongCampMemberCardHaveHeathIssueIds: camp.nongCampMemberCardHaveHeathIssueIds,
            nongHaveBottleIds: campNongHaveBottleIds,
        })
        await baan.updateOne({
            nongCampMemberCardIds: baan.nongCampMemberCardIds,
            nongShirtSize: baan.nongShirtSize,
            nongHeathIssueIds: baan.nongHeathIssueIds,
            nongIds: baan.nongIds,//
            mapCampMemberCardIdByUserId: baan.mapCampMemberCardIdByUserId,
            nongSleepIds: baan.nongSleepIds,
            nongCampMemberCardHaveHeathIssueIds: baan.nongCampMemberCardHaveHeathIssueIds,
            nongHaveBottleIds: baanNongHaveBottleIds,
        })
        await nongCamp.updateOne({
            nongIds: nongCamp.nongIds,//
            nongCampMemberCardIds: nongCamp.nongCampMemberCardIds,
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
        if (!user || camp.nongIds.includes(user._id) || camp.peeIds.includes(user._id) || camp.petoIds.includes(user._id)) {
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
            const campMemberCard = await CampMemberCard.create({
                userId: user._id,
                size: user.shirtSize,
                campModelId: peeCamp._id,
                receive: 'baan',
                role: 'pee',
                haveBottle: user.haveBottle,
                sleepAtCamp,
                healthIssueId: user.healthIssueId,
            })
            part.peeCampMemberCardIds.push(campMemberCard._id)
            camp.peeCampMemberCardIds.push(campMemberCard._id)
            baan.peeCampMemberCardIds.push(campMemberCard._id)
            user.campMemberCardIds.push(campMemberCard._id)
            count = count + 1
            peeCamp.peeCampMemberCardIds.push(campMemberCard._id)
            baan.peeIds.push(user._id);
            camp.peeIds.push(user._id);
            part.peeIds.push(user._id);
            if (user.healthIssueId) {
                baan.peeHeathIssueIds.push(user.healthIssueId);
                camp.peeHeathIssueIds.push(user.healthIssueId);
                part.peeHeathIssueIds.push(user.healthIssueId);
                const heathIssue = await HeathIssue.findById(user.healthIssueId)
                if (heathIssue) {
                    await heathIssue.updateOne({
                        //peeCampIds: swop(null, peeCamp._id, heathIssue.peeCampIds),
                        campMemberCardIds: swop(null, campMemberCard._id, heathIssue.campMemberCardIds)
                    })
                    baan.peeCampMemberCardHaveHeathIssueIds.push(campMemberCard._id)
                    part.peeCampMemberCardHaveHeathIssueIds.push(campMemberCard._id)
                    camp.peeCampMemberCardHaveHeathIssueIds.push(campMemberCard._id)
                }
            }
            const userSize = user.shirtSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'
            part.peeShirtSize.set(userSize, part.peeShirtSize.get(userSize) as number + 1);
            size.set(userSize, size.get(userSize) as number + 1)
            ifIsTrue(user.haveBottle, user._id, baanPeeHaveBottleIds)
            ifIsTrue(user.haveBottle, user._id, campPeeHaveBottleIds)
            await part.updateOne({ peeHaveBottleIds: ifIsTrue(user.haveBottle, user._id, part.peeHaveBottleIds) })
            user.peeCampIds.push(peeCamp._id);
            user.registerIds.push(camp._id)
            camp.peePassIds.delete(user.id);
            peeCamp.peeIds.push(user._id)
            camp.mapCampMemberCardIdByUserId.set(user.id, campMemberCard._id)
            part.mapCampMemberCardIdByUserId.set(user.id, campMemberCard._id)
            baan.mapCampMemberCardIdByUserId.set(user.id, campMemberCard._id)
            await peeCamp.updateOne({
                peeIds: peeCamp.peeIds,
                peeCampMemberCardIds: peeCamp.peeCampMemberCardIds
            })
            await user.updateOne({
                peeCampIds: user.peeCampIds,
                campMemberCardIds: user.campMemberCardIds,
                registerIds: user.registerIds
            })
            if (part.isAuth) {
                await user.updateOne({
                    authPartIds: swop(null, part._id, user.authPartIds)
                })
            }
            await part.updateOne({
                mapCampMemberCardIdByUserId: part.mapCampMemberCardIdByUserId,
                peeHeathIssueIds: part.peeHeathIssueIds,
                peeIds: part.peeIds,
                peeCampMemberCardIds: part.peeCampMemberCardIds,
                peeShirtSize: part.peeShirtSize,
                peeCampMemberCardHaveHeathIssueIds: part.peeCampMemberCardHaveHeathIssueIds,
            })
        }
        size.forEach((v, k) => {
            camp.peeShirtSize.set(k, camp.peeShirtSize.get(k) as number + v)
            baan.peeShirtSize.set(k, baan.peeShirtSize.get(k) as number + v)
        })
        await camp.updateOne({
            peeCampMemberCardIds: camp.peeCampMemberCardIds,
            peeShirtSize: camp.peeShirtSize,
            peeIds: camp.peeIds,
            peeHeathIssueIds: camp.peeHeathIssueIds,
            peePassIds: camp.peePassIds,
            mapCampMemberCardIdByUserId: camp.mapCampMemberCardIdByUserId,
            peeSleepIds: camp.peeSleepIds,
            currentPee: camp.currentPee,
            peeCampMemberCardHaveHeathIssueIds: camp.peeCampMemberCardHaveHeathIssueIds,
            peeHaveBottleIds: campPeeHaveBottleIds,
            peeMapIdGtoL: camp.peeMapIdGtoL,
            peeMapIdLtoG: camp.peeMapIdLtoG,
        })
        await baan.updateOne({
            peeHeathIssueIds: baan.peeHeathIssueIds,
            peeIds: baan.peeIds,
            peeCampMemberCardIds: baan.peeCampMemberCardIds,
            mapCampMemberCardIdByUserId: baan.mapCampMemberCardIdByUserId,
            peeShirtSize: baan.peeShirtSize,
            peeSleepIds: baan.peeSleepIds,
            peeCampMemberCardHaveHeathIssueIds: baan.peeCampMemberCardHaveHeathIssueIds,
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
        if (!user || camp.nongIds.includes(user._id) || camp.peeIds.includes(user._id) || camp.petoIds.includes(user._id)) {
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
        const campMemberCard = await CampMemberCard.create({
            userId: user._id,
            size: user.shirtSize,
            campModelId: petoCamp._id,
            receive: 'part',
            role: 'peto',
            haveBottle: user.haveBottle,
            sleepAtCamp,
            healthIssueId: user.healthIssueId,
        })
        petoCamp.petoCampMemberCardIds.push(campMemberCard._id)
        part.petoCampMemberCardIds.push(campMemberCard._id)
        camp.petoCampMemberCardIds.push(campMemberCard._id)
        user.campMemberCardIds.push(campMemberCard._id)
        if (user.healthIssueId) {
            part.petoHeathIssueIds.push(user.healthIssueId);
            camp.petoHeathIssueIds.push(user.healthIssueId);
            const heathIssue = await HeathIssue.findById(user.healthIssueId)
            if (heathIssue) {
                await heathIssue.updateOne({
                    //petoCampIds: swop(null, petoCamp._id, heathIssue.petoCampIds),
                    campMemberCardIds: swop(null, campMemberCard._id, heathIssue.campMemberCardIds)
                })
                part.petoCampMemberCardHaveHeathIssueIds.push(campMemberCard._id)
                camp.petoCampMemberCardHaveHeathIssueIds.push(campMemberCard._id)
            }
        }
        const userSize = user.shirtSize as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'
        size.set(userSize, size.get(userSize) as number + 1)
        ifIsTrue(user.haveBottle, user._id, partPetoHaveBottleIds)
        ifIsTrue(user.haveBottle, user._id, campPetoHaveBottleIds)
        user.petoCampIds.push(petoCamp._id)
        user.registerIds.push(camp._id)
        camp.mapCampMemberCardIdByUserId.set(user.id, campMemberCard._id)
        part.mapCampMemberCardIdByUserId.set(user.id, campMemberCard._id)
        await user.updateOne({
            petoCampIds: user.petoCampIds,
            campMemberCardIds: user.campMemberCardIds,
            registerIds: user.registerIds
        })
        if (part.isAuth) {
            await user.updateOne({
                authPartIds: swop(null, part._id, user.authPartIds)
            })
        }
    }
    size.forEach((v, k) => {
        camp.petoShirtSize.set(k, camp.petoShirtSize.get(k) as number + v)
        part.petoShirtSize.set(k, part.petoShirtSize.get(k) as number + v)
    })
    await camp.updateOne({
        petoHeathIssueIds: camp.petoHeathIssueIds,
        petoIds: camp.petoIds,
        petoCampMemberCardIds: camp.petoCampMemberCardIds,
        petoShirtSize: camp.petoShirtSize,
        mapCampMemberCardIdByUserId: camp.mapCampMemberCardIdByUserId,
        petoSleepIds: camp.petoSleepIds,
        petoCampMemberCardHaveHeathIssueIds: camp.petoCampMemberCardHaveHeathIssueIds,
        petoHaveBottleIds: campPetoHaveBottleIds,
        peeMapIdGtoL: camp.peeMapIdGtoL,
        peeMapIdLtoG: camp.peeMapIdLtoG,
    })
    await part.updateOne({
        petoHeathIssueIds: part.petoHeathIssueIds,
        petoIds: part.petoIds,
        petoCampMemberCardIds: part.petoCampMemberCardIds,
        petoShirtSize: part.petoShirtSize,
        mapCampMemberCardIdByUserId: part.mapCampMemberCardIdByUserId,
        petoSleepIds: part.petoSleepIds,
        petoCampMemberCardHaveHeathIssueIds: part.petoCampMemberCardHaveHeathIssueIds,
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
    const importantParts = await getImpotentPartIdBCRP(camp._id)
    if (user.role === 'pee' || camp.memberStructure != 'nong->highSchool,pee->1year,peto->2upYear') {
        camp.peePassIds.set(user.id, partId)
        await camp.updateOne({ peePassIds: camp.peePassIds })
        res.status(200).json({
            success: true
        })
    } else {
        if (importantParts.includes(part._id) && !part._id.equals(importantParts[3])) {
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
                placeName.push(`${building?.name} ${place?.floor} ${place?.room}`)
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
                        placeName.push(`${building?.name} ${place?.floor} ${place?.room}`)
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
                        placeName.push(`${building?.name} ${place?.floor} ${place?.room}`)
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
    if (!user || !camp || (!user.authPartIds.includes(camp.partBoardId) && !user.authPartIds.includes(camp.partRegisterId))) {
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
        const campMemberCard = await CampMemberCard.findById(camp.mapCampMemberCardIdByUserId.get(user.id))
        if (!campMemberCard) {
            continue
        }
        switch (campMemberCard.role) {
            case 'nong': {
                const oldNongCamp = await NongCamp.findById(campMemberCard.campModelId)
                if (!oldNongCamp) {
                    continue
                }
                const oldBaan = await Baan.findById(oldNongCamp.baanId)
                if (!oldBaan || oldBaan._id.equals(baan._id)) {
                    continue
                }
                await user.updateOne({ nongCampIds: swop(oldNongCamp._id, newNongCamp._id, user.nongCampIds) })
                oldBaan.nongShirtSize.set(campMemberCard.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', calculate(oldBaan.nongShirtSize.get(campMemberCard.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'), 0, 1))
                oldBaan.mapCampMemberCardIdByUserId.delete(user.id)
                await oldBaan.updateOne({
                    nongCampMemberCardIds: swop(campMemberCard._id, null, oldBaan.nongCampMemberCardIds),
                    nongIds: swop(user._id, null, oldBaan.nongIds),
                    mapCampMemberCardIdByUserId: oldBaan.mapCampMemberCardIdByUserId,
                    nongShirtSize: oldBaan.nongShirtSize
                })
                baan.nongShirtSize.set(campMemberCard.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', calculate(baan.nongShirtSize.get(campMemberCard.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'), 1, 0))
                baan.nongIds.push(user._id)
                baan.nongCampMemberCardIds.push(campMemberCard._id)
                await campMemberCard.updateOne({ campModelId: newNongCamp._id })
                if (campMemberCard.haveBottle) {
                    await oldBaan.updateOne({ nongHaveBottleIds: swop(user._id, null, oldBaan.nongHaveBottleIds) })
                    baan.nongHaveBottleIds.push(user._id)
                }
                baan.mapCampMemberCardIdByUserId.set(user?.id, campMemberCard._id)
                await oldNongCamp.updateOne({
                    nongIds: swop(user._id, null, oldNongCamp.nongIds),
                    nongCampMemberCardIds: swop(campMemberCard._id, null, oldNongCamp.nongCampMemberCardIds),
                })
                if (campMemberCard.healthIssueId) {
                    await oldBaan.updateOne({
                        nongHeathIssueIds: swop(campMemberCard.healthIssueId, null, oldBaan.nongHeathIssueIds),
                        nongCampMemberCardHaveHeathIssueIds: swop(campMemberCard._id, null, oldBaan.nongCampMemberCardHaveHeathIssueIds),
                    })
                    baan.nongCampMemberCardHaveHeathIssueIds.push(campMemberCard._id)
                    baan.nongHeathIssueIds.push(campMemberCard.healthIssueId)
                }
                if (campMemberCard.sleepAtCamp) {
                    await oldBaan.updateOne({ nongSleepIds: swop(user._id, null, oldBaan.nongSleepIds) })
                    baan.nongSleepIds.push(user._id)
                }
                newNongCamp.nongIds.push(user._id)
                await baan.updateOne({
                    mapCampMemberCardIdByUserId: baan.mapCampMemberCardIdByUserId,
                    nongHeathIssueIds: baan.nongHeathIssueIds,
                    nongIds: (baan.nongIds),
                    nongCampMemberCardIds: baan.nongCampMemberCardIds,
                    nongShirtSize: baan.nongShirtSize,
                    nongCampMemberCardHaveHeathIssueIds: baan.nongCampMemberCardHaveHeathIssueIds,
                    nongHaveBottleIds: baan.nongHaveBottleIds,
                    nongSleepIds: baan.nongSleepIds,
                })
                await newNongCamp.updateOne({
                    nongIds: newNongCamp.nongIds,
                    nongCampMemberCardIds: newNongCamp.nongCampMemberCardIds
                })
                break
            }
            case 'pee': {
                const oldPeeCamp = await PeeCamp.findById(campMemberCard.campModelId)
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
                oldBaan.peeShirtSize.set(campMemberCard.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', calculate(oldBaan.peeShirtSize.get(campMemberCard.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'), 0, 1))
                await oldBaan.updateOne({
                    peeCampMemberCardIds: swop(campMemberCard._id, null, oldBaan.peeCampMemberCardIds),
                    peeIds: swop(user._id, null, oldBaan.peeIds),
                    peeShirtSize: oldBaan.peeShirtSize,
                })
                baan.peeShirtSize.set(campMemberCard.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', calculate(baan.peeShirtSize.get(campMemberCard.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'), 1, 0))
                baan.peeIds.push(user._id)
                baan.peeCampMemberCardIds.push(campMemberCard._id)
                await campMemberCard.updateOne({ campModelId: newPeeCamp._id })
                if (campMemberCard.haveBottle) {
                    await oldBaan.updateOne({ peeHaveBottleIds: swop(user._id, null, oldBaan.peeHaveBottleIds) })
                    baan.peeHaveBottleIds.push(user._id)
                }
                oldBaan?.mapCampMemberCardIdByUserId.delete(user.id)
                baan.mapCampMemberCardIdByUserId.set(user.id, campMemberCard._id)
                if (campMemberCard.healthIssueId) {
                    await oldBaan.updateOne({
                        peeHeathIssueIds: swop(campMemberCard.healthIssueId, null, oldBaan.peeHeathIssueIds),
                        peeCampMemberCardHaveHeathIssueIds: swop(campMemberCard._id, null, oldBaan.peeCampMemberCardHaveHeathIssueIds)
                    })
                    baan.peeHeathIssueIds.push(campMemberCard.healthIssueId)
                    baan.peeCampMemberCardHaveHeathIssueIds.push(campMemberCard._id)
                }
                if (campMemberCard.sleepAtCamp) {
                    await oldBaan.updateOne({ peeSleepIds: swop(user._id, null, oldBaan.peeSleepIds) })
                    baan.peeSleepIds.push(user._id)
                }
                await newPeeCamp.updateOne({
                    peeCampMemberCardIds: swop(null, campMemberCard._id, newPeeCamp.peeCampMemberCardIds),
                    peeIds: swop(null, user._id, newPeeCamp.peeIds)
                })
                await oldPeeCamp.updateOne({
                    peeCampMemberCardIds: swop(campMemberCard._id, null, oldPeeCamp.peeCampMemberCardIds),
                    peeIds: swop(user._id, null, oldPeeCamp.peeIds)
                })
                await baan.updateOne({
                    peeHeathIssueIds: baan.peeHeathIssueIds,
                    mapCampMemberCardIdByUserId: baan.mapCampMemberCardIdByUserId,
                    peeIds: (baan.peeIds),
                    peeCampMemberCardIds: baan.peeCampMemberCardIds,
                    peeShirtSize: baan.peeShirtSize,
                    peeCampMemberCardHaveHeathIssueIds: baan.peeCampMemberCardHaveHeathIssueIds,
                    peeHaveBottleIds: baan.peeHaveBottleIds,
                    peeSleepIds: baan.peeSleepIds,
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
        const campMemberCard = await CampMemberCard.findById(camp.mapCampMemberCardIdByUserId.get(user.id))
        if (!campMemberCard) {
            continue
        }
        switch (campMemberCard.role) {
            case 'peto': {
                const oldPetoCamp = await PetoCamp.findById(campMemberCard.campModelId)
                if (!oldPetoCamp) {
                    continue
                }
                const oldPart = await Part.findById(oldPetoCamp.partId)
                if (!oldPart || oldPart._id.equals(part._id)) {
                    continue
                }
                await user.updateOne({ peeCampIds: swop(oldPetoCamp._id, newPetoCamp._id, user.petoCampIds) })
                oldPart.petoShirtSize.set(campMemberCard.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', calculate(oldPart.peeShirtSize.get(campMemberCard.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'), 0, 1))
                oldPart.mapCampMemberCardIdByUserId.delete(user?.id)
                await oldPart.updateOne({
                    petoCampMemberCardIds: swop(campMemberCard._id, null, oldPart.petoCampMemberCardIds),/////////////
                    petoIds: swop(user._id, null, oldPart.petoIds),
                    mapCampMemberCardIdByUserId: oldPart.mapCampMemberCardIdByUserId,
                    petoShirtSize: oldPart.petoShirtSize
                })
                part.petoIds.push(user._id)
                part.petoShirtSize.set(campMemberCard.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', calculate(part.petoShirtSize.get(campMemberCard.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'), 1, 0))
                part.petoCampMemberCardIds.push(campMemberCard._id)
                await campMemberCard.updateOne({ campModelId: newPetoCamp._id })
                if (campMemberCard.haveBottle) {
                    await oldPart.updateOne({ petoHaveBottleIds: swop(user._id, null, oldPart.petoHaveBottleIds) })
                    part.petoHaveBottleIds.push(user._id)
                }
                part.mapCampMemberCardIdByUserId.set(user.id, campMemberCard._id)
                await oldPetoCamp.updateOne({
                    petoIds: swop(user._id, null, oldPetoCamp.petoIds),
                    petoCampMemberCardIds: swop(campMemberCard._id, null, oldPetoCamp.petoCampMemberCardIds)
                })
                if (campMemberCard.healthIssueId) {
                    await oldPart.updateOne({
                        petoHeathIssueIds: swop(campMemberCard.healthIssueId, null, oldPart.petoHeathIssueIds),
                        petoCampMemberCardHaveHeathIssueIds: swop(campMemberCard._id, null, oldPart.petoCampMemberCardHaveHeathIssueIds)
                    })
                    part.petoCampMemberCardHaveHeathIssueIds.push(campMemberCard._id)
                    part.petoHeathIssueIds.push(campMemberCard.healthIssueId)
                }
                if (campMemberCard.sleepAtCamp) {
                    await oldPart.updateOne({ petoSleepIds: swop(user._id, null, oldPart.petoSleepIds) })
                    part.petoSleepIds.push(user._id)
                }
                if (oldPart.isAuth) {
                    await user.updateOne({ authPartIds: swop(oldPart._id, null, user.authPartIds) })
                }
                if (part.isAuth) {
                    await user.updateOne({ authPartIds: swop(null, oldPart._id, user.authPartIds) })
                }
                newPetoCamp.petoIds.push(user._id)
                await newPetoCamp.updateOne({
                    petoIds: newPetoCamp.petoIds,
                    petoCampMemberCardIds: newPetoCamp.petoCampMemberCardIds,
                })
                await part.updateOne({
                    mapCampMemberCardIdByUserId: part.mapCampMemberCardIdByUserId,
                    petoHeathIssueIds: part.petoHeathIssueIds,
                    petoIds: (part.petoIds),
                    petoCampMemberCardIds: part.petoCampMemberCardIds,
                    petoCampMemberCardHaveHeathIssueIds: part.petoCampMemberCardHaveHeathIssueIds,
                    petoHaveBottleIds: part.petoHaveBottleIds,
                    petoSleepIds: part.petoSleepIds,
                })
                break
            }
            case 'pee': {
                const oldPeeCamp = await PeeCamp.findById(campMemberCard.campModelId)
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
                oldPart.peeShirtSize.set(campMemberCard.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', calculate(oldPart.peeShirtSize.get(campMemberCard.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'), 0, 1))
                await oldPart.updateOne({
                    peeCampMemberCardIds: swop(campMemberCard._id, null, oldPart.peeCampMemberCardIds),
                    peeIds: swop(user._id, null, oldPart.peeIds),
                    peeShirtSize: oldPart.peeShirtSize
                })
                part.peeIds.push(user._id)
                part.peeShirtSize.set(campMemberCard.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', calculate(part.peeShirtSize.get(campMemberCard.size as 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'), 1, 0))
                part.peeCampMemberCardIds.push(campMemberCard._id)
                await campMemberCard.updateOne({ campModelId: newPeeCamp._id })
                if (campMemberCard.haveBottle) {
                    await oldPart.updateOne({ peeHaveBottleIds: swop(user._id, null, oldPart.peeHaveBottleIds) })
                    part.peeHaveBottleIds.push(user._id)
                }
                oldPart.mapCampMemberCardIdByUserId.delete(user.id)
                part.mapCampMemberCardIdByUserId.set(user.id, campMemberCard._id)
                if (campMemberCard.healthIssueId) {
                    await oldPart.updateOne({
                        peeHeathIssueIds: swop(campMemberCard.healthIssueId, null, oldPart.peeHeathIssueIds),
                        peeCampMemberCardHaveHeathIssueIds: swop(campMemberCard._id, null, oldPart.peeCampMemberCardHaveHeathIssueIds)
                    })
                    part.peeHeathIssueIds.push(campMemberCard.healthIssueId)
                    part.peeCampMemberCardHaveHeathIssueIds.push(campMemberCard._id)
                }
                if (campMemberCard.sleepAtCamp) {
                    await oldPart.updateOne({ peeSleepIds: swop(user._id, null, oldPart.peeSleepIds) })
                    part.peeSleepIds.push(user._id)
                }
                if (oldPart.isAuth) {
                    await user.updateOne({ authPartIds: swop(oldPart._id, null, user.authPartIds) })
                }
                if (part.isAuth) {
                    await user.updateOne({ authPartIds: swop(null, oldPart._id, user.authPartIds) })
                }
                await newPeeCamp.updateOne({
                    peeCampMemberCardIds: swop(null, campMemberCard._id, newPeeCamp.peeCampMemberCardIds),
                    peeIds: swop(null, user._id, newPeeCamp.peeIds)
                })
                await oldPeeCamp.updateOne({
                    peeCampMemberCardIds: swop(campMemberCard._id, null, oldPeeCamp.peeCampMemberCardIds),
                    peeIds: swop(user._id, null, oldPeeCamp.peeIds)
                })
                await part.updateOne({
                    peeHeathIssueIds: part.peeHeathIssueIds,
                    mapCampMemberCardIdByUserId: part.mapCampMemberCardIdByUserId,
                    peeIds: (part.peeIds),
                    peeCampMemberCardIds: part.peeCampMemberCardIds,
                    peeShirtSize: part.peeShirtSize,
                    peeCampMemberCardHaveHeathIssueIds: part.peeCampMemberCardHaveHeathIssueIds,
                    peeHaveBottleIds: part.peeHaveBottleIds,
                    peeSleepIds: part.peeSleepIds,
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
    while (i < baan.nongCampMemberCardIds.length) {
        const campMemberCard = await CampMemberCard.findById(baan.nongCampMemberCardIds[i++])
        if (!campMemberCard) {
            continue
        }
        const user = await User.findById(campMemberCard.userId)
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
        const heathIssue = await HeathIssue.findById(campMemberCard.healthIssueId)
        if (heathIssue) {
            isWearing = heathIssue.isWearing
            spicy = heathIssue.spicy
        }
        out.push({
            name,
            nickname,
            lastname,
            _id,
            shirtSize: campMemberCard.size,
            email,
            studentId,
            sleep: campMemberCard.sleepAtCamp,
            tel,
            gender,
            group,
            healthIssueId: campMemberCard.healthIssueId,
            haveBottle: campMemberCard.haveBottle,
            likeSongs,
            isWearing,
            spicy,
            id: camp.nongMapIdGtoL.get(_id.toString()) as number,
            campMemberCardId: campMemberCard._id,
        })
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
    const camp = await Camp.findById(baan.campId)
    if (!camp) {
        sendRes(res, false)
        return
    }
    var i = 0
    while (i < baan.peeCampMemberCardIds.length) {
        const campMemberCard = await CampMemberCard.findById(baan.peeCampMemberCardIds[i++])
        if (!campMemberCard) {
            continue
        }
        const user = await User.findById(campMemberCard.userId)
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
        const heathIssue = await HeathIssue.findById(campMemberCard.healthIssueId)
        if (heathIssue) {
            isWearing = heathIssue.isWearing
            spicy = heathIssue.spicy
        }
        out.push({
            name,
            nickname,
            lastname,
            _id,
            shirtSize: campMemberCard.size,
            email,
            studentId,
            sleep: campMemberCard.sleepAtCamp,
            tel,
            gender,
            group,
            healthIssueId: campMemberCard.healthIssueId,
            haveBottle: campMemberCard.haveBottle,
            likeSongs,
            isWearing,
            spicy,
            id: camp.peeMapIdGtoL.get(_id.toString()) as number,
            campMemberCardId: campMemberCard._id,
        })
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
    const camp = await Camp.findById(part.campId)
    if (!camp) {
        sendRes(res, false)
        return
    }
    var i = 0
    while (i < part.peeCampMemberCardIds.length) {
        const campMemberCard = await CampMemberCard.findById(part.peeCampMemberCardIds[i++])
        if (!campMemberCard) {
            continue
        }
        const user = await User.findById(campMemberCard.userId)
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
        const heathIssue = await HeathIssue.findById(campMemberCard.healthIssueId)
        if (heathIssue) {
            isWearing = heathIssue.isWearing
            spicy = heathIssue.spicy
        }
        out.push({
            name,
            nickname,
            lastname,
            _id,
            shirtSize: campMemberCard.size,
            email,
            studentId,
            sleep: campMemberCard.sleepAtCamp,
            tel,
            gender,
            group,
            healthIssueId: campMemberCard.healthIssueId,
            haveBottle: campMemberCard.haveBottle,
            likeSongs,
            isWearing,
            spicy,
            id: camp.peeMapIdGtoL.get(_id.toString()) as number,
            campMemberCardId: campMemberCard._id,
        })
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
    const camp = await Camp.findById(part.campId)
    if (!camp) {
        sendRes(res, false)
        return
    }
    var i = 0
    while (i < part.petoCampMemberCardIds.length) {
        const campMemberCard = await CampMemberCard.findById(part.petoCampMemberCardIds[i++])
        if (!campMemberCard) {
            continue
        }
        const user = await User.findById(campMemberCard.userId)
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
        const heathIssue = await HeathIssue.findById(campMemberCard.healthIssueId)
        if (heathIssue) {
            isWearing = heathIssue.isWearing
            spicy = heathIssue.spicy
        }
        out.push({
            name,
            nickname,
            lastname,
            _id,
            shirtSize: campMemberCard.size,
            email,
            studentId,
            sleep: campMemberCard.sleepAtCamp,
            tel,
            gender,
            group,
            healthIssueId: campMemberCard.healthIssueId,
            haveBottle: campMemberCard.haveBottle,
            likeSongs,
            isWearing,
            spicy,
            id: camp.peeMapIdGtoL.get(_id.toString()) as number,
            campMemberCardId: campMemberCard._id,
        })
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
    return [camp.partBoardId, camp.partCoopId, camp.partRegisterId, camp.partPeeBaanId, camp.partWelfareId, camp.partMedId, camp.partPlanId] as mongoose.Types.ObjectId[]
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
        const question = await ChoiseQuasion.findById(answers[i].quasionId)
        if (!question) {
            continue
        }
        if (question.mapAwnserIdByUserId.has(user._id.toString())) {
            const answer = await ChoiseAnswer.findByIdAndUpdate(question.mapAwnserIdByUserId.get(user._id.toString()), answers[i])
            if (answers[i].answer === question.correct) {
                await answer?.updateOne({ score: question.score })
            } else {
                await answer?.updateOne({ score: 0 })
            }
            i++

        } else {
            const choiceAnswer = await ChoiseAnswer.create(answers[i])
            await choiceAnswer.updateOne({ userId: user._id })
            const camp = await Camp.findById(answers[i++].campId)
            await camp?.updateOne({ choiseAnswerIds: swop(null, choiceAnswer._id, camp.choiseAnswerIds) })
            await user.updateOne({
                choiseAnswerIds: swop(null, choiceAnswer._id, user.choiseAnswerIds),
                quasionIds: swop(null, question._id, user.quasionIds)
            })
            await question.updateOne({ choiseAnswerIds: swop(null, choiceAnswer._id, question.choiseAnswerIds) })
            if (answers[i].answer === question.correct) {
                await choiceAnswer.updateOne({ score: question.score })
            } else {
                await choiceAnswer.updateOne({ score: 0 })
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
            placeName.push(`${building?.name} ${place?.floor} ${place?.room}`)
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
    const buff = mapObjectIdToMyMap(camp.peePassIds)
    var i = 0
    const out: ShowRegister[] = []
    while (i < buff.length) {
        const user = await User.findById(buff[i].key)
        const part = await Part.findById(buff[i++].value)
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
export async function getAllWelfare(req: express.Request, res: express.Response, next: express.NextFunction) {
    const camp: InterCampBack | null = await Camp.findById(req.params.id)
    if (!camp) {
        sendRes(res, false)
        return
    }
    const nongHealths: HeathIssuePack[] = []
    const peeHealths: HeathIssuePack[] = []
    const petoHealths: HeathIssuePack[] = []
    const baanWelfares: WelfarePack[] = []
    const partWelfares: WelfarePack[] = []
    var i = 0
    while (i < camp.baanIds.length) {
        const baan: InterBaanBack | null = await Baan.findById(camp.baanIds[i++])
        if (!baan) {
            continue
        }
        const welfareBaan: WelfarePack = {
            name: `${camp.groupName}${baan.name}`,
            nongHealths: [],
            peeHealths: [],
            petoHealths: [],
            nongSize: sizeMapToJson(baan.nongShirtSize),
            peeSize: sizeMapToJson(baan.peeShirtSize),
            petoSize: startJsonSize()
        }
        var j = 0
        while (j < baan.nongHeathIssueIds.length) {
            const heathIssue = await HeathIssue.findById(baan.nongHeathIssueIds[j++])
            if (!heathIssue) {
                continue
            }
            const user: InterUser | null = await User.findById(heathIssue.userId)
            if (!user) {
                continue
            }
            const buffer: HeathIssuePack = {
                user,
                heathIssue,
            }
            welfareBaan.nongHealths = ifIsTrue(isWelfareValid(buffer), buffer, welfareBaan.nongHealths, nongHealths)
        }
        j = 0
        while (j < baan.peeHeathIssueIds.length) {
            const heathIssue = await HeathIssue.findById(baan.peeHeathIssueIds[j++])
            if (!heathIssue) {
                continue
            }
            const user: InterUser | null = await User.findById(heathIssue.userId)
            if (!user) {
                continue
            }
            const buffer: HeathIssuePack = {
                user,
                heathIssue,
            }
            welfareBaan.peeHealths = ifIsTrue(isWelfareValid(buffer), buffer, welfareBaan.peeHealths, peeHealths)
        }
        baanWelfares.push(welfareBaan)
    }
    i = 0
    while (i < camp.partIds.length) {
        const part: InterPartBack | null = await Part.findById(camp.partIds[i++])
        if (!part) {
            continue
        }
        const welfarePart: WelfarePack = {
            name: `ฝ่าย${part.partName}`,
            nongHealths: [],
            peeHealths: [],
            petoHealths: [],
            nongSize: startJsonSize(),
            peeSize: sizeMapToJson(part.peeShirtSize),
            petoSize: sizeMapToJson(part.petoShirtSize)
        }
        var j = 0
        while (j < part.petoHeathIssueIds.length) {
            const heathIssue = await HeathIssue.findById(part.petoHeathIssueIds[j++])
            if (!heathIssue) {
                continue
            }
            const user: InterUser | null = await User.findById(heathIssue.userId)
            if (!user) {
                continue
            }
            const buffer: HeathIssuePack = {
                user,
                heathIssue,
            }
            welfarePart.petoHealths = ifIsTrue(isWelfareValid(buffer), buffer, welfarePart.petoHealths, petoHealths)
        }
        j = 0
        while (j < part.peeHeathIssueIds.length) {
            const heathIssue = await HeathIssue.findById(part.peeHeathIssueIds[j++])
            if (!heathIssue) {
                continue
            }
            const user: InterUser | null = await User.findById(heathIssue.userId)
            if (!user) {
                continue
            }
            const buffer: HeathIssuePack = {
                user,
                heathIssue,
            }
            welfarePart.peeHealths = ifIsTrue(isWelfareValid(buffer), buffer, welfarePart.peeHealths,)
        }
        partWelfares.push(welfarePart)
    }
    const buffer: CampWelfarePack = {
        name: camp.campName,
        isHavePeto: camp.memberStructure == 'nong->highSchool,pee->1year,peto->2upYear',
        nongHealths,
        peeHealths,
        petoHealths,
        partWelfares,
        baanWelfares,
        groupName: camp.groupName,
        nongSize: sizeMapToJson(camp.nongShirtSize),
        peeSize: sizeMapToJson(camp.peeShirtSize),
        petoSize: sizeMapToJson(camp.petoShirtSize)
    }
    res.status(200).json(buffer)
}
