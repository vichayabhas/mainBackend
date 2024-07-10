import mongoose from "mongoose";
const PeeCampSchema = new mongoose.Schema({
    userId: {//user
        type: mongoose.Schema.ObjectId
    },
    food: {
        type: String,
        default: ''
    },
    chronicDisease: {
        type: String,
        default: ''
    },
    medicine: {
        type: String,
        default: ''
    },
    extra: {
        type: String,
        default: ''
    },
    isWearing: {
        type: Boolean,
        default: false
    },
    spicy: {
        type: Boolean,
        default: false
    }
})
export default mongoose.model('HelthIsue', PeeCampSchema)