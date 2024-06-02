import mongoose from "mongoose"
const PeeCampSchema = new mongoose.Schema({
    campIds: {//camp
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    name: {
        type: String
    },
    partIds: {
        type: [mongoose.Schema.ObjectId],
        default: [] 
    }
}) 
export default mongoose.model('PartNameContainer', PeeCampSchema)