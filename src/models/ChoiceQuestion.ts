import mongoose from "mongoose";
const PeeCampSchema = new mongoose.Schema({
    choiceAnswerIds: {
        type: [mongoose.Schema.ObjectId],
        default: []
    },
    campId: {
        type: mongoose.Schema.ObjectId
    },
    mapAwnserIdByUserId: {
        type: Map,
        default: new Map()
    },
    quasion: {
        type: String
    },
    a: {
        type: String
    },
    b: {
        type: String
    },
    c: {
        type: String 
    },
    d: {
        type: String
    },
    e: {
        type: String
    },
    score:{
        type:Number,
        default:1
    },
    correct:{
        type:String,
        enum:['A','B','C','D','E']
    }
})
export default mongoose.model('ChoiceQuestion', PeeCampSchema)