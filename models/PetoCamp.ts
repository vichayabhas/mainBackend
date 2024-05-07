import mongoose from "mongoose"
const PeeCampSchema = new mongoose.Schema({
    campId: {
        type: String
    },
    partId: {
        type: String
    },
    petoShertManageIds: {
        type: [String],
        default: []
    },
    petoIds:{
        type: [String],
        default: []
    }
})
export default mongoose.model('PetoCamp', PeeCampSchema)