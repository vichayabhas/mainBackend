
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
export interface InterActionPlan {
    action: string,
    partId: mongoose.Types.ObjectId,
    placeIds: mongoose.Types.ObjectId[],
    start: Date,
    end: Date,
    headId: mongoose.Types.ObjectId,
    body: string,
    _id: mongoose.Types.ObjectId,
    partName: string,
}
export interface InterBaanBack {
    name: string,
    fullName: string | null,
    campId: mongoose.Types.ObjectId,
    peeIds: mongoose.Types.ObjectId[],
    nongIds: mongoose.Types.ObjectId[],
    nongHeathIssueIds: mongoose.Types.ObjectId[],
    peeHeathIssueIds: mongoose.Types.ObjectId[],
    nongShirtSize: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number>,
    peeShirtSize: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number>,
    songIds: mongoose.Types.ObjectId[],
    peeModelIds: mongoose.Types.ObjectId[],
    nongModelId: mongoose.Types.ObjectId,
    mapPeeCampIdByPartId: Map<mongoose.Types.ObjectId, mongoose.Types.ObjectId>,                    ///////////////////////i
    nongCampMemberCardIds: mongoose.Types.ObjectId[],
    peeCampMemberCardIds: mongoose.Types.ObjectId[],
    link: string | null,
    styleId: mongoose.Types.ObjectId,
    boySleepPlaceId: mongoose.Types.ObjectId | null,
    girlSleepPlaceId: mongoose.Types.ObjectId | null,
    normalPlaceId: mongoose.Types.ObjectId | null,
    mapCampMemberCardIdByUserId: Map<mongoose.Types.ObjectId, mongoose.Types.ObjectId>,
    _id: mongoose.Types.ObjectId,
    nongSleepIds: mongoose.Types.ObjectId[],
    peeSleepIds: mongoose.Types.ObjectId[],
    groupRef: 'A' | 'B' | 'C' | 'Dog' | 'E' | 'F' | 'G' | 'H' | 'J' | 'K' | 'L' | 'M' | 'N' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'null'
    chatIds: mongoose.Types.ObjectId[],
    mdTime: Date,
    peeChatIds: mongoose.Types.ObjectId[],
    nongChatIds: mongoose.Types.ObjectId[],
    nongSendMessage: boolean,
    nongCampMemberCardHaveHeathIssueIds: mongoose.Types.ObjectId[],
    peeCampMemberCardHaveHeathIssueIds: mongoose.Types.ObjectId[],
    nongHaveBottleIds: mongoose.Types.ObjectId[],
    peeHaveBottleIds: mongoose.Types.ObjectId[],
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
    nongHeathIssueIds: mongoose.Types.ObjectId[],
    peeHeathIssueIds: mongoose.Types.ObjectId[],
    petoHeathIssueIds: mongoose.Types.ObjectId[],
    dataLock: boolean,
    nongShirtSize: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number>,
    peeShirtSize: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number>,
    petoShirtSize: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number>,
    nongModelIds: mongoose.Types.ObjectId[],
    peeModelIds: mongoose.Types.ObjectId[],
    petoModelIds: mongoose.Types.ObjectId[],
    nongPendingIds: Map<mongoose.Types.ObjectId, string>,                            /////////////i
    nongPassIds: Map<mongoose.Types.ObjectId, string>,                               ////////////////////i
    open: boolean,
    peePassIds: Map<mongoose.Types.ObjectId, mongoose.Types.ObjectId>,//<userId,partId>               ////////////////////////i
    songIds: mongoose.Types.ObjectId[],
    nongSureIds: mongoose.Types.ObjectId[],
    baanIds: mongoose.Types.ObjectId[],
    nongCampMemberCardIds: mongoose.Types.ObjectId[],
    peeCampMemberCardIds: mongoose.Types.ObjectId[],
    petoCampMemberCardIds: mongoose.Types.ObjectId[],
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
    memberStructure: 'nong->highSchool,pee->1year,peto->2upYear' | 'nong->highSchool,pee->2upYear' | 'nong->1year,pee->2upYear' | 'nong->highSchool,pee->allYear' | 'allYearMix',
    logoUrl: string | null,
    mapCampMemberCardIdByUserId: Map<mongoose.Types.ObjectId, mongoose.Types.ObjectId>,
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
    baanBoardId: mongoose.Types.ObjectId | null,
    partNameIds: mongoose.Types.ObjectId[],
    partBoardId: mongoose.Types.ObjectId,
    partCoopId: mongoose.Types.ObjectId,
    partRegisterId: mongoose.Types.ObjectId,
    partPeeBaanId: mongoose.Types.ObjectId,
    groupName: string,
    peeDataLock: boolean,
    petoDataLock: boolean,
    haveCloth: boolean,
    actionPlanOffset: number,
    nongMapIdLtoG: Map<number, mongoose.Types.ObjectId>,
    peeMapIdLtoG: Map<number, mongoose.Types.ObjectId>,
    nongMapIdGtoL: Map<mongoose.Types.ObjectId, number>,
    peeMapIdGtoL: Map<mongoose.Types.ObjectId, number>,
    currentNong: number,
    currentPee: number,
    mdTime: Date,
    partWelfareId: mongoose.Types.ObjectId,
    partMedId: mongoose.Types.ObjectId,
    partPlanId: mongoose.Types.ObjectId,
    allPetoChatIds: mongoose.Types.ObjectId[],
    petoSleepIds: mongoose.Types.ObjectId[],
    nongCampMemberCardHaveHeathIssueIds: mongoose.Types.ObjectId[],
    peeCampMemberCardHaveHeathIssueIds: mongoose.Types.ObjectId[],
    petoCampMemberCardHaveHeathIssueIds: mongoose.Types.ObjectId[],
    nongHaveBottleIds: mongoose.Types.ObjectId[],
    peeHaveBottleIds: mongoose.Types.ObjectId[],
    petoHaveBottleIds: mongoose.Types.ObjectId[],
}
export interface InterCampStyle {
    refId: mongoose.Types.ObjectId,
    types: 'camp' | 'baan',
    _id: mongoose.Types.ObjectId
}
export interface InterFridayAct {
    company: string,
    date: Date,
    staffId: mongoose.Types.ObjectId[],
    limit: number,
    studentId: mongoose.Types.ObjectId[],
    placeId: mongoose.Types.ObjectId,
    _id: mongoose.Types.ObjectId
}
export interface InterHeathIssue extends HeathIssueBody {
    userId: mongoose.Types.ObjectId,
    _id: mongoose.Types.ObjectId
    campIds: mongoose.Types.ObjectId[]
    // nongCampIds: mongoose.Types.ObjectId[],
    // peeCampIds: mongoose.Types.ObjectId[],
    // petoCampIds: mongoose.Types.ObjectId[],
    campMemberCardIds: mongoose.Types.ObjectId[],
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
    nongCampMemberCardIds: mongoose.Types.ObjectId[],
    _id: mongoose.Types.ObjectId,
    //mapNongCampIdByUserId: Map<string, string>
}
export interface InterPartBack {
    nameId: mongoose.Types.ObjectId,
    campId: mongoose.Types.ObjectId,
    peeIds: mongoose.Types.ObjectId[],
    petoIds: mongoose.Types.ObjectId[],
    peeHeathIssueIds: mongoose.Types.ObjectId[],
    petoHeathIssueIds: mongoose.Types.ObjectId[],
    peeShirtSize: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number>,
    petoShirtSize: Map<'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL', number>,
    peeModelIds: mongoose.Types.ObjectId[],
    petoModelId: mongoose.Types.ObjectId,
    mapPeeCampIdByBaanId: Map<mongoose.Types.ObjectId, mongoose.Types.ObjectId>,                                     /////////////////i
    peeCampMemberCardIds: mongoose.Types.ObjectId[],
    petoCampMemberCardIds: mongoose.Types.ObjectId[],
    actionPlanIds: mongoose.Types.ObjectId[],
    workItemIds: mongoose.Types.ObjectId[],
    placeId: mongoose.Types.ObjectId | null,
    mapCampMemberCardIdByUserId: Map<mongoose.Types.ObjectId, mongoose.Types.ObjectId>,
    _id: mongoose.Types.ObjectId,
    partName: string,
    peeSleepIds: mongoose.Types.ObjectId[],
    chatIds: mongoose.Types.ObjectId[],
    isAuth: boolean,
    petoSleepIds: mongoose.Types.ObjectId[],
    peeCampMemberCardHaveHeathIssueIds: mongoose.Types.ObjectId[],
    petoCampMemberCardHaveHeathIssueIds: mongoose.Types.ObjectId[],
    peeHaveBottleIds: mongoose.Types.ObjectId[],
    petoHaveBottleIds: mongoose.Types.ObjectId[],
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
    peeCampMemberCardIds: mongoose.Types.ObjectId[],
    _id: mongoose.Types.ObjectId,
}
export interface InterPetoCamp {
    campId: mongoose.Types.ObjectId,
    partId: mongoose.Types.ObjectId,
    petoCampMemberCardIds: mongoose.Types.ObjectId,
    petoIds: mongoose.Types.ObjectId[],
    _id: mongoose.Types.ObjectId,
}
export interface InterPlace {
    buildingId: mongoose.Types.ObjectId,
    floor: string,
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
export interface InterCampMemberCard {
    userId: mongoose.Types.ObjectId,
    size: 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL',
    campModelId: mongoose.Types.ObjectId,
    role: 'nong' | 'pee' | 'peto',
    receive: number,
    received: number,
    _id: mongoose.Types.ObjectId,
    haveBottle: boolean,
    sleepAtCamp: boolean,
    chatIds: mongoose.Types.ObjectId[],
    allChatIds: mongoose.Types.ObjectId[],
    ownChatIds: mongoose.Types.ObjectId[],
    heathIssueId: mongoose.Types.ObjectId | null,
}
export interface InterSong {
    name: string,
    campIds: mongoose.Types.ObjectId[],
    baanIds: mongoose.Types.ObjectId[],
    author: string,
    time: number,
    link: string,
    userLikeIds: mongoose.Types.ObjectId[],
    _id: mongoose.Types.ObjectId
}
export interface InterUser {
    name: string,//                       
    lastname: string,//
    nickname: string,//                   
    email: string,//
    password: string,//                 
    resetPasswordToken: string,
    resetPasswordExpire: Date,
    studentId: string | null,//            
    gender: 'Male' | 'Female',//          
    shirtSize: 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL',//
    heathIssueId: mongoose.Types.ObjectId | null,//          
    haveBottle: boolean,//                
    mode: 'nong' | 'pee',//                
    nongCampIds: mongoose.Types.ObjectId[],//               
    peeCampIds: mongoose.Types.ObjectId[],//                
    petoCampIds: mongoose.Types.ObjectId[],//               
    group: 'A' | 'B' | 'C' | 'Dog' | 'E' | 'F' | 'G' | 'H' | 'J' | 'K' | 'L' | 'M' | 'N' | 'P' | 'Q' | 'R' | 'S' | 'T' | null,//
    role: 'pee' | 'nong' | 'admin' | 'peto',//
    filterIds: mongoose.Types.ObjectId[],//                 
    registerIds: mongoose.Types.ObjectId[],//               
    authorizeIds: mongoose.Types.ObjectId[],//              
    fridayActIds: mongoose.Types.ObjectId[],//              ลง friday activity 
    fridayActEn: boolean,//                 friday activity 
    fridayAuth: boolean,//                  friday activity 
    likeSongIds: mongoose.Types.ObjectId[],//               
    campMemberCardIds: mongoose.Types.ObjectId[],//            
    createdAt: Date,//
    tel: string,   //                      
    linkHash: string,//                     default 'null'
    citizenId: string,//                     
    _id: mongoose.Types.ObjectId,
    likeToSleepAtCamp: boolean,
    selectOffsetId: mongoose.Types.ObjectId,
    displayOffsetId: mongoose.Types.ObjectId,
    authPartIds: mongoose.Types.ObjectId[],
    chatIds: mongoose.Types.ObjectId[],
}
export interface InterWorkingItem {
    name: string,
    link: string | null,
    status: 'not start' | 'in process' | 'done',
    partId: mongoose.Types.ObjectId,
    linkOutIds: mongoose.Types.ObjectId[],
    fromId: mongoose.Types.ObjectId | null,
    createBy: mongoose.Types.ObjectId,
    _id: mongoose.Types.ObjectId,
    password: string,
    partName: string
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
export interface InterBaanFront {
    name: string,
    fullName: string | null,
    campId: mongoose.Types.ObjectId,
    peeIds: mongoose.Types.ObjectId[],
    nongIds: mongoose.Types.ObjectId[],
    nongHeathIssueIds: mongoose.Types.ObjectId[],
    peeHeathIssueIds: mongoose.Types.ObjectId[],
    nongShirtSize: InterSize,//
    peeShirtSize: InterSize,//
    songIds: mongoose.Types.ObjectId[],
    peeModelIds: mongoose.Types.ObjectId[],
    nongModelId: mongoose.Types.ObjectId,
    nongCampMemberCardIds: mongoose.Types.ObjectId[],
    peeCampMemberCardIds: mongoose.Types.ObjectId[],
    link: string | null,
    styleId: mongoose.Types.ObjectId,
    boySleepPlaceId: mongoose.Types.ObjectId | null,
    girlSleepPlaceId: mongoose.Types.ObjectId | null,
    normalPlaceId: mongoose.Types.ObjectId | null,
    mapCampMemberCardIdByUserId: MapObjectId[],
    _id: mongoose.Types.ObjectId,
    nongSleepIds: mongoose.Types.ObjectId[],
    peeSleepIds: mongoose.Types.ObjectId[],
    groupRef: 'A' | 'B' | 'C' | 'Dog' | 'E' | 'F' | 'G' | 'H' | 'J' | 'K' | 'L' | 'M' | 'N' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'null',
    chatIds: mongoose.Types.ObjectId[],
    mdTime: Date,
    peeChatIds: mongoose.Types.ObjectId[],
    nongChatIds: mongoose.Types.ObjectId[],
    nongSendMessage: boolean,
    nongCampMemberCardHaveHeathIssueIds: mongoose.Types.ObjectId[],
    peeCampMemberCardHaveHeathIssueIds: mongoose.Types.ObjectId[],
    nongHaveBottleIds: mongoose.Types.ObjectId[],
    peeHaveBottleIds: mongoose.Types.ObjectId[],
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
    nongHeathIssueIds: mongoose.Types.ObjectId[],
    peeHeathIssueIds: mongoose.Types.ObjectId[],
    petoHeathIssueIds: mongoose.Types.ObjectId[],
    dataLock: boolean,
    nongShirtSize: InterSize,
    peeShirtSize: InterSize,
    petoShirtSize: InterSize,
    nongModelIds: mongoose.Types.ObjectId[],
    peeModelIds: mongoose.Types.ObjectId[],
    petoModelIds: mongoose.Types.ObjectId[],
    nongPendingIds: MyMap[],                            /////////////i
    nongPassIds: MyMap[],                               ////////////////////i
    open: boolean,
    peePassIds: MapObjectId[],//<userId,partId>               ////////////////////////i
    songIds: mongoose.Types.ObjectId[],
    nongSureIds: mongoose.Types.ObjectId[],
    baanIds: mongoose.Types.ObjectId[],
    nongCampMemberCardIds: mongoose.Types.ObjectId[],
    peeCampMemberCardIds: mongoose.Types.ObjectId[],
    petoCampMemberCardIds: mongoose.Types.ObjectId[],
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
    memberStructure: 'nong->highSchool,pee->1year,peto->2upYear' | 'nong->highSchool,pee->2upYear' | 'nong->1year,pee->2upYear' | 'nong->highSchool,pee->allYear' | 'allYearMix',
    logoUrl: string | null,
    mapCampMemberCardIdByUserId: MapObjectId[],
    registerSheetLink: string | null,
    peeLock: boolean,
    outRoundIds: mongoose.Types.ObjectId[],
    _id: mongoose.Types.ObjectId,
    campName: string,
    nongSleepIds: mongoose.Types.ObjectId[],
    peeSleepIds: mongoose.Types.ObjectId[],
    nongSleepModel: 'นอนทุกคน' | 'เลือกได้ว่าจะค้างคืนหรือไม่' | 'ไม่มีการค้างคืน',
    peeSleepModel: 'นอนทุกคน' | 'เลือกได้ว่าจะค้างคืนหรือไม่' | 'ไม่มีการค้างคืน',
    baanBoardId: mongoose.Types.ObjectId | null,
    partNameIds: mongoose.Types.ObjectId[],
    partBoardId: mongoose.Types.ObjectId,
    partCoopId: mongoose.Types.ObjectId,
    partRegisterId: mongoose.Types.ObjectId,
    partPeeBaanId: mongoose.Types.ObjectId,
    groupName: string,
    peeDataLock: boolean,
    petoDataLock: boolean,
    haveCloth: boolean,
    actionPlanOffset: number,
    currentNong: number,
    currentPee: number,
    nongMapIdGtoL: MyMap[],
    peeMapIdGtoL: MyMap[],
    mdTime: Date,
    partWelfareId: mongoose.Types.ObjectId,
    partMedId: mongoose.Types.ObjectId,
    partPlanId: mongoose.Types.ObjectId,
    allPetoChatIds: mongoose.Types.ObjectId[],
    petoSleepIds: mongoose.Types.ObjectId[],
    nongCampMemberCardHaveHeathIssueIds: mongoose.Types.ObjectId[],
    peeCampMemberCardHaveHeathIssueIds: mongoose.Types.ObjectId[],
    petoCampMemberCardHaveHeathIssueIds: mongoose.Types.ObjectId[],
    nongHaveBottleIds: mongoose.Types.ObjectId[],
    peeHaveBottleIds: mongoose.Types.ObjectId[],
    petoHaveBottleIds: mongoose.Types.ObjectId[],
}
export interface InterPartFront {
    nameId: mongoose.Types.ObjectId,
    campId: mongoose.Types.ObjectId,
    peeIds: mongoose.Types.ObjectId[],
    petoIds: mongoose.Types.ObjectId[],
    peeHeathIssueIds: mongoose.Types.ObjectId[],
    petoHeathIssueIds: mongoose.Types.ObjectId[],
    peeShirtSize: InterSize,
    petoShirtSize: InterSize,
    peeModelIds: mongoose.Types.ObjectId[],
    petoModelId: mongoose.Types.ObjectId,
    peeCampMemberCardIds: mongoose.Types.ObjectId[],
    petoCampMemberCardIds: mongoose.Types.ObjectId[],
    actionPlanIds: mongoose.Types.ObjectId[],
    workItemIds: mongoose.Types.ObjectId[],
    placeId: mongoose.Types.ObjectId | null,
    mapCampMemberCardIdByUserId: MapObjectId[],
    _id: mongoose.Types.ObjectId,
    partName: string
    peeSleepIds: mongoose.Types.ObjectId[],
    chatIds: mongoose.Types.ObjectId[],
    isAuth: boolean,
    petoSleepIds: mongoose.Types.ObjectId[],
    peeCampMemberCardHaveHeathIssueIds: mongoose.Types.ObjectId[],
    petoCampMemberCardHaveHeathIssueIds: mongoose.Types.ObjectId[],
    peeHaveBottleIds: mongoose.Types.ObjectId[],
    petoHaveBottleIds: mongoose.Types.ObjectId[],
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
    shirtSize: 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL',
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
    peeLock: boolean,
    groupName: string,
    peeDataLock: boolean,
    petoDataLock: boolean,
    haveCloth: boolean
}
export interface CreateCamp {
    nameId: mongoose.Types.ObjectId,
    round: number,
    dateStart: Date,
    dateEnd: Date,
    boardIds: mongoose.Types.ObjectId[],
    registerModel: 'noPaid' | 'noInterview' | 'all',
    memberStructure: 'nong->highSchool,pee->1year,peto->2upYear' | 'nong->highSchool,pee->2upYear' | 'nong->1year,pee->2upYear' | 'nong->highSchool,pee->allYear' | 'allYearMix',
    nongSleepModel: 'นอนทุกคน' | 'เลือกได้ว่าจะค้างคืนหรือไม่' | 'ไม่มีการค้างคืน',
    peeSleepModel: 'นอนทุกคน' | 'เลือกได้ว่าจะค้างคืนหรือไม่' | 'ไม่มีการค้างคืน'
}
export interface MapObjectId {
    key: mongoose.Types.ObjectId,
    value: mongoose.Types.ObjectId
}
export interface ShowMember {
    //                          id ของ mongodb
    name: string,//                        
    lastname: string,//                    นามสกุล
    nickname: string,//                    
    email: string,//             email
    studentId: string | null,//            
    gender: 'Male' | 'Female',//           เพศ
    shirtSize: 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL',//
    heathIssueId: mongoose.Types.ObjectId | null,//          
    haveBottle: boolean,//                 
    group: 'A' | 'B' | 'C' | 'Dog' | 'E' | 'F' | 'G' | 'H' | 'J' | 'K' | 'L' | 'M' | 'N' | 'P' | 'Q' | 'R' | 'S' | 'T' | null,//           
    likeSongs: string[],//               
    tel: string,   //                      
    _id: mongoose.Types.ObjectId,
    sleep: boolean,
    isWearing: boolean,
    spicy: boolean,
    id: number,
    campMemberCardId: mongoose.Types.ObjectId,
}
export interface UpdateBaan {
    name: string,
    fullName: string | null,
    baanId: mongoose.Types.ObjectId,
    link: string | null,
    girlSleepPlaceId: mongoose.Types.ObjectId | null,
    boySleepPlaceId: mongoose.Types.ObjectId | null,
    normalPlaceId: mongoose.Types.ObjectId | null,
    nongSendMessage: boolean,
}
export type Group = 'A' | 'B' | 'C' | 'Dog' | 'E' | 'F' | 'G' | 'H' | 'J' | 'K' | 'L' | 'M' | 'N' | 'P' | 'Q' | 'R' | 'S' | 'T'
export type Size = 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL'
export type RoleCamp = Mode | 'peto'
export type Role = RoleCamp | 'admin'
export type Mode = 'nong' | 'pee'
export interface HeathIssueBody {
    food: string,
    chronicDisease: string,
    medicine: string,
    extra: string,
    isWearing: boolean,
    spicy: boolean,
    foodConcern: string,
    foodLimit: FoodLimit,
}
export interface CreateActionPlan {
    action: string,
    partId: mongoose.Types.ObjectId,
    placeIds: mongoose.Types.ObjectId[],
    start: Date,
    end: Date,
    headId: mongoose.Types.ObjectId,
    body: string
}
export interface showActionPlan {
    _id: mongoose.Types.ObjectId,
    action: string,
    partId: mongoose.Types.ObjectId,
    placeIds: mongoose.Types.ObjectId[],
    start: Date,
    end: Date,
    headId: mongoose.Types.ObjectId,
    body: string,
    headName: string,
    headTel: string,
    partName: string,
    placeName: string[]
}
export interface ChoiseAnswer extends Answer {
    userId: mongoose.Types.ObjectId,
    _id: mongoose.Types.ObjectId
}
export type Choise = 'A' | 'B' | 'C' | "D" | "E"
export interface ChoiseQuasion {
    choiseAnswerIds: mongoose.Types.ObjectId[],
    campId: mongoose.Types.ObjectId,
    userIds: mongoose.Types.ObjectId[],
    quasion: string,
    a: string,
    b: string,
    c: string,
    d: string,
    e: string,
    _id: mongoose.Types.ObjectId,
    score: number,
    correct: Choise
}
export interface Answer {
    quasionId: mongoose.Types.ObjectId,
    campId: mongoose.Types.ObjectId,
    answer: Choise | null
}
export interface CreateQuation {
    campId: mongoose.Types.ObjectId,
    quasion: string,
    a: string,
    b: string,
    c: string,
    d: string,
    e: string,
    score: number,
    correct: Choise
}
export interface EditQuation {
    _id: mongoose.Types.ObjectId,
    quasion: string,
    a: string,
    b: string,
    c: string,
    d: string,
    e: string,
    score: number,
    correct: Choise
}
export interface CreateWorkingItem {
    name: string,
    link: string | null,
    partId: mongoose.Types.ObjectId,
    fromId: mongoose.Types.ObjectId | null,
    password: string
}
export interface ShowRegister {
    fullName: string,
    userId: mongoose.Types.ObjectId,
    partId: mongoose.Types.ObjectId,
    partName: string
}
export interface RegisBaan {
    pees: ShowMember[],
    nongs: ShowMember[],
    baan: InterBaanFront
}
export interface RegisPart {
    pees: ShowMember[],
    petos: ShowMember[],
    part: InterPartFront
}
export interface InterTimeOffset {
    userId: mongoose.Types.ObjectId,
    day: number,
    hour: number,
    minute: number,
    _id: mongoose.Types.ObjectId
}
export interface UpdateTimeOffsetRaw {
    day: number,
    hour: number,
    minute: number,
}
export interface UpdateTimeOffset {
    display: UpdateTimeOffsetRaw,
    select: UpdateTimeOffsetRaw
}
export interface AddLostAndFound {
    campId: mongoose.Types.ObjectId | null,
    type: 'lost' | 'found',
    name: string,
    detail: string,
    placeId: mongoose.Types.ObjectId | null,
}
export interface ShowLostAndFound extends InterLostAndFound {
    userName: string,
    userLastName: string,
    userNickname: string,
    buildingName: string,
    room: string,
    floor: string,
    tel: string,
    campName: string
}
export interface ShowPlace {
    buildingName: string,
    floor: string,
    room: string,
    _id: mongoose.Types.ObjectId
}
export interface mapObjectIdToLocalId {
    key: string,
    value: string
}
export interface ShowNong {
    name: string,//                        
    lastname: string,//                    นามสกุล
    nickname: string,//                    
    gender: 'Male' | 'Female',//           เพศ
    id: number,
}
export interface ShowRegisterNong {
    generalId: mongoose.Types.ObjectId,
    link: string,
    localId: string,
}
export interface AllNongRegister {
    pendings: ShowRegisterNong[],
    interviews: ShowRegisterNong[],
    passs: ShowRegisterNong[],
    paids: ShowRegisterNong[],
    sures: ShowRegisterNong[],
}
export interface InterChat {
    message: string,
    userId: mongoose.Types.ObjectId,
    campModelId: mongoose.Types.ObjectId,
    role: RoleCamp,
    typeChat: TypeChat,
    refId: mongoose.Types.ObjectId,//'น้องคุยส่วนตัวกับพี่','คุยกันในบ้าน'baan,'คุยกันในฝ่าย'part,'พี่คุยกันในบ้าน'baan,'พี่บ้านคุยกัน'part
    campMemberCardIds: mongoose.Types.ObjectId[],
    date: Date,
}
export interface ShowChat extends InterChat {
    nickname: string,
    baanName: string,
    partName: string,
    roomName: string,
}
export interface CreatePeeChat {
    message: string,
    partId: mongoose.Types.ObjectId
}
export interface EditChat {
    message: string,
    id: mongoose.Types.ObjectId
}
export interface CreateBaanChat {
    message: string,
    baanId: mongoose.Types.ObjectId
}
export interface CreateNongChat {
    message: string,
    CampMemberCard: mongoose.Types.ObjectId
}
export const departures = [
    "วิศวกรรมเคมี (Chemical Engineering)",
    "วิศวกรรมเคมีและกระบวนการ (นานาชาติ) (Chemical and Process Engineering)",
    "วิศวกรรมเครื่องกล (Mechanical Engineering)",
    "วิศวกรรมเรือ (Naval Architecture and Marine Engineering)",
    "วิศวกรรมยานยนต์ (Automotive Engineering)",
    "วิศวกรรมไฟฟ้า (Electrical Engineering)",
    "วิศวกรรมโยธา (Civil Engineering)",
    "วิศวกรรมโลหการและวัสดุ (Metallurgical and Materials Engineering)",
    "วิศวกรรมสิ่งแวดล้อม (Environmental Engineering)",
    "วิศวกรรมสำรวจ (Survey Engineering)",
    "วิศวกรรมทรัพยากรธรณี (Georesources Engineering)",
    "วิศวกรรมปิโตรเลียม (Petroleum Engineering)",
    "วิศวกรรมอุตสาหการ (Industrial Engineering)",
    "วิศวกรรมคอมพิวเตอร์ (Computer Engineering)",
    "วิศวกรรมคอมพิวเตอร์และเทคโนโลยีดิจิทัล (หลักสูตร Sandbox) (Computer Engineering and Digital Technology)",
    "วิศวกรรมนิวเคลียร์และรังสี (Nuclear and Radiological Engineering)",
    "วิศวกรรมนาโน (นานาชาติ)** (Nano-Engineering)",
    "วิศวกรรมการออกแบบและการผลิตยานยนต์ (นานาชาติ)** (Automotive Design and Manufacturing Engineering)",
    "วิศวกรรมอากาศยาน (นานาชาติ)** (Aerospace Engineering)",
    "วิศวกรรมสารสนเทศและการสื่อสาร (นานาชาติ)** (Information and Communication Engineering)",
    "วิศวกรรมหุ่นยนต์และปัญญาประดิษฐ์ (นานาชาติ)** (Robotics and Artificial Intelligence Engineering)"
] as const
export type Departure = typeof departures[number]
export const typeChats = ['น้องคุยส่วนตัวกับพี่', 'คุยกันในบ้าน', 'คุยกันในฝ่าย', 'พี่คุยกันในบ้าน', 'พี่บ้านคุยกัน'] as const
export type TypeChat = typeof typeChats[number]
export type GetChat = 'getAllChatFromCampId' | 'getPartChat' | 'getNongBaanChat' | 'getPeeBaanChat' | 'getNongChat' | 'getPartPeebaanChat'
export interface AllPlaceData {
    allPlace: Map<string, InterPlace[]>,
    allBuildings: Map<mongoose.Types.ObjectId, InterBuilding>,
}
export interface CampSizeContainer {
    name: string,
    groupName: string,
    nongSize: InterSize,
    peeSize: InterSize,
    petoSize: InterSize,
    partSizes: SizeContainer[],
    baanSizes: SizeContainer[],
    isHavePeto: boolean,
}
export interface SizeContainer {
    name: string,
    nongSize: InterSize,
    peeSize: InterSize,
    petoSize: InterSize,
}
export interface ChatReady {
    chats: ShowChat[];
    timeOffset: InterTimeOffset;
    mode: Mode;
    groupName: string;
    sendType: {
        id: mongoose.Types.ObjectId;
        roomType: TypeChat;
    } | null;
    success: boolean,
    roomName: string,
}
export const foodLimits = ['อิสลาม', 'มังสวิรัติ', 'เจ', 'ไม่มีข้อจำกัดด้านความเชื่อ'] as const
export type FoodLimit = typeof foodLimits[number]
export interface HeathIssuePack {
    heathIssue: HeathIssueBody,
    user: InterUser,
}
export interface CampWelfarePack{
    nongs:HeathIssuePack[],
    pees:HeathIssuePack[],
    petos:HeathIssuePack[],
    name:string,
    baans:WelfarePack[],
    parts:WelfarePack[],
    isHavePeto: boolean,
    groupName: string,
}
export interface WelfarePack{
    nongs:HeathIssuePack[],
    pees:HeathIssuePack[],
    petos:HeathIssuePack[],
    name:string,
}