import mongoose from "mongoose"
const PeeCampSchema = new mongoose.Schema({
    campIds: {//camp
        type: [String],
        default: []
    },
    name: {
        type: String
    }
})
export default mongoose.model('NameContainer', PeeCampSchema)
