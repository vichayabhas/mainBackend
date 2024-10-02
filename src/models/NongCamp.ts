import mongoose from "mongoose"
const PeeCampSchema = new mongoose.Schema({
    campId: {
        type: mongoose.Schema.ObjectId,
        required: true

    },
    baanId: {
        type: mongoose.Schema.ObjectId
    },
    nongIds: {//user
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    nongCampMemberCardIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    mapNongCampIdByUserId: {//user    รหัสประจำตัวน้องค่าย    
        type: Map,
        default: new Map
    }
})
export default mongoose.model('NongCamp', PeeCampSchema)