import mongoose from "mongoose"
const PeeCampSchema = new mongoose.Schema({
    buildingId: {//building
        type: String
    },
    flore: {
        type: String
    },
    room: {
        type: String
    },
    actionPlanIds: {//actionPlan
        type: [String],
        default: []
    },
    fridayActIds: {//fridayAct
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
    sleepCap:{
        type:Number
    },
    actCap:{
        type:Number
    },
    studyCap:{
        type:Number
    },
    lostAndFoundIds:{
        type: [String],
        default: []      
    },
    partIds:{
        type:[String],
        default:[]
    }
})
export default mongoose.model('Place', PeeCampSchema)