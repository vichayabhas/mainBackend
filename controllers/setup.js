const PeeCamp = require("../models/PeeCamp")

const size = new Map
const s = ['S', 'M', 'L', 'XL', 'XXL', '3XL']
s.forEach((e) => {
    size.set(e, 0)
})
const startSize = size
exports = startSize
exports = function swop(olds, news, array) {
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
exports.setDefalse=async(peeCampId)=>{
    const name=['arrayString1','arrayString2','arrayString3','arrayString4','arrayString5','map1','map2','map3','map4','map5']
    const peeCamp=await PeeCamp.findById(peeCampId)
    peeCamp.mapArrayStringNumberByName.set(name[0],peeCamp.arrayString1)
    peeCamp.mapArrayStringNumberByName.set(name[1],peeCamp.arrayString2)
    peeCamp.mapArrayStringNumberByName.set(name[2],peeCamp.arrayString3)
    peeCamp.mapArrayStringNumberByName.set(name[3],peeCamp.arrayString4)
    peeCamp.mapArrayStringNumberByName.set(name[4],peeCamp.arrayString5)
    peeCamp.mapMapNumberByName.set(name[5],peeCamp.map1)
    peeCamp.mapMapNumberByName.set(name[6],peeCamp.map2)
    peeCamp.mapMapNumberByName.set(name[7],peeCamp.map3)
    peeCamp.mapMapNumberByName.set(name[8],peeCamp.map4)
    peeCamp.mapMapNumberByName.set(name[9],peeCamp.map5)
}