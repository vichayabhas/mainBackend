import mongoose from "mongoose"
const PartSchema = new mongoose.Schema({
    name: {
        type: String
    },
    campIds: {//camp
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    baanIds: {//baan
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    auther: {
        type: String
    },
    time: {
        type: Number
    },
    link: {
        type: String
    },
    userLikeIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    }
})
export default mongoose.model('Song', PartSchema)