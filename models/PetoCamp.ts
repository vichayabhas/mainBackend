import mongoose from "mongoose"
const PeeCampSchema = new mongoose.Schema({
    campId: {
        type: mongoose.Schema.ObjectId
    },
    partId: {
        type: mongoose.Schema.ObjectId
    },
    petoShertManageIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    petoIds:{
        type: [mongoose.Schema.ObjectId],
        default: []
    }
})
export default mongoose.model('PetoCamp', PeeCampSchema)