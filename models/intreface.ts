export interface HospitalItem {
    __id: string,
    name: string,
    address: string,
    district: string,
    province: string,
    postalcode: string,
    tel: string,
    picture: string,
    __v: number,
    _id: string
}

export interface HospitalJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: HospitalItem[]
}

import mongoose from "mongoose"

export interface IntreActionPlan {

    action: string,
    partId: mongoose.Types.ObjectId,
    placeIds: mongoose.Types.ObjectId[],
    start: Date,
    end: Date,
    headId: mongoose.Types.ObjectId,
    body: string,
    _id: mongoose.Types.ObjectId
}
export interface InterBaanBack {

    name: string,
    fullName: string | null,
    campId: mongoose.Types.ObjectId,
    peeIds: mongoose.Types.ObjectId[],
    nongIds: mongoose.Types.ObjectId[],
    nongHelthIsueIds: mongoose.Types.ObjectId[],
    peeHelthIsueIds: mongoose.Types.ObjectId[],
    nongShertSize: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number>,
    peeShertSize: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number>,
    songIds: mongoose.Types.ObjectId[],
    nongHaveBottle: number,
    peeHaveBottle: number,
    nongHaveBottleMapIds: Map<mongoose.Types.ObjectId, boolean>,
    peeHaveBottleMapIds: Map<mongoose.Types.ObjectId, boolean>,
    peeModelIds: mongoose.Types.ObjectId[],
    nongModelId: mongoose.Types.ObjectId,
    mapPeeCampIdByPartId: Map<mongoose.Types.ObjectId, mongoose.Types.ObjectId>,                    ///////////////////////i
    nongShertManageIds: mongoose.Types.ObjectId[],
    peeShertManageIds: mongoose.Types.ObjectId[],
    link: string | null,
    styleId: mongoose.Types.ObjectId,
    boySleepPlaceId: mongoose.Types.ObjectId | null,
    girlSleepPlaceId: mongoose.Types.ObjectId | null,
    nomalPlaceId: mongoose.Types.ObjectId | null,
    mapShertManageIdByUserId: Map<mongoose.Types.ObjectId, mongoose.Types.ObjectId>,
    _id: mongoose.Types.ObjectId,
    nongSleepIds: mongoose.Types.ObjectId[],
    peeSleepIds: mongoose.Types.ObjectId[],
    groupRef: 'A' | 'B' | 'C' | 'Dog' | 'E' | 'F' | 'G' | 'H' | 'J' | 'K' | 'L' | 'M' | 'N' | 'P' | 'Q' | 'R' | 'S' | 'T' | null
}
export interface InterBuilding {

    name: string,
    placeIds: mongoose.Types.ObjectId[],
    actionPlanIds: mongoose.Types.ObjectId[],
    fridayActIds: mongoose.Types.ObjectId[],
    _id: mongoose.Types.ObjectId,
    lostAndFoundIds: mongoose.Types.ObjectId[],
    boySleepBaanIds: mongoose.Types.ObjectId[],
    girlSleepBaanIds: mongoose.Types.ObjectId[],
    normalBaanIds: mongoose.Types.ObjectId[],
    partIds: mongoose.Types.ObjectId[]
}
export interface InterCampBack {

    nameId: mongoose.Types.ObjectId,
    round: number,
    dateStart: Date,
    dateEnd: Date,
    boardIds: mongoose.Types.ObjectId[],
    peeIds: mongoose.Types.ObjectId[],
    nongIds: mongoose.Types.ObjectId[],
    partIds: mongoose.Types.ObjectId[],
    petoIds: mongoose.Types.ObjectId[],
    authorizeIds: mongoose.Types.ObjectId[],
    nongHelthIsueIds: mongoose.Types.ObjectId[],
    peeHelthIsueIds: mongoose.Types.ObjectId[],
    petoHelthIsueIds: mongoose.Types.ObjectId[],
    dataLock: boolean,
    nongShertSize: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number>,
    peeShertSize: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number>,
    petoShertSize: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number>,
    nongModelIds: mongoose.Types.ObjectId[],
    peeModelIds: mongoose.Types.ObjectId[],
    petoModelIds: mongoose.Types.ObjectId[],
    nongPendingIds: Map<mongoose.Types.ObjectId, string>,                            /////////////i
    nongPassIds: Map<mongoose.Types.ObjectId, string>,                               ////////////////////i
    open: boolean,
    peePassIds: Map<mongoose.Types.ObjectId, mongoose.Types.ObjectId>,//<userId,partId>               ////////////////////////i
    songIds: mongoose.Types.ObjectId[],
    nongHaveBottle: number,
    peeHaveBottle: number,
    petoHaveBottle: number,
    nongHaveBottleMapIds: Map<mongoose.Types.ObjectId, boolean>,
    peeHaveBottleMapIds: Map<mongoose.Types.ObjectId, boolean>,
    petoHaveBottleMapIds: Map<mongoose.Types.ObjectId, boolean>,
    nongSureIds: mongoose.Types.ObjectId[],
    baanIds: mongoose.Types.ObjectId[],
    nongShertManageIds: mongoose.Types.ObjectId[],
    peeShertManageIds: mongoose.Types.ObjectId[],
    petoShertManageIds: mongoose.Types.ObjectId[],
    link: string | null,
    allDone: boolean,
    lockChangePickup: boolean,
    pictureUrls: string[],
    campStyleId: mongoose.Types.ObjectId,
    actionPlanIds: mongoose.Types.ObjectId[],
    workItemIds: mongoose.Types.ObjectId[],
    nongPaidIds: mongoose.Types.ObjectId[],
    nongInterviewIds: Map<mongoose.Types.ObjectId, string>,                            ////////////////////////////////i
    registerModel: 'noPaid' | 'noInterview' | 'all',
    memberStructre: 'nong->highSchool,pee->1year,peto->2upYear' | 'nong->highSchool,pee->2upYear' | 'nong->1year,pee->2upYear' | 'nong->highSchool,pee->allYear' | 'allYearMix',
    logoUrl: string | null,
    mapShertManageIdByUserId: Map<mongoose.Types.ObjectId, mongoose.Types.ObjectId>,
    registerSheetLink: string | null,
    peeLock: boolean,
    outRoundIds: mongoose.Types.ObjectId[],
    _id: mongoose.Types.ObjectId,
    campName: string,
    nongSleepIds: mongoose.Types.ObjectId[],
    peeSleepIds: mongoose.Types.ObjectId[],
    nongSleepModel: 'นอนทุกคน' | 'เลือกได้ว่าจะค้างคืนหรือไม่' | 'ไม่มีการค้างคืน',
    peeSleepModel: 'นอนทุกคน' | 'เลือกได้ว่าจะค้างคืนหรือไม่' | 'ไม่มีการค้างคืน'
    groupRefMap: Map<Group, mongoose.Types.ObjectId>,
    baanBordId: mongoose.Types.ObjectId|null,
    partNameIds:mongoose.Types.ObjectId[]
}
export interface InterCampStyle {

    refId: mongoose.Types.ObjectId,
    types: 'camp' | 'baan',
    _id: mongoose.Types.ObjectId
}
export interface InterFrydayAct {

    company: string,
    date: Date,
    staffId: mongoose.Types.ObjectId[],
    limit: number,
    studentId: mongoose.Types.ObjectId[],
    placeId: mongoose.Types.ObjectId,
    _id: mongoose.Types.ObjectId
}
export interface InterHelthIsue {

    userId: mongoose.Types.ObjectId,
    _id: mongoose.Types.ObjectId
}
export interface InterNameContainer {

    campIds: mongoose.Types.ObjectId[],
    name: string,
    _id: mongoose.Types.ObjectId
}
export interface InterNongCampBack {

    campId: mongoose.Types.ObjectId,
    baanId: mongoose.Types.ObjectId,
    nongIds: mongoose.Types.ObjectId[],
    nongShertManageIds: mongoose.Types.ObjectId[],
    _id: mongoose.Types.ObjectId
    //mapNongCampIdByUserId: Map<string, string>
}
export interface InterPartBack {

    nameId: mongoose.Types.ObjectId,
    campId: mongoose.Types.ObjectId,
    peeIds: mongoose.Types.ObjectId[],
    petoIds: mongoose.Types.ObjectId[],
    peeHelthIsueIds: mongoose.Types.ObjectId[],
    petoHelthIsueIds: mongoose.Types.ObjectId[],
    peeShertSize: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number>,
    petoShertSize: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number>,
    peeHaveBottle: number,
    petoHaveBottle: number,
    peeHaveBottleMapIds: Map<mongoose.Types.ObjectId, boolean>,
    petoHaveBottleMapIds: Map<mongoose.Types.ObjectId, boolean>,
    peeModelIds: mongoose.Types.ObjectId[],
    petoModelId: mongoose.Types.ObjectId,
    mapPeeCampIdByBaanId: Map<mongoose.Types.ObjectId, mongoose.Types.ObjectId>,                                     /////////////////i
    peeShertManageIds: mongoose.Types.ObjectId[],
    petoShertManageIds: mongoose.Types.ObjectId[],
    actionPlanIds: mongoose.Types.ObjectId[],
    workItemIds: mongoose.Types.ObjectId[],
    placeId: mongoose.Types.ObjectId | null,
    mapShertManageIdByUserId: Map<mongoose.Types.ObjectId, mongoose.Types.ObjectId>,
    _id: mongoose.Types.ObjectId,
    partName: string,
    peeSleepIds: mongoose.Types.ObjectId[]
}
export interface InterPartNameContainer {

    campIds: mongoose.Types.ObjectId[],
    name: string,
    partIds: mongoose.Types.ObjectId[],
    _id: mongoose.Types.ObjectId
}
export interface InterPeeCamp {

    campId: mongoose.Types.ObjectId,
    partId: mongoose.Types.ObjectId,
    baanId: mongoose.Types.ObjectId, peeIds: mongoose.Types.ObjectId[],
    peeShertManageIds: mongoose.Types.ObjectId[],
    _id: mongoose.Types.ObjectId

}
export interface InterPetoCamp {

    campId: mongoose.Types.ObjectId,
    partId: mongoose.Types.ObjectId,
    petoShertManageIds: mongoose.Types.ObjectId,
    petoIds: mongoose.Types.ObjectId[],
    _id: mongoose.Types.ObjectId
}
export interface InterPlace {

    buildingId: mongoose.Types.ObjectId,
    flore: string,
    room: string,
    actionPlanIds: mongoose.Types.ObjectId[],
    fridayActIds: mongoose.Types.ObjectId[],
    boySleepBaanIds: mongoose.Types.ObjectId[],
    girlSleepBaanIds: mongoose.Types.ObjectId[],
    normalBaanIds: mongoose.Types.ObjectId[],
    sleepCap: number,
    actCap: number,
    studyCap: number,
    _id: mongoose.Types.ObjectId
}
export interface InterShertManage {

    userId: mongoose.Types.ObjectId,
    size: 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL',
    campModelId: mongoose.Types.ObjectId,
    role: 'nong' | 'pee' | 'peto',
    recive: number,
    recived: number,
    _id: mongoose.Types.ObjectId,
    haveBottle: boolean,
    sleepAtCamp: boolean
}
export interface InterSong {

    name: string,
    campIds: mongoose.Types.ObjectId[],
    baanIds: mongoose.Types.ObjectId[],
    auther: string,
    time: TimeRanges,
    link: string,
    userLikeIds: mongoose.Types.ObjectId[],
    _id: mongoose.Types.ObjectId
}
export interface InterUser {
    //                          id ของ mongodb
    name: string,//                        ชื่อจริง
    lastname: string,//                    นามสกุล
    nickname: string,//                    ชื่อเล่น
    email: string,//updateable             email
    password: string,//                    รหัสผ่าน
    resetPasswordToken: string,
    resetPasswordExpire: Date,
    studentId: string | null,//            รหัสประจำตัวนิสิต
    gender: 'Male' | 'Female',//           เพศ
    shertSize: 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL',//ขนาดเสื้อ
    helthIsueId: mongoose.Types.ObjectId | null,//          รหัสปัญหาสุขภาพ
    haveBottle: boolean,//                 มีกระติกน้ำหรือไม่
    mode: 'nong' | 'pee',//                การมองเห็นของพี่
    nongCampIds: mongoose.Types.ObjectId[],//               เคยเป็นน้องค่ายอะไรบ้าง
    peeCampIds: mongoose.Types.ObjectId[],//                เคยเป็นพี่บ้านค่ายอะไรบ้าง
    petoCampIds: mongoose.Types.ObjectId[],//               เคยเป็นพี่ปีโตค่ายอะไรบ้าง
    group: 'A' | 'B' | 'C' | 'Dog' | 'E' | 'F' | 'G' | 'H' | 'J' | 'K' | 'L' | 'M' | 'N' | 'P' | 'Q' | 'R' | 'S' | 'T' | null,//กรุปของนิสิต
    role: 'pee' | 'nong' | 'admin' | 'peto',//บทบาท
    filterIds: mongoose.Types.ObjectId[],//                 
    registerIds: mongoose.Types.ObjectId[],//               
    authorizeIds: mongoose.Types.ObjectId[],//              ได้รับอนุญาตให้จัดการค่ายอะไรบ้าง
    fridayActIds: mongoose.Types.ObjectId[],//              ลง friday activity อะไรบ้าง
    fridayActEn: boolean,//                ได้รับอนุญาติให้ลง friday activity หรือไม่
    fridayAuth: boolean,//                 ได้รับอนุญาติให้จัดการ friday activity หรือไม่
    likeSongIds: mongoose.Types.ObjectId[],//               ชอบเพลงอะไรบ้าง
    shertManageIds: mongoose.Types.ObjectId[],//            เป็นสมาชิกค่ายอะไรบ้าง
    createdAt: Date,//
    tel: string,   //                      เบอร์โทรศัพท์
    linkHash: string,//                    รหัสการเข้าถึงลิ้งในการทำงาน default 'null'
    citizenId: string,//                     รหัสประจำตัวประชาชน
    _id: mongoose.Types.ObjectId,
    likeToSleepAtCamp: boolean
}
export interface InterWorkingItem {

    name: string,
    link: string,
    status: 'not start' | 'in process' | 'done',
    partId: mongoose.Types.ObjectId,
    campId: mongoose.Types.ObjectId,
    linkOutIds: mongoose.Types.ObjectId[],
    fromId: mongoose.Types.ObjectId,
    createBy: mongoose.Types.ObjectId,
    _id: mongoose.Types.ObjectId
}
export interface InterSize {
    _id: mongoose.Types.ObjectId | null,
    sizeS: number,
    sizeM: number,
    sizeL: number,
    sizeXL: number,
    sizeXXL: number,
    size3XL: number,

}

//////////////////////////////////////////////////////////

export interface InterBaanFront {

    name: string,
    fullName: string | null,
    campId: mongoose.Types.ObjectId,
    peeIds: mongoose.Types.ObjectId[],
    nongIds: mongoose.Types.ObjectId[],
    nongHelthIsueIds: mongoose.Types.ObjectId[],
    peeHelthIsueIds: mongoose.Types.ObjectId[],
    nongShertSize: InterSize,//
    peeShertSize: InterSize,//
    songIds: mongoose.Types.ObjectId[],
    nongHaveBottle: number,
    peeHaveBottle: number,
    nongHaveBottleMapIds: mongoose.Types.ObjectId[],//
    peeHaveBottleMapIds: mongoose.Types.ObjectId[],//
    peeModelIds: mongoose.Types.ObjectId[],
    nongModelId: mongoose.Types.ObjectId,
    nongShertManageIds: mongoose.Types.ObjectId[],
    peeShertManageIds: mongoose.Types.ObjectId[],
    link: string | null,
    styleId: mongoose.Types.ObjectId,
    boySleepPlaceId: mongoose.Types.ObjectId | null,
    girlSleepPlaceId: mongoose.Types.ObjectId | null,
    nomalPlaceId: mongoose.Types.ObjectId | null,
    mapShertManageIdByUserId: MapObjectId[],
    _id: mongoose.Types.ObjectId,
    nongSleepIds: mongoose.Types.ObjectId[],
    peeSleepIds: mongoose.Types.ObjectId[],
    groupRef: 'A' | 'B' | 'C' | 'Dog' | 'E' | 'F' | 'G' | 'H' | 'J' | 'K' | 'L' | 'M' | 'N' | 'P' | 'Q' | 'R' | 'S' | 'T' | null
}

export interface InterCampFront {

    nameId: mongoose.Types.ObjectId,
    round: number,
    dateStart: Date,
    dateEnd: Date,
    boardIds: mongoose.Types.ObjectId[],
    peeIds: mongoose.Types.ObjectId[],
    nongIds: mongoose.Types.ObjectId[],
    partIds: mongoose.Types.ObjectId[],
    petoIds: mongoose.Types.ObjectId[],
    authorizeIds: mongoose.Types.ObjectId[],
    nongHelthIsueIds: mongoose.Types.ObjectId[],
    peeHelthIsueIds: mongoose.Types.ObjectId[],
    petoHelthIsueIds: mongoose.Types.ObjectId[],
    dataLock: boolean,
    nongShertSize: InterSize,
    peeShertSize: InterSize,
    petoShertSize: InterSize,
    nongModelIds: mongoose.Types.ObjectId[],
    peeModelIds: mongoose.Types.ObjectId[],
    petoModelIds: mongoose.Types.ObjectId[],
    nongPendingIds: MyMap[],                            /////////////i
    nongPassIds: MyMap[],                               ////////////////////i
    open: boolean,
    peePassIds: MapObjectId[],//<userId,partId>               ////////////////////////i
    songIds: mongoose.Types.ObjectId[],
    nongHaveBottle: number,
    peeHaveBottle: number,
    petoHaveBottle: number,
    nongHaveBottleMapIds: mongoose.Types.ObjectId[],
    peeHaveBottleMapIds: mongoose.Types.ObjectId[],
    petoHaveBottleMapIds: mongoose.Types.ObjectId[],
    nongSureIds: mongoose.Types.ObjectId[],
    baanIds: mongoose.Types.ObjectId[],
    nongShertManageIds: mongoose.Types.ObjectId[],
    peeShertManageIds: mongoose.Types.ObjectId[],
    petoShertManageIds: mongoose.Types.ObjectId[],
    link: string | null,
    allDone: boolean,
    lockChangePickup: boolean,
    pictureUrls: string[],
    campStyleId: mongoose.Types.ObjectId,
    actionPlanIds: mongoose.Types.ObjectId[],
    workItemIds: mongoose.Types.ObjectId[],
    nongPaidIds: mongoose.Types.ObjectId[],
    nongInterviewIds: MyMap[],                            ////////////////////////////////i
    registerModel: 'noPaid' | 'noInterview' | 'all',
    memberStructre: 'nong->highSchool,pee->1year,peto->2upYear' | 'nong->highSchool,pee->2upYear' | 'nong->1year,pee->2upYear' | 'nong->highSchool,pee->allYear' | 'allYearMix',
    logoUrl: string | null,
    mapShertManageIdByUserId: MapObjectId[],
    registerSheetLink: string | null,
    peeLock: boolean,
    outRoundIds: mongoose.Types.ObjectId[],
    _id: mongoose.Types.ObjectId,
    campName: string,
    nongSleepIds: mongoose.Types.ObjectId[],
    peeSleepIds: mongoose.Types.ObjectId[],
    nongSleepModel: 'นอนทุกคน' | 'เลือกได้ว่าจะค้างคืนหรือไม่' | 'ไม่มีการค้างคืน',
    peeSleepModel: 'นอนทุกคน' | 'เลือกได้ว่าจะค้างคืนหรือไม่' | 'ไม่มีการค้างคืน',
    baanBordId: mongoose.Types.ObjectId|null,
    partNameIds:mongoose.Types.ObjectId[]
}
export interface InterPartFront {

    nameId: mongoose.Types.ObjectId,
    campId: mongoose.Types.ObjectId,
    peeIds: mongoose.Types.ObjectId[],
    petoIds: mongoose.Types.ObjectId[],
    peeHelthIsueIds: mongoose.Types.ObjectId[],
    petoHelthIsueIds: mongoose.Types.ObjectId[],
    peeShertSize: InterSize,
    petoShertSize: InterSize,
    peeHaveBottle: number,
    petoHaveBottle: number,
    peeHaveBottleMapIds: mongoose.Types.ObjectId[],
    petoHaveBottleMapIds: mongoose.Types.ObjectId[],
    peeModelIds: mongoose.Types.ObjectId[],
    petoModelId: mongoose.Types.ObjectId,
    peeShertManageIds: mongoose.Types.ObjectId[],
    petoShertManageIds: mongoose.Types.ObjectId[],
    actionPlanIds: mongoose.Types.ObjectId[],
    workItemIds: mongoose.Types.ObjectId[],
    placeId: mongoose.Types.ObjectId | null,
    mapShertManageIdByUserId: MapObjectId[],
    _id: mongoose.Types.ObjectId,
    partName: string
    peeSleepIds: mongoose.Types.ObjectId[],
}
export interface MyMap {
    key: mongoose.Types.ObjectId,
    value: string
}
export interface InterLostAndFound {
    campId: mongoose.Types.ObjectId | null,
    type: 'lost' | 'found',
    name: string,
    detail: string,
    userId: mongoose.Types.ObjectId,
    placeId: mongoose.Types.ObjectId | null,
    buildingId: mongoose.Types.ObjectId | null,
    _id: mongoose.Types.ObjectId
}
export interface Register {
    name: string,
    lastname: string,
    nickname: string,
    email: string,
    password: string,
    gender: 'Male' | 'Female',
    shertSize: 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL',
    haveBottle: boolean,
    tel: string,
    citizenId: string,
    likeToSleepAtCamp: boolean
}
export interface UpdateCamp {
    dataLock: boolean,
    open: boolean,
    link: string | null,
    allDone: boolean,
    lockChangePickup: boolean,
    pictureUrls: string[],
    logoUrl: string | null,
    dateStart: Date,
    dateEnd: Date,
    registerSheetLink: string | null,
    peeLock: boolean
}
export interface CreateCamp {
    nameId: mongoose.Types.ObjectId,
    round: number,
    dateStart: Date,
    dateEnd: Date,
    boardIds: mongoose.Types.ObjectId[],
    registerModel: 'noPaid' | 'noInterview' | 'all',
    memberStructre: 'nong->highSchool,pee->1year,peto->2upYear' | 'nong->highSchool,pee->2upYear' | 'nong->1year,pee->2upYear' | 'nong->highSchool,pee->allYear' | 'allYearMix',
    nongSleepModel: 'นอนทุกคน' | 'เลือกได้ว่าจะค้างคืนหรือไม่' | 'ไม่มีการค้างคืน',
    peeSleepModel: 'นอนทุกคน' | 'เลือกได้ว่าจะค้างคืนหรือไม่' | 'ไม่มีการค้างคืน'
}
export interface MapObjectId {
    key: mongoose.Types.ObjectId,
    value: mongoose.Types.ObjectId
}
export interface ShowMember {
    //                          id ของ mongodb
    name: string,//                        ชื่อจริง
    lastname: string,//                    นามสกุล
    nickname: string,//                    ชื่อเล่น
    email: string,//updateable             email
    studentId: string | null,//            รหัสประจำตัวนิสิต
    gender: 'Male' | 'Female',//           เพศ
    shertSize: 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL',//ขนาดเสื้อ
    helthIsueId: mongoose.Types.ObjectId | null,//          รหัสปัญหาสุขภาพ
    haveBottle: boolean,//                 มีกระติกน้ำหรือไม่
    group: 'A' | 'B' | 'C' | 'Dog' | 'E' | 'F' | 'G' | 'H' | 'J' | 'K' | 'L' | 'M' | 'N' | 'P' | 'Q' | 'R' | 'S' | 'T' | null,//กรุปของนิสิต           
    likeSongs: string[],//               ชอบเพลงอะไรบ้าง
    tel: string,   //                      เบอร์โทรศัพท์
    _id: mongoose.Types.ObjectId,
    sleep: boolean
}
export interface UpdateBaan {
    name: string,
    fullName: string | null,
    baanId: mongoose.Types.ObjectId,
    link: string | null,
    girlSleepPlaceId: mongoose.Types.ObjectId | null,
    boySleepPlaceId: mongoose.Types.ObjectId | null,
    nomalPlaceId: mongoose.Types.ObjectId | null,
}
export type Group = 'A' | 'B' | 'C' | 'Dog' | 'E' | 'F' | 'G' | 'H' | 'J' | 'K' | 'L' | 'M' | 'N' | 'P' | 'Q' | 'R' | 'S' | 'T'
export type Size = 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'
export type RoleCamp = Mode | 'peto'
export type Role = RoleCamp | 'admin'
export type Mode='nong' | 'pee'