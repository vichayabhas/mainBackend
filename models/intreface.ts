export interface IntreActionPlan {
    id: string,
    action: string,
    partId: string,
    placeIds: string[],
    start: Date,
    end: Date,
    headId: string,
    body: string
}
export interface InterBaanBack {
    id: string,
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
    mapPeeCampIdByPartId: Map<string, string>,                    ///////////////////////i
    nongShertManageIds: string[],
    peeShertManageIds: string[],
    link: string | null,
    styleId: string,
    boySleepPlaceId: string | null,
    girlSleepPlaceId: string | null,
    nomalPlaceId: string | null,
    mapShertManageIdByUserId: Map<string, string>
}
export interface InterBuilding {
    id: string,
    name: string,
    placeIds: string[],
    actionPlanIds: string[],
    fridayActIds: string[]
}
export interface InterCampBack {
    id: string,
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
    nongPendingIds: Map<string, string>,                            /////////////i
    nongPassIds: Map<string, string>,                               ////////////////////i
    open: boolean,
    peePassIds: Map<string, string>,//<userId,partId>               ////////////////////////i
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
    link: string | null,
    allDone: boolean,
    lockChangePickup: boolean,
    pictureUrls: string[],
    campStyleId: string,
    actionPlanIds: string[],
    workItemIds: string[],
    nongPaidIds: string[],
    nongInterviewIds: Map<string, string>,                            ////////////////////////////////i
    registerModel: 'noPaid' | 'noInterview' | 'all',
    memberStructre: 'nong->highSchool,pee->1year,peto->2upYear' | 'nong->highSchool,pee->2upYear' | 'nong->1year,pee->2upYear' | 'nong->highSchool,pee->allYear' | 'allYearMix' | 'allYearMix',
    logoUrl: string,
    mapShertManageIdByUserId: Map<string, string>,
    registerSheetLink: string,
    peeLock: boolean,
    outRoundIds: string[],
    campName:string
}
export interface InterCampStyle {
    id: string,
    refId: string,
    types: 'camp' | 'baan'
}
export interface InterFrydayAct {
    id: string,
    company: string,
    date: Date,
    staffId: string[],
    limit: number,
    studentId: string[],
    placeId: string
}
export interface InterHelthIsue {
    id: string,
    userId: string
    foodIds: string[],
    chronicDiseaseIds: string[],
    medicineIds: string[],
    isWearing: boolean
}
export interface InterNameContainer {
    id: string,
    campIds: string[],
    name: string
}
export interface InterNongCampBack {
    id: string,
    campId: string,
    baanId: string,
    nongIds: string[],
    nongShertManageIds: string[],
    mapNongCampIdByUserId: Map<string, string>
}
export interface InterPartBack {
    id: string,
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
    mapPeeCampIdByBaanId: Map<string, string>,                                     /////////////////i
    peeShertManageIds: string[],
    petoShertManageIds: string[],
    actionPlanIds: string[],
    workItemIds: string[],
    placeId: string | null,
    mapShertManageIdByUserId: Map<string, string>
}
export interface InterPartNameContainer {
    id: string,
    campIds: string[],
    name: string,
    partIds: string[]
}
export interface InterPeeCamp {
    id: string,
    campId: string,
    partId: string,
    baanId: string, peeIds: string[],
    peeShertManageIds: string[],

}
export interface InterPetoCamp {
    id: string,
    campId: string,
    partId: string,
    petoShertManageIds: string,
    petoIds: string[]
}
export interface InterPlace {
    id: string,
    buildingId: string,
    flore: string,
    room: string,
    actionPlanIds: string[],
    fridayActIds: string[],
    boySleepBaanIds: string[],
    girlSleepBaanIds: string[],
    normalBaanIds: string[],
    sleepCap: number,
    actCap: number,
    studyCap: number,
}
export interface InterShertManage {
    id: string,
    userId: string,
    size: 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL',
    campModelId: string,
    role: 'nong' | 'pee' | 'peto',
    recive: number,
    recived: number
}
export interface InterSong {
    id: string,
    name: string,
    campIds: string[],
    baanIds: string[],
    auther: string,
    time: TimeRanges,
    link: string,
    userLikeIds: string[]
}
export interface InterUser {
    id: string,
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
    createdAt: Date,
    tel: string,
    linkHash: string,
    citizenId: string
}
export interface InterWorkingItem {
    id: string,
    name: string,
    link: string,
    status: 'not start' | 'in process' | 'done',
    partId: string,
    campId: string,
    linkOutIds: string[],
    fromId: string,
    createBy: string
}
export interface InterSize {
    id: string | null,
    sizeS: number,
    sizeM: number,
    sizeL: number,
    sizeXL: number,
    sizeXXL: number,
    size3XL: number
}

//////////////////////////////////////////////////////////

export interface InterBaanFront {
    id: string,
    name: string,
    fullName: string | null,
    campId: string,
    peeIds: string[],
    nongIds: string[],
    nongHelthIsueIds: string[],
    peeHelthIsueIds: string[],
    nongShertSize: InterSize,//
    peeShertSize: InterSize,//
    songIds: string[],
    nongHaveBottle: number,
    peeHaveBottle: number,
    nongHaveBottleMapIds: string[],//
    peeHaveBottleMapIds: string[],//
    peeModelIds: string[],
    nongModelId: string,
    nongShertManageIds: string[],
    peeShertManageIds: string[],
    link: string | null,
    styleId: string,
    boySleepPlaceId: string | null,
    girlSleepPlaceId: string | null,
    nomalPlaceId: string | null,
    mapShertManageIdByUserId: MyMap[]
}

export interface InterCampFront {
    id: string,
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
    nongShertSize: InterSize,
    peeShertSize: InterSize,
    petoShertSize: InterSize,
    nongModelIds: string[],
    peeModelIds: string[],
    petoModelIds: string[],
    nongPendingIds: MyMap[],                            /////////////i
    nongPassIds: MyMap[],                               ////////////////////i
    open: boolean,
    peePassIds: MyMap[],//<userId,partId>               ////////////////////////i
    songIds: string[],
    nongHaveBottle: number,
    peeHaveBottle: number,
    petoHaveBottle: number,
    nongHaveBottleMapIds: string[],
    peeHaveBottleMapIds: string[],
    petoHaveBottleMapIds: string[],
    nongSureIds: string[],
    baanIds: string[],
    nongShertManageIds: string[],
    peeShertManageIds: string[],
    petoShertManageIds: string[],
    link: string | null,
    allDone: boolean,
    lockChangePickup: boolean,
    pictureUrls: string[],
    campStyleId: string,
    actionPlanIds: string[],
    workItemIds: string[],
    nongPaidIds: string[],
    nongInterviewIds: MyMap[],                            ////////////////////////////////i
    registerModel: 'noPaid' | 'noInterview' | 'all',
    memberStructre: 'nong->highSchool,pee->1year,peto->2upYear' | 'nong->highSchool,pee->2upYear' | 'nong->1year,pee->2upYear' | 'nong->highSchool,pee->allYear' | 'allYearMix',
    logoUrl: string,
    mapShertManageIdByUserId: MyMap[],
    registerSheetLink: string,
    peeLock: boolean,
    outRoundIds: string[],
    campName:string
}
export interface InterPartFront {
    id: string,
    nameId: string,
    campId: string,
    peeIds: string[],
    petoIds: string[],
    peeHelthIsueIds: string[],
    petoHelthIsueIds: string[],
    peeShertSize: InterSize,
    petoShertSize: InterSize,
    peeHaveBottle: number,
    petoHaveBottle: number,
    peeHaveBottleMapIds: string[],
    petoHaveBottleMapIds: string[],
    peeModelIds: string[],
    petoModelId: string,
    peeShertManageIds: string[],
    petoShertManageIds: string[],
    actionPlanIds: string[],
    workItemIds: string[],
    placeId: string | null,
    mapShertManageIdByUserId: MyMap[]
}
export interface MyMap {
    key: string,
    value: string
}
export interface InterLostAndFound {
    campId: string | null,
    type: 'lost' | 'found',
    name: string,
    detail: string,
    userId: string,
    placeId: string | null,
    buildingId: string | null,
    tel: string
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
    citizenId: string
}
export interface UpdateCamp {
    dataLock: boolean,
    open: boolean,
    link: string | null,
    allDone: boolean,
    lockChangePickup: boolean,
    pictureUrls: string[],
    logoUrl: string,
    dateStart: Date,
    dateEnd: Date,
    registerSheetLink: string,
    peeLock: boolean
}
export interface CreateCamp {
    nameId: string,
    round: number,
    dateStart: Date,
    dateEnd: Date,
    boardIds: string[],
    registerModel: 'noPaid' | 'noInterview' | 'all',
    memberStructre: 'nong->highSchool,pee->1year,peto->2upYear' | 'nong->highSchool,pee->2upYear' | 'nong->1year,pee->2upYear' | 'nong->highSchool,pee->allYear' | 'allYearMix',
}