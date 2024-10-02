import mongoose from "mongoose";
const PeeCampSchema = new mongoose.Schema({
    userId: {//user
        type: mongoose.Schema.ObjectId,
        required: true
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
    },
    foodConcern: {
        type: String,
        default: ''
    },
    // nongCampIds: {
    //     type: [mongoose.Schema.ObjectId],
    //     default: []
    // },
    // peeCampIds: {
    //     type: [mongoose.Schema.ObjectId],
    //     default: []
    // },
    // petoCampIds: {
    //     type: [mongoose.Schema.ObjectId],
    //     default: []
    // },
    campIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    campMemberCardIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    }
})
export default mongoose.model('HelthIsue', PeeCampSchema)