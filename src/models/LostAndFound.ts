import mongoose from "mongoose";
const LostAndFoundSchema = new mongoose.Schema({
    campId: {
        type: mongoose.Schema.ObjectId
    },
    type: {
        type: String,
        enum: ['lost', 'found'],
        required:true
    },
    name: {
        type: String,
        required:true
    },
    detail: {
        type: String,
        required:true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        required:true
    },
    placeId: {
        type: mongoose.Schema.ObjectId,
        required:true
    },
    buildingId: {
        type: mongoose.Schema.ObjectId,
        required:true
    }
})
export default mongoose.model('LostAndFound', LostAndFoundSchema)