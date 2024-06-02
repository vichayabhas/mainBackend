import mongoose from "mongoose"
const PeeCampSchema = new mongoose.Schema({
    buildingId: {//building
        type: mongoose.Schema.ObjectId
    },
    flore: {
        type: String
    },
    room: {
        type: String
    },
    actionPlanIds: {//actionPlan
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    fridayActIds: {//fridayAct
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
        type: [mongoose.Schema.ObjectId],
        default: []      
    },
    partIds:{
        type:[mongoose.Schema.ObjectId],
        default:[]
    }
})
export default mongoose.model('Place', PeeCampSchema)