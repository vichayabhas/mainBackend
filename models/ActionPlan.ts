import mongoose from "mongoose";
const HospitalSchema = new mongoose.Schema({
    action: {
        type: String

    },
    partId: {
        type: mongoose.Schema.ObjectId
    },
    campId: {
        type: mongoose.Schema.ObjectId
    },
    placeIds: {//place
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    start: {
        type: Date
    },
    end: {
        type: Date
    },
    headId: {//user
        type: mongoose.Schema.ObjectId
    },
    body: {
        type: String
    }
});
export default mongoose.model('ActionPlan', HospitalSchema);