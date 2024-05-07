import mongoose from "mongoose"
const PeeCampSchema = new mongoose.Schema({
    name: {
        type: String
    },
    placeIds: {//place
        type: [String],
        default: []
    },
    actionPlanIds: {//actionPlan
        type: [String],
        default: []
    },
    fridayActIds: {//fridayAct
        type: [String],
        default: []
    }
})
export default mongoose.model('Building', PeeCampSchema)