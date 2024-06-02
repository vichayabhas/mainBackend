import mongoose from "mongoose"
const PeeCampSchema = new mongoose.Schema({
    name: {
        type: String
    },
    placeIds: {//place
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    actionPlanIds: {//actionPlan
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    fridayActIds: {//fridayAct
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    lostAndFoundIds:{
        type: [mongoose.Schema.ObjectId],
        default: []      
    },
    boySleepBaanIds:{//baan
        type:[mongoose.Schema.ObjectId],
        default:[]
    },
    girlSleepBaanIds:{//baan
        type:[mongoose.Schema.ObjectId],
        default:[]
    },
    normalBaanIds:{//baan
        type:[mongoose.Schema.ObjectId],
        default:[]
    },
    partIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    }
})
export default mongoose.model('Building', PeeCampSchema)