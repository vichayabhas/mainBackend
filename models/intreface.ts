import mongoose from "mongoose"

export interface IntreActionPlan {
    _id: mongoose.ObjectId,
    action: string,
    partId: string,
    placeIds: string[],
    start: Date,
    end: Date,
    headId: string,
    body: string
}
export interface InterBaan {
    _id: mongoose.ObjectId,
    name: string,
    fullName: string | null,
    campId: string,
    peeIds: string[],
    nongIds: string[],
    nongHelthIsueIds: string[],
    peeHelthIsueIds: string[],
    nongShertSize: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number>,
    peeShertSize: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number>,
    songIds: string[],
    nongHaveBottle: number,
    peeHaveBottle: number,
    nongHaveBottleMapIds: Map<string, boolean>,
    peeHaveBottleMapIds: Map<string, boolean>,
    peeModelIds: string[],
    nongModelId: string,
    mapPeeCampIdByPartId: Map<string, string>,
    nongShertManageIds: string[],
    peeShertManageIds: string[],
    link: string | null,
    styleId: string,
    boySleepPlaceId:string,
    girlSleepPlaceId:string,
    nomalPlaceId:string
}
export interface InterBuilding {
    _id: mongoose.ObjectId,
    name: string,
    placeIds: string[],
    actionPlanIds: string[],
    fridayActIds: string[]
}
export interface InterCamp {
    _id: mongoose.ObjectId,
    nameId: string,
    round: number,
    dateStart: Date,
    dateEnd: Date,
    boardIds: string[],
    peeIds: string[],
    nongIds: string[],
    partIds: string[],
    petoIds: string[],
    authorizeIds: string[],
    nongHelthIsueIds: string[],
    peeHelthIsueIds: string[],
    petoHelthIsueIds: string[],
    dataLock: boolean,
    nongShertSize: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number>,
    peeShertSize: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number>,
    petoShertSize: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number>,
    nongModelIds: string[],
    peeModelIds: string[],
    petoModelIds: string[],
    nongPendingIds: Map<string, string>,
    nongPassIds: Map<string, string>,
    open: boolean,
    peePassIds: Map<string, string>,//<userId,partId>
    songIds: string[],
    nongHaveBottle: number,
    peeHaveBottle: number,
    petoHaveBottle: number,
    nongHaveBottleMapIds: Map<string, boolean>,
    peeHaveBottleMapIds: Map<string, boolean>,
    petoHaveBottleMapIds: Map<string, boolean>,
    nongSureIds: string[],
    baanIds: string[],
    nongShertManageIds: string[],
    peeShertManageIds: string[],
    petoShertManageIds: string[],
    link: string,
    allDone: boolean,
    lockChangePickup: string,
    pictureUrls: string[],
    campStyleId: string,
    actionPlanIds: string[],
    workItemIds: string[],
    nongPaidIds: string[],
    nongInterviewIds: Map<string,string>,
    registerModel: 'noPaid' | 'noInterview' | 'all',
    havePeto:boolean
}
export interface InterCampStyle {
    _id: mongoose.ObjectId,
    refId: string,
    types: 'camp' | 'baan'
}
export interface InterFrydayAct {
    _id: mongoose.ObjectId,
    company: string,
    date: Date,
    staffId: string[],
    limit: number,
    studentId: string[],
    placeId: string
}
export interface InterHelthIsue {
    _id: mongoose.ObjectId,
    userId: string
}
export interface InterNameContainer {
    _id: mongoose.ObjectId,
    campIds: string[],
    name: string
}
export interface InterNongCamp {
    _id: mongoose.ObjectId,
    campId: string,
    baanId: string,
    nongIds: string[],
    nongShertManageIds: string[],
    mapNongCampIdByUserId: Map<string, string>
}
export interface InterPart {
    _id: mongoose.ObjectId,
    nameId: string,
    campId: string,
    peeIds: string[],
    petoIds: string[],
    peeHelthIsueIds: string[],
    petoHelthIsueIds: string[],
    peeShertSize: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number>,
    petoShertSize: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number>,
    peeHaveBottle: number,
    petoHaveBottle: number,
    peeHaveBottleMapIds: Map<string, boolean>,
    petoHaveBottleMapIds: Map<string, boolean>,
    peeModelIds: string[],
    petoModelId: string,
    mapPeeCampIdByBaanId: Map<string, string>,
    peeShertManageIds: string[],
    petoShertManageIds: string[],
    actionPlanIds: string[],
    workItemIds: string[]
}
export interface InterPartNameContainer {
    _id: mongoose.ObjectId,
    campIds: string[],
    name: string,
    partIds: string[]
}
export interface InterPeeCamp {
    _id: mongoose.ObjectId,
    campId: string,
    partId: string,
    baanId: string, peeIds: string[],
    peeShertManageIds: string[],
    arrayString1: string[],
    arrayString2: string[],
    arrayString3: string[],
    arrayString4: string[],
    arrayString5: string[],
    map1: Map<string, string>,
    map2: Map<string, string>,
    map3: Map<string, string>,
    map4: Map<string, string>,
    map5: Map<string, string>,
    mapArrayStringNumberByName: Map<string, string[]>
    mapMapNumberByName: Map<string, Map<string, string>>
    varibleNames: string[]
}
export interface InterPetoCamp {
    _id: mongoose.ObjectId
    campId: string,
    partId: string,
    petoShertManageIds: string,
    petoIds: {
        type: [String],
        default: []
    }
}
export interface InterPlace {
    _id: mongoose.ObjectId,
    buildingId: string,
    flore: string,
    room: string,
    actionPlanIds: string[],
    fridayActIds: string[],
    boySleepBaanIds:string[],
    girlSleepBaanIds:string[],
    normalBaanIds:string[],
    sleepCap:number,
    actCap:number,
    studyCap:number,
}
export interface InterShertManage {
    _id: mongoose.ObjectId,
    userId: string,
    size: 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL',
    campModelId: string,
    role: 'nong' | 'pee' | 'peto',
    recive: number,
    recived: number
}
export interface InterSong {
    _id: mongoose.ObjectId,
    name: string,
    campIds: string[],
    baanIds: string[],
    auther: string,
    time: TimeRanges,
    link: string,
    userLikeIds: string[]
}
export interface InterUser {
    id:string,
    name: string,
    lastname: string,
    nickname: string,
    email: string,
    password: string,
    resetPasswordToken: string,
    resetPasswordExpire: Date,
    studentId: string | null,
    gender: 'Male' | 'Female',
    shertSize: 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL',
    helthIsueId: string | null,
    haveBottle: boolean,
    mode: 'nong' | 'pee',
    nongCampIds: string[],
    peeCampIds: string[],
    petoCampIds: string[],
    group: 'A' | 'B' | 'C' | 'Dog' | 'E' | 'F' | 'G' | 'H' | 'J' | 'K' | 'L' | 'M' | 'N' | 'P' | 'Q' | 'R' | 'S' | 'T' | null,
    role: 'pee' | 'nong' | 'admin' | 'peto',
    filterIds: string[],
    registerIds: string[],
    authorizeIds: string[],
    fridayActIds: string[],
    fridayActEn: boolean,
    fridayAuth: boolean,
    likeSongIds: string[],
    shertManageIds: string[],
    createdAt: Date
}
export interface InterWorkingItem {
    _id: mongoose.ObjectId,
    name: string
    link: string
    status: 'not start' | 'in process' | 'done',
    partId: string,
    campId: string,
    linkOutIds: string[],
    fromId: string
}
