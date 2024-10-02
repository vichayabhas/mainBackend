import mongoose from "mongoose"
const PartSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    campIds: {//camp
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    baanIds: {//baan
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    author: {
        type: String,
        required: true,
    },
    time: {
        type: Number,
        require: true,
    },
    link: {
        type: String,
        required: true,
    },
    userLikeIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    }
})
export default mongoose.model('Song', PartSchema)