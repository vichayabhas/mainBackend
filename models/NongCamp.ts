import mongoose from "mongoose"
const PeeCampSchema = new mongoose.Schema({
    campId: {
        type: mongoose.Schema.ObjectId
    },
    baanId: {
        type: mongoose.Schema.ObjectId
    },
    nongIds: {//user
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    nongShertManageIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    mapNongCampIdByUserId: {//user    รหัสประจำตัวน้องค่าย    
        type: Map,
        default: new Map
    }
})
export default mongoose.model('NongCamp', PeeCampSchema)