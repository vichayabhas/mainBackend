import mongoose from "mongoose"
const PeeCampSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
        required: true
    },
    campModelId: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    role: {
        type: String,
        enum: ['nong', 'pee', 'peto'],
        required: true,
    },
    recive: {
        type: String,
        enum: ['baan', 'part']
    },
    recived: {
        type: Number,
        default: 0
    },
    haveBottle: {
        type: Boolean,
        default: false
    },
    sleepAtCamp: {
        type: Boolean,
        default: false
    },
    chatIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    allChatIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    ownChatIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    helthIshueId: {
        type: mongoose.Schema.ObjectId,
        default: null,
    },
})
export default mongoose.model('ShertManage', PeeCampSchema)