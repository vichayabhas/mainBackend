import express from 'express'
import { InterBaanBack, InterBaanFront, InterCampBack, InterCampFront, InterPartBack, InterPartFront, InterSize, InterWorkingItem, MyMap } from '../models/intreface'
import jwt from 'jsonwebtoken'


export function startSize(): Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number> {
    const size: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number> = new Map()
    const s: ('S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL')[] = ['S', 'M', 'L', 'XL', 'XXL', '3XL']
    s.forEach((e: 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL') => {
        size.set(e, 0)

    })
    return size
}
export function swop(olds: string | null, news: string | null, array: string[]): string[] {
    if (!olds) {
        if (news) {
            array.push(news)
        }
        return array
    }
    const re = array.filter(e => e != olds)
    if (news) {
        re.push(news)
    }
    return re
}
export function calculate(input: unknown | number | undefined, plus: | unknown | number | undefined, minus: unknown | number | undefined) {
    return (input as number) + (plus as number) - (minus as number)
}
export const resOk = { success: true }
export const resError = { success: false }
export function sendRes(res: express.Response, success: boolean) {
    res.status(success ? 200 : 400).json({ success })
}
export function sizeMapToJson(input: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number>): InterSize {
    const out: InterSize = {
        id: null,
        sizeS: input.get('S') as number,
        sizeM: input.get('M') as number,
        sizeL: input.get('L') as number,
        sizeXL: input.get('XL') as number,
        sizeXXL: input.get('XXL') as number,
        size3XL: input.get('3XL') as number
    }
    return (out)
}
export function sizeJsonMod(size: 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', count: number, input: InterSize): InterSize {
    switch (size) {
        case 'S': input.sizeS = input.sizeS + count
        case 'M': input.sizeM = input.sizeM + count
        case 'L': input.sizeL = input.sizeL + count
        case 'XL': input.sizeXL = input.sizeXL + count
        case 'XXL': input.sizeXXL = input.sizeXXL + count
        case '3XL': input.size3XL = input.size3XL + count
    }
    return input
}

export function mapBoolToArray(input: Map<string, boolean>): string[] {
    var out: string[] = []
    input.forEach((v: boolean, k: string) => {
        if (v) {
            out.push(k)
        }
    })
    return out

}
export function conBaanBackToFront(input: InterBaanBack): InterBaanFront {
    const { id,
        name,
        fullName,
        campId,
        peeIds,
        nongIds,
        nongHelthIsueIds,
        peeHelthIsueIds,
        nongShertSize,
        peeShertSize,
        songIds,
        nongHaveBottle,
        peeHaveBottle,
        nongHaveBottleMapIds,
        peeHaveBottleMapIds,
        peeModelIds,
        nongModelId,
        nongShertManageIds,
        peeShertManageIds,
        link,
        styleId,
        boySleepPlaceId,
        girlSleepPlaceId,
        mapShertManageIdByUserId,
        nomalPlaceId } = input
    return ({
        name,
        fullName,
        campId,
        link,
        peeHaveBottle,
        nomalPlaceId,
        nongHaveBottle,
        nongHelthIsueIds,
        nongIds,
        nongModelId,
        nongShertManageIds,
        peeHelthIsueIds,
        peeIds,
        peeShertManageIds,
        peeModelIds,
        peeShertSize: sizeMapToJson(peeShertSize),
        nongShertSize: sizeMapToJson(nongShertSize),
        songIds,
        styleId,
        boySleepPlaceId,
        girlSleepPlaceId,
        id,
        peeHaveBottleMapIds: mapBoolToArray(peeHaveBottleMapIds),
        nongHaveBottleMapIds: mapBoolToArray(nongHaveBottleMapIds),
        mapShertManageIdByUserId: mapStringToMyMap(mapShertManageIdByUserId)
    })
}
export function conCampBackToFront(input: InterCampBack): InterCampFront {
    const { id,
        nameId,
        round,
        dateStart,
        dateEnd,
        boardIds,
        peeIds,
        nongIds,
        partIds,
        petoIds,
        authorizeIds,
        nongHelthIsueIds,
        peeHelthIsueIds,
        petoHelthIsueIds,
        dataLock,
        nongShertSize,
        peeShertSize,
        petoShertSize,
        nongModelIds,
        peeModelIds,
        petoModelIds,
        nongPendingIds,                            /////////////i
        nongPassIds,                               ////////////////////i
        open,
        peePassIds,//<userId,partId>               ////////////////////////i
        songIds,
        nongHaveBottle,
        peeHaveBottle,
        petoHaveBottle,
        nongHaveBottleMapIds,
        peeHaveBottleMapIds,
        petoHaveBottleMapIds,
        nongSureIds,
        baanIds,
        nongShertManageIds,
        peeShertManageIds,
        petoShertManageIds,
        link,
        allDone,
        lockChangePickup,
        pictureUrls,
        campStyleId,
        actionPlanIds,
        workItemIds,
        nongPaidIds,
        nongInterviewIds,                            ////////////////////////////////i
        registerModel,
        memberStructre,
        mapShertManageIdByUserId,
        logoUrl,
        registerSheetLink,
        peeLock,
        outRoundIds,
        campName
    } = input
    return ({
        partIds,
        open,
        peeHaveBottle,
        peeHaveBottleMapIds: mapBoolToArray(peeHaveBottleMapIds),
        peeHelthIsueIds,
        peeIds,
        peeModelIds,
        peePassIds: mapStringToMyMap(peePassIds),
        peeShertManageIds,
        peeShertSize: sizeMapToJson(peeShertSize),
        petoHaveBottle,
        petoHaveBottleMapIds: mapBoolToArray(petoHaveBottleMapIds),
        petoHelthIsueIds,
        petoIds,
        petoModelIds,
        petoShertManageIds,
        petoShertSize: sizeMapToJson(petoShertSize),
        pictureUrls,
        nameId,
        nongHaveBottle,
        nongHaveBottleMapIds: mapBoolToArray(nongHaveBottleMapIds),
        nongHelthIsueIds,
        nongIds,
        nongInterviewIds: mapStringToMyMap(nongInterviewIds),
        nongModelIds,
        nongPaidIds,
        nongPassIds: mapStringToMyMap(nongPassIds),
        nongPendingIds: mapStringToMyMap(nongPendingIds),
        nongShertManageIds,
        nongShertSize: sizeMapToJson(nongShertSize),
        nongSureIds,
        registerModel,
        round,
        actionPlanIds,
        allDone,
        authorizeIds,
        baanIds,
        boardIds,
        campStyleId,
        link,
        lockChangePickup,
        dataLock,
        dateEnd,
        dateStart,
        memberStructre,
        workItemIds,
        songIds,
        id,
        logoUrl,
        mapShertManageIdByUserId: mapStringToMyMap(mapShertManageIdByUserId),
        registerSheetLink,
        peeLock,
        outRoundIds,
        campName
    })
}
export function conPartBackToFront(input: InterPartBack): InterPartFront {
    const { id,
        nameId,
        campId,
        peeIds,
        petoIds,
        peeHelthIsueIds,
        petoHelthIsueIds,
        peeShertSize,
        petoShertSize,
        peeHaveBottle,
        petoHaveBottle,
        peeHaveBottleMapIds,
        petoHaveBottleMapIds,
        peeModelIds,
        petoModelId,
        peeShertManageIds,
        petoShertManageIds,
        actionPlanIds,
        workItemIds,
        mapShertManageIdByUserId,
        placeId } = input

    return ({
        actionPlanIds,
        workItemIds,
        id,
        campId,
        nameId,
        peeHaveBottle,
        peeHaveBottleMapIds: mapBoolToArray(peeHaveBottleMapIds),
        peeHelthIsueIds,
        peeIds,
        peeModelIds,
        peeShertManageIds,
        peeShertSize: sizeMapToJson(peeShertSize),
        petoHaveBottle,
        petoHaveBottleMapIds: mapBoolToArray(petoHaveBottleMapIds),
        petoHelthIsueIds,
        petoIds,
        petoModelId,
        petoShertManageIds,
        petoShertSize: sizeMapToJson(petoShertSize),
        placeId,
        mapShertManageIdByUserId: mapStringToMyMap(mapShertManageIdByUserId)
    })
}
export function mapStringToMyMap(input: Map<string, string>): MyMap[] {
    var out: MyMap[] = []
    input.forEach((value: string, key: string) => {
        out.push({ key, value })
    })
    return out
}
export function myMapToMapString(input: MyMap[]): Map<string, string> {
    const map: Map<string, string> = new Map
    input.forEach((v) => {
        map.set(v.key, v.value)
    })
    return map

}
export function linkSign(input: InterWorkingItem, token: string): InterWorkingItem {
    const {
        id,
        name,
        link,
        status,
        partId,
        campId,
        linkOutIds,
        fromId,
        createBy
    } = input
    return ({
        id,
        name,
        status,
        campId,
        linkOutIds,
        fromId,
        partId,
        link: jwt.sign(link, token),
        createBy
    })
}
function hashRaw(input:string,token:string):string{
    try {
        const out=jwt.verify(input,token)
        return out.toString()
    } catch (error) {
        return 'null'
    }
}
export function linkHash(input: InterWorkingItem, token: string): InterWorkingItem {
    const {
        id,
        name,
        link,
        status,
        partId,
        campId,
        linkOutIds,
        fromId,
        createBy
    } = input
    return ({
        id,
        name,
        status,
        campId,
        linkOutIds,
        fromId,
        partId,
        link: hashRaw(link, token),
        createBy
    })
}
