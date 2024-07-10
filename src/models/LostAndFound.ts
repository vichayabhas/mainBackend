import mongoose from "mongoose";
const LostAndFoundSchema = new mongoose.Schema({
    campId: {
        type: mongoose.Schema.ObjectId,
        default:null
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
        //required:true,
        default:null
    },
    buildingId: {
        type: mongoose.Schema.ObjectId,
       // required:true,
        default:null
    }
})
export default mongoose.model('LostAndFound', LostAndFoundSchema)