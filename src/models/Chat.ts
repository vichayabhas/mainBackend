import mongoose from "mongoose"
const PeeCampSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    campModelId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    role: {
        type: String,
        enum: ['pee', 'peto', 'nong'],
        required: true
    }
})
export default mongoose.model('Chat', PeeCampSchema)