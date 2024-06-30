import mongoose from "mongoose";
const PeeCampSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    day: {
        type: Number,
        default: 0
    },
    hour: {
        type: Number,
        default: 0
    },
    minute: {
        type: Number,
        default: 0
    }
})
export default mongoose.model('TimeOffset', PeeCampSchema)