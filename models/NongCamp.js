const mongoose = require("mongoose");
const PeeCampSchema = new mongoose.Schema({
    campId: {
        type: String
    },

    baanId: {
        type: String
    },
    nongIds: {//user
        type: [String],
        default: []
    },
    nongShertManageIds: {
        type: [String],
        default: []
    },
    mapNongCampIdByUserId: {//user    รหัสประจำตัวน้องค่าย    
        type: Map,
        default: new Map
    }
})
module.exports = mongoose.model('NongCamp', PeeCampSchema)