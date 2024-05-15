import mongoose from "mongoose"
const PartSchema = new mongoose.Schema({
    name: {
        type: String
    },
    campIds: {//camp
        type: [String],
        default: []
    },
    baanIds: {//baan
        type: [String],
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
        type: [String],
        default: []
    }
})
export default mongoose.model('Song', PartSchema)