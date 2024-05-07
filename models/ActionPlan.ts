import mongoose from "mongoose";
const HospitalSchema = new mongoose.Schema({
    action: {
        type: String

    },
    partId: {
        type: String
    },
    campId: {
        type: String
    },
    placeIds: {//place
        type: [String],
        default: []
    },
    start: {
        type: Date
    },
    end: {
        type: Date
    },
    headId: {//user
        type: String
    },
    body: {
        type: String
    }
});
export default mongoose.model('ActionPlan', HospitalSchema);