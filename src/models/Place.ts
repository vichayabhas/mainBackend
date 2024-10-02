import mongoose from "mongoose"
const PeeCampSchema = new mongoose.Schema({
    buildingId: {//building
        type: mongoose.Schema.ObjectId
    },
    floor: {
        type: String,
        required:true
    },
    room: {
        type: String,
        required:true
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
        type:Number,
        default :0
    },
    actCap:{
        type:Number,
        default:0
    },
    studyCap:{
        type:Number,
        default:0
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