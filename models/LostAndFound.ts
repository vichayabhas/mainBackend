import mongoose from "mongoose";
const LostAndFoundSchema = new mongoose.Schema({
    campId: {
        type: mongoose.Schema.ObjectId
    },
    type: {
        type: String,
        enum: ['lost', 'found']
    },
    name: {
        type: String
    },
    detail: {
        type: String
    },
    userId: {
        type: mongoose.Schema.ObjectId
    },
    placeId: {
        type: mongoose.Schema.ObjectId
    },
    buildingId: {
        type: mongoose.Schema.ObjectId
    }
})
export default mongoose.model('LostAndFound', LostAndFoundSchema)