"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPath = exports.backendUrl = exports.resError = exports.resOk = void 0;
exports.startSize = startSize;
exports.swop = swop;
exports.calculate = calculate;
exports.sendRes = sendRes;
exports.sizeMapToJson = sizeMapToJson;
exports.sizeJsonMod = sizeJsonMod;
exports.mapBoolToArray = mapBoolToArray;
exports.conBaanBackToFront = conBaanBackToFront;
exports.conCampBackToFront = conCampBackToFront;
exports.conPartBackToFront = conPartBackToFront;
exports.mapStringToMyMap = mapStringToMyMap;
exports.mapObjectIdToMyMap = mapObjectIdToMyMap;
exports.isInTime = isInTime;
exports.plusActionPlan = plusActionPlan;
exports.removeDupicate = removeDupicate;
exports.notEmpty = notEmpty;
function startSize() {
    var size = new Map();
    var s = ['S', 'M', 'L', 'XL', 'XXL', '3XL'];
    s.forEach(function (e) {
        size.set(e, 0);
    });
    return size;
}
function swop(olds, news, array) {
    if (!olds) {
        if (news) {
            array.push(news);
        }
        return array;
    }
    var re = array.filter(function (e) {
        return e.toString().localeCompare(olds.toString());
    });
    if (news) {
        re.push(news);
    }
    return re;
}
function calculate(input, plus, minus) {
    return input + plus - minus;
}
exports.resOk = { success: true };
exports.resError = { success: false };
function sendRes(res, success) {
    res.status(success ? 200 : 400).json({ success: success });
}
function sizeMapToJson(input) {
    var out = {
        _id: null,
        sizeS: input.get('S'),
        sizeM: input.get('M'),
        sizeL: input.get('L'),
        sizeXL: input.get('XL'),
        sizeXXL: input.get('XXL'),
        size3XL: input.get('3XL')
    };
    return (out);
}
function sizeJsonMod(size, count, input) {
    switch (size) {
        case 'S': input.sizeS = input.sizeS + count;
        case 'M': input.sizeM = input.sizeM + count;
        case 'L': input.sizeL = input.sizeL + count;
        case 'XL': input.sizeXL = input.sizeXL + count;
        case 'XXL': input.sizeXXL = input.sizeXXL + count;
        case '3XL': input.size3XL = input.size3XL + count;
    }
    return input;
}
function mapBoolToArray(input) {
    var out = [];
    input.forEach(function (v, k) {
        if (v) {
            out.push(k);
        }
    });
    return out;
}
function conBaanBackToFront(input) {
    var name = input.name, fullName = input.fullName, campId = input.campId, peeIds = input.peeIds, nongIds = input.nongIds, nongHelthIsueIds = input.nongHelthIsueIds, peeHelthIsueIds = input.peeHelthIsueIds, nongShertSize = input.nongShertSize, peeShertSize = input.peeShertSize, songIds = input.songIds, nongHaveBottle = input.nongHaveBottle, peeHaveBottle = input.peeHaveBottle, nongHaveBottleMapIds = input.nongHaveBottleMapIds, peeHaveBottleMapIds = input.peeHaveBottleMapIds, peeModelIds = input.peeModelIds, nongModelId = input.nongModelId, nongShertManageIds = input.nongShertManageIds, peeShertManageIds = input.peeShertManageIds, link = input.link, styleId = input.styleId, boySleepPlaceId = input.boySleepPlaceId, girlSleepPlaceId = input.girlSleepPlaceId, mapShertManageIdByUserId = input.mapShertManageIdByUserId, nomalPlaceId = input.nomalPlaceId, _id = input._id, peeSleepIds = input.peeSleepIds, nongSleepIds = input.nongSleepIds, groupRef = input.groupRef;
    return ({
        name: name,
        fullName: fullName,
        campId: campId,
        link: link,
        peeHaveBottle: peeHaveBottle,
        nomalPlaceId: nomalPlaceId,
        nongHaveBottle: nongHaveBottle,
        nongHelthIsueIds: nongHelthIsueIds,
        nongIds: nongIds,
        nongModelId: nongModelId,
        nongShertManageIds: nongShertManageIds,
        peeHelthIsueIds: peeHelthIsueIds,
        peeIds: peeIds,
        peeShertManageIds: peeShertManageIds,
        peeModelIds: peeModelIds,
        peeShertSize: sizeMapToJson(peeShertSize),
        nongShertSize: sizeMapToJson(nongShertSize),
        songIds: songIds,
        styleId: styleId,
        boySleepPlaceId: boySleepPlaceId,
        girlSleepPlaceId: girlSleepPlaceId,
        peeHaveBottleMapIds: mapBoolToArray(peeHaveBottleMapIds),
        nongHaveBottleMapIds: mapBoolToArray(nongHaveBottleMapIds),
        mapShertManageIdByUserId: mapObjectIdToMyMap(mapShertManageIdByUserId),
        _id: _id,
        peeSleepIds: peeSleepIds,
        nongSleepIds: nongSleepIds,
        groupRef: groupRef
    });
}
function conCampBackToFront(input) {
    var nameId = input.nameId, round = input.round, dateStart = input.dateStart, dateEnd = input.dateEnd, boardIds = input.boardIds, peeIds = input.peeIds, nongIds = input.nongIds, partIds = input.partIds, petoIds = input.petoIds, authorizeIds = input.authorizeIds, nongHelthIsueIds = input.nongHelthIsueIds, peeHelthIsueIds = input.peeHelthIsueIds, petoHelthIsueIds = input.petoHelthIsueIds, dataLock = input.dataLock, nongShertSize = input.nongShertSize, peeShertSize = input.peeShertSize, petoShertSize = input.petoShertSize, nongModelIds = input.nongModelIds, peeModelIds = input.peeModelIds, petoModelIds = input.petoModelIds, nongPendingIds = input.nongPendingIds, /////////////i
    nongPassIds = input.nongPassIds, ////////////////////i
    open = input.open, peePassIds = input.peePassIds, //<userId,partId>               ////////////////////////i
    songIds = input.songIds, nongHaveBottle = input.nongHaveBottle, peeHaveBottle = input.peeHaveBottle, petoHaveBottle = input.petoHaveBottle, nongHaveBottleMapIds = input.nongHaveBottleMapIds, peeHaveBottleMapIds = input.peeHaveBottleMapIds, petoHaveBottleMapIds = input.petoHaveBottleMapIds, nongSureIds = input.nongSureIds, baanIds = input.baanIds, nongShertManageIds = input.nongShertManageIds, peeShertManageIds = input.peeShertManageIds, petoShertManageIds = input.petoShertManageIds, link = input.link, allDone = input.allDone, lockChangePickup = input.lockChangePickup, pictureUrls = input.pictureUrls, campStyleId = input.campStyleId, actionPlanIds = input.actionPlanIds, workItemIds = input.workItemIds, nongPaidIds = input.nongPaidIds, nongInterviewIds = input.nongInterviewIds, ////////////////////////////////i
    registerModel = input.registerModel, memberStructre = input.memberStructre, mapShertManageIdByUserId = input.mapShertManageIdByUserId, logoUrl = input.logoUrl, registerSheetLink = input.registerSheetLink, peeLock = input.peeLock, outRoundIds = input.outRoundIds, campName = input.campName, _id = input._id, peeSleepIds = input.peeSleepIds, peeSleepModel = input.peeSleepModel, nongSleepIds = input.nongSleepIds, nongSleepModel = input.nongSleepModel, baanBordId = input.baanBordId, partNameIds = input.partNameIds, partBoardId = input.partBoardId, partCoopId = input.partCoopId, partRegiterId = input.partRegiterId, partPeeBaanId = input.partPeeBaanId, peeDataLock = input.peeDataLock, petoDataLock = input.petoDataLock, groupName = input.groupName, actionPlanOffset = input.actionPlanOffset, haveCloth = input.haveCloth;
    return ({
        partIds: partIds,
        open: open,
        peeHaveBottle: peeHaveBottle,
        peeHaveBottleMapIds: mapBoolToArray(peeHaveBottleMapIds),
        peeHelthIsueIds: peeHelthIsueIds,
        peeIds: peeIds,
        peeModelIds: peeModelIds,
        peePassIds: mapObjectIdToMyMap(peePassIds),
        peeShertManageIds: peeShertManageIds,
        peeShertSize: sizeMapToJson(peeShertSize),
        petoHaveBottle: petoHaveBottle,
        petoHaveBottleMapIds: mapBoolToArray(petoHaveBottleMapIds),
        petoHelthIsueIds: petoHelthIsueIds,
        petoIds: petoIds,
        petoModelIds: petoModelIds,
        petoShertManageIds: petoShertManageIds,
        petoShertSize: sizeMapToJson(petoShertSize),
        pictureUrls: pictureUrls,
        nameId: nameId,
        nongHaveBottle: nongHaveBottle,
        nongHaveBottleMapIds: mapBoolToArray(nongHaveBottleMapIds),
        nongHelthIsueIds: nongHelthIsueIds,
        nongIds: nongIds,
        nongInterviewIds: mapStringToMyMap(nongInterviewIds),
        nongModelIds: nongModelIds,
        nongPaidIds: nongPaidIds,
        nongPassIds: mapStringToMyMap(nongPassIds),
        nongPendingIds: mapStringToMyMap(nongPendingIds),
        nongShertManageIds: nongShertManageIds,
        nongShertSize: sizeMapToJson(nongShertSize),
        nongSureIds: nongSureIds,
        registerModel: registerModel,
        round: round,
        actionPlanIds: actionPlanIds,
        allDone: allDone,
        authorizeIds: authorizeIds,
        baanIds: baanIds,
        boardIds: boardIds,
        campStyleId: campStyleId,
        link: link,
        lockChangePickup: lockChangePickup,
        dataLock: dataLock,
        dateEnd: dateEnd,
        dateStart: dateStart,
        memberStructre: memberStructre,
        workItemIds: workItemIds,
        songIds: songIds,
        partNameIds: partNameIds,
        logoUrl: logoUrl,
        mapShertManageIdByUserId: mapObjectIdToMyMap(mapShertManageIdByUserId),
        registerSheetLink: registerSheetLink,
        peeLock: peeLock,
        outRoundIds: outRoundIds,
        campName: campName,
        _id: _id,
        peeSleepIds: peeSleepIds,
        peeSleepModel: peeSleepModel,
        nongSleepIds: nongSleepIds,
        nongSleepModel: nongSleepModel,
        baanBordId: baanBordId,
        partBoardId: partBoardId,
        partCoopId: partCoopId,
        partRegiterId: partRegiterId,
        partPeeBaanId: partPeeBaanId,
        groupName: groupName,
        peeDataLock: peeDataLock,
        petoDataLock: petoDataLock,
        actionPlanOffset: actionPlanOffset,
        haveCloth: haveCloth
    });
}
function conPartBackToFront(input) {
    var nameId = input.nameId, campId = input.campId, peeIds = input.peeIds, petoIds = input.petoIds, peeHelthIsueIds = input.peeHelthIsueIds, petoHelthIsueIds = input.petoHelthIsueIds, peeShertSize = input.peeShertSize, petoShertSize = input.petoShertSize, peeHaveBottle = input.peeHaveBottle, petoHaveBottle = input.petoHaveBottle, peeHaveBottleMapIds = input.peeHaveBottleMapIds, petoHaveBottleMapIds = input.petoHaveBottleMapIds, peeModelIds = input.peeModelIds, petoModelId = input.petoModelId, peeShertManageIds = input.peeShertManageIds, petoShertManageIds = input.petoShertManageIds, actionPlanIds = input.actionPlanIds, workItemIds = input.workItemIds, mapShertManageIdByUserId = input.mapShertManageIdByUserId, placeId = input.placeId, partName = input.partName, peeSleepIds = input.peeSleepIds, _id = input._id;
    return ({
        actionPlanIds: actionPlanIds,
        workItemIds: workItemIds,
        campId: campId,
        nameId: nameId,
        peeHaveBottle: peeHaveBottle,
        peeHaveBottleMapIds: mapBoolToArray(peeHaveBottleMapIds),
        peeHelthIsueIds: peeHelthIsueIds,
        peeIds: peeIds,
        peeModelIds: peeModelIds,
        peeShertManageIds: peeShertManageIds,
        peeShertSize: sizeMapToJson(peeShertSize),
        petoHaveBottle: petoHaveBottle,
        petoHaveBottleMapIds: mapBoolToArray(petoHaveBottleMapIds),
        petoHelthIsueIds: petoHelthIsueIds,
        petoIds: petoIds,
        petoModelId: petoModelId,
        petoShertManageIds: petoShertManageIds,
        petoShertSize: sizeMapToJson(petoShertSize),
        placeId: placeId,
        mapShertManageIdByUserId: mapObjectIdToMyMap(mapShertManageIdByUserId),
        partName: partName,
        peeSleepIds: peeSleepIds,
        _id: _id
    });
}
function mapStringToMyMap(input) {
    var out = [];
    input.forEach(function (value, key) {
        out.push({ key: key, value: value });
    });
    return out;
}
function mapObjectIdToMyMap(input) {
    var out = [];
    input.forEach(function (value, key) {
        out.push({ key: key, value: value });
    });
    return out;
}
/*export function myMapToMapString(input: MyMap[]): Map<string, string> {
    const map: Map<string, string> = new Map
    input.forEach((v) => {
        map.set(v.key, v.value)
    })
    return map

}*/
/*export function linkSign(input: InterWorkingItem, token: string): InterWorkingItem {
    const {

        name,
        link,
        status,
        partId,
        campId,
        linkOutIds,
        fromId,
        createBy,
        _id
    } = input
    return ({
        name,
        status,
        campId,
        linkOutIds,
        fromId,
        partId,
        link: jwt.sign(link, token),
        createBy,
        _id
    })
}
function hashRaw(input: string, token: string): string|null {
    try {
        const out = jwt.verify(input, token)
        return(out as {link:string|null}) .link
    } catch (error) {
        return 'null'
    }
}
export function linkHash(input: InterWorkingItem, token: string): InterWorkingItem {
    const {

        name,
        link,
        status,
        partId,
        campId,
        linkOutIds,
        fromId,
        createBy,
        _id
    } = input
    return ({

        name,
        status,
        campId,
        linkOutIds,
        fromId,
        partId,
        link: hashRaw(link, token),
        createBy,
        _id
    })
}*/
function isInTime(start, end) {
    var now = new Date(Date.now());
    return (now > start && now < end);
}
function plusActionPlan(input, minute) {
    var millisecound = minute * 1000 * 60;
    var start = input.start, end = input.end, partId = input.partId, placeIds = input.placeIds, action = input.action, headId = input.headId, body = input.body, _id = input._id, partName = input.partName;
    return ({
        start: new Date(start.getTime() + millisecound),
        end: new Date(end.getTime() + millisecound),
        partId: partId,
        placeIds: placeIds,
        action: action,
        headId: headId,
        body: body,
        _id: _id,
        partName: partName
    });
}
exports.backendUrl = 'http://localhost:5000';
exports.userPath = 'api/v1/auth';
function removeDupicate(input, compare) {
    return input.filter(function (e) {
        return !compare.includes(e);
    });
}
function notEmpty(value) {
    if (value === null || value === undefined)
        return false;
    var testDummy = value;
    return true;
}
// Create a transport for sending emails (replace with your email service's data)
/*const transporter = nodemailer.createTransport({
    service: '', // Use your email service
    auth: {
     user: '6633227421@student.chula.ac.th', // Your email address
     pass: '67CM37Da', // Your password
    },
});
// Set email options
const mailOptions = {
    from: '6633227421@student.chula.ac.th', // Sender
    to: 'arifmini64@gmail.com', // Recipient
    subject: 'Email Subject', // Email subject
    html: '<></>', // Email HTML content
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Email sending failed:', error);
    } else {
        console.log('Email sent: ' + info.response);
    }
})//nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');*/ 
