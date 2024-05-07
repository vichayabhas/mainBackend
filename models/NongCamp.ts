import mongoose from "mongoose"
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
export default mongoose.model('NongCamp', PeeCampSchema)