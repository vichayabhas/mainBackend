import mongoose from "mongoose"
const PeeCampSchema = new mongoose.Schema({
    campIds: {//camp
        type: [String],
        default: []
    },
    name: {
        type: String
    },
    partIds: {
        type: [String],
        default: [] 
    }
}) 
export default mongoose.model('PartNameContainer', PeeCampSchema)