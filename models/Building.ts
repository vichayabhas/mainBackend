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
    },
    lostAndFoundIds:{
        type: [String],
        default: []      
    },
    boySleepBaanIds:{//baan
        type:[String],
        default:[]
    },
    girlSleepBaanIds:{//baan
        type:[String],
        default:[]
    },
    normalBaanIds:{//baan
        type:[String],
        default:[]
    },
    partIds: {
        type: [String],
        default: []
    }
})
export default mongoose.model('Building', PeeCampSchema)