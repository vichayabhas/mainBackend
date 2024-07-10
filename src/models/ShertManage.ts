import mongoose from "mongoose"
const PeeCampSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
        default:'L'
    },
    campModelId: {
        type: mongoose.Schema.ObjectId
    },
    role: {
        type: String,
        enum: ['nong', 'pee', 'peto']
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
    sleepAtCamp:{
        type:Boolean,
        default:false
    }
})
export default mongoose.model('ShertManage', PeeCampSchema)