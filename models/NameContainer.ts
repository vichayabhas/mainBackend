import mongoose from "mongoose"
const PeeCampSchema = new mongoose.Schema({
    campIds: {//camp
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    name: {
        type: String,
        unique:true
    }
})
export default mongoose.model('NameContainer', PeeCampSchema)
